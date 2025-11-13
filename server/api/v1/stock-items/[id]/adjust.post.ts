import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createStockItemService } from "#server/services/stock-item";
import { createSuccessResponse } from "#server/lib/response";
import { adjustQuantitySchema } from "#shared/validators/stock-item";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const validated = adjustQuantitySchema.parse({ id, ...body });

  const service = createStockItemService(event);
  const stockItem = await service.adjustQuantity(validated.id, validated.adjustment);

  return createSuccessResponse("Stock quantity adjusted successfully", stockItem);
});
