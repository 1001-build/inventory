import { defineEventHandler, readBody } from "h3";
import { createStockLocationService } from "#server/services/stock-location";
import { createSuccessResponse } from "#server/lib/response";
import { createStockLocationSchema } from "#shared/validators/stock-location";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = createStockLocationSchema.parse(body);

  const service = createStockLocationService(event);
  const location = await service.createLocation(validated);

  return createSuccessResponse("Stock location created successfully", location);
});
