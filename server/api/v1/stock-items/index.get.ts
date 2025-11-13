import { defineEventHandler, getQuery } from "h3";
import { createStockItemService } from "#server/services/stock-item";
import { createSuccessResponse } from "#server/lib/response";
import { listStockItemsSchema } from "#shared/validators/stock-item";
import { calculateLimitOffset, buildPaginatedResponse } from "#server/utils/pagination";

export default defineEventHandler(async (event) => {
  const rawQuery = getQuery(event);
  const query = listStockItemsSchema.parse(rawQuery);

  const service = createStockItemService(event);
  const { limit, offset } = calculateLimitOffset(query.page, query.perPage);

  const filters = [];
  if (query.partId) filters.push({ field: "partId", operator: "eq" as const, value: query.partId });
  if (query.locationId) filters.push({ field: "locationId", operator: "eq" as const, value: query.locationId });
  if (query.status) filters.push({ field: "status", operator: "eq" as const, value: query.status });
  if (query.batch) filters.push({ field: "batch", operator: "eq" as const, value: query.batch });

  const result = await service.listStockItems(limit, offset, query.search, filters, query.sortBy, query.sortOrder);
  const response = buildPaginatedResponse(result.data, query.page, query.perPage, result.total);

  return createSuccessResponse("Stock items retrieved successfully", response.items, response.pagination);
});
