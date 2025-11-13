import { defineEventHandler, getRouterParam } from "h3";
import { createStockLocationService } from "#server/services/stock-location";
import { createSuccessResponse } from "#server/lib/response";
import { stockLocationIdSchema } from "#shared/validators/stock-location";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const validated = stockLocationIdSchema.parse({ id });

  const service = createStockLocationService(event);
  const location = await service.getLocation(validated.id);

  return createSuccessResponse("Stock location retrieved successfully", location);
});
