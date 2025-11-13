import { defineEventHandler, readBody } from "h3";
import { createPartCategoryService } from "#server/services/part-category";
import { createSuccessResponse } from "#server/lib/response";
import { createPartCategorySchema } from "#shared/validators/part-category";

// ========================================
// POST /api/v1/part-categories
// ========================================
// Create a new part category
// Requires authentication
// ========================================

export default defineEventHandler(async (event) => {
  // Parse and validate request body
  const body = await readBody(event);
  const validated = createPartCategorySchema.parse(body);

  // Create category
  const service = createPartCategoryService(event);
  const category = await service.createCategory(validated);

  return createSuccessResponse("Part category created successfully", category);
});
