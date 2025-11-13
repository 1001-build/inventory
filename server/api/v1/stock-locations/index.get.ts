import { defineEventHandler, getQuery } from "h3";
import { createStockLocationService } from "#server/services/stock-location";
import { createSuccessResponse } from "#server/lib/response";
import { listStockLocationsSchema } from "#shared/validators/stock-location";
import { calculateLimitOffset, buildPaginatedResponse } from "#server/utils/pagination";

export default defineEventHandler(async (event) => {
  const rawQuery = getQuery(event);
  const query = listStockLocationsSchema.parse(rawQuery);

  const service = createStockLocationService(event);
  const { limit, offset } = calculateLimitOffset(query.page, query.perPage);

  const filters = [];
  if (query.parentId) filters.push({ field: "parentId", operator: "eq" as const, value: query.parentId });
  if (query.structural !== undefined) filters.push({ field: "structural", operator: "eq" as const, value: query.structural });
  if (query.external !== undefined) filters.push({ field: "external", operator: "eq" as const, value: query.external });

  const result = await service.listLocations(limit, offset, query.search, filters, query.sortBy, query.sortOrder);
  const response = buildPaginatedResponse(result.data, query.page, query.perPage, result.total);

  return createSuccessResponse("Stock locations retrieved successfully", response.items, response.pagination);
});
