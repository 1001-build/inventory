import type { StockLocationRepository } from "#server/repositories/stock-location";
import type { StockItemRepository } from "#server/repositories/stock-item";
import type { AuditLogRepository } from "#server/repositories/identity";
import type { StockLocation } from "#server/database/schema/stock";

export class StockLocationService {
  constructor(
    private stockLocationRepo: StockLocationRepository,
    private stockItemRepo: StockItemRepository,
    private auditLogRepo: AuditLogRepository,
    private userId?: string
  ) {}

  private requireAuth(): string {
    if (!this.userId) {
      throw new Error("Authentication required");
    }
    return this.userId;
  }

  async createLocation(
    data: {
      name: string;
      description?: string;
      parentId?: string;
      structural?: boolean;
      external?: boolean;
    }
  ): Promise<StockLocation> {
    const userId = this.requireAuth();

    // Validate parent exists if provided
    if (data.parentId) {
      const parent = await this.stockLocationRepo.findById(data.parentId);
      if (!parent) {
        throw new Error("Parent location not found");
      }
    }

    const location = await this.stockLocationRepo.create(data);

    await this.auditLogRepo.log(
      userId,
      "STOCK_LOCATION_CREATED",
      "StockLocation",
      location.id,
      { location }
    );

    return location;
  }

  async updateLocation(
    id: string,
    data: {
      name?: string;
      description?: string;
      structural?: boolean;
      external?: boolean;
    }
  ): Promise<StockLocation> {
    const userId = this.requireAuth();

    const location = await this.stockLocationRepo.findById(id);
    if (!location) {
      throw new Error("Stock location not found");
    }

    const updated = await this.stockLocationRepo.update(id, data);

    await this.auditLogRepo.log(
      userId,
      "STOCK_LOCATION_UPDATED",
      "StockLocation",
      id,
      { before: location, after: updated }
    );

    return updated;
  }

  async deleteLocation(id: string, cascade = false): Promise<void> {
    const userId = this.requireAuth();

    const location = await this.stockLocationRepo.findById(id);
    if (!location) {
      throw new Error("Stock location not found");
    }

    // Check for stock items in this location
    const stockItems = await this.stockItemRepo.findByLocation(id, 1, 0);
    if (stockItems.length > 0) {
      throw new Error("Cannot delete location with stock items. Move or remove stock items first.");
    }

    if (cascade) {
      // Get all descendant locations
      const descendants = await this.stockLocationRepo.getDescendants(id);

      // Delete descendants first (bottom-up)
      for (const descendant of descendants.reverse()) {
        await this.stockLocationRepo.softDelete(descendant.id);
      }
    } else {
      // Check for child locations
      const children = await this.stockLocationRepo.findByParentId(id);
      if (children.length > 0) {
        throw new Error("Cannot delete location with child locations. Use cascade delete or remove children first.");
      }
    }

    await this.stockLocationRepo.softDelete(id);

    await this.auditLogRepo.log(
      userId,
      "STOCK_LOCATION_DELETED",
      "StockLocation",
      id,
      { location, cascade }
    );
  }

  async getLocation(id: string): Promise<StockLocation> {
    const location = await this.stockLocationRepo.findById(id);
    if (!location) {
      throw new Error("Stock location not found");
    }
    return location;
  }

  async listLocations(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: any[],
    sortBy?: string,
    sortOrder?: "asc" | "desc"
  ): Promise<{ data: StockLocation[]; total: number }> {
    const data = await this.stockLocationRepo.findAll(
      limit,
      offset,
      searchTerm,
      filters,
      sortBy,
      sortOrder
    );
    const total = await this.stockLocationRepo.count(filters);
    return { data, total };
  }

  async getLocationTree(parentId?: string): Promise<StockLocation[]> {
    return this.stockLocationRepo.findByParentId(parentId || null);
  }

  async getAncestors(id: string): Promise<StockLocation[]> {
    return this.stockLocationRepo.getAncestors(id);
  }

  async getDescendants(
    id: string,
    maxDepth?: number
  ): Promise<StockLocation[]> {
    return this.stockLocationRepo.getDescendants(id, maxDepth);
  }
}

/**
 * Factory function to create StockLocationService from H3Event
 */
export function createStockLocationService(event: any): StockLocationService {
  const { stockLocationRepo, stockItemRepo, auditLogRepo } =
    event.context.repositories;
  const userId = event.context.userId;

  return new StockLocationService(
    stockLocationRepo,
    stockItemRepo,
    auditLogRepo,
    userId
  );
}
