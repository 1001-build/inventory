import { describe, it, expect, beforeEach, vi } from "vitest";
import { PartService } from "#server/services/part";
import { createMockH3Event, createMockD1Database } from "../../helpers/mocks";
import { createGenericRepositoryMock } from "../../helpers/auto-mocks";
import { AuthenticationError, ValidationError } from "#server/error/errors";

describe("PartService", () => {
  let service: PartService;
  let mockEvent: any;
  let mockDb: D1Database;
  let mockPartRepo: any;
  let mockPartCategoryRepo: any;
  let mockAuditLogRepo: any;

  beforeEach(() => {
    mockDb = createMockD1Database();
    mockEvent = createMockH3Event();
    mockEvent.context.userId = "test-user-id";
    mockEvent.context.cloudflare = { env: { DB: mockDb } };

    mockPartRepo = createGenericRepositoryMock();
    mockPartCategoryRepo = createGenericRepositoryMock();
    mockAuditLogRepo = createGenericRepositoryMock();

    mockPartRepo.findByIPN = vi.fn();
    mockPartRepo.search = vi.fn();
    mockPartRepo.findByCategory = vi.fn();
    mockPartRepo.countByCategory = vi.fn();
    mockAuditLogRepo.log = vi.fn();

    service = new PartService(
      mockEvent,
      mockDb,
      mockPartRepo,
      mockPartCategoryRepo,
      mockAuditLogRepo
    );
  });

  describe("createPart", () => {
    it("should require authentication", async () => {
      mockEvent.context.userId = undefined;
      const unauthService = new PartService(
        mockEvent,
        mockDb,
        mockPartRepo,
        mockPartCategoryRepo,
        mockAuditLogRepo
      );

      await expect(
        unauthService.createPart({ name: "Test", categoryId: "cat-1" })
      ).rejects.toThrow(AuthenticationError);
    });

    it("should validate category exists", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue(null);

      await expect(
        service.createPart({ name: "Test", categoryId: "non-existent" })
      ).rejects.toThrow(ValidationError);
    });

    it("should prevent assignment to structural category", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue({
        id: "cat-1",
        structural: true,
      });

      await expect(
        service.createPart({ name: "Test", categoryId: "cat-1" })
      ).rejects.toThrow(ValidationError);
    });

    it("should validate IPN uniqueness", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue({
        id: "cat-1",
        structural: false,
      });
      mockPartRepo.findByIPN.mockResolvedValue({ id: "existing", IPN: "PN-001" });

      await expect(
        service.createPart({
          name: "Test",
          categoryId: "cat-1",
          IPN: "PN-001",
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should create part successfully", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue({
        id: "cat-1",
        structural: false,
      });
      mockPartRepo.findByIPN.mockResolvedValue(null);
      mockPartRepo.create.mockResolvedValue({
        id: "part-1",
        name: "Test Part",
        categoryId: "cat-1",
      });

      const result = await service.createPart({
        name: "Test Part",
        categoryId: "cat-1",
      });

      expect(result.id).toBe("part-1");
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        "test-user-id",
        "PART_CREATED",
        "Part",
        "part-1",
        expect.any(Object)
      );
    });
  });

  describe("updatePart", () => {
    it("should prevent updating locked parts", async () => {
      mockPartRepo.findById.mockResolvedValue({
        id: "part-1",
        locked: true,
      });

      await expect(
        service.updatePart("part-1", { name: "Updated" })
      ).rejects.toThrow(ValidationError);
    });

    it("should allow updating unlocked parts", async () => {
      mockPartRepo.findById.mockResolvedValue({
        id: "part-1",
        locked: false,
      });
      mockPartRepo.update.mockResolvedValue({
        id: "part-1",
        name: "Updated",
      });

      await service.updatePart("part-1", { name: "Updated" });

      expect(mockPartRepo.update).toHaveBeenCalled();
    });
  });

  describe("deletePart", () => {
    it("should soft delete part", async () => {
      mockPartRepo.findById.mockResolvedValue({
        id: "part-1",
        locked: false,
      });

      await service.deletePart("part-1");

      expect(mockPartRepo.softDelete).toHaveBeenCalledWith("part-1");
    });
  });
});
