import { defineEventHandler, getRouterParam, getQuery } from "h3";
import { createStockLocationService } from "#server/services/stock-location";
import { createSuccessResponse } from "#server/lib/response";
import { deleteStockLocationSchema } from "#shared/validators/stock-location";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const rawQuery = getQuery(event);
  const validated = deleteStockLocationSchema.parse({ id, ...rawQuery });

  const service = createStockLocationService(event);
  await service.deleteLocation(validated.id, validated.cascade);

  return createSuccessResponse("Stock location deleted successfully", null);
});
