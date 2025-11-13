import { describe, it, expect, beforeEach, vi } from "vitest";
import { StockItemService } from "#server/services/stock-item";
import { createMockRepository } from "../../helpers/mocks";

describe("StockItemService", () => {
  let service: StockItemService;
  let mockStockItemRepo: any;
  let mockPartRepo: any;
  let mockStockLocationRepo: any;
  let mockAuditLogRepo: any;
  let userId: string;

  beforeEach(() => {
    mockStockItemRepo = {
      ...createMockRepository(),
      findBySerial: vi.fn(),
      move: vi.fn(),
      adjustQuantity: vi.fn(),
      getTotalQuantity: vi.fn(),
      findByPart: vi.fn(),
      findByLocation: vi.fn(),
      findByBatch: vi.fn(),
    };
    mockPartRepo = createMockRepository();
    mockStockLocationRepo = createMockRepository();
    mockAuditLogRepo = createMockRepository();
    mockAuditLogRepo.log = vi.fn();
    userId = "test-user-id";

    service = new StockItemService(
      mockStockItemRepo,
      mockPartRepo,
      mockStockLocationRepo,
      mockAuditLogRepo,
      userId
    );
  });

  describe("createStockItem", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockItemService(
        mockStockItemRepo,
        mockPartRepo,
        mockStockLocationRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.createStockItem({
          partId: "part-1",
          locationId: "loc-1",
          quantity: 10,
        })
      ).rejects.toThrow("Authentication required");
    });

    it("should validate part exists", async () => {
      mockPartRepo.findById.mockResolvedValue(null);

      await expect(
        service.createStockItem({
          partId: "non-existent",
          locationId: "loc-1",
          quantity: 10,
        })
      ).rejects.toThrow("Part not found");
    });

    it("should validate location exists", async () => {
      mockPartRepo.findById.mockResolvedValue({ id: "part-1" });
      mockStockLocationRepo.findById.mockResolvedValue(null);

      await expect(
        service.createStockItem({
          partId: "part-1",
          locationId: "non-existent",
          quantity: 10,
        })
      ).rejects.toThrow("Stock location not found");
    });

    it("should validate quantity is positive", async () => {
      mockPartRepo.findById.mockResolvedValue({ id: "part-1" });
      mockStockLocationRepo.findById.mockResolvedValue({ id: "loc-1" });

      await expect(
        service.createStockItem({
          partId: "part-1",
          locationId: "loc-1",
          quantity: 0,
        })
      ).rejects.toThrow("Quantity must be greater than 0");
    });

    it("should enforce serial number uniqueness", async () => {
      mockPartRepo.findById.mockResolvedValue({ id: "part-1" });
      mockStockLocationRepo.findById.mockResolvedValue({ id: "loc-1" });
      mockStockItemRepo.findBySerial.mockResolvedValue({ id: "existing" });

      await expect(
        service.createStockItem({
          partId: "part-1",
          locationId: "loc-1",
          quantity: 1,
          serial: "SN-12345",
        })
      ).rejects.toThrow("Serial number already exists");
    });

    it("should enforce quantity = 1 for serialized items", async () => {
      mockPartRepo.findById.mockResolvedValue({ id: "part-1" });
      mockStockLocationRepo.findById.mockResolvedValue({ id: "loc-1" });
      mockStockItemRepo.findBySerial.mockResolvedValue(null);

      await expect(
        service.createStockItem({
          partId: "part-1",
          locationId: "loc-1",
          quantity: 5,
          serial: "SN-12345",
        })
      ).rejects.toThrow("Serialized items must have quantity of 1");
    });

    it("should create stock item", async () => {
      const mockStockItem = {
        id: "stock-1",
        partId: "part-1",
        locationId: "loc-1",
        quantity: 10,
      };

      mockPartRepo.findById.mockResolvedValue({ id: "part-1" });
      mockStockLocationRepo.findById.mockResolvedValue({ id: "loc-1" });
      mockStockItemRepo.create.mockResolvedValue(mockStockItem);

      const result = await service.createStockItem({
        partId: "part-1",
        locationId: "loc-1",
        quantity: 10,
      });

      expect(result).toEqual(mockStockItem);
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_ITEM_CREATED",
        "StockItem",
        "stock-1",
        expect.any(Object)
      );
    });
  });

  describe("updateStockItem", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockItemService(
        mockStockItemRepo,
        mockPartRepo,
        mockStockLocationRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.updateStockItem("stock-1", { status: "DAMAGED" })
      ).rejects.toThrow("Authentication required");
    });

    it("should update stock item", async () => {
      const mockStockItem = {
        id: "stock-1",
        status: "DAMAGED",
      };

      mockStockItemRepo.findById.mockResolvedValue({
        id: "stock-1",
        status: "OK",
      });
      mockStockItemRepo.update.mockResolvedValue(mockStockItem);

      const result = await service.updateStockItem("stock-1", {
        status: "DAMAGED",
      });

      expect(result).toEqual(mockStockItem);
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_ITEM_UPDATED",
        "StockItem",
        "stock-1",
        expect.any(Object)
      );
    });

    it("should throw if stock item not found", async () => {
      mockStockItemRepo.findById.mockResolvedValue(null);

      await expect(
        service.updateStockItem("non-existent", { status: "DAMAGED" })
      ).rejects.toThrow("Stock item not found");
    });
  });

  describe("deleteStockItem", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockItemService(
        mockStockItemRepo,
        mockPartRepo,
        mockStockLocationRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.deleteStockItem("stock-1")
      ).rejects.toThrow("Authentication required");
    });

    it("should delete stock item", async () => {
      mockStockItemRepo.findById.mockResolvedValue({ id: "stock-1" });

      await service.deleteStockItem("stock-1");

      expect(mockStockItemRepo.softDelete).toHaveBeenCalledWith("stock-1");
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_ITEM_DELETED",
        "StockItem",
        "stock-1",
        expect.any(Object)
      );
    });
  });

  describe("moveStockItem", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockItemService(
        mockStockItemRepo,
        mockPartRepo,
        mockStockLocationRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.moveStockItem("stock-1", "loc-2")
      ).rejects.toThrow("Authentication required");
    });

    it("should validate new location exists", async () => {
      mockStockItemRepo.findById.mockResolvedValue({ id: "stock-1" });
      mockStockLocationRepo.findById.mockResolvedValue(null);

      await expect(
        service.moveStockItem("stock-1", "non-existent")
      ).rejects.toThrow("Stock location not found");
    });

    it("should move stock item", async () => {
      const mockStockItem = {
        id: "stock-1",
        locationId: "loc-2",
      };

      mockStockItemRepo.findById.mockResolvedValue({
        id: "stock-1",
        locationId: "loc-1",
      });
      mockStockLocationRepo.findById.mockResolvedValue({ id: "loc-2" });
      mockStockItemRepo.move.mockResolvedValue(mockStockItem);

      const result = await service.moveStockItem("stock-1", "loc-2");

      expect(result).toEqual(mockStockItem);
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_ITEM_MOVED",
        "StockItem",
        "stock-1",
        expect.any(Object)
      );
    });
  });

  describe("adjustQuantity", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockItemService(
        mockStockItemRepo,
        mockPartRepo,
        mockStockLocationRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.adjustQuantity("stock-1", 10)
      ).rejects.toThrow("Authentication required");
    });

    it("should prevent adjustment of serialized items", async () => {
      mockStockItemRepo.findById.mockResolvedValue({
        id: "stock-1",
        serial: "SN-12345",
      });

      await expect(service.adjustQuantity("stock-1", 10)).rejects.toThrow(
        "Cannot adjust quantity of serialized items"
      );
    });

    it("should adjust quantity", async () => {
      const mockStockItem = {
        id: "stock-1",
        quantity: 110,
      };

      mockStockItemRepo.findById.mockResolvedValue({
        id: "stock-1",
        quantity: 100,
        serial: null,
      });
      mockStockItemRepo.adjustQuantity.mockResolvedValue(mockStockItem);

      const result = await service.adjustQuantity("stock-1", 10);

      expect(result).toEqual(mockStockItem);
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_ITEM_ADJUSTED",
        "StockItem",
        "stock-1",
        expect.any(Object)
      );
    });
  });

  describe("getStockItem", () => {
    it("should return stock item", async () => {
      const mockStockItem = { id: "stock-1" };
      mockStockItemRepo.findById.mockResolvedValue(mockStockItem);

      const result = await service.getStockItem("stock-1");
      expect(result).toEqual(mockStockItem);
    });

    it("should throw if not found", async () => {
      mockStockItemRepo.findById.mockResolvedValue(null);

      await expect(service.getStockItem("non-existent")).rejects.toThrow(
        "Stock item not found"
      );
    });
  });

  describe("listStockItems", () => {
    it("should list stock items", async () => {
      const mockStockItems = [
        { id: "stock-1" },
        { id: "stock-2" },
      ];

      mockStockItemRepo.findAll.mockResolvedValue(mockStockItems);
      mockStockItemRepo.count.mockResolvedValue(2);

      const result = await service.listStockItems();

      expect(result.data).toEqual(mockStockItems);
      expect(result.total).toBe(2);
    });
  });

  describe("getPartStockLevel", () => {
    it("should return total stock for a part", async () => {
      mockStockItemRepo.getTotalQuantity.mockResolvedValue(100);

      const result = await service.getPartStockLevel("part-1");

      expect(result).toBe(100);
      expect(mockStockItemRepo.getTotalQuantity).toHaveBeenCalledWith(
        "part-1",
        "OK"
      );
    });
  });
});
