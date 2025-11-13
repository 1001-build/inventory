import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createStockLocationService } from "#server/services/stock-location";
import { createSuccessResponse } from "#server/lib/response";
import { stockLocationIdSchema, updateStockLocationSchema } from "#shared/validators/stock-location";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const validated = stockLocationIdSchema.parse({ id });

  const body = await readBody(event);
  const data = updateStockLocationSchema.parse(body);

  const service = createStockLocationService(event);
  const location = await service.updateLocation(validated.id, data);

  return createSuccessResponse("Stock location updated successfully", location);
});
