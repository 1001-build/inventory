import type { H3Event } from "h3";
import { PartRepository } from "#server/repositories/part";
import { PartCategoryRepository } from "#server/repositories/part-category";
import { AuditLogRepository } from "#server/repositories/identity";
import {
  AuthenticationError,
  ValidationError,
  InternalServerError,
} from "#server/error/errors";
import type { Part, NewPart } from "#server/database/schema/parts";
import { getDatabase } from "#server/database/utils";
import type { Filter, SortOrder } from "#server/types/api";

// ========================================
// PART SERVICE
// ========================================

export class PartService {
  private readonly db: D1Database;
  private readonly userId?: string;

  constructor(
    private readonly event: H3Event,
    db: D1Database,
    private readonly partRepo: PartRepository,
    private readonly partCategoryRepo: PartCategoryRepository,
    private readonly auditLogRepo: AuditLogRepository
  ) {
    if (!db) {
      throw new InternalServerError("Database not found in event context");
    }
    this.db = db;
    this.userId = event.context.userId;
  }

  private async logAudit(action: string, entityId: string, metadata?: Record<string, any>) {
    if (!this.userId) return;
    return this.auditLogRepo.log(this.userId, action, "Part", entityId, {
      requestId: this.event.context.requestId,
      endpoint: this.event.context.endpoint,
      method: this.event.context.method,
      ipAddress: this.event.context.ipAddress,
      userAgent: this.event.context.userAgent,
      metadata,
    });
  }

  async createPart(data: Omit<NewPart, "createdById" | "updatedById">): Promise<Part> {
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    // Validate category exists
    const category = await this.partCategoryRepo.findById(data.categoryId);
    if (!category) {
      throw new ValidationError("Category not found", {
        field: "categoryId",
        value: data.categoryId,
      });
    }

    // Check if category is structural
    if (category.structural) {
      throw new ValidationError(
        "Cannot assign parts to structural category",
        { field: "categoryId", categoryId: data.categoryId }
      );
    }

    // Validate IPN uniqueness if provided
    if (data.IPN) {
      const existing = await this.partRepo.findByIPN(data.IPN);
      if (existing) {
        throw new ValidationError("IPN already exists", {
          field: "IPN",
          value: data.IPN,
          existingPartId: existing.id,
        });
      }
    }

    // Create part
    const part = await this.partRepo.create({
      ...data,
      createdById: this.userId,
      updatedById: this.userId,
    });

    await this.logAudit("PART_CREATED", part.id, { name: part.name });

    return part;
  }

  async updatePart(
    id: string,
    data: Partial<Omit<Part, "id" | "createdAt" | "createdById">>
  ): Promise<Part> {
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    const existing = await this.partRepo.findById(id);
    if (!existing) {
      throw new ValidationError("Part not found", { field: "id", value: id });
    }

    // Check if part is locked
    if (existing.locked) {
      throw new ValidationError("Cannot update locked part", {
        partId: id,
        locked: true,
      });
    }

    // If updating IPN, check uniqueness
    if (data.IPN && data.IPN !== existing.IPN) {
      const ipnExists = await this.partRepo.findByIPN(data.IPN);
      if (ipnExists && ipnExists.id !== id) {
        throw new ValidationError("IPN already exists", {
          field: "IPN",
          value: data.IPN,
        });
      }
    }

    const part = await this.partRepo.update(id, {
      ...data,
      updatedById: this.userId,
    });

    await this.logAudit("PART_UPDATED", id, { changes: data });

    return part;
  }

  async deletePart(id: string): Promise<void> {
    if (!this.userId) {
      throw new AuthenticationError("User not authenticated");
    }

    const existing = await this.partRepo.findById(id);
    if (!existing) {
      throw new ValidationError("Part not found", { field: "id", value: id });
    }

    if (existing.locked) {
      throw new ValidationError("Cannot delete locked part", {
        partId: id,
        locked: true,
      });
    }

    await this.partRepo.softDelete(id);
    await this.logAudit("PART_DELETED", id);
  }

  async getPart(id: string) {
    const part = await this.partRepo.findById(id);
    if (!part) {
      throw new ValidationError("Part not found", { field: "id", value: id });
    }
    return part;
  }

  async listParts(
    limit = 100,
    offset = 0,
    searchTerm?: string,
    filters?: Filter[],
    sortBy = "name",
    sortOrder: SortOrder = "asc"
  ) {
    const [parts, total] = await Promise.all([
      this.partRepo.findAll(limit, offset, searchTerm, filters, sortBy, sortOrder),
      this.partRepo.count(filters),
    ]);
    return { data: parts, total };
  }

  async searchParts(searchTerm: string, limit = 50, offset = 0) {
    return this.partRepo.search(searchTerm, limit, offset);
  }
}

export function createPartService(event: H3Event): PartService {
  const db = getDatabase(event);
  if (!db) {
    throw new InternalServerError("Database not available in context");
  }
  return new PartService(
    event,
    db,
    new PartRepository(db),
    new PartCategoryRepository(db),
    new AuditLogRepository(db)
  );
}
