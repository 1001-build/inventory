import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createStockItemService } from "#server/services/stock-item";
import { createSuccessResponse } from "#server/lib/response";
import { stockItemIdSchema, updateStockItemSchema } from "#shared/validators/stock-item";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const validated = stockItemIdSchema.parse({ id });

  const body = await readBody(event);
  const data = updateStockItemSchema.parse(body);

  // Convert string date to Date object if provided
  const updateData = {
    ...data,
    expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
  };

  const service = createStockItemService(event);
  const stockItem = await service.updateStockItem(validated.id, updateData);

  return createSuccessResponse("Stock item updated successfully", stockItem);
});
