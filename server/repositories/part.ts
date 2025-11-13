import { eq, and, sql, isNull, like, or, count as drizzleCount } from "drizzle-orm";
import * as schema from "#server/database/schema";
import { BaseRepository } from "#server/repositories/base";
import { QueryHelpers } from "#server/repositories/helpers/query-builder";
import type {
  Part,
  NewPart,
} from "#server/database/schema/parts";
import type { Filter, SortOrder } from "#server/types/api";

// ========================================
// PART REPOSITORY
// ========================================

/**
 * Part Repository
 * Handles part CRUD operations with complex filtering
 */
export class PartRepository extends BaseRepository {
  constructor(db: D1Database) {
    super(db);
  }

  /**
   * Find part by ID with relations
   */
  async findById(id: string): Promise<Part | null> {
    const result = await this.drizzle
      .select()
      .from(schema.parts)
      .where(
        QueryHelpers.notDeleted(
          schema.parts,
          eq(schema.parts.id, id)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  /**
   * Find all parts with pagination and filters
   */
  async findAll(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: Filter[],
    sortBy = "name",
    sortOrder: SortOrder = "asc"
  ): Promise<Part[]> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.parts)];

    // Add search across multiple fields
    if (searchTerm) {
      conditions.push(
        or(
          like(schema.parts.name, `%${searchTerm}%`),
          like(schema.parts.description, `%${searchTerm}%`),
          like(schema.parts.IPN, `%${searchTerm}%`),
          like(schema.parts.keywords, `%${searchTerm}%`)
        )
      );
    }

    // Add additional filters
    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.parts, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }

    const validConditions = conditions.filter((c) => c !== undefined);

    let query = this.drizzle
      .select()
      .from(schema.parts)
      .where(and(...validConditions))
      .limit(limit)
      .offset(offset);

    // Apply sorting
    query = this.applySort(query, schema.parts, sortBy, sortOrder);

    return query;
  }

  /**
   * Find parts by category
   * @param categoryId Category ID
   * @param cascade If true, includes parts from subcategories
   */
  async findByCategory(
    categoryId: string,
    cascade = false,
    limit = 100,
    offset = 0
  ): Promise<Part[]> {
    if (cascade) {
      // Get category to access pathstring
      const [category] = await this.drizzle
        .select()
        .from(schema.partCategories)
        .where(eq(schema.partCategories.id, categoryId))
        .limit(1);

      if (!category) {
        return [];
      }

      // Find parts in this category and all subcategories
      return this.drizzle
        .select()
        .from(schema.parts)
        .innerJoin(
          schema.partCategories,
          eq(schema.parts.categoryId, schema.partCategories.id)
        )
        .where(
          and(
            or(
              eq(schema.parts.categoryId, categoryId),
              like(schema.partCategories.pathstring, `${category.pathstring}/%`)
            ),
            isNull(schema.parts.deletedAt),
            isNull(schema.partCategories.deletedAt)
          )
        )
        .limit(limit)
        .offset(offset);
    } else {
      // Find parts directly in this category
      return this.drizzle
        .select()
        .from(schema.parts)
        .where(
          QueryHelpers.notDeleted(
            schema.parts,
            eq(schema.parts.categoryId, categoryId)
          )
        )
        .limit(limit)
        .offset(offset);
    }
  }

  /**
   * Find part by IPN (Internal Part Number)
   */
  async findByIPN(ipn: string): Promise<Part | null> {
    const result = await this.drizzle
      .select()
      .from(schema.parts)
      .where(
        QueryHelpers.notDeleted(
          schema.parts,
          eq(schema.parts.IPN, ipn)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  /**
   * Create a new part
   */
  async create(data: NewPart): Promise<Part> {
    // Generate full_name from name and category path (if needed)
    const fullName = data.fullName || data.name;

    const [part] = await this.drizzle
      .insert(schema.parts)
      .values({
        ...data,
        fullName,
      })
      .returning();

    return part;
  }

  /**
   * Update part fields
   */
  async update(
    id: string,
    data: Partial<Omit<Part, "id" | "createdAt">>
  ): Promise<Part> {
    const [part] = await this.drizzle
      .update(schema.parts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.parts.id, id))
      .returning();

    return part;
  }

  /**
   * Soft delete a part
   */
  async softDelete(id: string): Promise<void> {
    await this.drizzle
      .update(schema.parts)
      .set({ deletedAt: new Date() })
      .where(eq(schema.parts.id, id));
  }

  /**
   * Count total parts
   */
  async count(filters?: Filter[]): Promise<number> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.parts)];

    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.parts, filters);
      if (filterCondition) {
        conditions.push(filterCondition);
      }
    }

    const [result] = await this.drizzle
      .select({ count: drizzleCount() })
      .from(schema.parts)
      .where(and(...conditions));

    return result.count;
  }

  /**
   * Count parts in a category
   * @param categoryId Category ID
   * @param cascade If true, includes parts from subcategories
   */
  async countByCategory(categoryId: string, cascade = false): Promise<number> {
    if (cascade) {
      // Get category pathstring
      const [category] = await this.drizzle
        .select()
        .from(schema.partCategories)
        .where(eq(schema.partCategories.id, categoryId))
        .limit(1);

      if (!category) {
        return 0;
      }

      // Count parts in this category and all subcategories
      const [result] = await this.drizzle
        .select({ count: drizzleCount() })
        .from(schema.parts)
        .innerJoin(
          schema.partCategories,
          eq(schema.parts.categoryId, schema.partCategories.id)
        )
        .where(
          and(
            or(
              eq(schema.parts.categoryId, categoryId),
              like(schema.partCategories.pathstring, `${category.pathstring}/%`)
            ),
            isNull(schema.parts.deletedAt),
            isNull(schema.partCategories.deletedAt)
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
            eq(schema.parts.categoryId, categoryId),
            isNull(schema.parts.deletedAt)
          )
        );

      return result.count;
    }
  }

  /**
   * Search parts by text across multiple fields
   */
  async search(
    searchTerm: string,
    limit = 50,
    offset = 0
  ): Promise<Part[]> {
    return this.drizzle
      .select()
      .from(schema.parts)
      .where(
        and(
          or(
            like(schema.parts.name, `%${searchTerm}%`),
            like(schema.parts.description, `%${searchTerm}%`),
            like(schema.parts.IPN, `%${searchTerm}%`),
            like(schema.parts.keywords, `%${searchTerm}%`)
          ),
          isNull(schema.parts.deletedAt)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(schema.parts.name);
  }

  /**
   * Batch create parts
   * Useful for imports
   */
  async batchCreate(partsData: NewPart[]): Promise<Part[]> {
    if (partsData.length === 0) {
      return [];
    }

    const parts = await this.drizzle
      .insert(schema.parts)
      .values(partsData)
      .returning();

    return parts;
  }
}
