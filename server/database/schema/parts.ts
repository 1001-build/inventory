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

// ============================================================================
// PARTS DOMAIN - Inventory Part Management
// ============================================================================

/**
 * Part Categories table
 * Hierarchical organization of parts using simple parent_id approach
 * D1/SQLite supports recursive CTEs for tree traversal
 */
export const partCategories = sqliteTable(
  "part_categories",
  {
    ...baseFields,

    // Core fields
    name: text("name").notNull(),
    description: text("description"),

    // Tree structure (simple parent_id approach)
    parentId: text("parent_id"),

    // Computed pathstring for efficient tree queries (e.g., "1/5/12")
    // Updated on create/move operations
    pathstring: text("pathstring").notNull(),
    level: integer("level").notNull().default(0),

    // Structural categories cannot have parts directly assigned
    // Parts must be assigned to child categories
    structural: integer("structural", { mode: "boolean" })
      .default(false)
      .notNull(),

    // Default location for parts in this category
    defaultLocationId: text("default_location_id"),

    // Default keywords to apply to new parts in this category
    defaultKeywords: text("default_keywords"),

    // Icon for display (e.g., "mdi:package-variant")
    icon: text("icon"),

    // Metadata for extensibility
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
  },
  (table) => ({
    // Tree navigation indexes
    parentIdx: index("part_categories_parent_idx").on(table.parentId),
    pathstringIdx: index("part_categories_pathstring_idx").on(table.pathstring),
    levelIdx: index("part_categories_level_idx").on(table.level),

    // Common queries
    nameIdx: index("part_categories_name_idx").on(table.name),
    deletedIdx: index("part_categories_deleted_idx").on(table.deletedAt),

    // Ensure unique names at same level (optional - commented out for now)
    // uniqueNamePerParent: unique("part_categories_name_parent_unique").on(
    //   table.name,
    //   table.parentId
    // ),
  })
);

/**
 * Parts table
 * Core inventory items with rich attributes
 */
export const parts = sqliteTable(
  "parts",
  {
    ...baseFields,

    // Core identification
    name: text("name").notNull(),
    fullName: text("full_name"), // Auto-generated with category path
    description: text("description"),

    // Category relationship
    categoryId: text("category_id").notNull(),

    // Part numbers
    IPN: text("ipn"), // Internal Part Number (unique)
    revision: text("revision"),

    // Keywords for search
    keywords: text("keywords"),

    // Part attributes (boolean flags)
    active: integer("active", { mode: "boolean" }).default(true).notNull(),
    virtual: integer("virtual", { mode: "boolean" }).default(false).notNull(), // Does not physically exist (e.g., software license)
    template: integer("template", { mode: "boolean" }).default(false).notNull(), // Can have variants
    assembly: integer("assembly", { mode: "boolean" }).default(false).notNull(), // Can be built from components
    component: integer("component", { mode: "boolean" }).default(false).notNull(), // Can be used in assemblies
    trackable: integer("trackable", { mode: "boolean" }).default(false).notNull(), // Can have serial/batch numbers
    purchaseable: integer("purchaseable", { mode: "boolean" }).default(false).notNull(), // Can be purchased
    salable: integer("salable", { mode: "boolean" }).default(false).notNull(), // Can be sold
    testable: integer("testable", { mode: "boolean" }).default(false).notNull(), // Can have test results
    locked: integer("locked", { mode: "boolean" }).default(false).notNull(), // Prevents editing (for production parts)

    // Stock settings
    defaultLocationId: text("default_location_id"), // FK to stock_locations
    minimumStock: real("minimum_stock").default(0),
    defaultExpiry: integer("default_expiry"), // Days until expiry

    // Units of measure
    units: text("units"), // e.g., "pcs", "m", "kg", "L"

    // Additional info
    notes: text("notes"),
    link: text("link"), // External URL

    // Image
    imageId: text("image_id"), // FK to attachments table

    // Audit fields
    createdById: text("created_by_id").notNull(),
    updatedById: text("updated_by_id").notNull(),

    // Metadata for extensibility
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
  },
  (table) => ({
    // Critical indexes
    categoryIdx: index("parts_category_idx").on(table.categoryId),
    ipnUnique: unique("parts_ipn_unique").on(table.IPN),
    nameIdx: index("parts_name_idx").on(table.name),
    activeIdx: index("parts_active_idx").on(table.active),
    deletedIdx: index("parts_deleted_idx").on(table.deletedAt),

    // Attribute filters
    purchaseableIdx: index("parts_purchaseable_idx").on(table.purchaseable),
    salableIdx: index("parts_salable_idx").on(table.salable),
    assemblyIdx: index("parts_assembly_idx").on(table.assembly),

    // Search optimization
    createdAtIdx: index("parts_created_at_idx").on(table.createdAt),
  })
);

/**
 * Part Parameter Templates table
 * Reusable parameter definitions (e.g., "Voltage", "Color", "Capacitance")
 */
export const partParameterTemplates = sqliteTable(
  "part_parameter_templates",
  {
    ...baseFields,

    name: text("name").notNull(),
    description: text("description"),
    units: text("units"), // e.g., "V", "Ω", "F"
  },
  (table) => ({
    nameIdx: index("part_parameter_templates_name_idx").on(table.name),
  })
);

/**
 * Part Parameters table
 * Custom attributes for parts (e.g., Voltage: 5V, Color: Red)
 */
export const partParameters = sqliteTable(
  "part_parameters",
  {
    ...baseFields,

    partId: text("part_id").notNull(),
    templateId: text("template_id"), // Optional: link to template

    // If not using template, specify name directly
    name: text("name"),
    value: text("value").notNull(),
    units: text("units"),
  },
  (table) => ({
    partIdx: index("part_parameters_part_idx").on(table.partId),
    templateIdx: index("part_parameters_template_idx").on(table.templateId),
  })
);

/**
 * Attachments table
 * Generic file storage for images, documents, etc.
 * Used by parts, stock items, orders, etc.
 */
export const attachments = sqliteTable(
  "attachments",
  {
    ...baseFields,

    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(), // MIME type
    fileSize: integer("file_size").notNull(), // bytes

    // R2 storage
    r2Key: text("r2_key").notNull(), // Full R2 object key
    r2Url: text("r2_url").notNull(), // Public or signed URL

    // For images: thumbnail
    thumbnailR2Key: text("thumbnail_r2_key"),
    thumbnailR2Url: text("thumbnail_r2_url"),

    // Audit
    uploadedById: text("uploaded_by_id").notNull(),
  },
  (table) => ({
    r2KeyIdx: index("attachments_r2_key_idx").on(table.r2Key),
    uploadedByIdx: index("attachments_uploaded_by_idx").on(table.uploadedById),
  })
);

// ============================================================================
// RELATIONS
// ============================================================================

/**
 * Part Category Relations
 */
export const partCategoryRelations = relations(partCategories, ({ one, many }) => ({
  // Self-referential for tree structure
  parent: one(partCategories, {
    fields: [partCategories.parentId],
    references: [partCategories.id],
    relationName: "partCategoryTree",
  }),
  children: many(partCategories, {
    relationName: "partCategoryTree",
  }),

  // Parts in this category
  parts: many(parts),

  // Default location (will be defined when stock_locations is created)
  // defaultLocation: one(stockLocations, {
  //   fields: [partCategories.defaultLocationId],
  //   references: [stockLocations.id],
  // }),
}));

/**
 * Part Relations
 */
export const partRelations = relations(parts, ({ one, many }) => ({
  // Category
  category: one(partCategories, {
    fields: [parts.categoryId],
    references: [partCategories.id],
  }),

  // Image
  image: one(attachments, {
    fields: [parts.imageId],
    references: [attachments.id],
  }),

  // Parameters
  parameters: many(partParameters),

  // Created/Updated by
  createdBy: one(users, {
    fields: [parts.createdById],
    references: [users.id],
    relationName: "partCreatedBy",
  }),
  updatedBy: one(users, {
    fields: [parts.updatedById],
    references: [users.id],
    relationName: "partUpdatedBy",
  }),

  // Future: stock items, BOM items, supplier parts, etc.
}));

/**
 * Part Parameter Relations
 */
export const partParameterRelations = relations(partParameters, ({ one }) => ({
  part: one(parts, {
    fields: [partParameters.partId],
    references: [parts.id],
  }),
  template: one(partParameterTemplates, {
    fields: [partParameters.templateId],
    references: [partParameterTemplates.id],
  }),
}));

/**
 * Part Parameter Template Relations
 */
export const partParameterTemplateRelations = relations(
  partParameterTemplates,
  ({ many }) => ({
    parameters: many(partParameters),
  })
);

/**
 * Attachment Relations
 */
export const attachmentRelations = relations(attachments, ({ one }) => ({
  uploadedBy: one(users, {
    fields: [attachments.uploadedById],
    references: [users.id],
  }),
}));

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Part Categories
export type PartCategory = typeof partCategories.$inferSelect;
export type NewPartCategory = typeof partCategories.$inferInsert;

// Parts
export type Part = typeof parts.$inferSelect;
export type NewPart = typeof parts.$inferInsert;

// Part Parameters
export type PartParameter = typeof partParameters.$inferSelect;
export type NewPartParameter = typeof partParameters.$inferInsert;

// Part Parameter Templates
export type PartParameterTemplate = typeof partParameterTemplates.$inferSelect;
export type NewPartParameterTemplate = typeof partParameterTemplates.$inferInsert;

// Attachments
export type Attachment = typeof attachments.$inferSelect;
export type NewAttachment = typeof attachments.$inferInsert;
