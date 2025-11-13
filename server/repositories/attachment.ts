import { eq } from "drizzle-orm";
import * as schema from "#server/database/schema";
import { BaseRepository } from "#server/repositories/base";
import { QueryHelpers } from "#server/repositories/helpers/query-builder";
import type {
  Attachment,
  NewAttachment,
} from "#server/database/schema/parts";

// ========================================
// ATTACHMENT REPOSITORY
// ========================================

/**
 * Attachment Repository
 * Handles file attachment records
 */
export class AttachmentRepository extends BaseRepository {
  constructor(db: D1Database) {
    super(db);
  }

  /**
   * Find attachment by ID
   */
  async findById(id: string): Promise<Attachment | null> {
    const result = await this.drizzle
      .select()
      .from(schema.attachments)
      .where(
        QueryHelpers.notDeleted(
          schema.attachments,
          eq(schema.attachments.id, id)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  /**
   * Find attachment by R2 key
   */
  async findByR2Key(r2Key: string): Promise<Attachment | null> {
    const result = await this.drizzle
      .select()
      .from(schema.attachments)
      .where(
        QueryHelpers.notDeleted(
          schema.attachments,
          eq(schema.attachments.r2Key, r2Key)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  /**
   * Create a new attachment
   */
  async create(data: NewAttachment): Promise<Attachment> {
    const [attachment] = await this.drizzle
      .insert(schema.attachments)
      .values(data)
      .returning();

    return attachment;
  }

  /**
   * Update attachment
   */
  async update(
    id: string,
    data: Partial<Omit<Attachment, "id" | "createdAt">>
  ): Promise<Attachment> {
    const [attachment] = await this.drizzle
      .update(schema.attachments)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.attachments.id, id))
      .returning();

    return attachment;
  }

  /**
   * Soft delete attachment
   */
  async softDelete(id: string): Promise<void> {
    await this.drizzle
      .update(schema.attachments)
      .set({ deletedAt: new Date() })
      .where(eq(schema.attachments.id, id));
  }

  /**
   * Find all attachments by uploader
   */
  async findByUploader(uploadedById: string, limit = 50, offset = 0): Promise<Attachment[]> {
    return this.drizzle
      .select()
      .from(schema.attachments)
      .where(
        QueryHelpers.notDeleted(
          schema.attachments,
          eq(schema.attachments.uploadedById, uploadedById)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(schema.attachments.createdAt);
  }
}
