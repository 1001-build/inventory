import { defineEventHandler, getQuery } from "h3";
import { createPartCategoryService } from "#server/services/part-category";
import { createSuccessResponse } from "#server/lib/response";
import { listPartCategoriesSchema } from "#shared/validators/part-category";
import { validateFilters } from "#server/utils/query-parser";
import { calculateLimitOffset, buildPaginatedResponse } from "#server/utils/pagination";

// ========================================
// GET /api/v1/part-categories
// ========================================
// List part categories with pagination, filtering, and sorting
// Optionally return hierarchical tree structure
// ========================================
// Query Parameters:
//   - page: Page number (default: 1)
//   - perPage: Items per page (default: 20, max: 100)
//   - search: Search term for name/description
//   - sortBy: Field to sort by (name, createdAt, updatedAt, level)
//   - sortOrder: Sort order (asc, desc)
//   - parentId: Filter by parent category
//   - structural: Filter by structural flag (true/false)
//   - tree: Return hierarchical tree structure (true/false, default: false)
//   - maxDepth: Maximum tree depth (only with tree=true)
// ========================================

export default defineEventHandler(async (event) => {
  // Parse and validate query parameters
  const rawQuery = getQuery(event);
  const query = listPartCategoriesSchema.parse(rawQuery);

  const service = createPartCategoryService(event);

  // If tree mode requested, return hierarchical structure
  if (query.tree) {
    const tree = await service.getCategoryTree(query.maxDepth);
    return createSuccessResponse("Category tree retrieved successfully", tree);
  }

  // Otherwise, return flat paginated list
  const { limit, offset } = calculateLimitOffset(query.page, query.perPage);

  // Build filters
  const filters = [];
  if (query.parentId) {
    filters.push({ field: "parentId", operator: "eq" as const, value: query.parentId });
  }
  if (query.structural !== undefined) {
    filters.push({ field: "structural", operator: "eq" as const, value: query.structural });
  }

  // Get categories and count
  const result = await service.listCategories(
    limit,
    offset,
    query.search,
    filters,
    query.sortBy,
    query.sortOrder
  );

  // Build paginated response
  const response = buildPaginatedResponse(
    result.data,
    query.page,
    query.perPage,
    result.total
  );

  return createSuccessResponse(
    "Part categories retrieved successfully",
    response.items,
    response.pagination
  );
});
