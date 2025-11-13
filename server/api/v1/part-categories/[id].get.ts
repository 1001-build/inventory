import { defineEventHandler } from "h3";
import { createPartCategoryService } from "#server/services/part-category";
import { createSuccessResponse } from "#server/lib/response";
import { partCategoryIdSchema } from "#shared/validators/part-category";

// ========================================
// GET /api/v1/part-categories/:id
// ========================================
// Get a single part category with details
// Returns category, ancestors (breadcrumb), children, and part count
// ========================================

export default defineEventHandler(async (event) => {
  // Validate path parameter
  const params = partCategoryIdSchema.parse(event.context.params);

  // Get category with details
  const service = createPartCategoryService(event);
  const result = await service.getCategory(params.id);

  return createSuccessResponse("Part category retrieved successfully", result);
});
