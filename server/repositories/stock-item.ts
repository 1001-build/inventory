import { eq, and, isNull, or, sum as drizzleSum, count as drizzleCount } from "drizzle-orm";
import * as schema from "#server/database/schema";
import { BaseRepository } from "#server/repositories/base";
import { QueryHelpers } from "#server/repositories/helpers/query-builder";
import type {
  StockItem,
  NewStockItem,
} from "#server/database/schema/stock";
import type { Filter, SortOrder } from "#server/types/api";

export class StockItemRepository extends BaseRepository {
  constructor(db: D1Database) {
    super(db);
  }

  async findById(id: string): Promise<StockItem | null> {
    const result = await this.drizzle
      .select()
      .from(schema.stockItems)
      .where(
        QueryHelpers.notDeleted(
          schema.stockItems,
          eq(schema.stockItems.id, id)
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
    sortBy = "createdAt",
    sortOrder: SortOrder = "desc"
  ): Promise<StockItem[]> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.stockItems)];

    if (searchTerm) {
      conditions.push(
        QueryHelpers.search(
          [schema.stockItems.batch, schema.stockItems.serial],
          searchTerm
        )
      );
    }

    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.stockItems, filters);
      if (filterCondition) conditions.push(filterCondition);
    }

    const validConditions = conditions.filter((c) => c !== undefined);

    let query = this.drizzle
      .select()
      .from(schema.stockItems)
      .where(and(...validConditions))
      .limit(limit)
      .offset(offset);

    query = this.applySort(query, schema.stockItems, sortBy, sortOrder);
    return query;
  }

  async findByPart(
    partId: string,
    limit = 100,
    offset = 0
  ): Promise<StockItem[]> {
    return this.drizzle
      .select()
      .from(schema.stockItems)
      .where(
        QueryHelpers.notDeleted(
          schema.stockItems,
          eq(schema.stockItems.partId, partId)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(schema.stockItems.createdAt);
  }

  async findByLocation(
    locationId: string,
    limit = 100,
    offset = 0
  ): Promise<StockItem[]> {
    return this.drizzle
      .select()
      .from(schema.stockItems)
      .where(
        QueryHelpers.notDeleted(
          schema.stockItems,
          eq(schema.stockItems.locationId, locationId)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(schema.stockItems.partId);
  }

  async findByBatch(
    batch: string,
    limit = 100,
    offset = 0
  ): Promise<StockItem[]> {
    return this.drizzle
      .select()
      .from(schema.stockItems)
      .where(
        QueryHelpers.notDeleted(
          schema.stockItems,
          eq(schema.stockItems.batch, batch)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(schema.stockItems.createdAt);
  }

  async findBySerial(serial: string): Promise<StockItem | null> {
    const result = await this.drizzle
      .select()
      .from(schema.stockItems)
      .where(
        QueryHelpers.notDeleted(
          schema.stockItems,
          eq(schema.stockItems.serial, serial)
        )
      )
      .limit(1);
    return result[0] || null;
  }

  async create(data: Omit<NewStockItem, "id" | "createdAt" | "updatedAt" | "deletedAt">): Promise<StockItem> {
    const [stockItem] = await this.drizzle
      .insert(schema.stockItems)
      .values(data)
      .returning();
    return stockItem;
  }

  async update(
    id: string,
    data: Partial<Omit<StockItem, "id" | "createdAt" | "updatedAt" | "deletedAt">>
  ): Promise<StockItem> {
    const [stockItem] = await this.drizzle
      .update(schema.stockItems)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.stockItems.id, id))
      .returning();
    return stockItem;
  }

  async softDelete(id: string): Promise<void> {
    await this.drizzle
      .update(schema.stockItems)
      .set({ deletedAt: new Date() })
      .where(eq(schema.stockItems.id, id));
  }

  async move(id: string, newLocationId: string): Promise<StockItem> {
    return this.update(id, { locationId: newLocationId });
  }

  async adjustQuantity(id: string, adjustment: number): Promise<StockItem> {
    const item = await this.findById(id);
    if (!item) throw new Error("Stock item not found");

    const newQuantity = item.quantity + adjustment;
    if (newQuantity < 0) {
      throw new Error("Cannot adjust quantity below zero");
    }

    return this.update(id, { quantity: newQuantity });
  }

  async getTotalQuantity(partId: string, status?: string): Promise<number> {
    const conditions: any[] = [
      QueryHelpers.notDeleted(schema.stockItems),
      eq(schema.stockItems.partId, partId),
    ];

    if (status) {
      conditions.push(eq(schema.stockItems.status, status));
    }

    const [result] = await this.drizzle
      .select({ total: drizzleSum(schema.stockItems.quantity) })
      .from(schema.stockItems)
      .where(and(...conditions));

    return result.total || 0;
  }

  async count(filters?: Filter[]): Promise<number> {
    const conditions: any[] = [QueryHelpers.notDeleted(schema.stockItems)];

    if (filters && filters.length > 0) {
      const filterCondition = this.buildFilters(schema.stockItems, filters);
      if (filterCondition) conditions.push(filterCondition);
    }

    const [result] = await this.drizzle
      .select({ count: drizzleCount() })
      .from(schema.stockItems)
      .where(and(...conditions));

    return result.count;
  }
}
