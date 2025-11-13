import { defineEventHandler } from "h3";
import { createPartService } from "#server/services/part";
import { createSuccessResponse } from "#server/lib/response";
import { partIdSchema } from "#shared/validators/part";

export default defineEventHandler(async (event) => {
  const params = partIdSchema.parse(event.context.params);
  const service = createPartService(event);
  await service.deletePart(params.id);
  return createSuccessResponse("Part deleted successfully", null);
});
