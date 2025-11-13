import type { H3Event } from "h3";
import { PartCategoryRepository } from "#server/repositories/part-category";
import { AuditLogRepository } from "#server/repositories/identity";
import {
  AuthenticationError,
  ValidationError,
  InternalServerError,
} from "#server/error/errors";
import type { PartCategory, NewPartCategory } from "#server/database/schema/parts";
import { getDatabase } from "#server/database/utils";
import type { Filter, SortOrder } from "#server/types/api";

// ========================================
// PART CATEGORY SERVICE
// ========================================
// Handles part category business logic
// Tree structure management with pathstring approach
// ========================================

export class PartCategoryService {
  private readonly db: D1Database;
  private readonly userId?: string;

  constructor(
    private readonly event: H3Event,
    db: D1Database,
    private readonly partCategoryRepo: PartCategoryRepository,
    private readonly auditLogRepo: AuditLogRepository,
    private readonly partRepo?: any // Will be typed properly when PartRepository is created
  ) {
    // Validate database context
    if (!db) {
      throw new InternalServerError("Database not found in event context");
    }

    this.db = db;
    this.userId = event.context.userId;
  }

  /**
   * Helper to log audit events
   */
  private async logAudit(
    action: string,
    entityId: string,
    metadata?: Record<string, any>
  ) {
    if (!this.userId) return;

    return this.auditLogRepo.log(
      this.userId,
      action,
      "PartCategory",
      entityId,
      {
        requestId: this.event.context.requestId,
        endpoint: this.event.context.endpoint,
        method: this.event.context.method,
        ipAddress: this.event.context.ipAddress,
        userAgent: this.event.context.userAgent,
        metadata,
      }
    );
  }

  // ========================================
  // CREATE
  // ========================================

  /**
   * Create a new part category
   */
  async createCategory(
    data: Omit<NewPartCategory, "pathstring" | "level">
  ): Promise<PartCategory> {
    // Validate authentication
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    // If parent_id is provided, validate parent exists
    if (data.parentId) {
      const parent = await this.partCategoryRepo.findById(data.parentId);
      if (!parent) {
        throw new ValidationError("Parent category not found", {
          field: "parentId",
          value: data.parentId,
        });
      }

      // Check if parent is structural and has parts
      if (parent.structural) {
        const partCount = await this.partCategoryRepo.countParts(
          data.parentId,
          false
        );
        if (partCount > 0) {
          throw new ValidationError(
            "Cannot create child category under structural category that has parts assigned",
            {
              field: "parentId",
              parentId: data.parentId,
              partCount,
            }
          );
        }
      }
    }

    // Create category (repository handles pathstring and level)
    const category = await this.partCategoryRepo.create(data);

    // Log creation
    await this.logAudit("PART_CATEGORY_CREATED", category.id, {
      name: category.name,
      parentId: category.parentId,
    });

    return category;
  }

  // ========================================
  // READ
  // ========================================

  /**
   * Get category by ID with related data
   */
  async getCategory(id: string) {
    const category = await this.partCategoryRepo.findById(id);
    if (!category) {
      throw new ValidationError("Category not found", {
        field: "id",
        value: id,
      });
    }

    // Get ancestors (breadcrumb trail)
    const ancestors = await this.partCategoryRepo.getAncestors(id);

    // Get immediate children
    const children = await this.partCategoryRepo.findByParentId(id);

    // Get part count (direct only)
    const partCount = await this.partCategoryRepo.countParts(id, false);

    return {
      category,
      ancestors,
      children,
      partCount,
    };
  }

  /**
   * List categories with pagination and search
   */
  async listCategories(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: Filter[],
    sortBy = "name",
    sortOrder: SortOrder = "asc"
  ) {
    const [categories, total] = await Promise.all([
      this.partCategoryRepo.findAll(
        limit,
        offset,
        searchTerm,
        filters,
        sortBy,
        sortOrder
      ),
      this.partCategoryRepo.count(filters),
    ]);

    return {
      data: categories,
      total,
    };
  }

  /**
   * Get category tree (hierarchical structure)
   * Returns root categories with nested children
   */
  async getCategoryTree(maxDepth?: number) {
    // Get root categories
    const rootCategories = await this.partCategoryRepo.findByParentId(null);

    // Helper function to recursively build tree
    const buildTree = async (
      categories: PartCategory[],
      currentDepth = 0
    ): Promise<any[]> => {
      if (maxDepth !== undefined && currentDepth >= maxDepth) {
        return categories.map((cat) => ({ ...cat, children: [] }));
      }

      const result = [];
      for (const category of categories) {
        const children = await this.partCategoryRepo.findByParentId(
          category.id
        );
        const childrenWithNested = await buildTree(children, currentDepth + 1);

        result.push({
          ...category,
          children: childrenWithNested,
        });
      }

      return result;
    };

    return buildTree(rootCategories);
  }

  // ========================================
  // UPDATE
  // ========================================

  /**
   * Update category
   */
  async updateCategory(
    id: string,
    data: Partial<Omit<PartCategory, "id" | "createdAt" | "pathstring" | "level">>
  ): Promise<PartCategory> {
    // Validate authentication
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    // Validate category exists
    const existingCategory = await this.partCategoryRepo.findById(id);
    if (!existingCategory) {
      throw new ValidationError("Category not found", {
        field: "id",
        value: id,
      });
    }

    // If setting structural=true, ensure no parts are assigned
    if (data.structural === true && !existingCategory.structural) {
      const partCount = await this.partCategoryRepo.countParts(id, false);
      if (partCount > 0) {
        throw new ValidationError(
          "Cannot make category structural because parts are already assigned to it",
          {
            field: "structural",
            categoryId: id,
            partCount,
          }
        );
      }
    }

    // Update category
    const updatedCategory = await this.partCategoryRepo.update(id, data);

    // Log update
    await this.logAudit("PART_CATEGORY_UPDATED", id, {
      changes: data,
    });

    return updatedCategory;
  }

  /**
   * Move category to new parent
   */
  async moveCategory(id: string, newParentId: string | null): Promise<void> {
    // Validate authentication
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    // Validate category exists
    const category = await this.partCategoryRepo.findById(id);
    if (!category) {
      throw new ValidationError("Category not found", {
        field: "id",
        value: id,
      });
    }

    // If new parent is provided, validate it exists
    if (newParentId) {
      const newParent = await this.partCategoryRepo.findById(newParentId);
      if (!newParent) {
        throw new ValidationError("New parent category not found", {
          field: "newParentId",
          value: newParentId,
        });
      }

      // Check for circular reference
      if (newParent.pathstring.startsWith(category.pathstring)) {
        throw new ValidationError(
          "Cannot move category to its own descendant",
          {
            categoryId: id,
            newParentId,
          }
        );
      }
    }

    // Move category (repository handles pathstring updates for descendants)
    await this.partCategoryRepo.moveToParent(id, newParentId);

    // Log move
    await this.logAudit("PART_CATEGORY_MOVED", id, {
      oldParentId: category.parentId,
      newParentId,
    });
  }

  // ========================================
  // DELETE
  // ========================================

  /**
   * Delete category (soft delete)
   * cascade: if true, deletes all descendant categories and parts
   */
  async deleteCategory(id: string, cascade = false): Promise<void> {
    // Validate authentication
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    // Validate category exists
    const category = await this.partCategoryRepo.findById(id);
    if (!category) {
      throw new ValidationError("Category not found", {
        field: "id",
        value: id,
      });
    }

    if (!cascade) {
      // Check if category has parts
      const partCount = await this.partCategoryRepo.countParts(id, false);
      if (partCount > 0) {
        throw new ValidationError(
          "Cannot delete category with parts. Use cascade=true to delete all parts.",
          {
            categoryId: id,
            partCount,
          }
        );
      }

      // Check if category has children
      const children = await this.partCategoryRepo.findByParentId(id);
      if (children.length > 0) {
        throw new ValidationError(
          "Cannot delete category with child categories. Use cascade=true to delete all children.",
          {
            categoryId: id,
            childCount: children.length,
          }
        );
      }
    } else {
      // Cascade delete: delete all descendants first
      const descendants = await this.partCategoryRepo.getDescendants(id);

      // Delete descendants in reverse order (leaf to root)
      const sortedDescendants = descendants.sort((a, b) => b.level - a.level);

      for (const descendant of sortedDescendants) {
        await this.partCategoryRepo.softDelete(descendant.id);
        await this.logAudit("PART_CATEGORY_DELETED", descendant.id, {
          cascade: true,
          parentCategoryId: id,
        });
      }

      // TODO: When PartRepository is implemented, also soft delete all parts
      // in this category and its descendants
    }

    // Delete the category itself
    await this.partCategoryRepo.softDelete(id);

    // Log deletion
    await this.logAudit("PART_CATEGORY_DELETED", id, {
      cascade,
    });
  }
}

// ========================================
// FACTORY FUNCTION
// ========================================

/**
 * Create PartCategoryService instance from H3Event
 */
export function createPartCategoryService(event: H3Event): PartCategoryService {
  const db = getDatabase(event);

  if (!db) {
    throw new InternalServerError("Database not available in context");
  }

  return new PartCategoryService(
    event,
    db,
    new PartCategoryRepository(db),
    new AuditLogRepository(db),
    undefined // partRepo will be added when PartRepository is implemented
  );
}
