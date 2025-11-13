import { defineEventHandler, getQuery } from "h3";
import { createPartCategoryService } from "#server/services/part-category";
import { createSuccessResponse } from "#server/lib/response";
import { partCategoryIdSchema, deletePartCategorySchema } from "#shared/validators/part-category";

// ========================================
// DELETE /api/v1/part-categories/:id
// ========================================
// Delete a part category (soft delete)
// Requires authentication
// ========================================
// Query Parameters:
//   - cascade: If "true", deletes all child categories and parts (default: false)
// ========================================

export default defineEventHandler(async (event) => {
  // Validate path parameter
  const params = partCategoryIdSchema.parse(event.context.params);

  // Parse and validate query parameters
  const rawQuery = getQuery(event);
  const query = deletePartCategorySchema.parse(rawQuery);

  // Delete category
  const service = createPartCategoryService(event);
  await service.deleteCategory(params.id, query.cascade);

  return createSuccessResponse("Part category deleted successfully", null);
});
