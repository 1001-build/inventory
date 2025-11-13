import { defineEventHandler, readMultipartFormData } from "h3";
import { createR2StorageService } from "#server/services/r2-storage";
import { createSuccessResponse } from "#server/lib/response";
import { ValidationError, AuthenticationError } from "#server/error/errors";
import { AttachmentRepository } from "#server/repositories/attachment";
import { getDatabase } from "#server/database/utils";

// ========================================
// POST /api/v1/upload
// ========================================
// Upload a file to R2 storage
// Creates an attachment record in the database
// Requires authentication
// ========================================
// Accepts multipart/form-data with:
//   - file: The file to upload
//   - folder: Optional folder name (defaults to "uploads")
// ========================================

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  // Documents
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.ms-excel", // xls
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/msword", // doc
  "text/csv",
  "text/plain",
];

export default defineEventHandler(async (event) => {
  // Validate authentication
  const userId = event.context.userId;
  if (!userId) {
    throw new AuthenticationError("User not authenticated");
  }

  // Parse multipart form data
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw new ValidationError("No file uploaded", { field: "file" });
  }

  // Find file in form data
  const fileField = formData.find((field) => field.name === "file");
  if (!fileField || !fileField.data) {
    throw new ValidationError("No file uploaded", { field: "file" });
  }

  // Get optional folder parameter
  const folderField = formData.find((field) => field.name === "folder");
  const folder = folderField?.data?.toString() || "uploads";

  // Validate file
  const fileName = fileField.filename || "unnamed-file";
  const mimeType = fileField.type || "application/octet-stream";
  const fileSize = fileField.data.length;

  // Check file size
  if (fileSize > MAX_FILE_SIZE) {
    throw new ValidationError(
      `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      {
        field: "file",
        size: fileSize,
        maxSize: MAX_FILE_SIZE,
      }
    );
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new ValidationError(`File type ${mimeType} is not allowed`, {
      field: "file",
      mimeType,
      allowedTypes: ALLOWED_MIME_TYPES,
    });
  }

  // Upload to R2
  const r2Service = createR2StorageService(event);
  const { key, url } = await r2Service.uploadFile(
    fileField.data,
    fileName,
    mimeType,
    folder
  );

  // Create attachment record
  const db = getDatabase(event);
  const attachmentRepo = new AttachmentRepository(db);

  const attachment = await attachmentRepo.create({
    fileName,
    fileType: mimeType,
    fileSize,
    r2Key: key,
    r2Url: url,
    uploadedById: userId,
  });

  return createSuccessResponse("File uploaded successfully", attachment);
});
