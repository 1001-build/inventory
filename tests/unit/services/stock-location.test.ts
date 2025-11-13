import { describe, it, expect, beforeEach, vi } from "vitest";
import { StockLocationService } from "#server/services/stock-location";
import { createMockRepository } from "../../helpers/mocks";

describe("StockLocationService", () => {
  let service: StockLocationService;
  let mockStockLocationRepo: any;
  let mockStockItemRepo: any;
  let mockAuditLogRepo: any;
  let userId: string;

  beforeEach(() => {
    mockStockLocationRepo = {
      ...createMockRepository(),
      findByParentId: vi.fn(),
      getDescendants: vi.fn(),
      getAncestors: vi.fn(),
    };
    mockStockItemRepo = {
      ...createMockRepository(),
      findByLocation: vi.fn(),
    };
    mockAuditLogRepo = createMockRepository();
    mockAuditLogRepo.log = vi.fn();
    userId = "test-user-id";

    service = new StockLocationService(
      mockStockLocationRepo,
      mockStockItemRepo,
      mockAuditLogRepo,
      userId
    );
  });

  describe("createLocation", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockLocationService(
        mockStockLocationRepo,
        mockStockItemRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.createLocation({
          name: "Test Location",
        })
      ).rejects.toThrow("Authentication required");
    });

    it("should create a location", async () => {
      const mockLocation = {
        id: "loc-1",
        name: "Test Location",
        parentId: null,
        pathstring: "loc-1",
        level: 0,
      };

      mockStockLocationRepo.create.mockResolvedValue(mockLocation);

      const result = await service.createLocation({
        name: "Test Location",
      });

      expect(result).toEqual(mockLocation);
      expect(mockStockLocationRepo.create).toHaveBeenCalledWith({
        name: "Test Location",
      });
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_LOCATION_CREATED",
        "StockLocation",
        "loc-1",
        expect.any(Object)
      );
    });

    it("should validate parent location exists", async () => {
      mockStockLocationRepo.findById.mockResolvedValue(null);

      await expect(
        service.createLocation({
          name: "Child Location",
          parentId: "non-existent",
        })
      ).rejects.toThrow("Parent location not found");
    });
  });

  describe("updateLocation", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockLocationService(
        mockStockLocationRepo,
        mockStockItemRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.updateLocation("loc-1", { name: "Updated" })
      ).rejects.toThrow("Authentication required");
    });

    it("should update a location", async () => {
      const mockLocation = {
        id: "loc-1",
        name: "Updated Location",
      };

      mockStockLocationRepo.findById.mockResolvedValue({
        id: "loc-1",
        name: "Old Name",
      });
      mockStockLocationRepo.update.mockResolvedValue(mockLocation);

      const result = await service.updateLocation("loc-1", {
        name: "Updated Location",
      });

      expect(result).toEqual(mockLocation);
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_LOCATION_UPDATED",
        "StockLocation",
        "loc-1",
        expect.any(Object)
      );
    });

    it("should throw if location not found", async () => {
      mockStockLocationRepo.findById.mockResolvedValue(null);

      await expect(
        service.updateLocation("non-existent", { name: "Updated" })
      ).rejects.toThrow("Stock location not found");
    });
  });

  describe("deleteLocation", () => {
    it("should require authentication", async () => {
      const serviceWithoutAuth = new StockLocationService(
        mockStockLocationRepo,
        mockStockItemRepo,
        mockAuditLogRepo,
        undefined as any
      );

      await expect(
        serviceWithoutAuth.deleteLocation("loc-1")
      ).rejects.toThrow("Authentication required");
    });

    it("should prevent deletion if location has stock items", async () => {
      mockStockLocationRepo.findById.mockResolvedValue({
        id: "loc-1",
        name: "Location",
      });
      mockStockItemRepo.findByLocation.mockResolvedValue([{ id: "stock-1" }]);

      await expect(service.deleteLocation("loc-1")).rejects.toThrow(
        "Cannot delete location with stock items"
      );
    });

    it("should prevent deletion if location has children", async () => {
      mockStockLocationRepo.findById.mockResolvedValue({
        id: "loc-1",
        name: "Location",
      });
      mockStockItemRepo.findByLocation.mockResolvedValue([]);
      mockStockLocationRepo.findByParentId.mockResolvedValue([
        { id: "child-1" },
      ]);

      await expect(service.deleteLocation("loc-1")).rejects.toThrow(
        "Cannot delete location with child locations"
      );
    });

    it("should delete location when allowed", async () => {
      mockStockLocationRepo.findById.mockResolvedValue({
        id: "loc-1",
        name: "Location",
      });
      mockStockItemRepo.findByLocation.mockResolvedValue([]);
      mockStockLocationRepo.findByParentId.mockResolvedValue([]);

      await service.deleteLocation("loc-1");

      expect(mockStockLocationRepo.softDelete).toHaveBeenCalledWith("loc-1");
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        userId,
        "STOCK_LOCATION_DELETED",
        "StockLocation",
        "loc-1",
        expect.any(Object)
      );
    });

    it("should cascade delete when requested", async () => {
      mockStockLocationRepo.findById.mockResolvedValue({
        id: "loc-1",
        name: "Location",
      });
      mockStockLocationRepo.getDescendants.mockResolvedValue([
        { id: "child-1" },
        { id: "child-2" },
      ]);
      mockStockItemRepo.findByLocation.mockResolvedValue([]);

      await service.deleteLocation("loc-1", true);

      expect(mockStockLocationRepo.softDelete).toHaveBeenCalledWith("loc-1");
      expect(mockStockLocationRepo.softDelete).toHaveBeenCalledWith("child-1");
      expect(mockStockLocationRepo.softDelete).toHaveBeenCalledWith("child-2");
    });
  });

  describe("getLocation", () => {
    it("should return a location", async () => {
      const mockLocation = {
        id: "loc-1",
        name: "Test Location",
      };

      mockStockLocationRepo.findById.mockResolvedValue(mockLocation);

      const result = await service.getLocation("loc-1");
      expect(result).toEqual(mockLocation);
    });

    it("should throw if not found", async () => {
      mockStockLocationRepo.findById.mockResolvedValue(null);

      await expect(service.getLocation("non-existent")).rejects.toThrow(
        "Stock location not found"
      );
    });
  });

  describe("listLocations", () => {
    it("should list locations", async () => {
      const mockLocations = [
        { id: "loc-1", name: "Location 1" },
        { id: "loc-2", name: "Location 2" },
      ];

      mockStockLocationRepo.findAll.mockResolvedValue(mockLocations);
      mockStockLocationRepo.count.mockResolvedValue(2);

      const result = await service.listLocations();

      expect(result.data).toEqual(mockLocations);
      expect(result.total).toBe(2);
    });
  });

  describe("getLocationTree", () => {
    it("should return root locations", async () => {
      const mockLocations = [{ id: "loc-1", name: "Root Location" }];

      mockStockLocationRepo.findByParentId.mockResolvedValue(mockLocations);

      const result = await service.getLocationTree();

      expect(result).toEqual(mockLocations);
      expect(mockStockLocationRepo.findByParentId).toHaveBeenCalledWith(null);
    });

    it("should return children of a parent", async () => {
      const mockLocations = [{ id: "child-1", name: "Child Location" }];

      mockStockLocationRepo.findByParentId.mockResolvedValue(mockLocations);

      const result = await service.getLocationTree("parent-1");

      expect(result).toEqual(mockLocations);
      expect(mockStockLocationRepo.findByParentId).toHaveBeenCalledWith(
        "parent-1"
      );
    });
  });
});
