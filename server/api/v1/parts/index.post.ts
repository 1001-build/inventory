import { defineEventHandler, readBody } from "h3";
import { createPartService } from "#server/services/part";
import { createSuccessResponse } from "#server/lib/response";
import { createPartSchema } from "#shared/validators/part";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validated = createPartSchema.parse(body);

  const service = createPartService(event);
  const part = await service.createPart(validated);

  return createSuccessResponse("Part created successfully", part);
});
