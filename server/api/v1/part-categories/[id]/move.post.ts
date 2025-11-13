import { defineEventHandler, readBody } from "h3";
import { createPartCategoryService } from "#server/services/part-category";
import { createSuccessResponse } from "#server/lib/response";
import { partCategoryIdSchema, movePartCategorySchema } from "#shared/validators/part-category";

// ========================================
// POST /api/v1/part-categories/:id/move
// ========================================
// Move a category to a new parent
// Updates pathstring and level for the category and all descendants
// Requires authentication
// ========================================

export default defineEventHandler(async (event) => {
  // Validate path parameter
  const params = partCategoryIdSchema.parse(event.context.params);

  // Parse and validate request body
  const body = await readBody(event);
  const validated = movePartCategorySchema.parse(body);

  // Move category
  const service = createPartCategoryService(event);
  await service.moveCategory(params.id, validated.newParentId);

  return createSuccessResponse("Part category moved successfully", null);
});
