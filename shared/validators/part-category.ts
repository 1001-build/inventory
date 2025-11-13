import { z } from "zod";

// ========================================
// PART CATEGORY VALIDATORS
// ========================================
// Zod schemas for part category endpoints
// Shared between frontend and backend for consistency
// ========================================

/**
 * Create part category validation schema
 * POST /api/v1/part-categories
 */
export const createPartCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(250, "Name must be less than 250 characters")
    .trim(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .trim()
    .optional()
    .nullable(),
  parentId: z
    .string()
    .uuid("Parent ID must be a valid UUID")
    .optional()
    .nullable(),
  structural: z
    .boolean()
    .default(false)
    .describe("If true, parts cannot be directly assigned to this category"),
  defaultLocationId: z
    .string()
    .uuid("Default location ID must be a valid UUID")
    .optional()
    .nullable(),
  defaultKeywords: z
    .string()
    .max(250, "Default keywords must be less than 250 characters")
    .trim()
    .optional()
    .nullable(),
  icon: z
    .string()
    .max(100, "Icon must be less than 100 characters")
    .trim()
    .optional()
    .nullable(),
  metadata: z
    .record(z.unknown())
    .optional()
    .nullable()
    .describe("Additional metadata as JSON object"),
});

/**
 * Update part category validation schema
 * PUT /api/v1/part-categories/:id
 */
export const updatePartCategorySchema = createPartCategorySchema.partial();

/**
 * Move part category validation schema
 * POST /api/v1/part-categories/:id/move
 */
export const movePartCategorySchema = z.object({
  newParentId: z
    .string()
    .uuid("New parent ID must be a valid UUID")
    .nullable()
    .describe("New parent category ID, or null to move to root"),
});

/**
 * Delete part category query params schema
 * DELETE /api/v1/part-categories/:id?cascade=true
 */
export const deletePartCategorySchema = z.object({
  cascade: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .default("false")
    .describe("If true, deletes all child categories and parts"),
});

/**
 * Part category ID param validation
 * Used in routes like /api/v1/part-categories/:id
 */
export const partCategoryIdSchema = z.object({
  id: z.string().uuid("Category ID must be a valid UUID"),
});

/**
 * List part categories query params schema
 * GET /api/v1/part-categories
 */
export const listPartCategoriesSchema = z.object({
  // Pagination
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .transform(Number)
    .default("1"),
  perPage: z
    .string()
    .regex(/^\d+$/, "Per page must be a number")
    .transform(Number)
    .refine((val) => val <= 100, "Per page cannot exceed 100")
    .default("20"),

  // Search
  search: z
    .string()
    .max(250, "Search term must be less than 250 characters")
    .trim()
    .optional(),

  // Filters
  parentId: z
    .string()
    .uuid("Parent ID must be a valid UUID")
    .optional()
    .describe("Filter by parent category"),
  structural: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional()
    .describe("Filter by structural flag"),

  // Sorting
  sortBy: z
    .enum(["name", "createdAt", "updatedAt", "level"])
    .default("name")
    .describe("Field to sort by"),
  sortOrder: z
    .enum(["asc", "desc"])
    .default("asc")
    .describe("Sort direction"),

  // Tree options
  tree: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .default("false")
    .describe("Return hierarchical tree structure instead of flat list"),
  maxDepth: z
    .string()
    .regex(/^\d+$/, "Max depth must be a number")
    .transform(Number)
    .optional()
    .describe("Maximum tree depth (only applicable when tree=true)"),
});

/**
 * Get category tree query params schema
 * GET /api/v1/part-categories/tree
 */
export const getCategoryTreeSchema = z.object({
  maxDepth: z
    .string()
    .regex(/^\d+$/, "Max depth must be a number")
    .transform(Number)
    .optional()
    .describe("Maximum tree depth to retrieve"),
  parentId: z
    .string()
    .uuid("Parent ID must be a valid UUID")
    .optional()
    .nullable()
    .describe("Get tree starting from this parent (default: root)"),
});

// ========================================
// TYPE EXPORTS
// ========================================

export type CreatePartCategoryInput = z.infer<typeof createPartCategorySchema>;
export type UpdatePartCategoryInput = z.infer<typeof updatePartCategorySchema>;
export type MovePartCategoryInput = z.infer<typeof movePartCategorySchema>;
export type DeletePartCategoryInput = z.infer<typeof deletePartCategorySchema>;
export type PartCategoryIdInput = z.infer<typeof partCategoryIdSchema>;
export type ListPartCategoriesInput = z.infer<typeof listPartCategoriesSchema>;
export type GetCategoryTreeInput = z.infer<typeof getCategoryTreeSchema>;
