import { defineEventHandler, getQuery } from "h3";
import { createPartService } from "#server/services/part";
import { createSuccessResponse } from "#server/lib/response";
import { listPartsSchema } from "#shared/validators/part";
import { calculateLimitOffset, buildPaginatedResponse } from "#server/utils/pagination";

export default defineEventHandler(async (event) => {
  const rawQuery = getQuery(event);
  const query = listPartsSchema.parse(rawQuery);

  const service = createPartService(event);
  const { limit, offset } = calculateLimitOffset(query.page, query.perPage);

  const filters = [];
  if (query.categoryId) filters.push({ field: "categoryId", operator: "eq" as const, value: query.categoryId });
  if (query.active !== undefined) filters.push({ field: "active", operator: "eq" as const, value: query.active });
  if (query.purchaseable !== undefined) filters.push({ field: "purchaseable", operator: "eq" as const, value: query.purchaseable });
  if (query.salable !== undefined) filters.push({ field: "salable", operator: "eq" as const, value: query.salable });
  if (query.assembly !== undefined) filters.push({ field: "assembly", operator: "eq" as const, value: query.assembly });

  const result = await service.listParts(limit, offset, query.search, filters, query.sortBy, query.sortOrder);
  const response = buildPaginatedResponse(result.data, query.page, query.perPage, result.total);

  return createSuccessResponse("Parts retrieved successfully", response.items, response.pagination);
});
