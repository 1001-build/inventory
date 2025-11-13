import type { StockItemRepository } from "#server/repositories/stock-item";
import type { PartRepository } from "#server/repositories/part";
import type { StockLocationRepository } from "#server/repositories/stock-location";
import type { AuditLogRepository } from "#server/repositories/identity";
import type { StockItem } from "#server/database/schema/stock";

export class StockItemService {
  constructor(
    private stockItemRepo: StockItemRepository,
    private partRepo: PartRepository,
    private stockLocationRepo: StockLocationRepository,
    private auditLogRepo: AuditLogRepository,
    private userId?: string
  ) {}

  private requireAuth(): string {
    if (!this.userId) {
      throw new Error("Authentication required");
    }
    return this.userId;
  }

  async createStockItem(data: {
    partId: string;
    locationId: string;
    quantity: number;
    batch?: string;
    serial?: string;
    status?: "OK" | "DAMAGED" | "DESTROYED" | "REJECTED" | "LOST" | "QUARANTINED";
    expiryDate?: Date;
    purchasePrice?: number;
    notes?: string;
  }): Promise<StockItem> {
    const userId = this.requireAuth();

    // Validate part exists
    const part = await this.partRepo.findById(data.partId);
    if (!part) {
      throw new Error("Part not found");
    }

    // Validate location exists
    const location = await this.stockLocationRepo.findById(data.locationId);
    if (!location) {
      throw new Error("Stock location not found");
    }

    // Validate quantity
    if (data.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    // Validate serial number uniqueness
    if (data.serial) {
      const existing = await this.stockItemRepo.findBySerial(data.serial);
      if (existing) {
        throw new Error("Serial number already exists");
      }

      // Serialized items must have quantity of 1
      if (data.quantity !== 1) {
        throw new Error("Serialized items must have quantity of 1");
      }
    }

    const stockItem = await this.stockItemRepo.create(data);

    await this.auditLogRepo.log(
      userId,
      "STOCK_ITEM_CREATED",
      "StockItem",
      stockItem.id,
      { stockItem }
    );

    return stockItem;
  }

  async updateStockItem(
    id: string,
    data: {
      status?: "OK" | "DAMAGED" | "DESTROYED" | "REJECTED" | "LOST" | "QUARANTINED";
      expiryDate?: Date;
      purchasePrice?: number;
      notes?: string;
      batch?: string;
    }
  ): Promise<StockItem> {
    const userId = this.requireAuth();

    const stockItem = await this.stockItemRepo.findById(id);
    if (!stockItem) {
      throw new Error("Stock item not found");
    }

    const updated = await this.stockItemRepo.update(id, data);

    await this.auditLogRepo.log(
      userId,
      "STOCK_ITEM_UPDATED",
      "StockItem",
      id,
      { before: stockItem, after: updated }
    );

    return updated;
  }

  async deleteStockItem(id: string): Promise<void> {
    const userId = this.requireAuth();

    const stockItem = await this.stockItemRepo.findById(id);
    if (!stockItem) {
      throw new Error("Stock item not found");
    }

    await this.stockItemRepo.softDelete(id);

    await this.auditLogRepo.log(
      userId,
      "STOCK_ITEM_DELETED",
      "StockItem",
      id,
      { stockItem }
    );
  }

  async moveStockItem(id: string, newLocationId: string): Promise<StockItem> {
    const userId = this.requireAuth();

    const stockItem = await this.stockItemRepo.findById(id);
    if (!stockItem) {
      throw new Error("Stock item not found");
    }

    // Validate new location exists
    const location = await this.stockLocationRepo.findById(newLocationId);
    if (!location) {
      throw new Error("Stock location not found");
    }

    const moved = await this.stockItemRepo.move(id, newLocationId);

    await this.auditLogRepo.log(
      userId,
      "STOCK_ITEM_MOVED",
      "StockItem",
      id,
      {
        from: stockItem.locationId,
        to: newLocationId,
      }
    );

    return moved;
  }

  async adjustQuantity(id: string, adjustment: number): Promise<StockItem> {
    const userId = this.requireAuth();

    const stockItem = await this.stockItemRepo.findById(id);
    if (!stockItem) {
      throw new Error("Stock item not found");
    }

    // Cannot adjust quantity of serialized items
    if (stockItem.serial) {
      throw new Error("Cannot adjust quantity of serialized items");
    }

    const adjusted = await this.stockItemRepo.adjustQuantity(id, adjustment);

    await this.auditLogRepo.log(
      userId,
      "STOCK_ITEM_ADJUSTED",
      "StockItem",
      id,
      {
        oldQuantity: stockItem.quantity,
        adjustment,
        newQuantity: adjusted.quantity,
      }
    );

    return adjusted;
  }

  async getStockItem(id: string): Promise<StockItem> {
    const stockItem = await this.stockItemRepo.findById(id);
    if (!stockItem) {
      throw new Error("Stock item not found");
    }
    return stockItem;
  }

  async listStockItems(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: any[],
    sortBy?: string,
    sortOrder?: "asc" | "desc"
  ): Promise<{ data: StockItem[]; total: number }> {
    const data = await this.stockItemRepo.findAll(
      limit,
      offset,
      searchTerm,
      filters,
      sortBy,
      sortOrder
    );
    const total = await this.stockItemRepo.count(filters);
    return { data, total };
  }

  async getStockItemsByPart(
    partId: string,
    limit = 100,
    offset = 0
  ): Promise<StockItem[]> {
    return this.stockItemRepo.findByPart(partId, limit, offset);
  }

  async getStockItemsByLocation(
    locationId: string,
    limit = 100,
    offset = 0
  ): Promise<StockItem[]> {
    return this.stockItemRepo.findByLocation(locationId, limit, offset);
  }

  async getPartStockLevel(
    partId: string,
    status: "OK" | "DAMAGED" | "DESTROYED" | "REJECTED" | "LOST" | "QUARANTINED" = "OK"
  ): Promise<number> {
    return this.stockItemRepo.getTotalQuantity(partId, status);
  }
}

/**
 * Factory function to create StockItemService from H3Event
 */
export function createStockItemService(event: any): StockItemService {
  const { stockItemRepo, partRepo, stockLocationRepo, auditLogRepo } =
    event.context.repositories;
  const userId = event.context.userId;

  return new StockItemService(
    stockItemRepo,
    partRepo,
    stockLocationRepo,
    auditLogRepo,
    userId
  );
}
