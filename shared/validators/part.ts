import { z } from "zod";

// ========================================
// PART VALIDATORS
// ========================================

export const createPartSchema = z.object({
  name: z.string().min(1, "Name is required").max(250).trim(),
  description: z.string().max(1000).trim().optional().nullable(),
  categoryId: z.string().uuid("Category ID must be a valid UUID"),
  IPN: z.string().max(100).trim().optional().nullable(),
  revision: z.string().max(50).trim().optional().nullable(),
  keywords: z.string().max(250).trim().optional().nullable(),

  // Boolean attributes
  active: z.boolean().default(true),
  virtual: z.boolean().default(false),
  template: z.boolean().default(false),
  assembly: z.boolean().default(false),
  component: z.boolean().default(false),
  trackable: z.boolean().default(false),
  purchaseable: z.boolean().default(false),
  salable: z.boolean().default(false),
  testable: z.boolean().default(false),
  locked: z.boolean().default(false),

  // Stock settings
  defaultLocationId: z.string().uuid().optional().nullable(),
  minimumStock: z.number().nonnegative().default(0),
  defaultExpiry: z.number().int().positive().optional().nullable(),

  // Units
  units: z.string().max(50).trim().optional().nullable(),

  // Additional
  notes: z.string().max(5000).trim().optional().nullable(),
  link: z.string().url().max(500).optional().nullable(),
  imageId: z.string().uuid().optional().nullable(),

  metadata: z.record(z.unknown()).optional().nullable(),
});

export const updatePartSchema = createPartSchema.partial().omit({ categoryId: true }).extend({
  categoryId: z.string().uuid().optional(),
});

export const partIdSchema = z.object({
  id: z.string().uuid("Part ID must be a valid UUID"),
});

export const listPartsSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  perPage: z.string().regex(/^\d+$/).transform(Number).refine((val) => val <= 100).default("20"),
  search: z.string().max(250).trim().optional(),
  categoryId: z.string().uuid().optional(),
  active: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
  purchaseable: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
  salable: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
  assembly: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt", "IPN"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreatePartInput = z.infer<typeof createPartSchema>;
export type UpdatePartInput = z.infer<typeof updatePartSchema>;
export type PartIdInput = z.infer<typeof partIdSchema>;
export type ListPartsInput = z.infer<typeof listPartsSchema>;
