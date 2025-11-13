import { defineEventHandler, getQuery } from "h3";
import { createStockLocationService } from "#server/services/stock-location";
import { createSuccessResponse } from "#server/lib/response";
import { getStockLocationTreeSchema } from "#shared/validators/stock-location";

export default defineEventHandler(async (event) => {
  const rawQuery = getQuery(event);
  const query = getStockLocationTreeSchema.parse(rawQuery);

  const service = createStockLocationService(event);
  const tree = await service.getLocationTree(query.parentId);

  return createSuccessResponse("Stock location tree retrieved successfully", tree);
});
