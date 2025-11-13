import { defineEventHandler, readBody } from "h3";
import { createStockItemService } from "#server/services/stock-item";
import { createSuccessResponse } from "#server/lib/response";
import { createStockItemSchema } from "#shared/validators/stock-item";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = createStockItemSchema.parse(body);

  // Convert string date to Date object if provided
  const data = {
    ...validated,
    expiryDate: validated.expiryDate ? new Date(validated.expiryDate) : undefined,
  };

  const service = createStockItemService(event);
  const stockItem = await service.createStockItem(data);

  return createSuccessResponse("Stock item created successfully", stockItem);
});
