import { defineEventHandler, readBody } from "h3";
import { createPartService } from "#server/services/part";
import { createSuccessResponse } from "#server/lib/response";
import { partIdSchema, updatePartSchema } from "#shared/validators/part";

export default defineEventHandler(async (event) => {
  const params = partIdSchema.parse(event.context.params);
  const body = await readBody(event);
  const validated = updatePartSchema.parse(body);

  const service = createPartService(event);
  const part = await service.updatePart(params.id, validated);

  return createSuccessResponse("Part updated successfully", part);
});
