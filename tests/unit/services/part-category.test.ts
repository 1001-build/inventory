import { describe, it, expect, beforeEach, vi } from "vitest";
import { PartCategoryService } from "#server/services/part-category";
import { createMockH3Event, createMockD1Database } from "../../helpers/mocks";
import { createGenericRepositoryMock } from "../../helpers/auto-mocks";
import { AuthenticationError, ValidationError } from "#server/error/errors";

describe("PartCategoryService", () => {
  let service: PartCategoryService;
  let mockEvent: any;
  let mockDb: D1Database;
  let mockPartCategoryRepo: any;
  let mockAuditLogRepo: any;
  let mockPartRepo: any;

  beforeEach(() => {
    mockDb = createMockD1Database();
    mockEvent = createMockH3Event();
    mockEvent.context.userId = "test-user-id";
    mockEvent.context.cloudflare = { env: { DB: mockDb } };

    // Create repository mocks
    mockPartCategoryRepo = createGenericRepositoryMock();
    mockAuditLogRepo = createGenericRepositoryMock();
    mockPartRepo = createGenericRepositoryMock();

    // Add specific methods to part category repo mock
    mockPartCategoryRepo.findByParentId = vi.fn();
    mockPartCategoryRepo.getAncestors = vi.fn();
    mockPartCategoryRepo.getDescendants = vi.fn();
    mockPartCategoryRepo.moveToParent = vi.fn();
    mockPartCategoryRepo.countParts = vi.fn();
    mockPartCategoryRepo.count = vi.fn();

    // Add audit log method
    mockAuditLogRepo.log = vi.fn();

    service = new PartCategoryService(
      mockEvent,
      mockDb,
      mockPartCategoryRepo,
      mockAuditLogRepo,
      mockPartRepo
    );
  });

  describe("constructor", () => {
    it("should validate database context", () => {
      const eventWithoutDb = createMockH3Event();
      eventWithoutDb.context.cloudflare = { env: {} };

      expect(
        () =>
          new PartCategoryService(
            eventWithoutDb,
            null as any,
            mockPartCategoryRepo,
            mockAuditLogRepo,
            mockPartRepo
          )
      ).toThrow("Database not found in event context");
    });

    it("should extract userId from context", () => {
      expect(service).toBeDefined();
      // userId is private, but service should be created successfully
    });
  });

  describe("createCategory", () => {
    it("should throw AuthenticationError if user not authenticated", async () => {
      mockEvent.context.userId = undefined;
      const unauthService = new PartCategoryService(
        mockEvent,
        mockDb,
        mockPartCategoryRepo,
        mockAuditLogRepo,
        mockPartRepo
      );

      await expect(
        unauthService.createCategory({
          name: "Test Category",
          description: "Test",
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it("should validate parent exists if parent_id provided", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue(null);

      await expect(
        service.createCategory({
          name: "Test Category",
          parentId: "non-existent-parent",
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should prevent creating under structural category with parts", async () => {
      const structuralParent = {
        id: "parent-1",
        name: "Structural Parent",
        structural: true,
      };

      mockPartCategoryRepo.findById.mockResolvedValue(structuralParent);
      mockPartCategoryRepo.countParts.mockResolvedValue(5);

      await expect(
        service.createCategory({
          name: "Test Category",
          parentId: "parent-1",
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should create category successfully with valid data", async () => {
      const newCategory = {
        id: "cat-1",
        name: "Test Category",
        description: "Test",
        parentId: null,
        pathstring: "cat-1",
        level: 0,
        structural: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockPartCategoryRepo.create.mockResolvedValue(newCategory);
      mockAuditLogRepo.log = vi.fn();

      const result = await service.createCategory({
        name: "Test Category",
        description: "Test",
      });

      expect(result).toEqual(newCategory);
      expect(mockPartCategoryRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Category",
          description: "Test",
        })
      );
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        "test-user-id",
        "PART_CATEGORY_CREATED",
        "PartCategory",
        "cat-1",
        expect.objectContaining({
          metadata: expect.objectContaining({
            name: "Test Category",
          }),
        })
      );
    });

    it("should create child category under valid parent", async () => {
      const parent = {
        id: "parent-1",
        name: "Parent",
        structural: false,
        pathstring: "parent-1",
        level: 0,
      };

      const newCategory = {
        id: "cat-2",
        name: "Child Category",
        parentId: "parent-1",
        pathstring: "parent-1/cat-2",
        level: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockPartCategoryRepo.findById.mockResolvedValue(parent);
      mockPartCategoryRepo.countParts.mockResolvedValue(0);
      mockPartCategoryRepo.create.mockResolvedValue(newCategory);

      const result = await service.createCategory({
        name: "Child Category",
        parentId: "parent-1",
      });

      expect(result.level).toBe(1);
      expect(result.pathstring).toContain("parent-1");
    });
  });

  describe("updateCategory", () => {
    it("should throw AuthenticationError if user not authenticated", async () => {
      mockEvent.context.userId = undefined;
      const unauthService = new PartCategoryService(
        mockEvent,
        mockDb,
        mockPartCategoryRepo,
        mockAuditLogRepo,
        mockPartRepo
      );

      await expect(
        unauthService.updateCategory("cat-1", { name: "Updated" })
      ).rejects.toThrow(AuthenticationError);
    });

    it("should validate category exists", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue(null);

      await expect(
        service.updateCategory("cat-1", { name: "Updated" })
      ).rejects.toThrow(ValidationError);
    });

    it("should prevent setting structural=true if category has parts", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
        structural: false,
      };

      mockPartCategoryRepo.findById.mockResolvedValue(category);
      mockPartCategoryRepo.countParts.mockResolvedValue(5);

      await expect(
        service.updateCategory("cat-1", { structural: true })
      ).rejects.toThrow(ValidationError);
    });

    it("should update category successfully", async () => {
      const existingCategory = {
        id: "cat-1",
        name: "Old Name",
        structural: false,
      };

      const updatedCategory = {
        ...existingCategory,
        name: "New Name",
      };

      mockPartCategoryRepo.findById.mockResolvedValue(existingCategory);
      mockPartCategoryRepo.countParts.mockResolvedValue(0);
      mockPartCategoryRepo.update.mockResolvedValue(updatedCategory);

      const result = await service.updateCategory("cat-1", { name: "New Name" });

      expect(result.name).toBe("New Name");
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        "test-user-id",
        "PART_CATEGORY_UPDATED",
        "PartCategory",
        "cat-1",
        expect.any(Object)
      );
    });
  });

  describe("deleteCategory", () => {
    it("should throw AuthenticationError if user not authenticated", async () => {
      mockEvent.context.userId = undefined;
      const unauthService = new PartCategoryService(
        mockEvent,
        mockDb,
        mockPartCategoryRepo,
        mockAuditLogRepo,
        mockPartRepo
      );

      await expect(unauthService.deleteCategory("cat-1", false)).rejects.toThrow(
        AuthenticationError
      );
    });

    it("should validate category exists", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue(null);

      await expect(service.deleteCategory("cat-1", false)).rejects.toThrow(
        ValidationError
      );
    });

    it("should prevent deletion if category has parts and cascade=false", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
      };

      mockPartCategoryRepo.findById.mockResolvedValue(category);
      mockPartCategoryRepo.countParts.mockResolvedValue(5);

      await expect(service.deleteCategory("cat-1", false)).rejects.toThrow(
        ValidationError
      );
    });

    it("should prevent deletion if category has children and cascade=false", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
      };

      mockPartCategoryRepo.findById.mockResolvedValue(category);
      mockPartCategoryRepo.countParts.mockResolvedValue(0);
      mockPartCategoryRepo.findByParentId.mockResolvedValue([
        { id: "child-1", name: "Child" },
      ]);

      await expect(service.deleteCategory("cat-1", false)).rejects.toThrow(
        ValidationError
      );
    });

    it("should delete category if no parts and no children", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
      };

      mockPartCategoryRepo.findById.mockResolvedValue(category);
      mockPartCategoryRepo.countParts.mockResolvedValue(0);
      mockPartCategoryRepo.findByParentId.mockResolvedValue([]);

      await service.deleteCategory("cat-1", false);

      expect(mockPartCategoryRepo.softDelete).toHaveBeenCalledWith("cat-1");
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        "test-user-id",
        "PART_CATEGORY_DELETED",
        "PartCategory",
        "cat-1",
        expect.any(Object)
      );
    });

    it("should cascade delete children and parts if cascade=true", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
      };

      const children = [
        { id: "child-1", name: "Child 1" },
        { id: "child-2", name: "Child 2" },
      ];

      mockPartCategoryRepo.findById.mockResolvedValue(category);
      mockPartCategoryRepo.getDescendants.mockResolvedValue(children);
      mockPartCategoryRepo.countParts.mockResolvedValue(3);
      mockPartCategoryRepo.findByParentId.mockResolvedValue(children);

      await service.deleteCategory("cat-1", true);

      // Should delete all descendants
      expect(mockPartCategoryRepo.softDelete).toHaveBeenCalledWith("cat-1");
      expect(mockPartCategoryRepo.softDelete).toHaveBeenCalledWith("child-1");
      expect(mockPartCategoryRepo.softDelete).toHaveBeenCalledWith("child-2");
    });
  });

  describe("moveCategory", () => {
    it("should throw AuthenticationError if user not authenticated", async () => {
      mockEvent.context.userId = undefined;
      const unauthService = new PartCategoryService(
        mockEvent,
        mockDb,
        mockPartCategoryRepo,
        mockAuditLogRepo,
        mockPartRepo
      );

      await expect(unauthService.moveCategory("cat-1", "parent-1")).rejects.toThrow(
        AuthenticationError
      );
    });

    it("should validate category exists", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue(null);

      await expect(service.moveCategory("cat-1", "parent-1")).rejects.toThrow(
        ValidationError
      );
    });

    it("should validate new parent exists if provided", async () => {
      const category = { id: "cat-1", name: "Category" };

      mockPartCategoryRepo.findById
        .mockResolvedValueOnce(category)
        .mockResolvedValueOnce(null);

      await expect(service.moveCategory("cat-1", "parent-1")).rejects.toThrow(
        ValidationError
      );
    });

    it("should prevent circular reference", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
        pathstring: "cat-1",
      };

      const parent = {
        id: "parent-1",
        name: "Parent",
        pathstring: "cat-1/parent-1", // Parent is descendant of cat-1
      };

      mockPartCategoryRepo.findById
        .mockResolvedValueOnce(category)
        .mockResolvedValueOnce(parent);

      await expect(service.moveCategory("cat-1", "parent-1")).rejects.toThrow(
        ValidationError
      );
    });

    it("should move category successfully", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
        pathstring: "cat-1",
        level: 0,
      };

      const newParent = {
        id: "parent-1",
        name: "Parent",
        pathstring: "parent-1",
        level: 0,
      };

      mockPartCategoryRepo.findById
        .mockResolvedValueOnce(category)
        .mockResolvedValueOnce(newParent);

      await service.moveCategory("cat-1", "parent-1");

      expect(mockPartCategoryRepo.moveToParent).toHaveBeenCalledWith("cat-1", "parent-1");
      expect(mockAuditLogRepo.log).toHaveBeenCalledWith(
        "test-user-id",
        "PART_CATEGORY_MOVED",
        "PartCategory",
        "cat-1",
        expect.any(Object)
      );
    });
  });

  describe("getCategoryTree", () => {
    it("should return hierarchical tree structure", async () => {
      const rootCategories = [
        {
          id: "root-1",
          name: "Root 1",
          parentId: null,
          level: 0,
        },
        {
          id: "root-2",
          name: "Root 2",
          parentId: null,
          level: 0,
        },
      ];

      const childCategories = [
        {
          id: "child-1",
          name: "Child 1",
          parentId: "root-1",
          level: 1,
        },
      ];

      // Mock to return root categories first, then children for each, then empty arrays
      mockPartCategoryRepo.findByParentId
        .mockResolvedValueOnce(rootCategories) // First call gets roots
        .mockResolvedValueOnce(childCategories) // Second call gets children of root-1
        .mockResolvedValueOnce([]) // Third call gets children of child-1 (none)
        .mockResolvedValueOnce([]); // Fourth call gets children of root-2 (none)

      const tree = await service.getCategoryTree();

      expect(tree).toBeDefined();
      expect(Array.isArray(tree)).toBe(true);
      expect(tree.length).toBe(2); // Two root categories
      // Detailed structure testing would be done in implementation
    });
  });

  describe("listCategories", () => {
    it("should list categories with pagination", async () => {
      const categories = [
        { id: "cat-1", name: "Category 1" },
        { id: "cat-2", name: "Category 2" },
      ];

      mockPartCategoryRepo.findAll.mockResolvedValue(categories);
      mockPartCategoryRepo.count.mockResolvedValue(2);

      const result = await service.listCategories(20, 0);

      expect(result.data).toEqual(categories);
      expect(result.total).toBe(2);
    });

    it("should support search term", async () => {
      const categories = [{ id: "cat-1", name: "Electronics" }];

      mockPartCategoryRepo.findAll.mockResolvedValue(categories);
      mockPartCategoryRepo.count.mockResolvedValue(1);

      await service.listCategories(20, 0, "electronics");

      expect(mockPartCategoryRepo.findAll).toHaveBeenCalledWith(
        20,
        0,
        "electronics",
        undefined,
        "name",
        "asc"
      );
    });
  });

  describe("getCategory", () => {
    it("should return category with details", async () => {
      const category = {
        id: "cat-1",
        name: "Category",
        parentId: "parent-1",
      };

      const parent = {
        id: "parent-1",
        name: "Parent",
      };

      const children = [
        { id: "child-1", name: "Child 1" },
      ];

      mockPartCategoryRepo.findById.mockResolvedValue(category);
      mockPartCategoryRepo.getAncestors.mockResolvedValue([parent]);
      mockPartCategoryRepo.findByParentId.mockResolvedValue(children);
      mockPartCategoryRepo.countParts.mockResolvedValue(5);

      const result = await service.getCategory("cat-1");

      expect(result.category).toEqual(category);
      expect(result.ancestors).toEqual([parent]);
      expect(result.children).toEqual(children);
      expect(result.partCount).toBe(5);
    });

    it("should throw ValidationError if category not found", async () => {
      mockPartCategoryRepo.findById.mockResolvedValue(null);

      await expect(service.getCategory("non-existent")).rejects.toThrow(
        ValidationError
      );
    });
  });
});
