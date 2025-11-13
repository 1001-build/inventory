/**
 * User Types
 * Re-exported from server schema for frontend use
 *
 * IMPORTANT: Use SafeUser for frontend to avoid exposing sensitive fields
 */

import type { User as ServerUser } from "#server/database/schema/identity";

export type {
  UserRole,
  NewUserRole,
  UserSettings,
  NewUserSettings,
} from "#server/database/schema/identity";

/**
 * SafeUser - User type without sensitive fields
 * Use this type in frontend code to ensure no sensitive data is exposed
 */
export type SafeUser = Omit<ServerUser, "passwordHash">;

/**
 * Full User type (includes sensitive fields)
 * Only use this in backend code or when explicitly needed
 */
export type User = ServerUser;
