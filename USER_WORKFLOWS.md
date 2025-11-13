# Inventory Management System - User Workflows

**Last Updated:** 2025-11-13
**Status:** Phases 2-4 Complete (Part Categories, Parts, Stock Locations)

---

## 📱 Navigation Overview

### Sidebar Structure
The inventory system uses a hierarchical sidebar navigation:

**Mobile View:**
- Collapsible "Inventory" section containing all inventory functions
- Expandable on tap to reveal sub-items

**Desktop View:**
- Direct links to all inventory sections (no collapsing needed)

### Available Sections
1. **Part Categories** (`/parts/categories`) - Organize parts hierarchically
2. **Parts** (`/parts`) - Manage individual parts/components
3. **Stock Locations** (`/stock/locations`) - Define storage locations
4. **Stock Items** (`/stock`) - Track physical inventory ⚠️ *Not yet implemented*

---

## 🗂️ Workflow 1: Part Category Management

### Purpose
Organize parts into a hierarchical category structure (e.g., Electronics → Components → Resistors)

### Navigation Path
**Sidebar → Part Categories**

### 1.1 View All Categories

**Steps:**
1. Click "Part Categories" in sidebar
2. View category tree in left panel (hierarchical structure)
3. Click any category to view details in right panel

**What You See:**
- **Left Panel:** Collapsible tree showing all categories
- **Right Panel:** Selected category details (metadata, part count, subcategories)
- Categories show badge with part count
- Tree icons indicate parent/child relationships

### 1.2 Create a New Category

**Steps:**
1. From Part Categories page, click "New Category" button (top right)
2. Fill in the form:
   - **Name** (required): e.g., "Electronics"
   - **Description** (optional): Detailed description
   - **Parent Category** (optional): Select to nest under another category
3. Click "Create Category"
4. Redirected to new category detail page

**Use Cases:**
- **Root category:** Leave parent empty (e.g., "Electronics")
- **Nested category:** Select parent (e.g., "Resistors" under "Components")
- Build deep hierarchies: "Electronics" → "Components" → "Resistors" → "Carbon Film"

**Navigation Flow:**
```
Sidebar → Part Categories → New Category Button → Form → Create → Category Detail Page
```

### 1.3 View Category Details

**Steps:**
1. From Part Categories page tree, click a category
2. View details in right panel, OR
3. Click "View Details" from actions menu → Full detail page

**Details Shown:**
- Category name and description
- Parent category (if nested)
- Number of parts in this category
- Number of subcategories
- Creation date
- Quick action buttons (Edit, Move, View Parts)

**Navigation Options:**
- **View Parts:** Navigate to Parts page filtered by this category
- **Edit:** Go to edit form
- **Move:** Change parent category
- **Add Subcategory:** Create child category

### 1.4 Edit a Category

**Steps:**
1. From category detail page, click "Edit" button
2. Update any fields (name, description, parent)
3. Click "Update Category"
4. Returns to category detail page

**Navigation Flow:**
```
Part Categories → Select Category → Edit Button → Edit Form → Update → Category Detail
```

### 1.5 Move a Category

**Purpose:** Reorganize hierarchy by changing parent

**Steps:**
1. From category actions menu, click "Move Category"
2. Dialog appears with dropdown
3. Select new parent category (or "No parent" for root level)
4. Click "Move Category"
5. Tree refreshes with new structure

**Constraints:**
- Cannot move category to itself
- Cannot create circular references

### 1.6 Delete a Category

**Steps:**
1. From category actions menu, click "Delete Category"
2. Dialog shows warning if category has:
   - Subcategories (shows count)
   - Parts (shows count)
3. **Option:** Check "Delete all subcategories and reassign parts" to cascade
   - ✅ Checked: Deletes subcategories, unassigns parts
   - ❌ Unchecked: Prevented if has children/parts
4. Click "Delete" to confirm

**Navigation After Delete:**
- Returns to main Part Categories page
- Selection cleared
- Tree refreshes

---

## 📦 Workflow 2: Parts Management

### Purpose
Manage individual parts/components in your inventory

### Navigation Path
**Sidebar → Parts**

### 2.1 View All Parts

**Steps:**
1. Click "Parts" in sidebar
2. Choose view mode:
   - **Table View:** Sortable columns with search (default)
   - **Grid View:** Card-based layout

**Table View Features:**
- Sortable columns: Name, IPN, Category, Stock, Status
- Search by name or IPN (debounced)
- Pagination controls
- Bulk selection checkboxes
- Actions dropdown per row

**Grid View Features:**
- Card layout with images
- Shows key info: name, IPN, stock level, category
- Hover actions menu

**Sidebar Filters:**
- **Category:** Filter by specific category
- **Status:** Active / Inactive / All
- **Attributes:** Filter by Assembly, Component, Trackable, Purchaseable

### 2.2 Create a New Part

**Steps:**
1. From Parts page, click "New Part" button
2. Complete multi-step form (tabs):

**Tab 1 - Basic Info:**
- **Name** (required): e.g., "1kΩ Resistor"
- **IPN** (required): Internal part number (can auto-generate)
- **Category** (optional): Select from dropdown
- **Description** (optional): Detailed description

**Tab 2 - Attributes:**
- Toggle checkboxes for part characteristics:
  - ✅ **Assembly:** This part is built from other parts
  - ✅ **Component:** Used as component in assemblies
  - ✅ **Trackable:** Track with serial numbers/batches
  - ✅ **Purchaseable:** Can be purchased from suppliers
  - ✅ **Salable:** Can be sold to customers
  - ✅ **Virtual:** No physical stock (software, service)

**Tab 3 - Defaults:**
- **Default Location:** Where to store this part
- **Default Expiry:** Days until expiration
- **Minimum Stock:** Alert threshold
- **Active:** Toggle active/inactive status

**Tab 4 - Media:**
- **Image:** Drag-and-drop upload (max 5MB)
- **Link:** External URL to datasheet/docs

3. Click "Create Part" (or "Save Draft" to save progress)
4. Redirected to new part detail page

**Navigation Flow:**
```
Sidebar → Parts → New Part Button → Multi-step Form → Create → Part Detail Page
```

**Tips:**
- Use "Generate" button for IPN to create unique ID
- Save drafts to come back later (create mode only)
- All fields except Name and IPN are optional

### 2.3 View Part Details

**Steps:**
1. From Parts page, click any part row/card
2. View tabbed detail page:

**Overview Tab:**
- **Part Details Card:** Name, IPN, category, attributes, timestamps
- **Stock Summary Card:** Stock levels by status, top locations, low stock alerts
- **Quick Actions:** Edit, Add Stock, View All Stock, Duplicate

**Stock Tab:**
- Link to filtered stock items view
- "Add Stock" button

**Parameters Tab:**
- Custom specifications table
- Add/edit/delete custom parameters (e.g., Voltage: 12V, Weight: 500g)
- Editable when viewing

**History Tab:**
- Audit log (not yet implemented)

### 2.4 Edit a Part

**Steps:**
1. From part detail page, click "Edit" button
2. Same multi-step form as create, pre-filled
3. Modify any fields
4. Click "Update Part"
5. Returns to part detail page

**Navigation Flow:**
```
Parts → Select Part → Edit Button → Multi-step Form → Update → Part Detail
```

### 2.5 Delete a Part

**Steps:**
1. From part detail page, click actions menu → "Delete Part"
2. Confirmation dialog warns about stock items
3. Click "Delete" to confirm
4. Redirected to Parts list page

**Warning:** May affect existing stock items that reference this part

### 2.6 Filter and Search Parts

**Workflow for Finding Parts:**

**Quick Search:**
1. Use search bar (top of table/grid)
2. Type name or IPN
3. Results filter in real-time (500ms debounce)

**Advanced Filtering:**
1. Use left sidebar filter panel
2. Select category from dropdown
3. Choose status (Active/Inactive/All)
4. Toggle attribute filters (Assembly, Component, etc.)
5. Click "Clear Filters" to reset

**Combined Workflow:**
- Search + Filters work together
- Filter by category, then search within results
- Pagination preserves filters

### 2.7 View Parts in a Category

**Cross-Workflow Navigation:**
1. From Part Categories, view category details
2. Click "View Parts" button
3. Navigates to Parts page pre-filtered by category

**Navigation Flow:**
```
Part Categories → Select Category → View Parts Button → Parts Page (filtered)
```

---

## 📍 Workflow 3: Stock Location Management

### Purpose
Define hierarchical storage locations for physical inventory

### Navigation Path
**Sidebar → Stock Locations**

### 3.1 View All Locations

**Steps:**
1. Click "Stock Locations" in sidebar
2. View location tree in left panel
3. Click any location to view details in right panel

**What You See:**
- **Left Panel:** Collapsible tree showing location hierarchy
- **Right Panel:** Selected location details
- Icons indicate location type:
  - 📁 Folder icon = Structural location (organizational only)
  - 📍 Pin icon = Storage location (holds stock)
- Badges show:
  - "External" for off-site locations
  - Stock item count

### 3.2 Create a New Location

**Steps:**
1. From Stock Locations page, click "New Location" button
2. Fill in the form:
   - **Name** (required): e.g., "Warehouse A", "Shelf 3"
   - **Description** (optional): Additional details
   - **Parent Location** (optional): Nest under another location
   - **Structural** (checkbox): If checked, cannot hold stock directly (organizational only)
   - **External** (checkbox): Location is outside main facility
3. Click "Create Location"
4. Redirected to new location detail page

**Use Cases:**

**Warehouse Hierarchy:**
```
Warehouse A (structural)
  ├─ Aisle 1 (structural)
  │   ├─ Shelf 1A (storage)
  │   └─ Shelf 1B (storage)
  └─ Aisle 2 (structural)
      └─ Shelf 2A (storage)
```

**External Locations:**
- Supplier warehouse (external + structural)
- Customer site (external + storage)
- Remote storage facility (external + structural)

**Navigation Flow:**
```
Sidebar → Stock Locations → New Location Button → Form → Create → Location Detail
```

### 3.3 Create Sub-location

**Purpose:** Add child location under existing location

**Steps:**
1. From location detail page, click "Add Sub-location"
2. Opens create form with parent pre-selected
3. Fill in new location details
4. Parent field is pre-populated with current location
5. Click "Create Location"

**Navigation Flow:**
```
Stock Locations → Select Location → Add Sub-location → Form (parent pre-filled) → Create
```

**Alternative:**
- Create location with `?parentId=xxx` query param
- Parent dropdown automatically selected

### 3.4 View Location Details

**Steps:**
1. From Stock Locations tree, click a location
2. View details in right panel OR
3. Click "View Details" from actions → Full detail page

**Details Shown:**
- Location name and description
- Type badges (Structural/Storage, External)
- Parent location status
- Stock items count
- Sub-locations count
- Creation date
- Quick action buttons

**Quick Actions:**
- **View Stock Items:** See what's stored here (navigates to Stock Items page filtered by location)
- **Add Sub-location:** Create child location
- **Edit:** Modify location details

### 3.5 Edit a Location

**Steps:**
1. From location detail page, click "Edit" button
2. Update any fields
3. Click "Update Location"
4. Returns to location detail page

**Navigation Flow:**
```
Stock Locations → Select Location → Edit Button → Edit Form → Update → Location Detail
```

### 3.6 Delete a Location

**Steps:**
1. From location actions menu, click "Delete Location"
2. Dialog shows warning if location has:
   - Sub-locations (shows count)
   - Stock items (shows count)
3. **Option:** Check "Delete all sub-locations and stock items" to cascade
   - ✅ Checked: Permanently deletes everything
   - ❌ Unchecked: Prevented if has children/stock
4. Click "Delete" to confirm

**Warning:** Cascade delete is permanent and affects stock items!

---

## 🔄 Cross-Workflow Integration

### Category → Parts → Stock Workflow

**Complete Flow:**
```
1. Create category: "Electronics" → "Resistors"
2. Create part: "1kΩ Resistor" in "Resistors" category
3. Create location: "Warehouse A" → "Shelf 1"
4. Add stock: [To be implemented] Add 100 units of "1kΩ Resistor" to "Shelf 1"
```

### Part Details → Stock Locations Navigation

**From Part Detail Page:**
1. View part
2. See "Stock Summary" card showing locations with stock
3. Click location name → Navigate to location detail
4. Click "View All Stock" → Navigate to Stock Items page (filtered by part)

### Category Tree → Parts List Navigation

**From Part Categories:**
1. Browse category tree
2. Select category (e.g., "Resistors")
3. Click "View Parts" button
4. Navigated to Parts page with category filter applied
5. See only parts in "Resistors" category

### Location Tree → Stock Items Navigation

**From Stock Locations:**
1. Browse location tree
2. Select location (e.g., "Shelf 1A")
3. Click "View Stock Items" button
4. Navigate to Stock Items page (filtered by location)
5. See only items stored in "Shelf 1A"

---

## 🎯 Common User Scenarios

### Scenario 1: Setting Up a New Inventory System

**Steps:**
1. **Create location hierarchy**
   - Navigate to Stock Locations
   - Create "Main Warehouse" (structural)
   - Create aisles/shelves as sub-locations
   - Mark external locations if needed

2. **Create part categories**
   - Navigate to Part Categories
   - Create top-level categories (e.g., "Electronics", "Mechanical")
   - Create subcategories (e.g., "Components" → "Resistors")

3. **Add parts**
   - Navigate to Parts
   - Create parts with proper categories
   - Set default locations
   - Upload images and links

4. **Add stock** *(Not yet implemented)*
   - Add stock items for each part
   - Assign to locations
   - Track quantities

### Scenario 2: Finding a Specific Part

**Method 1 - Direct Search:**
1. Navigate to Parts
2. Use search bar
3. Type part name or IPN
4. Click result

**Method 2 - Browse by Category:**
1. Navigate to Part Categories
2. Browse tree to find category
3. Click "View Parts" in category
4. View filtered list

**Method 3 - Filter by Attributes:**
1. Navigate to Parts
2. Use sidebar filters
3. Select category + attributes
4. Browse filtered results

### Scenario 3: Reorganizing Categories

**Task:** Move "Resistors" from "Electronics" to "Electronics → Components"

**Steps:**
1. Navigate to Part Categories
2. Create "Components" under "Electronics" (if doesn't exist)
3. Select "Resistors" category
4. Click "Move Category" from actions
5. Select "Components" as new parent
6. Confirm move
7. Tree updates to show new hierarchy

### Scenario 4: Checking Stock for a Part

**Steps:**
1. Navigate to Parts
2. Search for part
3. Click part to view details
4. View "Stock Summary" card on Overview tab
5. See:
   - Total stock count by status (OK, Damaged, etc.)
   - Top 5 locations with stock
   - Low stock warning (if below minimum)
6. Click "View All Stock" to see complete list
7. Click location name to view location details

### Scenario 5: Managing Part Attributes

**Task:** Mark existing part as "Assembly" and add specifications

**Steps:**
1. Navigate to Parts
2. Find and click the part
3. Click "Edit" button
4. Go to "Attributes" tab
5. Check "Assembly" checkbox
6. Go to "Defaults" tab and set minimum stock
7. Click "Update Part"
8. Return to detail page
9. Go to "Parameters" tab
10. Click "Add Parameter"
11. Add custom specs (e.g., Weight: 500g)
12. Save parameters

---

## ⚠️ Current Limitations

### Not Yet Implemented

1. **Stock Items Management** (`/stock` pages)
   - Stock item CRUD operations
   - Adding/removing stock
   - Moving stock between locations
   - Quantity adjustments
   - Stock status changes

2. **Dashboard** (`/dashboard`)
   - Overview statistics
   - Low stock alerts
   - Recent activity

3. **Advanced Features**
   - Part assembly/BOM management
   - Batch/serial number tracking
   - Stock history/audit logs
   - Reports and exports

### Sidebar Navigation Gaps

The sidebar links to `/stock` but the page doesn't exist yet. Clicking "Stock Items" will show a 404 or blank page.

**Recommended Next Steps:**
- Implement Stock Items Management UI (Phase 5 from FRONTEND_IMPLEMENTATION_PLAN.md)
- Add Dashboard overview page
- Implement search across all sections

---

## 🔍 Navigation Analysis

### ✅ Working Navigation Paths

All sidebar links correctly route to existing pages:

1. **Part Categories** → `/parts/categories` ✅
   - List page with tree view
   - Create page
   - Detail pages (`/parts/categories/[id]`)
   - Edit pages (`/parts/categories/[id]/edit`)

2. **Parts** → `/parts` ✅
   - List page with table/grid views
   - Create page
   - Detail pages with tabs (`/parts/[id]`)
   - Edit pages (`/parts/[id]/edit`)

3. **Stock Locations** → `/stock/locations` ✅
   - List page with tree view
   - Create page (with optional `?parentId` query)
   - Detail pages (`/stock/locations/[id]`)
   - Edit pages (`/stock/locations/[id]/edit`)

4. **Stock Items** → `/stock` ❌
   - Page not yet created
   - Composable methods exist in `useStock.ts`
   - Backend API endpoints exist

### Active State Highlighting

The sidebar correctly highlights active sections using `route.path.startsWith()`:

```vue
✅ Part Categories: route.path.startsWith('/parts/categories')
✅ Parts: route.path === '/parts' || (starts with '/parts/' but not '/parts/categories')
✅ Stock Locations: route.path.startsWith('/stock/locations')
✅ Stock Items: route.path === '/stock' || (starts with '/stock/' but not '/stock/locations')
```

This means:
- When viewing `/parts/123`, "Parts" is highlighted
- When viewing `/parts/categories/456`, "Part Categories" is highlighted
- When viewing `/stock/locations/789`, "Stock Locations" is highlighted

### Mobile vs Desktop Navigation

**Mobile:**
- Collapsible "Inventory" section
- All 4 links nested under collapsible
- Saves vertical space

**Desktop:**
- Direct links (no collapsing)
- Faster access to each section
- Inventory items shown at top level

Both implementations use the same routes and maintain active states.

---

## 📊 Summary

### User Flow Support: **Excellent** ✅

The current implementation provides:
- ✅ Intuitive hierarchical navigation
- ✅ Consistent patterns across all sections
- ✅ Cross-section navigation (category → parts, location → stock)
- ✅ Breadcrumb-style workflows
- ✅ Quick actions for common tasks
- ✅ Responsive mobile/desktop layouts

### Gaps to Address:

1. **Stock Items pages** - Critical for complete workflow
2. **Dashboard** - Overview and quick access
3. **Search** - Global search across all sections
4. **Batch operations** - Bulk edits/deletes

### Workflow Readiness:

- **Part Categories:** 100% Complete
- **Parts:** 100% Complete
- **Stock Locations:** 100% Complete
- **Stock Items:** 0% Complete (sidebar link exists, but no pages)
- **Cross-workflows:** 80% Complete (missing stock items integration)

