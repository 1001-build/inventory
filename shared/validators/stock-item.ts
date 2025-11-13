import { z } from "zod";

// ========================================
// STOCK ITEM VALIDATORS
// ========================================

export const stockStatusEnum = z.enum([
  "OK",
  "DAMAGED",
  "DESTROYED",
  "REJECTED",
  "LOST",
  "QUARANTINED",
]);

export const createStockItemSchema = z.object({
  partId: z.string().uuid("Part ID must be a valid UUID"),
  locationId: z.string().uuid("Location ID must be a valid UUID"),
  quantity: z.number().positive("Quantity must be greater than 0"),
  batch: z.string().max(100).trim().optional().nullable(),
  serial: z.string().max(100).trim().optional().nullable(),
  status: stockStatusEnum.default("OK"),
  expiryDate: z.string().datetime().optional().nullable(),
  purchasePrice: z.number().nonnegative().optional().nullable(),
  notes: z.string().max(5000).trim().optional().nullable(),
});

export const updateStockItemSchema = z.object({
  status: stockStatusEnum.optional(),
  expiryDate: z.string().datetime().optional().nullable(),
  purchasePrice: z.number().nonnegative().optional().nullable(),
  notes: z.string().max(5000).trim().optional().nullable(),
  batch: z.string().max(100).trim().optional().nullable(),
});

export const stockItemIdSchema = z.object({
  id: z.string().uuid("Stock Item ID must be a valid UUID"),
});

export const moveStockItemSchema = z.object({
  id: z.string().uuid("Stock Item ID must be a valid UUID"),
  locationId: z.string().uuid("Location ID must be a valid UUID"),
});

export const adjustQuantitySchema = z.object({
  id: z.string().uuid("Stock Item ID must be a valid UUID"),
  adjustment: z.number().refine((val) => val !== 0, "Adjustment cannot be zero"),
});

export const listStockItemsSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  perPage: z.string().regex(/^\d+$/).transform(Number).refine((val) => val <= 100).default("20"),
  search: z.string().max(250).trim().optional(),
  partId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  status: stockStatusEnum.optional(),
  batch: z.string().max(100).trim().optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "quantity", "expiryDate"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const getPartStockLevelSchema = z.object({
  partId: z.string().uuid("Part ID must be a valid UUID"),
  status: stockStatusEnum.optional().default("OK"),
});

export type CreateStockItemInput = z.infer<typeof createStockItemSchema>;
export type UpdateStockItemInput = z.infer<typeof updateStockItemSchema>;
export type StockItemIdInput = z.infer<typeof stockItemIdSchema>;
export type MoveStockItemInput = z.infer<typeof moveStockItemSchema>;
export type AdjustQuantityInput = z.infer<typeof adjustQuantitySchema>;
export type ListStockItemsInput = z.infer<typeof listStockItemsSchema>;
export type GetPartStockLevelInput = z.infer<typeof getPartStockLevelSchema>;
