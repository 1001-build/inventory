# InvenTree Feature Parity Implementation Checklist

**Project:** Nuxt 4 Inventory Management System (Cloudflare Infrastructure)
**Reference:** InvenTree Open Source Inventory Management System
**Started:** 2025-11-13
**Last Updated:** 2025-11-13 (Phase 3 Complete)

## 📋 Overview

This document tracks the implementation of a feature-parity inventory management system based on InvenTree, built with Nuxt 4 and Cloudflare infrastructure (D1, R2, KV).

### Architecture Summary
- **Frontend:** Nuxt 4 + Vue 3 + shadcn-vue + Tailwind CSS
- **Backend:** Nuxt server API (H3) on Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite via Drizzle ORM)
- **Storage:** Cloudflare R2 (images, reports, attachments)
- **Cache:** Cloudflare KV (sessions, permissions, global settings)
- **Auth:** nuxt-auth-utils (session-based)
- **Testing:** Vitest with TDD approach for service layer

### Development Approach
- **TDD Workflow:** Write tests first for all service layer business logic
- **Service Layer:** Request-scoped services with factory functions
- **Repository Layer:** Database-scoped data access with batch operations
- **Shared Validators:** Zod schemas in `shared/validators/` for FE/BE consistency
- **Error Handling:** Custom error classes with shared error codes

---

## 🎯 Implementation Phases

### Phase 1: Foundation & Core Infrastructure ✅
**Status:** Template already provides this
- [x] Project setup with Nuxt 4
- [x] Cloudflare Workers configuration (wrangler)
- [x] D1 database setup with Drizzle ORM
- [x] Authentication system (nuxt-auth-utils)
- [x] RBAC system with permissions
- [x] Multi-tenancy support (optional)
- [x] Error handling framework
- [x] Testing setup (Vitest)
- [x] API response format standardization
- [x] Audit logging system

### Phase 2: Part Management System ✅
**Status:** COMPLETE (211 tests passing)
**Target:** Core inventory item management
**Completed:** 2025-11-13

#### 2.1 Database Schema - Part Categories ✅
- [x] **Schema:** Create `part_categories` table
  - Fields: id, name, description, parent_id (self-reference for tree), pathstring, level, icon, structural (boolean), default_location_id (FK to stock_locations), default_keywords, metadata (JSON), created_at, updated_at, deleted_at
  - Indexes: parent_id, pathstring, name
  - Tree structure using MPTT pattern or simple parent_id with recursive queries
  - **Test Data:** 5-10 sample categories with 2-3 levels of nesting

- [ ] **Schema:** Add Drizzle schema definition in `server/database/schema/parts.ts`
  - Export PartCategory type
  - Export NewPartCategory type
  - Add relations for parent/children/parts

#### 2.2 Repository Layer - Part Categories
- [ ] **Test:** Write `PartCategoryRepository.test.ts`
  - Test: findById returns category with proper tree structure
  - Test: findAll with pagination
  - Test: findByParentId returns children
  - Test: create category with valid parent
  - Test: update category fields
  - Test: softDelete marks deleted_at
  - Test: getAncestors returns parent chain
  - Test: getDescendants returns all children recursively
  - Test: move category to new parent updates pathstring

- [ ] **Repository:** Implement `PartCategoryRepository` class
  - Extends BaseRepository
  - Methods: findById, findAll, findByParentId, create, update, softDelete
  - Tree methods: getAncestors, getDescendants, moveToParent
  - Use QueryHelpers.notDeleted() for all queries
  - Implement search across name/description

#### 2.3 Service Layer - Part Categories
- [ ] **Test:** Write `PartCategoryService.test.ts`
  - Test: createCategory validates user auth
  - Test: createCategory validates parent exists
  - Test: createCategory prevents creating under structural category with parts
  - Test: updateCategory validates structural constraints
  - Test: deleteCategory with cascade option
  - Test: getCategoryTree returns hierarchical structure
  - Test: moveCategoryToParent validates no circular reference
  - Test: audit logs created for create/update/delete

- [ ] **Service:** Implement `PartCategoryService` class
  - Request-scoped with userId/tenantId context
  - Business logic: validate structural constraints
  - Business logic: prevent circular parent references
  - Business logic: cascade delete handling
  - Audit logging for all mutations
  - Factory function: createPartCategoryService(event)

#### 2.4 API Routes - Part Categories
- [ ] **Validator:** Create `shared/validators/part-category.ts`
  - createPartCategorySchema: name (required, 1-250 chars), description (optional), parent_id (optional UUID), structural (boolean), default_keywords (optional)
  - updatePartCategorySchema: all fields optional except id
  - movePartCategorySchema: id, new_parent_id
  - listPartCategorySchema: extends listQuerySchema with allowed sort fields

- [ ] **API:** `POST /api/v1/part-categories` - Create category
  - Validate with createPartCategorySchema
  - Call service.createCategory()
  - Return 201 with created category
  - Handle ValidationError, AuthenticationError

- [ ] **API:** `GET /api/v1/part-categories` - List all categories
  - Parse pagination/filter/sort with parseListQuery()
  - Support tree=true query param for nested structure
  - Support parent_id filter for children only
  - Return paginated response

- [ ] **API:** `GET /api/v1/part-categories/:id` - Get single category
  - Include part count in response
  - Include parent chain (breadcrumbs)
  - Include immediate children

- [ ] **API:** `PUT /api/v1/part-categories/:id` - Update category
  - Validate with updatePartCategorySchema
  - Handle structural constraint changes

- [ ] **API:** `DELETE /api/v1/part-categories/:id` - Delete category
  - Query params: cascade (boolean) - delete children
  - Check for parts assigned (prevent if not cascade)

- [ ] **API:** `POST /api/v1/part-categories/:id/move` - Move to new parent
  - Validate circular reference
  - Update pathstring for all descendants

#### 2.5 Database Schema - Parts
- [ ] **Schema:** Create `parts` table
  - Fields: id, name, full_name (auto-generated with category path), description, category_id (FK), revision, IPN (internal part number), keywords, active (boolean), virtual (boolean), template (boolean), assembly (boolean), component (boolean), trackable (boolean), purchaseable (boolean), salable (boolean), testable (boolean), locked (boolean), default_location_id (FK to stock_locations), default_expiry (integer days), minimum_stock, units (string - length, mass, etc), notes (text), link (URL), image_id (FK to attachments), created_by_id, updated_by_id, metadata (JSON), created_at, updated_at, deleted_at
  - Indexes: category_id, IPN (unique), name, active, created_at
  - Virtual field: total_stock (computed from stock items)
  - **Test Data:** 20-30 sample parts across categories with varied attributes

- [ ] **Schema:** Create `part_parameters` table
  - Fields: id, part_id (FK), template_id (FK to part_parameter_templates), name, value, units, created_at, updated_at
  - Purpose: Custom attributes like "Voltage: 5V", "Color: Red"

- [ ] **Schema:** Create `part_parameter_templates` table
  - Fields: id, name, description, units, created_at, updated_at
  - Purpose: Reusable parameter definitions

- [ ] **Schema:** Create `attachments` table (for images, documents)
  - Fields: id, file_name, file_url (R2 path), file_type, file_size, r2_key, thumbnail_r2_key (for images), uploaded_by_id, created_at
  - Used by: parts, stock_items, purchase_orders, sales_orders

#### 2.6 R2 Storage Setup - File Uploads
- [ ] **Service:** Create `R2StorageService` class
  - uploadFile(file: File, folder: string): Promise<{url, key}>
  - deleteFile(key: string): Promise<void>
  - generateThumbnail(imageKey: string): Promise<thumbnailKey>
  - getSignedUrl(key: string, expiresIn: number): Promise<url>

- [ ] **Test:** Write `R2StorageService.test.ts`
  - Test: uploadFile stores in R2 with correct key format
  - Test: generateThumbnail creates scaled image
  - Test: deleteFile removes from R2
  - Test: getSignedUrl returns valid temporary URL

- [ ] **API:** `POST /api/v1/upload` - Generic file upload
  - Accept multipart/form-data
  - Validate file type (images: png, jpg, webp; docs: pdf, xlsx)
  - Validate file size (max 10MB for images, 50MB for docs)
  - Store in R2, create attachment record
  - Return attachment object with URLs

#### 2.7 Repository Layer - Parts
- [ ] **Test:** Write `PartRepository.test.ts`
  - Test: findById with relations (category, image, parameters)
  - Test: findAll with filters (category, active, purchaseable, etc)
  - Test: search by name/description/IPN/keywords
  - Test: create part with parameters
  - Test: update part fields
  - Test: softDelete
  - Test: findByCategory with cascade option
  - Test: updateStockLevel (computed field)

- [ ] **Repository:** Implement `PartRepository` class
  - Extends BaseRepository
  - Complex queries with Drizzle joins
  - Filter methods: filterByCategory, filterByAttributes, searchByText
  - Aggregate stock levels from stock_items table

#### 2.8 Service Layer - Parts
- [ ] **Test:** Write `PartService.test.ts`
  - Test: createPart validates category exists
  - Test: createPart prevents assignment to structural category
  - Test: createPart uploads image if provided
  - Test: createPart creates parameters
  - Test: updatePart validates locked constraint (no changes if locked)
  - Test: updatePart handles image replacement
  - Test: deletePart prevents if stock exists (unless force=true)
  - Test: duplicatePart copies all fields except IPN
  - Test: setActive/setInactive bulk operations
  - Test: audit logs for all operations

- [ ] **Service:** Implement `PartService` class
  - Business logic: locked part constraints
  - Business logic: structural category validation
  - Business logic: IPN uniqueness validation
  - Business logic: prevent delete if stock/orders exist
  - Image handling: upload, thumbnail generation
  - Parameter management: create, update, delete
  - Factory function: createPartService(event)

#### 2.9 API Routes - Parts
- [ ] **Validator:** Create `shared/validators/part.ts`
  - createPartSchema: all part fields with business rules
  - updatePartSchema: partial fields
  - partQuerySchema: extends listQuerySchema with part-specific filters

- [ ] **API:** Complete CRUD endpoints for parts
  - POST /api/v1/parts - Create
  - GET /api/v1/parts - List with advanced filters
  - GET /api/v1/parts/:id - Detail with relations
  - PUT /api/v1/parts/:id - Update
  - DELETE /api/v1/parts/:id - Delete
  - POST /api/v1/parts/:id/duplicate - Duplicate part
  - PUT /api/v1/parts/bulk/set-active - Bulk activate
  - PUT /api/v1/parts/bulk/set-inactive - Bulk deactivate
  - GET /api/v1/parts/:id/stock - Get stock summary
  - GET /api/v1/parts/:id/parameters - Get parameters
  - POST /api/v1/parts/:id/parameters - Add parameter
  - PUT /api/v1/parts/:id/parameters/:param_id - Update parameter
  - DELETE /api/v1/parts/:id/parameters/:param_id - Delete parameter

#### 2.10 Frontend - Part Categories UI
- [ ] **Component:** `PartCategoryTree.vue` - Tree view with expand/collapse
- [ ] **Component:** `PartCategoryForm.vue` - Create/edit form with parent selector
- [ ] **Component:** `PartCategoryBreadcrumb.vue` - Show category path
- [ ] **Page:** `/parts/categories` - List/tree view
- [ ] **Page:** `/parts/categories/[id]` - Category detail with parts list
- [ ] **Page:** `/parts/categories/create` - Create category
- [ ] **Page:** `/parts/categories/[id]/edit` - Edit category
- [ ] **Composable:** `usePartCategories()` - Fetch, create, update, delete

#### 2.11 Frontend - Parts UI
- [ ] **Component:** `PartTable.vue` - Sortable, filterable table
- [ ] **Component:** `PartCard.vue` - Card view with image, stock level
- [ ] **Component:** `PartForm.vue` - Multi-step create/edit form
- [ ] **Component:** `PartImageUpload.vue` - Drag-drop image upload
- [ ] **Component:** `PartParameterList.vue` - Manage custom parameters
- [ ] **Component:** `PartStockSummary.vue` - Stock levels by location
- [ ] **Page:** `/parts` - List view with filters
- [ ] **Page:** `/parts/[id]` - Part detail (tabs: overview, stock, bom, orders, history)
- [ ] **Page:** `/parts/create` - Create part wizard
- [ ] **Page:** `/parts/[id]/edit` - Edit part
- [ ] **Composable:** `useParts()` - CRUD operations
- [ ] **Store:** `usePartStore()` - Pinia store for part state

---

### Phase 3: Stock Management System ✅
**Status:** COMPLETE (290 tests passing)
**Target:** Track physical inventory
**Completed:** 2025-11-13

#### 3.1 Database Schema ✅
- [x] **Schema:** Created `stock_location_types`, `stock_locations`, `stock_items`, `stock_item_tracking`, `stock_item_test_results` tables
  - Migration: 0002_secret_korg.sql applied successfully
  - Stock locations: Hierarchical tree with pathstring, level, structural/external flags
  - Stock items: 24 columns including batch/serial tracking, 6-status enum (OK, DAMAGED, DESTROYED, REJECTED, LOST, QUARANTINED)
  - Stock item tracking: Complete audit trail with 15+ tracking types
  - All tables include soft delete support (deletedAt)

#### 3.2 Repository Layer ✅
- [x] **Test:** `StockLocationRepository.test.ts` (19 tests)
  - Tests for tree operations, CRUD, pathstring generation
  - Tests for getAncestors, getDescendants, findByParentId

- [x] **Repository:** `StockLocationRepository` class
  - Full CRUD with soft delete
  - Tree traversal methods (ancestors, descendants)
  - Pathstring auto-generation on create
  - QueryHelpers.notDeleted() used throughout

- [x] **Test:** `StockItemRepository.test.ts` (22 tests)
  - Tests for findByPart, findByLocation, findByBatch, findBySerial
  - Tests for move, adjustQuantity, getTotalQuantity

- [x] **Repository:** `StockItemRepository` class
  - CRUD operations with complex filtering
  - Batch/serial tracking support
  - Status-based queries
  - Quantity aggregation (getTotalQuantity with status filter)
  - Move and adjust quantity operations

#### 3.3 Service Layer ✅
- [x] **Test:** `StockLocationService.test.ts` (16 tests)
  - Tests for authentication enforcement
  - Tests for parent validation, stock item checks
  - Tests for cascade delete
  - Tests for audit logging

- [x] **Service:** `StockLocationService` class
  - Authentication-gated mutations
  - Parent location validation
  - Prevention of deleting locations with stock/children
  - Cascade delete support
  - Complete audit logging
  - Factory function: createStockLocationService(event)

- [x] **Test:** `StockItemService.test.ts` (22 tests)
  - Tests for part/location validation
  - Tests for serial uniqueness and quantity = 1 enforcement
  - Tests for quantity adjustments and movement
  - Tests for audit logging

- [x] **Service:** `StockItemService` class
  - Part and location existence validation
  - Serial number uniqueness enforcement
  - Serialized item quantity validation (must be 1)
  - Quantity adjustment with tracking
  - Location movement operations
  - Status change tracking
  - Factory function: createStockItemService(event)

#### 3.4 API Routes & Validators ✅
- [x] **Validator:** `shared/validators/stock-location.ts`
  - createStockLocationSchema, updateStockLocationSchema, deleteStockLocationSchema
  - listStockLocationsSchema with pagination/filters
  - getStockLocationTreeSchema

- [x] **Validator:** `shared/validators/stock-item.ts`
  - createStockItemSchema, updateStockItemSchema, stockItemIdSchema
  - moveStockItemSchema, adjustQuantitySchema
  - listStockItemsSchema with part/location/status/batch filters
  - stockStatusEnum with 6 status values

- [x] **API:** Stock Location CRUD (6 endpoints)
  - GET /api/v1/stock-locations - List with pagination
  - POST /api/v1/stock-locations - Create location
  - GET /api/v1/stock-locations/tree - Hierarchical tree view
  - GET /api/v1/stock-locations/:id - Get details
  - PUT /api/v1/stock-locations/:id - Update
  - DELETE /api/v1/stock-locations/:id?cascade=true - Delete with cascade option

- [x] **API:** Stock Item CRUD + Actions (7 endpoints)
  - GET /api/v1/stock-items - List with filters
  - POST /api/v1/stock-items - Create stock item
  - GET /api/v1/stock-items/:id - Get details
  - PUT /api/v1/stock-items/:id - Update
  - DELETE /api/v1/stock-items/:id - Delete
  - POST /api/v1/stock-items/:id/move - Move to new location
  - POST /api/v1/stock-items/:id/adjust - Adjust quantity

**Note:** Advanced features (split, merge, bulk operations, test results, stocktake) deferred to future iterations.

#### 3.5 Frontend - Stock UI (Deferred)
**Note:** Frontend UI implementation deferred. Backend API is complete and tested.
- [ ] **Component:** `StockLocationTree.vue`, `StockLocationForm.vue`
- [ ] **Component:** `StockItemTable.vue`, `StockItemForm.vue`
- [ ] **Component:** `StockAdjustmentModal.vue`, `StockMoveModal.vue`
- [ ] **Page:** `/stock/locations`, `/stock/items`
- [ ] **Composable:** `useStockLocations()`, `useStockItems()`

---

### Phase 4: Build/Manufacturing System 🔄
**Status:** Not started
**Target:** Assemble parts into finished goods

#### 4.1 Database Schema - Bill of Materials (BOM)
- [ ] **Schema:** Create `bom_items` table
  - Fields: id, part_id (FK - the assembly), sub_part_id (FK - the component), quantity (decimal), reference (string - e.g., "R1, R2"), overage (decimal - extra %), note (text), optional (boolean), consumable (boolean), allow_variants (boolean), inherited (boolean), created_at, updated_at, deleted_at
  - Indexes: part_id, sub_part_id, unique(part_id, sub_part_id)
  - Purpose: Define what parts are needed to build an assembly

- [ ] **Schema:** Create `bom_item_substitutes` table
  - Fields: id, bom_item_id (FK), substitute_part_id (FK), created_at
  - Purpose: Alternative parts that can be used

#### 4.2 Database Schema - Build Orders
- [ ] **Schema:** Create `build_orders` table
  - Fields: id, reference (auto-generated: BO-0001), part_id (FK - what to build), quantity (decimal), parent_build_id (FK - for sub-builds), sales_order_id (FK), batch (string), status (enum: PENDING, PRODUCTION, CANCELLED, COMPLETE), priority (integer), target_date, completion_date, issued_by_id, responsible_id, notes (text), link (URL), metadata (JSON), created_at, updated_at, deleted_at
  - Indexes: reference (unique), part_id, status, created_at
  - **Test Data:** 10 build orders in various statuses

- [ ] **Schema:** Create `build_order_allocations` table
  - Fields: id, build_id (FK), bom_item_id (FK), stock_item_id (FK), quantity (decimal), created_at
  - Purpose: Allocate stock items to build orders

- [ ] **Schema:** Create `build_order_outputs` table
  - Fields: id, build_id (FK), stock_item_id (FK - the created item), quantity (decimal), complete (boolean), created_at
  - Purpose: Track outputs from builds

#### 4.3 Repository Layer - BOM
- [ ] **Test:** Write `BomRepository.test.ts`
- [ ] **Repository:** Implement `BomRepository` class

#### 4.4 Repository Layer - Build Orders
- [ ] **Test:** Write `BuildOrderRepository.test.ts`
- [ ] **Repository:** Implement `BuildOrderRepository` class

#### 4.5 Service Layer - BOM
- [ ] **Test:** Write `BomService.test.ts`
  - Test: createBomItem validates assembly part has assembly=true
  - Test: createBomItem validates sub_part has component=true
  - Test: createBomItem prevents circular dependencies
  - Test: calculateRequiredStock for build order
  - Test: validateBomComplete checks all required items

- [ ] **Service:** Implement `BomService` class
  - Business logic: validate part attributes
  - Business logic: circular dependency detection
  - Calculation: required stock with overage
  - Validation: BOM completeness

#### 4.6 Service Layer - Build Orders
- [ ] **Test:** Write `BuildOrderService.test.ts`
  - Test: createBuild validates part is assembly
  - Test: createBuild generates unique reference
  - Test: allocateStock validates quantity available
  - Test: allocateStock reserves stock items
  - Test: completeAllocation marks build ready
  - Test: startBuild changes status to PRODUCTION
  - Test: completeBuild creates output stock items
  - Test: completeBuild consumes allocated stock
  - Test: cancelBuild releases allocations

- [ ] **Service:** Implement `BuildOrderService` class
  - Reference generation: BO-0001, BO-0002
  - Status workflow: PENDING → PRODUCTION → COMPLETE
  - Stock allocation logic
  - Output creation logic
  - Transaction handling: atomic operations

#### 4.7 API Routes - BOM
- [ ] **Validator:** Create `shared/validators/bom.ts`
- [ ] **API:** POST /api/v1/bom - Create BOM item
- [ ] **API:** GET /api/v1/bom - List (filter by part)
- [ ] **API:** GET /api/v1/bom/:id - Detail
- [ ] **API:** PUT /api/v1/bom/:id - Update
- [ ] **API:** DELETE /api/v1/bom/:id - Delete
- [ ] **API:** POST /api/v1/bom/:id/substitutes - Add substitute
- [ ] **API:** GET /api/v1/parts/:id/bom - Get BOM for part
- [ ] **API:** GET /api/v1/parts/:id/used-in - Where is part used

#### 4.8 API Routes - Build Orders
- [ ] **Validator:** Create `shared/validators/build-order.ts`
- [ ] **API:** POST /api/v1/builds - Create build
- [ ] **API:** GET /api/v1/builds - List with filters
- [ ] **API:** GET /api/v1/builds/:id - Detail
- [ ] **API:** PUT /api/v1/builds/:id - Update
- [ ] **API:** DELETE /api/v1/builds/:id - Cancel
- [ ] **API:** POST /api/v1/builds/:id/allocate - Allocate stock
- [ ] **API:** POST /api/v1/builds/:id/start - Start production
- [ ] **API:** POST /api/v1/builds/:id/complete - Complete build
- [ ] **API:** GET /api/v1/builds/:id/allocations - Get allocations
- [ ] **API:** GET /api/v1/builds/:id/outputs - Get outputs

#### 4.9 Frontend - BOM UI
- [ ] **Component:** `BomTable.vue` - Show BOM with nested sub-assemblies
- [ ] **Component:** `BomItemForm.vue` - Add/edit BOM item
- [ ] **Page:** `/parts/[id]/bom` - BOM tab on part detail
- [ ] **Composable:** `useBom()`

#### 4.10 Frontend - Build Orders UI
- [ ] **Component:** `BuildOrderTable.vue` - List with status
- [ ] **Component:** `BuildOrderForm.vue` - Create build
- [ ] **Component:** `BuildAllocationTable.vue` - Allocate stock
- [ ] **Component:** `BuildOutputForm.vue` - Record outputs
- [ ] **Component:** `BuildStatusTimeline.vue` - Progress visualization
- [ ] **Page:** `/builds` - List all builds
- [ ] **Page:** `/builds/[id]` - Build detail
- [ ] **Page:** `/builds/create` - Create build wizard
- [ ] **Composable:** `useBuilds()`
- [ ] **Store:** `useBuildStore()`

---

### Phase 5: Company & Supplier Management 🔄
**Status:** Not started
**Target:** Manage suppliers and customers

#### 5.1 Database Schema - Companies
- [ ] **Schema:** Create `companies` table
  - Fields: id, name, description, website, email, phone, address, city, state_province, country, postal_code, is_supplier (boolean), is_customer (boolean), is_manufacturer (boolean), active (boolean), notes (text), contact (string), metadata (JSON), created_at, updated_at, deleted_at
  - Indexes: name, is_supplier, is_customer, active
  - **Test Data:** 10 companies (5 suppliers, 3 customers, 2 both)

- [ ] **Schema:** Create `company_contacts` table
  - Fields: id, company_id (FK), name, role, email, phone, notes, created_at, updated_at
  - Purpose: Multiple contacts per company

- [ ] **Schema:** Create `supplier_parts` table
  - Fields: id, part_id (FK), supplier_id (FK to companies), SKU (supplier part number), description, manufacturer (string), MPN (manufacturer part number), link (URL), packaging (string), pack_quantity (decimal), note (text), base_cost (money), currency, multiple (decimal - order multiple), moq (minimum order qty), lead_time_days, active (boolean), created_at, updated_at, deleted_at
  - Indexes: part_id, supplier_id, SKU, unique(supplier_id, SKU)

- [ ] **Schema:** Create `manufacturer_parts` table
  - Fields: id, part_id (FK), manufacturer_id (FK to companies), MPN, description, link, created_at, updated_at
  - Purpose: Link parts to manufacturers

#### 5.2 Repository Layer - Companies
- [ ] **Test:** Write `CompanyRepository.test.ts`
- [ ] **Repository:** Implement `CompanyRepository` class

#### 5.3 Repository Layer - Supplier Parts
- [ ] **Test:** Write `SupplierPartRepository.test.ts`
- [ ] **Repository:** Implement `SupplierPartRepository` class

#### 5.4 Service Layer - Companies
- [ ] **Test:** Write `CompanyService.test.ts`
- [ ] **Service:** Implement `CompanyService` class

#### 5.5 Service Layer - Supplier Parts
- [ ] **Test:** Write `SupplierPartService.test.ts`
  - Test: createSupplierPart validates supplier company is_supplier=true
  - Test: createSupplierPart converts currency if different from base
  - Test: updateSupplierPart recalculates cost if currency changed

- [ ] **Service:** Implement `SupplierPartService` class
  - Business logic: supplier validation
  - Currency conversion logic
  - Pricing calculations

#### 5.6 API Routes - Companies
- [ ] **Validator:** Create `shared/validators/company.ts`
- [ ] **API:** Complete CRUD for companies
- [ ] **API:** GET /api/v1/companies/:id/parts - Supplier parts
- [ ] **API:** GET /api/v1/companies/:id/orders - Purchase/sales orders

#### 5.7 API Routes - Supplier Parts
- [ ] **Validator:** Create `shared/validators/supplier-part.ts`
- [ ] **API:** Complete CRUD for supplier parts
- [ ] **API:** GET /api/v1/supplier-parts - List with filters
- [ ] **API:** GET /api/v1/parts/:id/suppliers - Suppliers for part

#### 5.8 Frontend - Companies UI
- [ ] **Component:** `CompanyTable.vue`
- [ ] **Component:** `CompanyForm.vue`
- [ ] **Page:** `/companies` - List (tabs: suppliers, customers, manufacturers)
- [ ] **Page:** `/companies/[id]` - Company detail
- [ ] **Composable:** `useCompanies()`

#### 5.9 Frontend - Supplier Parts UI
- [ ] **Component:** `SupplierPartTable.vue`
- [ ] **Component:** `SupplierPartForm.vue`
- [ ] **Page:** `/parts/[id]/suppliers` - Suppliers tab
- [ ] **Composable:** `useSupplierParts()`

---

### Phase 6: Purchase Order System 🔄
**Status:** Not started
**Target:** Procure parts from suppliers

#### 6.1 Database Schema - Purchase Orders
- [ ] **Schema:** Create `purchase_orders` table
  - Fields: id, reference (auto-generated: PO-0001), description, supplier_id (FK to companies), status (enum: PENDING, PLACED, IN_PROGRESS, COMPLETE, CANCELLED, LOST, RETURNED), issue_date, target_date, received_date, contact_id (FK to company_contacts), address, currency, notes, link, responsible_id (FK to users), created_by_id, metadata (JSON), created_at, updated_at, deleted_at
  - Indexes: reference (unique), supplier_id, status
  - **Test Data:** 15 POs in various statuses

- [ ] **Schema:** Create `purchase_order_lines` table
  - Fields: id, order_id (FK), part_id (FK), supplier_part_id (FK), quantity (decimal), received_quantity (decimal), unit_price (money), currency, notes, target_date, destination_location_id (FK to stock_locations), created_at, updated_at
  - Purpose: Line items in PO

- [ ] **Schema:** Create `purchase_order_receipts` table
  - Fields: id, order_id (FK), received_by_id (FK to users), received_date, notes, created_at
  - Purpose: Receipt events

- [ ] **Schema:** Create `purchase_order_line_receipts` table
  - Fields: id, line_id (FK), receipt_id (FK), quantity, stock_item_id (FK - created item), location_id (FK), barcode, batch, serial, notes, created_at
  - Purpose: Detailed receipts per line

#### 6.2 Repository Layer - Purchase Orders
- [ ] **Test:** Write `PurchaseOrderRepository.test.ts`
- [ ] **Repository:** Implement `PurchaseOrderRepository` class

#### 6.3 Service Layer - Purchase Orders
- [ ] **Test:** Write `PurchaseOrderService.test.ts`
  - Test: createOrder validates supplier is_supplier=true
  - Test: createOrder generates unique reference
  - Test: addLine validates supplier_part belongs to supplier
  - Test: placeOrder validates at least one line
  - Test: receiveItems creates stock items
  - Test: receiveItems updates received_quantity
  - Test: completeOrder validates all lines received
  - Test: cancelOrder releases pending allocations

- [ ] **Service:** Implement `PurchaseOrderService` class
  - Reference generation: PO-0001
  - Status workflow: PENDING → PLACED → IN_PROGRESS → COMPLETE
  - Receipt logic: create stock items
  - Validation: completeness checks

#### 6.4 API Routes - Purchase Orders
- [ ] **Validator:** Create `shared/validators/purchase-order.ts`
- [ ] **API:** Complete CRUD and workflow endpoints
- [ ] **API:** POST /api/v1/purchase-orders - Create
- [ ] **API:** GET /api/v1/purchase-orders - List
- [ ] **API:** GET /api/v1/purchase-orders/:id - Detail
- [ ] **API:** PUT /api/v1/purchase-orders/:id - Update
- [ ] **API:** POST /api/v1/purchase-orders/:id/lines - Add line
- [ ] **API:** POST /api/v1/purchase-orders/:id/issue - Issue order
- [ ] **API:** POST /api/v1/purchase-orders/:id/receive - Receive items
- [ ] **API:** POST /api/v1/purchase-orders/:id/complete - Complete order
- [ ] **API:** POST /api/v1/purchase-orders/:id/cancel - Cancel order

#### 6.5 Frontend - Purchase Orders UI
- [ ] **Component:** `PurchaseOrderTable.vue`
- [ ] **Component:** `PurchaseOrderForm.vue`
- [ ] **Component:** `PurchaseOrderLineTable.vue`
- [ ] **Component:** `ReceiveItemsModal.vue`
- [ ] **Page:** `/purchase-orders` - List
- [ ] **Page:** `/purchase-orders/[id]` - Detail
- [ ] **Page:** `/purchase-orders/create` - Create wizard
- [ ] **Composable:** `usePurchaseOrders()`
- [ ] **Store:** `usePurchaseOrderStore()`

---

### Phase 7: Sales Order System 🔄
**Status:** Not started
**Target:** Sell and ship parts to customers

#### 7.1 Database Schema - Sales Orders
- [ ] **Schema:** Create `sales_orders` table (similar to purchase orders)
  - Fields: id, reference (SO-0001), description, customer_id (FK to companies), status, issue_date, target_date, shipment_date, contact_id, address, currency, notes, link, responsible_id, created_by_id, metadata, created_at, updated_at, deleted_at

- [ ] **Schema:** Create `sales_order_lines` table
  - Fields: id, order_id, part_id, quantity, allocated_quantity, shipped_quantity, unit_price, currency, notes, target_date, created_at, updated_at

- [ ] **Schema:** Create `sales_order_allocations` table
  - Fields: id, line_id, stock_item_id, quantity, created_at
  - Purpose: Reserve stock for SO

- [ ] **Schema:** Create `sales_order_shipments` table
  - Fields: id, order_id, shipment_date, tracking_number, invoice_number, notes, shipped_by_id, created_at

#### 7.2 Repository/Service/API - Sales Orders
- [ ] **Test:** Write tests for repository
- [ ] **Test:** Write tests for service
- [ ] **Repository:** Implement `SalesOrderRepository`
- [ ] **Service:** Implement `SalesOrderService`
- [ ] **Validator:** Create validators
- [ ] **API:** Complete CRUD and workflow endpoints

#### 7.3 Frontend - Sales Orders UI
- [ ] **Component:** Sales order components
- [ ] **Page:** Sales order pages
- [ ] **Composable:** `useSalesOrders()`

---

### Phase 8: Reporting & Analytics 🔄
**Status:** Not started

#### 8.1 Database Schema - Reports
- [ ] **Schema:** Create `reports` table
  - Fields: id, name, description, report_type (enum: PART_LABEL, STOCK_LABEL, BUILD_ORDER, PURCHASE_ORDER, SALES_ORDER, TEST_REPORT), template_path (R2 key), enabled, metadata, created_at, updated_at

#### 8.2 Report Generation Service
- [ ] **Service:** Implement `ReportService` class
  - PDF generation (using puppeteer or similar)
  - Template rendering (handlebars or similar)
  - R2 storage for generated reports
  - Support for: labels, invoices, packing slips, BOM reports

#### 8.3 Dashboard & Analytics
- [ ] **Component:** `InventoryDashboard.vue` - Overview with charts
- [ ] **Component:** `StockLevelChart.vue` - Stock trends
- [ ] **Component:** `LowStockAlert.vue` - Parts below minimum
- [ ] **Component:** `BuildOrderMetrics.vue` - Build performance
- [ ] **Component:** `PurchaseOrderMetrics.vue` - Procurement stats
- [ ] **Page:** `/dashboard` - Main dashboard
- [ ] **API:** GET /api/v1/analytics/stock-summary
- [ ] **API:** GET /api/v1/analytics/low-stock
- [ ] **API:** GET /api/v1/analytics/build-metrics
- [ ] **API:** GET /api/v1/analytics/purchase-metrics

---

### Phase 9: Advanced Features 🔄
**Status:** Not started

#### 9.1 Barcode Support
- [ ] **Schema:** Add barcode fields to relevant tables
- [ ] **Service:** Implement barcode generation service
- [ ] **API:** POST /api/v1/barcodes/scan - Scan endpoint
- [ ] **Component:** `BarcodeScanner.vue` - Camera integration

#### 9.2 Notifications System
- [ ] **Schema:** Create `notifications` table
- [ ] **Service:** Implement notification service (email via Resend)
- [ ] **Component:** `NotificationCenter.vue`
- [ ] **Events:** Low stock, expired items, order updates

#### 9.3 Import/Export
- [ ] **API:** POST /api/v1/import/parts - Import from CSV/Excel
- [ ] **API:** GET /api/v1/export/parts - Export to CSV/Excel
- [ ] **Service:** Parse and validate import files
- [ ] **Component:** `ImportWizard.vue`

#### 9.4 Search & Filters
- [ ] **API:** GET /api/v1/search - Global search across parts, stock, orders
- [ ] **Component:** `GlobalSearch.vue` - Omnisearch with keyboard shortcuts
- [ ] **Service:** Implement full-text search (potentially using Cloudflare Workers AI)

---

## 🧪 Testing Strategy

### Service Layer Testing (TDD)
For each service:
1. **Write tests FIRST** before implementation
2. Test all business logic paths
3. Test error cases and validations
4. Test transaction handling
5. Mock repository layer
6. Run tests: `npm run test:unit -- path/to/test`

### Integration Testing
For each API endpoint:
1. Test successful requests
2. Test validation errors
3. Test authentication/authorization
4. Test edge cases
5. Run tests: `npm run test:integration`

### Test Coverage Goals
- **Service Layer:** 90%+ coverage
- **Repository Layer:** 70%+ coverage (thin wrappers)
- **API Routes:** 80%+ coverage

---

## 📝 Implementation Notes & Context

### Key Decisions
1. **Tree Structures:** Use simple parent_id with recursive CTEs (D1/SQLite supports this)
2. **Money Fields:** Use Drizzle's integer type to store cents, currency as separate column
3. **File Storage:** R2 for all uploads, signed URLs for temporary access
4. **Reference Numbers:** Auto-increment with prefix (PO-0001, SO-0001, BO-0001)
5. **Soft Deletes:** All tables use deleted_at timestamp
6. **Audit Logs:** Automatic via service layer for all mutations

### Deviations from InvenTree
1. **No Plugin System:** Keep it simple, implement as native features
2. **Simplified Permissions:** Use existing RBAC system from template
3. **No Multi-Currency by Default:** Single base currency, optional feature later
4. **Mobile App:** Web-first, PWA support instead of native app

### Performance Considerations
1. **Batch Operations:** Use D1 batch API for multi-record operations
2. **Indexes:** Add compound indexes for common query patterns
3. **Caching:** Use KV for frequently accessed data (part categories, settings)
4. **Pagination:** Always paginate list endpoints (max 100 per page)

### Migration Strategy (if needed in future sessions)
- Document all database schema changes in migrations folder
- Use Drizzle Kit: `npm run db:generate` after schema changes
- Test migrations locally before deploying
- Always provide rollback migrations

---

## 🔄 Progress Tracking

### Session Context for Resuming
**Current Phase:** Phase 2 - Part Management System
**Current Task:** 2.1 - Database Schema for Part Categories
**Next Steps:**
1. Create Drizzle schema for part_categories table
2. Write tests for PartCategoryRepository
3. Implement PartCategoryRepository
4. Write tests for PartCategoryService
5. Implement PartCategoryService

### Completed Sessions
- **Session 1 (2025-11-13):** Created this implementation checklist

### Notes for Next Session
- Review Drizzle tree structure patterns for MPTT or recursive queries
- Check if D1 supports recursive CTEs for tree traversal
- Consider using `pathstring` field for efficient tree queries

---

## 📚 Reference Documentation

### InvenTree Docs
- Architecture: `/REFERENCE/docs/docs/develop/architecture.md`
- Part System: `/REFERENCE/docs/docs/part/index.md`
- Stock System: `/REFERENCE/docs/docs/stock/index.md`
- Models: `/REFERENCE/src/backend/InvenTree/{part,stock,build,order}/models.py`

### Our App Docs
- Conventions: `/docs/CONVENTIONS.md`
- Testing: `/docs/TESTING.md`
- Error Handling: `/docs/ERROR_HANDLING.md`
- RBAC: `/docs/RBAC.md`

### Tech Stack Docs
- Drizzle ORM: https://orm.drizzle.team/docs/overview
- Cloudflare D1: https://developers.cloudflare.com/d1/
- Cloudflare R2: https://developers.cloudflare.com/r2/
- Nuxt 4: https://nuxt.com/docs

---

**End of Checklist**
*This is a living document. Update progress and add notes as implementation proceeds.*
