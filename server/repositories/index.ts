// ========================================
// REPOSITORY INDEX
// ========================================
// Central export point for all repositories
// ========================================

// Base repositories
export * from "./base";

// Identity repositories
export {
  UserRepository,
  UserSettingsRepository,
  AuditLogRepository,
} from "./identity";

// RBAC repositories
export {
  RoleRepository,
  UserRoleRepository,
  PermissionRepository,
} from "./rbac";

// Parts repositories
export {
  PartCategoryRepository,
} from "./part-category";

export {
  PartRepository,
} from "./part";

export {
  AttachmentRepository,
} from "./attachment";

// Stock repositories
export {
  StockLocationRepository,
} from "./stock-location";

export {
  StockItemRepository,
} from "./stock-item";

// Import for factory functions
import {
  UserRepository,
  UserSettingsRepository,
  AuditLogRepository,
} from "./identity";

import {
  RoleRepository,
  UserRoleRepository,
  PermissionRepository,
} from "./rbac";

import { PartCategoryRepository } from "./part-category";
import { PartRepository } from "./part";
import { AttachmentRepository } from "./attachment";
import { StockLocationRepository } from "./stock-location";
import { StockItemRepository } from "./stock-item";

// ========================================
// FACTORY FUNCTIONS
// ========================================

/**
 * Create all identity repositories
 */
export function createIdentityRepositories(db: D1Database) {
  return {
    userRepo: new UserRepository(db),
    userSettingsRepo: new UserSettingsRepository(db),
    auditLogRepo: new AuditLogRepository(db),
  };
}

/**
 * Create all RBAC repositories
 */
export function createRBACRepositories(db: D1Database) {
  return {
    roleRepo: new RoleRepository(db),
    userRoleRepo: new UserRoleRepository(db),
    permissionRepo: new PermissionRepository(db),
  };
}

/**
 * Create all parts repositories
 */
export function createPartsRepositories(db: D1Database) {
  return {
    partCategoryRepo: new PartCategoryRepository(db),
    partRepo: new PartRepository(db),
    attachmentRepo: new AttachmentRepository(db),
  };
}

/**
 * Create all stock repositories
 */
export function createStockRepositories(db: D1Database) {
  return {
    stockLocationRepo: new StockLocationRepository(db),
    stockItemRepo: new StockItemRepository(db),
  };
}

/**
 * Create all repositories
 */
export function createRepositories(db: D1Database) {
  return {
    ...createIdentityRepositories(db),
    ...createRBACRepositories(db),
    ...createPartsRepositories(db),
    ...createStockRepositories(db),
  };
}

/**
 * Create all repositories from H3Event context
 * Convenience function for route handlers that need repository access
 */
export function createRepositoriesFromEvent(event: any) {
  const db = event.context.cloudflare?.env?.DB as D1Database;

  if (!db) {
    throw new Error("Database not available in context");
  }

  return createRepositories(db);
}
