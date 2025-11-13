# Inventory Management Frontend Implementation Plan

**Project:** Nuxt 4 Inventory Management System - Frontend UI
**Started:** 2025-11-13
**Last Updated:** 2025-11-13
**Status:** Planning Phase

## 📋 Overview

This document tracks the frontend implementation of the inventory management system. The backend API is complete (290 tests passing), and we now need to build the user interface following established frontend conventions.

### Frontend Architecture
- **Framework:** Nuxt 4 + Vue 3 Composition API
- **UI Library:** shadcn-vue (auto-imported components)
- **Styling:** Tailwind CSS with CSS variables for theming
- **Icons:** Nuxt Icon (lucide icons)
- **State Management:** Pinia stores
- **Routing:** File-based routing (`app/pages/`)
- **Components:** Auto-imported from `app/components/`
- **Composables:** Auto-imported from `app/composables/`
- **Animations:** usePrimaryAnimation + v-auto-animate
- **Forms:** VeeValidate + Zod schemas (from `shared/validators/`)

### Frontend Conventions
1. **Component Organization:**
   - Generic reusable components: `app/components/Generic/`
   - App-specific components: `app/components/App/`
   - Domain components: `app/components/Parts/`, `app/components/Stock/`
   - UI primitives: `app/components/ui/` (shadcn-vue)

2. **Naming Conventions:**
   - Components: PascalCase (e.g., `PartCategoryTree.vue`)
   - Composables: camelCase with `use` prefix (e.g., `useParts.ts`)
   - Stores: camelCase with `Store` suffix (e.g., `partStore.js`)
   - Pages: kebab-case (e.g., `part-categories.vue`)

3. **Styling:**
   - Use Tailwind utility classes
   - Theme variables: `bg-background`, `text-foreground`, `border-border`, etc.
   - Spacing: `space-y-6`, `gap-4`, etc.
   - Responsive: Mobile-first with `md:`, `lg:` breakpoints

4. **TypeScript:**
   - Use `.ts` for composables and stores with type definitions
   - Import types from `shared/validators/` for API contracts

5. **Page Structure:**
   ```vue
   <template>
     <div class="space-y-8">
       <AppPageHeader :showBack="true">...</AppPageHeader>
       <div class="grid gap-6">...</div>
     </div>
   </template>

   <script setup>
   useHead({ title: 'Page Title' })
   onMounted(() => {
     usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
   })
   </script>
   ```

---

## 🎯 Implementation Phases

### Phase 1: Navigation & Layout Setup ⏳
**Status:** Not started
**Goal:** Update sidebar with inventory navigation structure

#### 1.1 Sidebar Navigation
- [ ] **Update:** `app/components/App/Sidebar.vue`
  - Add "Inventory" collapsible section (mobile) / direct link (desktop)
  - Add "Part Categories" menu item (`/parts/categories`)
  - Add "Parts" menu item (`/parts`)
  - Add "Stock Locations" menu item (`/stock/locations`)
  - Add "Stock Items" menu item (`/stock`)
  - Use appropriate lucide icons:
    - `lucide:package` for Parts
    - `lucide:folder-tree` for Part Categories
    - `lucide:map-pin` for Stock Locations
    - `lucide:boxes` for Stock Items
    - `lucide:warehouse` for Inventory section
  - Add `:isActive` route matching for each item
  - Follow existing collapsible pattern for mobile

---

### Phase 2: Part Category Management UI ⏳
**Status:** Not started
**Goal:** Complete CRUD interface for part categories with tree view

#### 2.1 Composables
- [ ] **Create:** `app/composables/useParts.ts`
  ```typescript
  export function useParts() {
    // Part categories
    const fetchCategories = async (params?: {
      page?: number
      perPage?: number
      search?: string
      parentId?: string
      sortBy?: string
      sortOrder?: 'asc' | 'desc'
    }) => { /* ... */ }

    const fetchCategoryTree = async (parentId?: string) => { /* ... */ }
    const fetchCategory = async (id: string) => { /* ... */ }
    const createCategory = async (data: CreatePartCategoryInput) => { /* ... */ }
    const updateCategory = async (id: string, data: UpdatePartCategoryInput) => { /* ... */ }
    const deleteCategory = async (id: string, cascade?: boolean) => { /* ... */ }
    const moveCategory = async (id: string, newParentId: string | null) => { /* ... */ }

    // Parts (to be implemented later)
    const fetchParts = async (params?: any) => { /* ... */ }
    // ... other part methods

    return {
      fetchCategories,
      fetchCategoryTree,
      fetchCategory,
      createCategory,
      updateCategory,
      deleteCategory,
      moveCategory,
      fetchParts,
      // ...
    }
  }
  ```
  - Use `useExtendedFetch` for API calls
  - Use `useErrorHandler` for error handling
  - Use `useShowToast` for success messages
  - Import types from `shared/validators/part-category`

#### 2.2 Store (Optional)
- [ ] **Create:** `app/stores/partStore.js`
  - State: categories (tree structure), parts (list), loading, error
  - Actions: loadCategories, loadParts, etc.
  - Getters: categoryById, partById, rootCategories, etc.
  - Note: Store is optional - can use composable directly for simpler state

#### 2.3 Components - Category Tree
- [ ] **Create:** `app/components/Parts/PartCategoryTree.vue`
  - Props: `rootOnly?: boolean`, `selectable?: boolean`, `selectedId?: string`
  - Emits: `@select`, `@expand`, `@collapse`
  - Features:
    - Recursive tree rendering
    - Expandable/collapsible nodes
    - Show part count badge per category
    - Click to select/navigate
    - Loading skeleton
    - Empty state
  - Styling: Use shadcn Collapsible component
  - Icons: `lucide:folder`, `lucide:folder-open`, `lucide:chevron-right`

- [ ] **Create:** `app/components/Parts/PartCategoryTreeNode.vue`
  - Props: `category`, `level`, `selectable`, `selectedId`
  - Emits: `@select`
  - Recursive component for tree nodes
  - Indent based on level (use `pl-${level * 4}`)
  - Hover state with actions (edit, delete, add child)

#### 2.4 Components - Category Forms
- [ ] **Create:** `app/components/Parts/PartCategoryForm.vue`
  - Props: `initialData?: PartCategory`, `mode: 'create' | 'edit'`
  - Emits: `@success`, `@cancel`
  - Fields:
    - Name (required, text input)
    - Description (optional, textarea)
    - Parent Category (optional, select with tree)
    - Structural (checkbox)
    - Default Keywords (comma-separated tags input)
  - Validation: Use Zod schemas from `shared/validators/part-category`
  - Styling: Use shadcn Form, Input, Textarea, Checkbox
  - Submit button with loading state

- [ ] **Create:** `app/components/Parts/PartCategorySelect.vue`
  - Props: `modelValue`, `excludeId?: string`, `rootOption?: boolean`
  - Emits: `@update:modelValue`
  - Features:
    - Searchable dropdown
    - Tree structure visualization (indented options)
    - "Root" option if allowed
    - Exclude specific category (prevent circular reference)
  - Styling: Use shadcn Select or Command component

#### 2.5 Components - Category Actions
- [ ] **Create:** `app/components/Parts/PartCategoryActions.vue`
  - Props: `category: PartCategory`
  - Emits: `@edit`, `@delete`, `@move`, `@addChild`
  - Features:
    - Dropdown menu with actions
    - Edit category dialog
    - Delete with confirmation (show cascade option)
    - Move to new parent dialog
    - Add child category
  - Styling: Use shadcn DropdownMenu, AlertDialog

- [ ] **Create:** `app/components/Parts/PartCategoryDeleteDialog.vue`
  - Props: `category: PartCategory`, `open: boolean`
  - Emits: `@confirm`, `@cancel`, `@update:open`
  - Features:
    - Warning about deletion
    - Checkbox for cascade delete
    - Show impact (number of children, parts)
    - Confirm button (destructive styling)
  - Styling: Use shadcn AlertDialog

- [ ] **Create:** `app/components/Parts/PartCategoryMoveDialog.vue`
  - Props: `category: PartCategory`, `open: boolean`
  - Emits: `@confirm`, `@cancel`, `@update:open`
  - Features:
    - Select new parent (exclude current and descendants)
    - Preview of new path
    - Confirm button
  - Styling: Use shadcn Dialog

#### 2.6 Pages - Part Categories
- [ ] **Create:** `app/pages/parts/categories.vue`
  - Layout: Default with sidebar
  - Title: "Part Categories"
  - Features:
    - AppPageHeader with "Create Category" button
    - Search bar (filters tree)
    - Two view modes: Tree view | Table view (toggle)
    - Tree view: PartCategoryTree with actions
    - Table view: DataTable with columns (name, parent, part count, actions)
    - Empty state with "Create your first category" CTA
  - Animations: usePrimaryAnimation on cards

- [ ] **Create:** `app/pages/parts/categories/[id].vue`
  - Layout: Default with sidebar
  - Title: Category name (breadcrumb navigation)
  - Tabs: Overview | Parts | Children | Settings
  - Overview tab:
    - Category details card
    - Statistics cards (total parts, stock value, etc.)
    - Quick actions (edit, delete, add child)
  - Parts tab:
    - List of parts in this category
    - Link to full parts page with filter
  - Children tab:
    - List of child categories
    - Add child button
  - Settings tab:
    - Edit category form
    - Danger zone (delete category)

- [ ] **Create:** `app/pages/parts/categories/create.vue`
  - Layout: Default with sidebar
  - Title: "Create Part Category"
  - Features:
    - PartCategoryForm in create mode
    - Cancel button (navigates back)
    - Success redirect to created category

- [ ] **Create:** `app/pages/parts/categories/[id]/edit.vue`
  - Layout: Default with sidebar
  - Title: "Edit Category: [name]"
  - Features:
    - PartCategoryForm in edit mode with initial data
    - Cancel button (navigates back)
    - Success redirect to category detail

---

### Phase 3: Parts Management UI ⏳
**Status:** Not started
**Goal:** Complete CRUD interface for parts

#### 3.1 Components - Parts Table
- [ ] **Create:** `app/components/Parts/PartTable.vue`
  - Props: `categoryId?: string`, `filters?: object`
  - Features:
    - Sortable columns (name, IPN, category, stock, active)
    - Search by name/IPN
    - Filter by category, active status, flags (assembly, component, etc.)
    - Pagination
    - Row actions (view, edit, delete)
    - Bulk actions checkbox
    - Stock level indicator badge
    - Active/Inactive status badge
  - Styling: Use shadcn Table, Badge
  - Empty state

- [ ] **Create:** `app/components/Parts/PartCard.vue`
  - Props: `part: Part`
  - Features:
    - Part image thumbnail
    - Name and IPN
    - Category badge
    - Stock level with color indicator
    - Quick actions (view, edit)
    - Flags as icons (assembly, trackable, etc.)
  - Styling: Use shadcn Card
  - Hover effects

#### 3.2 Components - Parts Form
- [ ] **Create:** `app/components/Parts/PartForm.vue`
  - Props: `initialData?: Part`, `mode: 'create' | 'edit'`
  - Emits: `@success`, `@cancel`
  - Multi-step form (use shadcn Tabs):
    - Step 1: Basic Info (name, IPN, category, description)
    - Step 2: Attributes (assembly, component, trackable, etc.)
    - Step 3: Defaults (location, expiry, minimum stock)
    - Step 4: Image & Links
  - Validation: Use Zod schemas from `shared/validators/part`
  - Auto-generate IPN option
  - Image upload with preview
  - Save draft functionality

- [ ] **Create:** `app/components/Parts/PartImageUpload.vue`
  - Props: `modelValue?: string`, `partId?: string`
  - Emits: `@update:modelValue`
  - Features:
    - Drag & drop image upload
    - Preview thumbnail
    - Remove image
    - Upload to `/api/v1/upload` endpoint
  - Styling: Use shadcn Button, Progress
  - Max file size: 5MB

- [ ] **Create:** `app/components/Parts/PartAttributeToggles.vue`
  - Props: `modelValue: object`
  - Emits: `@update:modelValue`
  - Features:
    - Checkbox grid for part flags
    - Assembly, Component, Trackable, Purchaseable, Salable, etc.
    - Helper text for each option
  - Styling: Use shadcn Checkbox, Label

#### 3.3 Components - Part Details
- [ ] **Create:** `app/components/Parts/PartDetailsCard.vue`
  - Props: `part: Part`
  - Features:
    - Part information display
    - Image display
    - Category breadcrumb
    - All attributes with icons
    - Link to external resources
  - Styling: Use shadcn Card

- [ ] **Create:** `app/components/Parts/PartStockSummary.vue`
  - Props: `partId: string`
  - Features:
    - Total stock count by status (OK, DAMAGED, etc.)
    - Stock by location (top 5)
    - Link to full stock view
    - Add stock button
  - Styling: Use shadcn Card, Badge
  - Chart: Optional bar chart for visualization

- [ ] **Create:** `app/components/Parts/PartParameters.vue`
  - Props: `partId: string`, `editable?: boolean`
  - Features:
    - List of custom parameters
    - Add/edit/delete parameters
    - Parameter templates selection
  - Styling: Use shadcn Table, Dialog

#### 3.4 Pages - Parts
- [ ] **Create:** `app/pages/parts/index.vue`
  - Layout: Default with sidebar
  - Title: "Parts"
  - Features:
    - AppPageHeader with "Create Part" button
    - Filter sidebar (category, attributes, active status)
    - View toggle: Table | Grid
    - Search bar (name, IPN, description)
    - Export button (CSV)
    - PartTable or grid of PartCard components
  - Animations: usePrimaryAnimation

- [ ] **Create:** `app/pages/parts/[id].vue`
  - Layout: Default with sidebar
  - Title: Part name (with IPN)
  - Tabs: Overview | Stock | Attachments | History
  - Overview tab:
    - PartDetailsCard
    - PartStockSummary
    - Quick actions (edit, duplicate, delete)
  - Stock tab:
    - Stock items list filtered by part
    - Add stock button
    - Adjust stock button
  - Attachments tab:
    - File upload
    - Attachment list with preview
  - History tab:
    - Audit log timeline

- [ ] **Create:** `app/pages/parts/create.vue`
  - Layout: Default with sidebar
  - Title: "Create Part"
  - Features:
    - PartForm in create mode
    - Save draft button
    - Cancel button
    - Success redirect to created part

- [ ] **Create:** `app/pages/parts/[id]/edit.vue`
  - Layout: Default with sidebar
  - Title: "Edit Part: [name]"
  - Features:
    - PartForm in edit mode with initial data
    - Lock part option (prevent accidental changes)
    - Cancel button
    - Success redirect to part detail

---

### Phase 4: Stock Location Management UI ⏳
**Status:** Not started
**Goal:** Complete CRUD interface for stock locations with tree view

#### 4.1 Composables
- [ ] **Create:** `app/composables/useStock.ts`
  ```typescript
  export function useStock() {
    // Stock locations
    const fetchLocations = async (params?: any) => { /* ... */ }
    const fetchLocationTree = async (parentId?: string) => { /* ... */ }
    const fetchLocation = async (id: string) => { /* ... */ }
    const createLocation = async (data: CreateStockLocationInput) => { /* ... */ }
    const updateLocation = async (id: string, data: UpdateStockLocationInput) => { /* ... */ }
    const deleteLocation = async (id: string, cascade?: boolean) => { /* ... */ }

    // Stock items
    const fetchStockItems = async (params?: any) => { /* ... */ }
    const fetchStockItem = async (id: string) => { /* ... */ }
    const createStockItem = async (data: CreateStockItemInput) => { /* ... */ }
    const updateStockItem = async (id: string, data: UpdateStockItemInput) => { /* ... */ }
    const deleteStockItem = async (id: string) => { /* ... */ }
    const moveStockItem = async (id: string, locationId: string) => { /* ... */ }
    const adjustQuantity = async (id: string, adjustment: number) => { /* ... */ }

    return { /* ... */ }
  }
  ```
  - Use `useExtendedFetch` for API calls
  - Import types from `shared/validators/stock-location` and `stock-item`

#### 4.2 Components - Location Tree
- [ ] **Create:** `app/components/Stock/StockLocationTree.vue`
  - Similar structure to PartCategoryTree
  - Props: `rootOnly?: boolean`, `selectable?: boolean`, `selectedId?: string`
  - Emits: `@select`, `@expand`, `@collapse`
  - Features:
    - Recursive tree rendering
    - Show stock item count per location
    - Structural vs regular location icons
    - External location badge

- [ ] **Create:** `app/components/Stock/StockLocationTreeNode.vue`
  - Recursive node component
  - Actions: View, Edit, Delete, Add Child, Move

#### 4.3 Components - Location Forms
- [ ] **Create:** `app/components/Stock/StockLocationForm.vue`
  - Props: `initialData?: StockLocation`, `mode: 'create' | 'edit'`
  - Emits: `@success`, `@cancel`
  - Fields:
    - Name (required)
    - Description (optional)
    - Parent Location (select with tree)
    - Structural (checkbox)
    - External (checkbox - for outside warehouse)
  - Validation: Use Zod schemas

- [ ] **Create:** `app/components/Stock/StockLocationSelect.vue`
  - Searchable dropdown with tree structure
  - Exclude specific location
  - Root option

#### 4.4 Components - Location Details
- [ ] **Create:** `app/components/Stock/StockLocationCard.vue`
  - Props: `location: StockLocation`
  - Features:
    - Location information
    - Parent breadcrumb
    - Stock item count
    - Child location count
  - Styling: Use shadcn Card

- [ ] **Create:** `app/components/Stock/StockLocationSummary.vue`
  - Props: `locationId: string`
  - Features:
    - Stock items in location (top 10)
    - Total value
    - Stock by status
    - Link to full stock list

#### 4.5 Pages - Stock Locations
- [ ] **Create:** `app/pages/stock/locations/index.vue`
  - Layout: Default with sidebar
  - Title: "Stock Locations"
  - Features:
    - AppPageHeader with "Create Location" button
    - Search bar
    - View toggle: Tree | Table
    - Tree view: StockLocationTree
    - Table view: Locations table
  - Animations: usePrimaryAnimation

- [ ] **Create:** `app/pages/stock/locations/[id].vue`
  - Layout: Default with sidebar
  - Title: Location name (breadcrumb)
  - Tabs: Overview | Stock Items | Children | Settings
  - Overview tab:
    - StockLocationCard
    - StockLocationSummary
    - Quick actions
  - Stock Items tab:
    - Stock items in this location
    - Add stock button
  - Children tab:
    - Child locations
    - Add child button

- [ ] **Create:** `app/pages/stock/locations/create.vue`
  - StockLocationForm in create mode

- [ ] **Create:** `app/pages/stock/locations/[id]/edit.vue`
  - StockLocationForm in edit mode

---

### Phase 5: Stock Item Management UI ⏳
**Status:** Not started
**Goal:** Complete CRUD interface for stock items with tracking

#### 5.1 Components - Stock Items Table
- [ ] **Create:** `app/components/Stock/StockItemTable.vue`
  - Props: `partId?: string`, `locationId?: string`, `filters?: object`
  - Features:
    - Columns: Part, Location, Quantity, Batch, Serial, Status, Expiry
    - Sortable columns
    - Filter by status, location, part
    - Search by batch/serial
    - Pagination
    - Row actions (view, edit, move, adjust, delete)
    - Status badge with color coding
    - Expiry warning badge
  - Styling: Use shadcn Table, Badge

- [ ] **Create:** `app/components/Stock/StockItemCard.vue`
  - Props: `stockItem: StockItem`
  - Features:
    - Part name with image
    - Location badge
    - Quantity with large font
    - Batch/Serial info
    - Status badge
    - Quick actions
  - Styling: Use shadcn Card

#### 5.2 Components - Stock Item Forms
- [ ] **Create:** `app/components/Stock/StockItemForm.vue`
  - Props: `initialData?: StockItem`, `mode: 'create' | 'edit'`
  - Emits: `@success`, `@cancel`
  - Fields:
    - Part (searchable select)
    - Location (tree select)
    - Quantity (number, positive)
    - Batch (optional, text)
    - Serial (optional, text - enforces qty = 1)
    - Status (select: OK, DAMAGED, etc.)
    - Expiry Date (optional, date picker)
    - Purchase Price (optional, number)
    - Notes (optional, textarea)
  - Validation: Use Zod schemas
  - Auto-disable serial when qty > 1

- [ ] **Create:** `app/components/Stock/StockItemStatusSelect.vue`
  - Props: `modelValue`, `disabled?: boolean`
  - Emits: `@update:modelValue`
  - Features:
    - Status dropdown with icons
    - Color-coded options
    - Helper text for each status
  - Styling: Use shadcn Select

#### 5.3 Components - Stock Item Actions
- [ ] **Create:** `app/components/Stock/StockItemMoveDialog.vue`
  - Props: `stockItem: StockItem`, `open: boolean`
  - Emits: `@confirm`, `@cancel`, `@update:open`
  - Features:
    - Current location display
    - New location select (tree)
    - Notes field
    - Confirm button
  - Styling: Use shadcn Dialog

- [ ] **Create:** `app/components/Stock/StockItemAdjustDialog.vue`
  - Props: `stockItem: StockItem`, `open: boolean`
  - Emits: `@confirm`, `@cancel`, `@update:open`
  - Features:
    - Current quantity display
    - Adjustment input (positive or negative)
    - New quantity preview
    - Reason/notes field
    - Prevent adjustment below zero
  - Styling: Use shadcn Dialog

- [ ] **Create:** `app/components/Stock/StockItemDetails.vue`
  - Props: `stockItem: StockItem`
  - Features:
    - All stock item information
    - Part link
    - Location link
    - Status badge
    - Expiry warning
    - Purchase price
    - Notes
  - Styling: Use shadcn Card

#### 5.4 Components - Stock Item Tracking
- [ ] **Create:** `app/components/Stock/StockItemTrackingTimeline.vue`
  - Props: `stockItemId: string`
  - Features:
    - Timeline of all tracking events
    - Event type icons
    - User who performed action
    - Timestamp
    - Quantity changes
    - Location changes
    - Status changes
  - Styling: Use shadcn Card, Timeline pattern

#### 5.5 Pages - Stock Items
- [ ] **Create:** `app/pages/stock/index.vue`
  - Layout: Default with sidebar
  - Title: "Stock Items"
  - Features:
    - AppPageHeader with "Add Stock" button
    - Filter sidebar (part, location, status, batch)
    - View toggle: Table | Grid
    - Search bar (batch, serial)
    - StockItemTable or grid of StockItemCard
    - Low stock warnings banner
  - Animations: usePrimaryAnimation

- [ ] **Create:** `app/pages/stock/[id].vue`
  - Layout: Default with sidebar
  - Title: "Stock Item: [part name]"
  - Tabs: Details | Tracking History
  - Details tab:
    - StockItemDetails
    - Quick actions (edit, move, adjust, delete)
  - Tracking History tab:
    - StockItemTrackingTimeline
  - Action buttons in header:
    - Move Stock
    - Adjust Quantity
    - Change Status

- [ ] **Create:** `app/pages/stock/create.vue`
  - Layout: Default with sidebar
  - Title: "Add Stock"
  - Features:
    - StockItemForm in create mode
    - Quick mode vs Full mode toggle
    - Success options: Add another | View item | View location

- [ ] **Create:** `app/pages/stock/[id]/edit.vue`
  - Layout: Default with sidebar
  - Title: "Edit Stock Item"
  - Features:
    - StockItemForm in edit mode (limited fields)
    - Cannot change part or serial
    - Can change location, status, notes

---

### Phase 6: Dashboard & Overview ⏳
**Status:** Not started
**Goal:** Create dashboard with key metrics and insights

#### 6.1 Components - Dashboard Cards
- [ ] **Create:** `app/components/Dashboard/OverviewStats.vue`
  - Features:
    - Total parts count
    - Total stock items count
    - Total stock value
    - Low stock alerts count
    - Grid of stat cards
  - Styling: Use shadcn Card

- [ ] **Create:** `app/components/Dashboard/LowStockAlerts.vue`
  - Features:
    - List of parts below minimum stock
    - Priority indicators
    - Quick action to add stock
  - Styling: Use shadcn Card, Alert

- [ ] **Create:** `app/components/Dashboard/RecentActivity.vue`
  - Features:
    - Timeline of recent stock movements
    - Recent part additions
    - Recent location changes
  - Styling: Use shadcn Card

- [ ] **Create:** `app/components/Dashboard/StockByLocation.vue`
  - Features:
    - Bar chart of stock count by top locations
    - Interactive (click to view location)
  - Styling: Use shadcn Card + chart library

- [ ] **Create:** `app/components/Dashboard/StockByStatus.vue`
  - Features:
    - Pie chart of stock by status
    - Color-coded segments
  - Styling: Use shadcn Card + chart library

#### 6.2 Pages - Dashboard
- [ ] **Create:** `app/pages/dashboard.vue`
  - Layout: Default with sidebar
  - Title: "Dashboard"
  - Features:
    - Date range selector
    - OverviewStats
    - Two-column grid:
      - Left: LowStockAlerts, RecentActivity
      - Right: StockByLocation, StockByStatus
  - Animations: usePrimaryAnimation

---

### Phase 7: Search & Filters ⏳
**Status:** Not started
**Goal:** Global search and advanced filtering

#### 7.1 Components - Search
- [ ] **Create:** `app/components/App/GlobalSearch.vue`
  - Features:
    - Command palette style (Cmd+K)
    - Search across parts, categories, locations, stock items
    - Recent searches
    - Quick actions
  - Styling: Use shadcn Command component
  - Keyboard shortcuts

- [ ] **Create:** `app/components/Generic/AdvancedFilters.vue`
  - Props: `filters: FilterConfig[]`
  - Emits: `@update:filters`
  - Features:
    - Dynamic filter builder
    - Multiple filter types (text, select, date range, number range)
    - Add/remove filter rows
    - Save filter presets
  - Styling: Use shadcn Popover, Select

#### 7.2 Components - Quick Search
- [ ] **Create:** `app/components/Parts/PartQuickSearch.vue`
  - Combobox for quick part selection
  - Search by name, IPN
  - Use in forms

- [ ] **Create:** `app/components/Stock/LocationQuickSearch.vue`
  - Combobox for quick location selection
  - Search by name
  - Use in forms

---

### Phase 8: Responsive & Mobile Optimization ⏳
**Status:** Not started
**Goal:** Ensure great mobile experience

#### 8.1 Mobile Pages
- [ ] **Optimize:** All pages for mobile breakpoints
  - Stack columns vertically on small screens
  - Collapse sidebars
  - Use bottom sheets for forms on mobile
  - Touch-friendly targets (min 44px)

#### 8.2 Mobile Components
- [ ] **Create:** `app/components/Generic/MobileSheet.vue`
  - Bottom sheet for mobile forms
  - Use shadcn Sheet component

- [ ] **Create:** `app/components/Generic/MobileFilters.vue`
  - Drawer for filters on mobile
  - Apply/Reset buttons

---

### Phase 9: Performance & UX Enhancements ⏳
**Status:** Not started
**Goal:** Optimize performance and user experience

#### 9.1 Performance
- [ ] **Implement:** Virtual scrolling for large lists
  - Use `vue-virtual-scroller` for long tables
- [ ] **Implement:** Infinite scroll for paginated lists
- [ ] **Implement:** Image lazy loading
- [ ] **Implement:** Debounced search inputs
- [ ] **Implement:** Optimistic UI updates

#### 9.2 UX Enhancements
- [ ] **Implement:** Keyboard shortcuts
  - Cmd+K for search
  - N for new item
  - E for edit
  - Esc to close modals
- [ ] **Implement:** Bulk operations
  - Multi-select in tables
  - Bulk delete, move, status change
- [ ] **Implement:** Undo/Redo for critical actions
- [ ] **Implement:** Offline support (service worker)
- [ ] **Implement:** Export functionality (CSV, PDF)

#### 9.3 Accessibility
- [ ] **Audit:** All components for ARIA labels
- [ ] **Implement:** Keyboard navigation for all interactions
- [ ] **Implement:** Screen reader support
- [ ] **Test:** With accessibility tools (axe, WAVE)

---

## 📝 Component Reference

### Reusable Generic Components
- `Generic/ConfirmationDialog.vue` ✅ (already exists)
- `Generic/SubmitButton.vue` ✅ (already exists)
- `Generic/MobileSheet.vue` (to create)
- `Generic/MobileFilters.vue` (to create)
- `Generic/AdvancedFilters.vue` (to create)

### Part Components
- `Parts/PartCategoryTree.vue`
- `Parts/PartCategoryTreeNode.vue`
- `Parts/PartCategoryForm.vue`
- `Parts/PartCategorySelect.vue`
- `Parts/PartCategoryActions.vue`
- `Parts/PartCategoryDeleteDialog.vue`
- `Parts/PartCategoryMoveDialog.vue`
- `Parts/PartTable.vue`
- `Parts/PartCard.vue`
- `Parts/PartForm.vue`
- `Parts/PartImageUpload.vue`
- `Parts/PartAttributeToggles.vue`
- `Parts/PartDetailsCard.vue`
- `Parts/PartStockSummary.vue`
- `Parts/PartParameters.vue`
- `Parts/PartQuickSearch.vue`

### Stock Components
- `Stock/StockLocationTree.vue`
- `Stock/StockLocationTreeNode.vue`
- `Stock/StockLocationForm.vue`
- `Stock/StockLocationSelect.vue`
- `Stock/StockLocationCard.vue`
- `Stock/StockLocationSummary.vue`
- `Stock/StockItemTable.vue`
- `Stock/StockItemCard.vue`
- `Stock/StockItemForm.vue`
- `Stock/StockItemStatusSelect.vue`
- `Stock/StockItemMoveDialog.vue`
- `Stock/StockItemAdjustDialog.vue`
- `Stock/StockItemDetails.vue`
- `Stock/StockItemTrackingTimeline.vue`
- `Stock/LocationQuickSearch.vue`

### Dashboard Components
- `Dashboard/OverviewStats.vue`
- `Dashboard/LowStockAlerts.vue`
- `Dashboard/RecentActivity.vue`
- `Dashboard/StockByLocation.vue`
- `Dashboard/StockByStatus.vue`

---

## 🎨 Styling Guidelines

### Theme Colors (Already Available)
- Background: `bg-background`, `text-foreground`
- Cards: `bg-card`, `text-card-foreground`
- Primary: `bg-primary`, `text-primary-foreground`
- Secondary: `bg-secondary`, `text-secondary-foreground`
- Muted: `bg-muted`, `text-muted-foreground`
- Accent: `bg-accent`, `text-accent-foreground`
- Destructive: `bg-destructive`, `text-destructive-foreground`
- Border: `border-border`
- Input: `border-input`
- Ring: `ring-ring`
- Sidebar: `bg-sidebar`, `text-sidebar-foreground`

### Status Colors (Define Custom)
```typescript
const statusColors = {
  OK: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  DAMAGED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  DESTROYED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  REJECTED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  LOST: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
  QUARANTINED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
}
```

### Spacing
- Page margins: `px-6 py-8 md:px-8 md:py-10`
- Card gaps: `gap-6` or `space-y-6`
- Form fields: `space-y-4`
- Grid columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Typography
- Page title: `text-3xl font-bold tracking-tight`
- Section title: `text-2xl font-semibold`
- Card title: `text-lg font-medium`
- Body: `text-sm`
- Muted: `text-sm text-muted-foreground`

---

## 🚀 Getting Started

### Order of Implementation (Recommended)
1. Update Sidebar navigation (Phase 1)
2. Part Categories UI (Phase 2) - Start here as it's foundational
3. Stock Locations UI (Phase 4) - Similar to categories
4. Parts UI (Phase 3) - Depends on categories
5. Stock Items UI (Phase 5) - Depends on parts and locations
6. Dashboard (Phase 6) - Shows overview of everything
7. Search & Filters (Phase 7) - Enhances UX
8. Mobile Optimization (Phase 8) - Refine experience
9. Performance & Enhancements (Phase 9) - Polish

### Testing Strategy
- Manual testing in browser (dev mode)
- Test on multiple screen sizes (mobile, tablet, desktop)
- Test dark/light theme switching
- Test with real API (backend is complete)
- No frontend unit tests initially (focus on working UI)

### Success Criteria per Phase
- [ ] All pages load without errors
- [ ] All forms validate correctly
- [ ] All API calls succeed
- [ ] Responsive on all screen sizes
- [ ] Dark/light theme works correctly
- [ ] Loading states display properly
- [ ] Error handling shows user-friendly messages
- [ ] Success toasts appear for mutations
- [ ] Navigation flows logically

---

## 📚 Resources

### Documentation Links
- Nuxt 4: https://nuxt.com/docs
- shadcn-vue: https://www.shadcn-vue.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- VeeValidate: https://vee-validate.logaretm.com/v4/
- Pinia: https://pinia.vuejs.org/

### Component Patterns
- Refer to existing pages (`app/pages/settings.vue`, etc.) for structure
- Refer to existing components (`app/components/App/Sidebar.vue`, etc.) for patterns
- Use shadcn-vue documentation for UI component usage

---

## 🔄 Progress Tracking

Mark phases with:
- ⏳ Not started
- 🔄 In progress
- ✅ Complete

Update "Last Updated" date when making changes.
Add notes for context/decisions made during implementation.
