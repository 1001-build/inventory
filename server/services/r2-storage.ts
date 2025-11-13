import type { H3Event } from "h3";
import { InternalServerError } from "#server/error/errors";

// ========================================
// R2 STORAGE SERVICE
// ========================================
// Handles file uploads and management with Cloudflare R2
// Supports images, documents, and other file types
// ========================================

export class R2StorageService {
  private readonly r2: R2Bucket;
  private readonly baseUrl: string;

  constructor(private readonly event: H3Event) {
    // Get R2 bucket from event context
    this.r2 = event.context.cloudflare?.env?.R2;

    if (!this.r2) {
      throw new InternalServerError("R2 bucket not available in context");
    }

    // Construct base URL for R2 files
    // In production, this would be a custom domain or R2 public domain
    this.baseUrl = event.context.cloudflare?.env?.R2_PUBLIC_URL || "https://r2.example.com";
  }

  /**
   * Upload a file to R2
   * @param buffer File buffer
   * @param fileName Original file name
   * @param mimeType MIME type of the file
   * @param folder Folder to organize files (e.g., "part-images", "documents")
   * @returns Object with key and URL
   */
  async uploadFile(
    buffer: Buffer | ArrayBuffer,
    fileName: string,
    mimeType: string,
    folder = "uploads"
  ): Promise<{ key: string; url: string }> {
    // Generate unique key with date structure
    const key = this.generateKey(fileName, folder);

    // Upload to R2
    await this.r2.put(key, buffer, {
      httpMetadata: {
        contentType: mimeType,
      },
    });

    // Return key and public URL
    const url = this.getPublicUrl(key);

    return { key, url };
  }

  /**
   * Delete a file from R2
   * @param key R2 object key
   */
  async deleteFile(key: string): Promise<void> {
    await this.r2.delete(key);
  }

  /**
   * Get a signed URL for temporary access to a file
   * Note: R2 signed URLs require R2 API tokens
   * For now, returns public URL
   * @param key R2 object key
   * @param expiresIn Expiration time in seconds
   */
  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    // TODO: Implement proper signed URLs when needed
    // For now, return public URL
    return this.getPublicUrl(key);
  }

  /**
   * Get public URL for an R2 object
   * @param key R2 object key
   */
  getPublicUrl(key: string): string {
    return `${this.baseUrl}/${key}`;
  }

  /**
   * Check if a file exists in R2
   * @param key R2 object key
   */
  async fileExists(key: string): Promise<boolean> {
    const object = await this.r2.get(key);
    return object !== null;
  }

  /**
   * Generate a unique key for a file
   * Format: folder/YYYY/MM/uuid-filename.ext
   * @param fileName Original file name
   * @param folder Folder to organize files
   */
  generateKey(fileName: string, folder = "uploads"): string {
    // Sanitize file name
    const sanitized = this.sanitizeFileName(fileName);

    // Get current date for organization
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    // Generate UUID for uniqueness
    const uuid = crypto.randomUUID();

    // Extract extension
    const lastDotIndex = sanitized.lastIndexOf(".");
    const ext = lastDotIndex !== -1 ? sanitized.slice(lastDotIndex) : "";
    const name = lastDotIndex !== -1 ? sanitized.slice(0, lastDotIndex) : sanitized;

    // Construct key
    return `${folder}/${year}/${month}/${uuid}-${name}${ext}`;
  }

  /**
   * Sanitize file name to remove special characters
   * @param fileName Original file name
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-") // Replace special chars with dash
      .replace(/-+/g, "-") // Replace multiple dashes with single dash
      .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
  }

  /**
   * Get file metadata
   * @param key R2 object key
   */
  async getFileMetadata(key: string): Promise<{
    size: number;
    uploaded: Date;
    contentType?: string;
  } | null> {
    const object = await this.r2.get(key);

    if (!object) {
      return null;
    }

    return {
      size: object.size,
      uploaded: object.uploaded,
      contentType: object.httpMetadata?.contentType,
    };
  }
}

// ========================================
// FACTORY FUNCTION
// ========================================

/**
 * Create R2StorageService instance from H3Event
 */
export function createR2StorageService(event: H3Event): R2StorageService {
  return new R2StorageService(event);
}
