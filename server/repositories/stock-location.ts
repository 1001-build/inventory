import { eq, and, isNull, like, or, inArray, count as drizzleCount } from "drizzle-orm";
import * as schema from "#server/database/schema";
import { BaseRepository } from "#server/repositories/base";
import { QueryHelpers } from "#server/repositories/helpers/query-builder";
import type {
  StockLocation,
  NewStockLocation,
} from "#server/database/schema/stock";
import type { Filter, SortOrder } from "#server/types/api";

export class StockLocationRepository extends BaseRepository {
  constructor(db: D1Database) {
    super(db);
  }

  async findById(id: string): Promise<StockLocation | null> {
    const result = await this.drizzle
      .select()
      .from(schema.stockLocations)
      .where(
        QueryHelpers.notDeleted(
          schema.stockLocations,
          eq(schema.stockLocations.id, id)
        )
      )
      .limit(1);
    return result[0] || null;
  }

  async findAll(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: Filter[],
    sortBy = "name",
    sortOrder: SortOrder = "asc"
  ): Promise<StockLocation[]> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.stockLocations)];

    if (searchTerm) {
      conditions.push(
        QueryHelpers.search(
          [schema.stockLocations.name, schema.stockLocations.description],
          searchTerm
        )
      );
    }

    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.stockLocations, filters);
      if (filterCondition) conditions.push(filterCondition);
    }

    const validConditions = conditions.filter((c) => c !== undefined);

    let query = this.drizzle
      .select()
      .from(schema.stockLocations)
      .where(and(...validConditions))
      .limit(limit)
      .offset(offset);

    query = this.applySort(query, schema.stockLocations, sortBy, sortOrder);
    return query;
  }

  async findByParentId(parentId: string | null): Promise<StockLocation[]> {
    const condition =
      parentId === null
        ? isNull(schema.stockLocations.parentId)
        : eq(schema.stockLocations.parentId, parentId);

    return this.drizzle
      .select()
      .from(schema.stockLocations)
      .where(QueryHelpers.notDeleted(schema.stockLocations, condition))
      .orderBy(schema.stockLocations.name);
  }

  async create(data: Omit<NewStockLocation, "pathstring" | "level">): Promise<StockLocation> {
    let pathstring: string;
    let level: number;

    if (data.parentId) {
      const parent = await this.findById(data.parentId);
      if (!parent) throw new Error("Parent location not found");
      level = parent.level + 1;
      pathstring = parent.pathstring;
    } else {
      level = 0;
      pathstring = "";
    }

    const [location] = await this.drizzle
      .insert(schema.stockLocations)
      .values({ ...data, pathstring, level })
      .returning();

    const finalPathstring = data.parentId
      ? `${pathstring}/${location.id}`
      : location.id;

    await this.drizzle
      .update(schema.stockLocations)
      .set({ pathstring: finalPathstring })
      .where(eq(schema.stockLocations.id, location.id));

    return { ...location, pathstring: finalPathstring };
  }

  async update(
    id: string,
    data: Partial<Omit<StockLocation, "id" | "createdAt" | "pathstring" | "level">>
  ): Promise<StockLocation> {
    const [location] = await this.drizzle
      .update(schema.stockLocations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.stockLocations.id, id))
      .returning();
    return location;
  }

  async softDelete(id: string): Promise<void> {
    await this.drizzle
      .update(schema.stockLocations)
      .set({ deletedAt: new Date() })
      .where(eq(schema.stockLocations.id, id));
  }

  async getAncestors(id: string): Promise<StockLocation[]> {
    const location = await this.findById(id);
    if (!location || !location.parentId) return [];

    const ancestorIds = location.pathstring.split("/").filter(Boolean);
    const parentIds = ancestorIds.slice(0, -1);
    if (parentIds.length === 0) return [];

    const ancestors = await this.drizzle
      .select()
      .from(schema.stockLocations)
      .where(
        and(
          inArray(schema.stockLocations.id, parentIds),
          isNull(schema.stockLocations.deletedAt)
        )
      );

    return ancestors.sort((a, b) => a.level - b.level);
  }

  async getDescendants(id: string, maxDepth?: number): Promise<StockLocation[]> {
    const location = await this.findById(id);
    if (!location) return [];

    const descendants = await this.drizzle
      .select()
      .from(schema.stockLocations)
      .where(
        and(
          like(schema.stockLocations.pathstring, `${location.pathstring}/%`),
          isNull(schema.stockLocations.deletedAt)
        )
      );

    if (maxDepth !== undefined) {
      const maxLevel = location.level + maxDepth;
      return descendants.filter((d) => d.level <= maxLevel);
    }

    return descendants;
  }

  async count(filters?: Filter[]): Promise<number> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.stockLocations)];

    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.stockLocations, filters);
      if (filterCondition) conditions.push(filterCondition);
    }

    const [result] = await this.drizzle
      .select({ count: drizzleCount() })
      .from(schema.stockLocations)
      .where(and(...conditions));

    return result.count;
  }
}
