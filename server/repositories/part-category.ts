import { eq, and, sql, isNull, like, or, inArray, count as drizzleCount } from "drizzle-orm";
import * as schema from "#server/database/schema";
import { BaseRepository } from "#server/repositories/base";
import { QueryHelpers } from "#server/repositories/helpers/query-builder";
import type {
  PartCategory,
  NewPartCategory,
} from "#server/database/schema/parts";
import type { Filter, SortOrder } from "#server/types/api";

// ========================================
// PART CATEGORY REPOSITORY
// ========================================

/**
 * Part Category Repository
 * Handles hierarchical category structure with pathstring approach
 */
export class PartCategoryRepository extends BaseRepository {
  constructor(db: D1Database) {
    super(db);
  }

  /**
   * Find category by ID
   */
  async findById(id: string): Promise<PartCategory | null> {
    const result = await this.drizzle
      .select()
      .from(schema.partCategories)
      .where(
        QueryHelpers.notDeleted(
          schema.partCategories,
          eq(schema.partCategories.id, id)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  /**
   * Find all categories with pagination and search
   */
  async findAll(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: Filter[],
    sortBy = "name",
    sortOrder: SortOrder = "asc"
  ): Promise<PartCategory[]> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.partCategories)];

    // Add search across name and description
    if (searchTerm) {
      conditions.push(
        QueryHelpers.search(
          [schema.partCategories.name, schema.partCategories.description],
          searchTerm
        )
      );
    }

    // Add additional filters
    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.partCategories, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }

    const validConditions = conditions.filter((c) => c !== undefined);

    let query = this.drizzle
      .select()
      .from(schema.partCategories)
      .where(and(...validConditions))
      .limit(limit)
      .offset(offset);

    // Apply sorting
    query = this.applySort(query, schema.partCategories, sortBy, sortOrder);

    return query;
  }

  /**
   * Find categories by parent ID
   * Pass null to get root categories
   */
  async findByParentId(parentId: string | null): Promise<PartCategory[]> {
    const condition =
      parentId === null
        ? isNull(schema.partCategories.parentId)
        : eq(schema.partCategories.parentId, parentId);

    const result = await this.drizzle
      .select()
      .from(schema.partCategories)
      .where(QueryHelpers.notDeleted(schema.partCategories, condition))
      .orderBy(schema.partCategories.name);

    return result;
  }

  /**
   * Create a new category
   * Automatically calculates pathstring and level
   */
  async create(data: Omit<NewPartCategory, "pathstring" | "level">): Promise<PartCategory> {
    let pathstring: string;
    let level: number;

    if (data.parentId) {
      // Get parent category
      const parent = await this.findById(data.parentId);
      if (!parent) {
        throw new Error("Parent category not found");
      }

      // Calculate pathstring and level based on parent
      level = parent.level + 1;

      // We'll set a temporary pathstring, then update it after creation
      // This is needed because we don't have the ID yet
      pathstring = parent.pathstring; // Temporary
    } else {
      // Root category
      level = 0;
      pathstring = ""; // Will be updated to ID after creation
    }

    // Create category with temporary pathstring
    const [category] = await this.drizzle
      .insert(schema.partCategories)
      .values({
        ...data,
        pathstring,
        level,
      })
      .returning();

    // Update pathstring to include the new category's ID
    const finalPathstring = data.parentId
      ? `${pathstring}/${category.id}`
      : category.id;

    await this.drizzle
      .update(schema.partCategories)
      .set({ pathstring: finalPathstring })
      .where(eq(schema.partCategories.id, category.id));

    return {
      ...category,
      pathstring: finalPathstring,
    };
  }

  /**
   * Update category fields
   */
  async update(
    id: string,
    data: Partial<Omit<PartCategory, "id" | "createdAt" | "pathstring" | "level">>
  ): Promise<PartCategory> {
    const [category] = await this.drizzle
      .update(schema.partCategories)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.partCategories.id, id))
      .returning();

    return category;
  }

  /**
   * Soft delete a category
   */
  async softDelete(id: string): Promise<void> {
    await this.drizzle
      .update(schema.partCategories)
      .set({ deletedAt: new Date() })
      .where(eq(schema.partCategories.id, id));
  }

  /**
   * Get ancestors (parent chain) for a category
   * Returns array from root to immediate parent
   */
  async getAncestors(id: string): Promise<PartCategory[]> {
    const category = await this.findById(id);
    if (!category || !category.parentId) {
      return [];
    }

    // Parse pathstring to get all ancestor IDs
    const ancestorIds = category.pathstring.split("/").filter(Boolean);
    if (ancestorIds.length === 0) {
      return [];
    }

    // Remove the category's own ID
    const parentIds = ancestorIds.slice(0, -1);
    if (parentIds.length === 0) {
      return [];
    }

    // Fetch all ancestors
    const ancestors = await this.drizzle
      .select()
      .from(schema.partCategories)
      .where(
        and(
          inArray(schema.partCategories.id, parentIds),
          isNull(schema.partCategories.deletedAt)
        )
      );

    // Sort by level to maintain order (root to immediate parent)
    return ancestors.sort((a, b) => a.level - b.level);
  }

  /**
   * Get descendants (all children recursively) for a category
   */
  async getDescendants(
    id: string,
    maxDepth?: number
  ): Promise<PartCategory[]> {
    const category = await this.findById(id);
    if (!category) {
      return [];
    }

    // Find all categories whose pathstring starts with this category's pathstring
    const descendants = await this.drizzle
      .select()
      .from(schema.partCategories)
      .where(
        and(
          like(schema.partCategories.pathstring, `${category.pathstring}/%`),
          isNull(schema.partCategories.deletedAt)
        )
      );

    // Filter by depth if specified
    if (maxDepth !== undefined) {
      const maxLevel = category.level + maxDepth;
      return descendants.filter((d) => d.level <= maxLevel);
    }

    return descendants;
  }

  /**
   * Move category to a new parent
   * Updates pathstring and level for the category and all descendants
   */
  async moveToParent(id: string, newParentId: string | null): Promise<void> {
    const category = await this.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    let newPathstring: string;
    let newLevel: number;

    if (newParentId) {
      const newParent = await this.findById(newParentId);
      if (!newParent) {
        throw new Error("New parent category not found");
      }

      // Check for circular reference
      if (newParent.pathstring.startsWith(category.pathstring)) {
        throw new Error("Cannot move category to its own descendant");
      }

      newLevel = newParent.level + 1;
      newPathstring = `${newParent.pathstring}/${category.id}`;
    } else {
      // Moving to root
      newLevel = 0;
      newPathstring = category.id;
    }

    const levelDiff = newLevel - category.level;
    const oldPathstring = category.pathstring;

    // Update the category itself
    await this.drizzle
      .update(schema.partCategories)
      .set({
        parentId: newParentId,
        pathstring: newPathstring,
        level: newLevel,
        updatedAt: new Date(),
      })
      .where(eq(schema.partCategories.id, id));

    // Update all descendants
    const descendants = await this.getDescendants(id);
    for (const descendant of descendants) {
      const updatedPathstring = descendant.pathstring.replace(
        oldPathstring,
        newPathstring
      );
      const updatedLevel = descendant.level + levelDiff;

      await this.drizzle
        .update(schema.partCategories)
        .set({
          pathstring: updatedPathstring,
          level: updatedLevel,
          updatedAt: new Date(),
        })
        .where(eq(schema.partCategories.id, descendant.id));
    }
  }

  /**
   * Count parts in a category
   * If cascade is true, includes parts in subcategories
   */
  async countParts(id: string, cascade = false): Promise<number> {
    if (cascade) {
      const category = await this.findById(id);
      if (!category) {
        return 0;
      }

      // Count parts in this category and all descendants
      const [result] = await this.drizzle
        .select({ count: drizzleCount() })
        .from(schema.parts)
        .where(
          and(
            or(
              eq(schema.parts.categoryId, id),
              like(schema.parts.categoryId, `${category.pathstring}/%`)
            ),
            isNull(schema.parts.deletedAt)
          )
        );

      return result.count;
    } else {
      // Count parts directly in this category
      const [result] = await this.drizzle
        .select({ count: drizzleCount() })
        .from(schema.parts)
        .where(
          and(
            eq(schema.parts.categoryId, id),
            isNull(schema.parts.deletedAt)
          )
        );

      return result.count;
    }
  }

  /**
   * Count total categories
   */
  async count(filters?: Filter[]): Promise<number> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.partCategories)];

    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.partCategories, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }

    const [result] = await this.drizzle
      .select({ count: drizzleCount() })
      .from(schema.partCategories)
      .where(and(...conditions));

    return result.count;
  }
}
