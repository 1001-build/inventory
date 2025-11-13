import { describe, it, expect, beforeEach, vi } from "vitest";
import { R2StorageService } from "#server/services/r2-storage";
import { createMockH3Event } from "../../helpers/mocks";

describe("R2StorageService", () => {
  let service: R2StorageService;
  let mockEvent: any;
  let mockR2Bucket: any;

  beforeEach(() => {
    mockEvent = createMockH3Event();

    // Mock R2 bucket operations
    mockR2Bucket = {
      put: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
    };

    mockEvent.context.cloudflare = {
      env: {
        R2: mockR2Bucket,
      },
    };

    service = new R2StorageService(mockEvent);
  });

  describe("constructor", () => {
    it("should validate R2 bucket is available", () => {
      const eventWithoutR2 = createMockH3Event();
      eventWithoutR2.context.cloudflare = { env: {} };

      expect(() => new R2StorageService(eventWithoutR2)).toThrow(
        "R2 bucket not available in context"
      );
    });
  });

  describe("uploadFile", () => {
    it("should upload file to R2 with correct key format", async () => {
      const fileBuffer = Buffer.from("test file content");
      const fileName = "test-image.jpg";
      const folder = "part-images";

      mockR2Bucket.put.mockResolvedValue({
        key: "part-images/2024/01/uuid-test-image.jpg",
      });

      const result = await service.uploadFile(fileBuffer, fileName, "image/jpeg", folder);

      expect(result).toHaveProperty("key");
      expect(result).toHaveProperty("url");
      expect(result.key).toContain(folder);
      expect(mockR2Bucket.put).toHaveBeenCalled();
    });

    it("should generate unique keys for files with same name", async () => {
      const fileBuffer = Buffer.from("test file content");
      const fileName = "duplicate.jpg";

      mockR2Bucket.put.mockResolvedValue({ key: "files/uuid1-duplicate.jpg" });

      const result1 = await service.uploadFile(fileBuffer, fileName, "image/jpeg", "files");

      mockR2Bucket.put.mockResolvedValue({ key: "files/uuid2-duplicate.jpg" });

      const result2 = await service.uploadFile(fileBuffer, fileName, "image/jpeg", "files");

      expect(result1.key).not.toBe(result2.key);
    });

    it("should sanitize file names", async () => {
      const fileBuffer = Buffer.from("test");
      const fileName = "test file with spaces & special!@#.jpg";

      mockR2Bucket.put.mockResolvedValue({ key: "files/uuid-sanitized.jpg" });

      await service.uploadFile(fileBuffer, fileName, "image/jpeg", "files");

      expect(mockR2Bucket.put).toHaveBeenCalled();
    });
  });

  describe("deleteFile", () => {
    it("should delete file from R2", async () => {
      const key = "part-images/2024/01/test-file.jpg";

      mockR2Bucket.delete.mockResolvedValue(undefined);

      await service.deleteFile(key);

      expect(mockR2Bucket.delete).toHaveBeenCalledWith(key);
    });

    it("should handle deletion of non-existent file gracefully", async () => {
      const key = "non-existent.jpg";

      mockR2Bucket.delete.mockResolvedValue(undefined);

      await expect(service.deleteFile(key)).resolves.not.toThrow();
    });
  });

  describe("getSignedUrl", () => {
    it("should return public URL for now", async () => {
      const key = "part-images/test.jpg";
      const expiresIn = 3600;

      const url = await service.getSignedUrl(key, expiresIn);

      expect(url).toBeDefined();
      expect(typeof url).toBe("string");
      expect(url).toContain(key);
    });
  });

  describe("getPublicUrl", () => {
    it("should construct public URL from key", () => {
      const key = "part-images/test.jpg";

      const url = service.getPublicUrl(key);

      expect(url).toBeDefined();
      expect(typeof url).toBe("string");
      expect(url).toContain(key);
    });
  });

  describe("fileExists", () => {
    it("should return true if file exists", async () => {
      const key = "part-images/test.jpg";

      mockR2Bucket.get.mockResolvedValue({
        key,
        size: 1024,
      });

      const exists = await service.fileExists(key);

      expect(exists).toBe(true);
      expect(mockR2Bucket.get).toHaveBeenCalledWith(key);
    });

    it("should return false if file does not exist", async () => {
      const key = "non-existent.jpg";

      mockR2Bucket.get.mockResolvedValue(null);

      const exists = await service.fileExists(key);

      expect(exists).toBe(false);
    });
  });

  describe("generateKey", () => {
    it("should generate key with folder and date structure", () => {
      const fileName = "test.jpg";
      const folder = "part-images";

      const key = service.generateKey(fileName, folder);

      expect(key).toMatch(/^part-images\/\d{4}\/\d{2}\/[a-f0-9-]+-test\.jpg$/);
    });

    it("should handle file name with no extension", () => {
      const fileName = "testfile";
      const folder = "documents";

      const key = service.generateKey(fileName, folder);

      expect(key).toContain("documents/");
      expect(key).toContain("testfile");
    });

    it("should sanitize special characters in file name", () => {
      const fileName = "test file (1) [copy].jpg";
      const folder = "images";

      const key = service.generateKey(fileName, folder);

      // Should not contain spaces or special chars
      expect(key).not.toContain(" ");
      expect(key).not.toContain("(");
      expect(key).not.toContain(")");
      expect(key).not.toContain("[");
      expect(key).not.toContain("]");
    });
  });
});
