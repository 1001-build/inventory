import { defineEventHandler } from "h3";
import { createPartService } from "#server/services/part";
import { createSuccessResponse } from "#server/lib/response";
import { partIdSchema } from "#shared/validators/part";

export default defineEventHandler(async (event) => {
  const params = partIdSchema.parse(event.context.params);
  const service = createPartService(event);
  const part = await service.getPart(params.id);
  return createSuccessResponse("Part retrieved successfully", part);
});
