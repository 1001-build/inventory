import { z } from "zod";

// ========================================
// STOCK LOCATION VALIDATORS
// ========================================

export const createStockLocationSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).trim(),
  description: z.string().max(1000).trim().optional().nullable(),
  parentId: z.string().uuid("Parent ID must be a valid UUID").optional().nullable(),
  structural: z.boolean().default(false),
  external: z.boolean().default(false),
});

export const updateStockLocationSchema = createStockLocationSchema.partial().omit({ parentId: true });

export const stockLocationIdSchema = z.object({
  id: z.string().uuid("Stock Location ID must be a valid UUID"),
});

export const deleteStockLocationSchema = z.object({
  id: z.string().uuid("Stock Location ID must be a valid UUID"),
  cascade: z.enum(["true", "false"]).transform((val) => val === "true").optional().default("false"),
});

export const listStockLocationsSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  perPage: z.string().regex(/^\d+$/).transform(Number).refine((val) => val <= 100).default("20"),
  search: z.string().max(250).trim().optional(),
  parentId: z.string().uuid().optional(),
  structural: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
  external: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const getStockLocationTreeSchema = z.object({
  parentId: z.string().uuid().optional(),
});

export type CreateStockLocationInput = z.infer<typeof createStockLocationSchema>;
export type UpdateStockLocationInput = z.infer<typeof updateStockLocationSchema>;
export type StockLocationIdInput = z.infer<typeof stockLocationIdSchema>;
export type DeleteStockLocationInput = z.infer<typeof deleteStockLocationSchema>;
export type ListStockLocationsInput = z.infer<typeof listStockLocationsSchema>;
export type GetStockLocationTreeInput = z.infer<typeof getStockLocationTreeSchema>;
