import { defineEventHandler, getRouterParam } from "h3";
import { createStockItemService } from "#server/services/stock-item";
import { createSuccessResponse } from "#server/lib/response";
import { stockItemIdSchema } from "#shared/validators/stock-item";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const validated = stockItemIdSchema.parse({ id });

  const service = createStockItemService(event);
  const stockItem = await service.getStockItem(validated.id);

  return createSuccessResponse("Stock item retrieved successfully", stockItem);
});
