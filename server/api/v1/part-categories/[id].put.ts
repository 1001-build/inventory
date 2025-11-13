import { defineEventHandler, readBody } from "h3";
import { createPartCategoryService } from "#server/services/part-category";
import { createSuccessResponse } from "#server/lib/response";
import { partCategoryIdSchema, updatePartCategorySchema } from "#shared/validators/part-category";

// ========================================
// PUT /api/v1/part-categories/:id
// ========================================
// Update a part category
// Requires authentication
// ========================================

export default defineEventHandler(async (event) => {
  // Validate path parameter
  const params = partCategoryIdSchema.parse(event.context.params);

  // Parse and validate request body
  const body = await readBody(event);
  const validated = updatePartCategorySchema.parse(body);

  // Update category
  const service = createPartCategoryService(event);
  const category = await service.updateCategory(params.id, validated);

  return createSuccessResponse("Part category updated successfully", category);
});
