import {
  sqliteTable,
  text,
  integer,
  index,
  unique,
  real,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { baseFields } from "./base";
import { users } from "./identity";
import { parts } from "./parts";

// ============================================================================
// STOCK DOMAIN - Stock Location and Item Management
// ============================================================================

/**
 * Stock Location Types table
 * Predefined types like Warehouse, Room, Shelf, Bin, Drawer
 */
export const stockLocationTypes = sqliteTable(
  "stock_location_types",
  {
    ...baseFields,

    name: text("name").notNull(),
    description: text("description"),
    icon: text("icon"),

    // Metadata for extensibility
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
  },
  (table) => ({
    nameIdx: index("stock_location_types_name_idx").on(table.name),
  })
);

/**
 * Stock Locations table
 * Hierarchical organization of stock storage locations
 */
export const stockLocations = sqliteTable(
  "stock_locations",
  {
    ...baseFields,

    // Core fields
    name: text("name").notNull(),
    description: text("description"),

    // Tree structure (similar to part categories)
    parentId: text("parent_id"),
    pathstring: text("pathstring").notNull(),
    level: integer("level").notNull().default(0),

    // Location type
    locationTypeId: text("location_type_id"),

    // Structural locations cannot have stock items directly
    structural: integer("structural", { mode: "boolean" })
      .default(false)
      .notNull(),

    // Icon for display
    customIcon: text("custom_icon"),

    // Metadata
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
  },
  (table) => ({
    parentIdx: index("stock_locations_parent_idx").on(table.parentId),
    pathstringIdx: index("stock_locations_pathstring_idx").on(table.pathstring),
    levelIdx: index("stock_locations_level_idx").on(table.level),
    nameIdx: index("stock_locations_name_idx").on(table.name),
    locationTypeIdx: index("stock_locations_location_type_idx").on(table.locationTypeId),
    deletedIdx: index("stock_locations_deleted_idx").on(table.deletedAt),
  })
);

/**
 * Stock Items table
 * Individual stock items with batch/serial tracking
 */
export const stockItems = sqliteTable(
  "stock_items",
  {
    ...baseFields,

    // Part reference
    partId: text("part_id").notNull(),

    // Location
    locationId: text("location_id").notNull(),

    // Quantity (decimal for non-serial items)
    quantity: real("quantity").notNull().default(1),

    // Batch and serial tracking
    batch: text("batch"),
    serial: text("serial"),

    // Status
    status: text("status", {
      enum: ["OK", "DAMAGED", "DESTROYED", "REJECTED", "LOST", "QUARANTINED"],
    })
      .notNull()
      .default("OK"),

    // Stocktake
    stocktakeDate: integer("stocktake_date", { mode: "timestamp" }),
    stocktakeUserId: text("stocktake_user_id"),

    // Supplier and order references
    supplierPartId: text("supplier_part_id"), // FK to supplier_parts (future)
    purchaseOrderId: text("purchase_order_id"), // FK to purchase_orders (future)

    // Sales order reference
    salesOrderId: text("sales_order_id"), // FK to sales_orders (future)

    // Build reference
    buildId: text("build_id"), // FK to build_orders (future)

    // Hierarchical stock items (for assemblies)
    belongsToId: text("belongs_to_id"), // FK to stock_items (parent item)
    parentId: text("parent_id"), // FK to stock_items (for sub-items)

    // Expiry
    expiryDate: integer("expiry_date", { mode: "timestamp" }),

    // Packaging
    packaging: text("packaging"),

    // Additional info
    notes: text("notes"),
    link: text("link"),

    // Owner (for consignment stock)
    ownerId: text("owner_id"), // FK to users

    // Metadata
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
  },
  (table) => ({
    partIdx: index("stock_items_part_idx").on(table.partId),
    locationIdx: index("stock_items_location_idx").on(table.locationId),
    batchIdx: index("stock_items_batch_idx").on(table.batch),
    serialUnique: unique("stock_items_serial_unique").on(table.serial),
    statusIdx: index("stock_items_status_idx").on(table.status),
    expiryIdx: index("stock_items_expiry_idx").on(table.expiryDate),
    deletedIdx: index("stock_items_deleted_idx").on(table.deletedAt),
  })
);

/**
 * Stock Item Tracking table
 * Complete audit trail of all stock movements and changes
 */
export const stockItemTracking = sqliteTable(
  "stock_item_tracking",
  {
    ...baseFields,

    stockItemId: text("stock_item_id").notNull(),

    // Tracking type
    trackingType: text("tracking_type", {
      enum: [
        "CREATED",
        "MOVED",
        "COUNTED",
        "ADDED",
        "REMOVED",
        "UPDATED",
        "ASSIGNED_SERIAL",
        "ASSIGNED_BATCH",
        "MERGED",
        "SPLIT",
        "BUILD_OUTPUT",
        "PURCHASE_ORDER_RECEIVED",
        "SALES_ORDER_SHIPPED",
        "RETURNED",
        "INSTALLED",
        "REMOVED_FROM_ASSEMBLY",
      ],
    }).notNull(),

    // Quantity change (can be negative for removals)
    quantity: real("quantity"),

    // Location tracking
    locationIdFrom: text("location_id_from"),
    locationIdTo: text("location_id_to"),

    // Notes
    notes: text("notes"),

    // User who performed the action
    userId: text("user_id").notNull(),

    // Deltas (before/after state)
    deltas: text("deltas", { mode: "json" }).$type<Record<string, unknown>>(),

    // Metadata
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
  },
  (table) => ({
    stockItemIdx: index("stock_item_tracking_stock_item_idx").on(table.stockItemId),
    trackingTypeIdx: index("stock_item_tracking_tracking_type_idx").on(table.trackingType),
    userIdx: index("stock_item_tracking_user_idx").on(table.userId),
    createdAtIdx: index("stock_item_tracking_created_at_idx").on(table.createdAt),
  })
);

/**
 * Stock Item Test Results table
 * Test results for testable parts
 */
export const stockItemTestResults = sqliteTable(
  "stock_item_test_results",
  {
    ...baseFields,

    stockItemId: text("stock_item_id").notNull(),
    testTemplateId: text("test_template_id"), // FK to test_templates (future)

    // Result
    result: integer("result", { mode: "boolean" }).notNull(),
    value: text("value"),
    notes: text("notes"),

    // Attachment
    attachmentId: text("attachment_id"),

    // User who performed test
    userId: text("user_id").notNull(),
  },
  (table) => ({
    stockItemIdx: index("stock_item_test_results_stock_item_idx").on(table.stockItemId),
    userIdx: index("stock_item_test_results_user_idx").on(table.userId),
    resultIdx: index("stock_item_test_results_result_idx").on(table.result),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

/**
 * Stock Location Type Relations
 */
export const stockLocationTypeRelations = relations(stockLocationTypes, ({ many }) => ({
  locations: many(stockLocations),
}));

/**
 * Stock Location Relations
 */
export const stockLocationRelations = relations(stockLocations, ({ one, many }) => ({
  // Self-referential for tree structure
  parent: one(stockLocations, {
    fields: [stockLocations.parentId],
    references: [stockLocations.id],
    relationName: "stockLocationTree",
  }),
  children: many(stockLocations, {
    relationName: "stockLocationTree",
  }),

  // Location type
  locationType: one(stockLocationTypes, {
    fields: [stockLocations.locationTypeId],
    references: [stockLocationTypes.id],
  }),

  // Stock items in this location
  stockItems: many(stockItems),
}));

/**
 * Stock Item Relations
 */
export const stockItemRelations = relations(stockItems, ({ one, many }) => ({
  // Part
  part: one(parts, {
    fields: [stockItems.partId],
    references: [parts.id],
  }),

  // Location
  location: one(stockLocations, {
    fields: [stockItems.locationId],
    references: [stockLocations.id],
  }),

  // Owner
  owner: one(users, {
    fields: [stockItems.ownerId],
    references: [users.id],
  }),

  // Stocktake user
  stocktakeUser: one(users, {
    fields: [stockItems.stocktakeUserId],
    references: [users.id],
  }),

  // Hierarchical (for assemblies)
  belongsTo: one(stockItems, {
    fields: [stockItems.belongsToId],
    references: [stockItems.id],
    relationName: "stockItemHierarchy",
  }),
  parent: one(stockItems, {
    fields: [stockItems.parentId],
    references: [stockItems.id],
    relationName: "stockItemParent",
  }),

  // Tracking history
  trackingHistory: many(stockItemTracking),

  // Test results
  testResults: many(stockItemTestResults),
}));

/**
 * Stock Item Tracking Relations
 */
export const stockItemTrackingRelations = relations(stockItemTracking, ({ one }) => ({
  stockItem: one(stockItems, {
    fields: [stockItemTracking.stockItemId],
    references: [stockItems.id],
  }),
  user: one(users, {
    fields: [stockItemTracking.userId],
    references: [users.id],
  }),
  locationFrom: one(stockLocations, {
    fields: [stockItemTracking.locationIdFrom],
    references: [stockLocations.id],
    relationName: "trackingLocationFrom",
  }),
  locationTo: one(stockLocations, {
    fields: [stockItemTracking.locationIdTo],
    references: [stockLocations.id],
    relationName: "trackingLocationTo",
  }),
}));

/**
 * Stock Item Test Result Relations
 */
export const stockItemTestResultRelations = relations(stockItemTestResults, ({ one }) => ({
  stockItem: one(stockItems, {
    fields: [stockItemTestResults.stockItemId],
    references: [stockItems.id],
  }),
  user: one(users, {
    fields: [stockItemTestResults.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Stock Location Types
export type StockLocationType = typeof stockLocationTypes.$inferSelect;
export type NewStockLocationType = typeof stockLocationTypes.$inferInsert;

// Stock Locations
export type StockLocation = typeof stockLocations.$inferSelect;
export type NewStockLocation = typeof stockLocations.$inferInsert;

// Stock Items
export type StockItem = typeof stockItems.$inferSelect;
export type NewStockItem = typeof stockItems.$inferInsert;

// Stock Item Tracking
export type StockItemTracking = typeof stockItemTracking.$inferSelect;
export type NewStockItemTracking = typeof stockItemTracking.$inferInsert;

// Stock Item Test Results
export type StockItemTestResult = typeof stockItemTestResults.$inferSelect;
export type NewStockItemTestResult = typeof stockItemTestResults.$inferInsert;
