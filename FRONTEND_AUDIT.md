# Frontend Setup Audit - Parts Components Implementation

**Date:** 2025-11-13
**Branch:** `claude/frontend-setup-audit-011CV5j8vzwvXnSCT6bnuS41`
**Auditor:** Claude

---

## Executive Summary

This audit identified **13 missing Parts components** that are referenced in page files but not yet implemented. All Stock components are properly implemented and serve as reference patterns. The project uses Nuxt 4 with auto-import conventions via shadcn-nuxt.

---

## Architecture Overview

### Tech Stack
- **Framework:** Nuxt 4
- **UI Components:** shadcn-nuxt (Reka UI/Radix Vue based)
- **Component Directory:** `app/components/ui/` (auto-imported)
- **Custom Components:** `app/components/{Domain}/` (auto-imported)
- **Form Validation:** vee-validate + zod
- **State Management:** Pinia + composables
- **Styling:** Tailwind CSS 4

### Component Auto-Import Convention
Nuxt automatically imports components from:
1. `app/components/` - Any `.vue` file
2. Naming: `{Domain}{ComponentName}.vue` → Used as `<DomainComponentName />`
3. Example: `app/components/Parts/CategorySelect.vue` → `<PartsCategorySelect />`

### Component Structure Patterns
Based on existing Stock components, all components should follow:

```vue
<template>
  <!-- UI structure -->
</template>

<script setup lang="ts">
// 1. Import types from #shared/types
// 2. Import validators from #shared/validators
// 3. Define Props interface
// 4. Define Emits interface
// 5. Use composables (useParts, useStock, etc.)
// 6. Implement reactive logic
</script>
```

---

## Audit Findings

### ✅ Implemented Components

#### Stock Components (Complete - Reference Implementations)
Located in `app/components/Stock/`:
- ✅ `ItemAdjustDialog.vue` - Dialog for adjusting stock quantities
- ✅ `ItemCard.vue` - Card view for stock items (grid view)
- ✅ `ItemDetails.vue` - Detailed stock item view
- ✅ `ItemForm.vue` - Create/edit stock item form
- ✅ `ItemMoveDialog.vue` - Dialog for moving stock between locations
- ✅ `ItemStatusSelect.vue` - Status dropdown component
- ✅ `ItemTable.vue` - Table view for stock items with sorting/filtering
- ✅ `LocationActions.vue` - Action buttons for locations
- ✅ `LocationDeleteDialog.vue` - Confirmation dialog for location deletion
- ✅ `LocationForm.vue` - Create/edit location form
- ✅ `LocationSelect.vue` - Location selection dropdown
- ✅ `LocationTree.vue` - Hierarchical location tree view
- ✅ `LocationTreeNode.vue` - Individual tree node component

#### Parts Components (Partial)
Located in `app/components/Parts/`:
- ✅ `AttributeToggles.vue` - Boolean attribute toggles (assembly, component, etc.)
- ✅ `DetailsCard.vue` - Part information display card

### ❌ Missing Components

#### Critical Parts Components (Used in Pages)
These are referenced in page files but not implemented:

1. **`PartsCategorySelect.vue`** ⚠️ PRIORITY
   - Used in: `app/pages/parts/index.vue:29`
   - Purpose: Dropdown to select part categories
   - Pattern: Similar to `StockLocationSelect.vue`
   - Dependencies: Part category API, types from `#shared/types/part-category`

2. **`PartsTable.vue`** ⚠️ PRIORITY
   - Used in: `app/pages/parts/index.vue:106`
   - Purpose: Table view for parts list with sorting/filtering
   - Pattern: Similar to `StockItemTable.vue`
   - Features: Sorting, filtering, pagination, actions column
   - Props: categoryId, filters, @delete event

3. **`PartsCard.vue`** ⚠️ PRIORITY
   - Used in: `app/pages/parts/index.vue:117`
   - Purpose: Card view for parts (grid view)
   - Pattern: Similar to `StockItemCard.vue`
   - Features: Part details, attributes badges, actions dropdown
   - Props: part, @delete event

4. **`PartsForm.vue`** ⚠️ PRIORITY
   - Used in: `app/pages/parts/create.vue:18`, `app/pages/parts/[id]/edit.vue:36`
   - Purpose: Create/edit part form
   - Pattern: Similar to `StockItemForm.vue`
   - Fields: name, IPN, description, category, attributes, stock settings
   - Validation: Uses `#shared/validators/part` schemas
   - Props: part (optional for edit), loading, @submit, @cancel events

5. **`PartsCategoryForm.vue`** ⚠️ PRIORITY
   - Used in: `app/pages/parts/categories/[id]/edit.vue:36`, `app/pages/parts/categories/create.vue:18`
   - Purpose: Create/edit part category form
   - Pattern: Similar to `StockLocationForm.vue`
   - Fields: name, description, parentId, structural
   - Validation: Uses `#shared/validators/part-category` schemas

6. **`PartsStockSummary.vue`**
   - Used in: `app/pages/parts/[id]/index.vue:74`
   - Purpose: Display stock summary for a part
   - Pattern: Custom component showing total stock, locations, etc.
   - Props: partId

7. **`PartsParameters.vue`**
   - Used in: `app/pages/parts/[id]/index.vue:141`
   - Purpose: Display/edit part parameters (custom fields)
   - Pattern: Table or list of key-value parameters
   - Props: partId, editable

8. **`PartsCategoryTree.vue`**
   - Used in: `app/pages/parts/categories/index.vue:22`, `app/pages/parts/categories/[id]/index.vue:100`
   - Purpose: Hierarchical category tree view
   - Pattern: Similar to `StockLocationTree.vue`
   - Features: Expandable tree, category selection

9. **`PartsCategoryActions.vue`**
   - Used in: `app/pages/parts/categories/index.vue:42`, `app/pages/parts/categories/[id]/index.vue:10`
   - Purpose: Action buttons for categories (edit, delete, move)
   - Pattern: Similar to `StockLocationActions.vue`

10. **`PartsCategoryDeleteDialog.vue`**
    - Used in: `app/pages/parts/categories/index.vue:112`, `app/pages/parts/categories/[id]/index.vue:125`
    - Purpose: Confirmation dialog for category deletion
    - Pattern: Similar to `StockLocationDeleteDialog.vue`

11. **`PartsCategoryMoveDialog.vue`**
    - Used in: `app/pages/parts/categories/index.vue:119`, `app/pages/parts/categories/[id]/index.vue:132`
    - Purpose: Dialog to move category to different parent
    - Pattern: Custom dialog with category selector

12. **`PartsSelect.vue`** ⚠️ CRITICAL BUG
    - Used in: Referenced incorrectly as `PartCategorySelect` in `app/components/Stock/ItemForm.vue:8`
    - Purpose: Dropdown to select individual parts (not categories!)
    - Pattern: Similar to `StockLocationSelect.vue`
    - Bug: StockItemForm line 8 uses `<PartCategorySelect>` but should use `<PartsSelect>` to select a Part, not a PartCategory

### 🐛 Bugs Found

1. **StockItemForm.vue Line 8 - Incorrect Component**
   - **Location:** `app/components/Stock/ItemForm.vue:8`
   - **Current:** `<PartCategorySelect>`
   - **Should Be:** `<PartsSelect>`
   - **Issue:** Stock items need to select a Part, not a PartCategory
   - **Impact:** Stock item creation/editing will fail
   - **Fix:** Create `PartsSelect.vue` component and update `StockItemForm.vue`

---

## Shared Resources Audit

### ✅ Types Available
- `#shared/types/part` - Part, NewPart, PartParameter, NewPartParameter
- `#shared/types/part-category` - PartCategory, NewPartCategory
- `#shared/types/stock-item` - StockItem types
- `#shared/types/stock-location` - StockLocation types

### ✅ Validators Available
- `#shared/validators/part` - createPartSchema, updatePartSchema, listPartsSchema
- `#shared/validators/part-category` - Category validation schemas
- `#shared/validators/stock-item` - Stock item schemas
- `#shared/validators/stock-location` - Location schemas

### ✅ Composables Available
- `useParts()` - Parts CRUD operations
- `useStock()` - Stock CRUD operations
- Located in: `app/composables/`

---

## Implementation Plan

### Phase 1: Core Components (Priority: CRITICAL)
These are needed for basic Parts CRUD functionality:

1. ✅ **PartsCategorySelect.vue**
   - Pattern: Copy `StockLocationSelect.vue`, adapt for categories
   - API: Fetch categories from parts API
   - Props: modelValue, placeholder, disabled, excludeId
   - Emit: update:modelValue

2. ✅ **PartsSelect.vue** (Bug Fix)
   - Pattern: Similar to PartsCategorySelect but for Parts
   - API: Fetch parts from parts API
   - Props: modelValue, placeholder, disabled, categoryId (optional filter)
   - Emit: update:modelValue
   - **Then fix:** `StockItemForm.vue:8`

3. ✅ **PartsForm.vue**
   - Pattern: Copy `StockItemForm.vue` structure
   - Fields: All fields from createPartSchema
   - Sections: Basic Info, Attributes, Stock Settings, Additional
   - Validation: vee-validate + zod

4. ✅ **PartsCategoryForm.vue**
   - Pattern: Copy `StockLocationForm.vue` structure
   - Fields: name, description, parentId, structural
   - Simpler than PartsForm

5. ✅ **PartsTable.vue**
   - Pattern: Copy `StockItemTable.vue` structure
   - Columns: Name, IPN, Category, Attributes, Stock, Actions
   - Features: Sort, filter, pagination, row actions

6. ✅ **PartsCard.vue**
   - Pattern: Copy `StockItemCard.vue` structure
   - Display: Part name, IPN, category, attributes badges
   - Actions: View, Edit, Delete dropdown

### Phase 2: Category Management
Category-specific components:

7. ✅ **PartsCategoryTree.vue**
   - Pattern: Copy `StockLocationTree.vue`
   - Recursive tree structure for categories

8. ✅ **PartsCategoryActions.vue**
   - Pattern: Copy `StockLocationActions.vue`
   - Actions: Edit, Move, Delete buttons

9. ✅ **PartsCategoryDeleteDialog.vue**
   - Pattern: Copy `StockLocationDeleteDialog.vue`
   - Confirmation dialog with cascade warning

10. ✅ **PartsCategoryMoveDialog.vue**
    - Pattern: Similar to category delete, but with category selector
    - Select new parent category

### Phase 3: Advanced Features

11. ✅ **PartsStockSummary.vue**
    - Custom component
    - Display: Total stock, locations breakdown, status summary
    - Cards or stats layout

12. ✅ **PartsParameters.vue**
    - Custom component
    - Table view of parameters
    - Editable if prop enabled
    - Add/edit/delete parameter rows

---

## Component Specifications

### Template: PartsCategorySelect.vue
```vue
<template>
  <Select v-model="selectedValue" :disabled="disabled">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import type { PartCategory } from '#shared/types/part-category'

interface Props {
  modelValue?: string | null
  placeholder?: string
  disabled?: boolean
  excludeId?: string
}

// Implementation: Fetch categories, filter by excludeId, emit updates
</script>
```

### Template: PartsForm.vue Structure
```typescript
// Fields from createPartSchema:
- name (required, max 250)
- description (optional, max 1000, textarea)
- categoryId (required, PartsCategorySelect)
- IPN (optional, max 100)
- revision (optional, max 50)
- keywords (optional, max 250)

// Attributes (checkboxes):
- active (default true)
- virtual, template, assembly, component, trackable, purchaseable, salable, testable, locked

// Stock Settings:
- defaultLocationId (StockLocationSelect)
- minimumStock (number, default 0)
- defaultExpiry (number, days)
- units (string, max 50)

// Additional:
- notes (textarea, max 5000)
- link (URL, max 500)
- imageId (future: image upload)
- metadata (JSON, optional)
```

---

## Testing Checklist

After implementation, test these flows:

### Parts CRUD
- [ ] Create new part with all fields
- [ ] Create part with minimal fields
- [ ] Edit existing part
- [ ] View part details
- [ ] Delete part
- [ ] List parts in table view
- [ ] List parts in grid view
- [ ] Filter parts by category
- [ ] Filter parts by attributes
- [ ] Search parts

### Part Categories CRUD
- [ ] Create root category
- [ ] Create subcategory
- [ ] Edit category
- [ ] Move category to different parent
- [ ] Delete category (empty)
- [ ] Delete category (with parts) - should show warning
- [ ] View category tree
- [ ] Select category in tree

### Stock Integration
- [ ] Create stock item with part selection (bug fix verification)
- [ ] View part's stock summary
- [ ] Navigate from part to stock items

---

## Auto-Import Verification

Nuxt should auto-import all components. Verify by:

1. Check `.nuxt/components.d.ts` after dev server starts
2. All components in `app/components/**/*.vue` should be registered
3. No explicit imports needed in pages/components

Expected imports:
```typescript
// .nuxt/components.d.ts should contain:
PartsCategorySelect: typeof import('../app/components/Parts/CategorySelect.vue')['default']
PartsTable: typeof import('../app/components/Parts/Table.vue')['default']
PartsCard: typeof import('../app/components/Parts/Card.vue')['default']
// ... etc
```

---

## File Structure Summary

```
app/
├── components/
│   ├── Parts/
│   │   ├── AttributeToggles.vue ✅
│   │   ├── DetailsCard.vue ✅
│   │   ├── CategorySelect.vue ❌ MISSING
│   │   ├── Table.vue ❌ MISSING
│   │   ├── Card.vue ❌ MISSING
│   │   ├── Form.vue ❌ MISSING
│   │   ├── CategoryForm.vue ❌ MISSING
│   │   ├── StockSummary.vue ❌ MISSING
│   │   ├── Parameters.vue ❌ MISSING
│   │   ├── CategoryTree.vue ❌ MISSING
│   │   ├── CategoryActions.vue ❌ MISSING
│   │   ├── CategoryDeleteDialog.vue ❌ MISSING
│   │   ├── CategoryMoveDialog.vue ❌ MISSING
│   │   └── Select.vue ❌ MISSING (for part selection, not category!)
│   ├── Stock/ ✅ ALL COMPLETE
│   └── ui/ ✅ shadcn components
├── pages/
│   ├── parts/ ❌ Pages exist but components missing
│   └── stock/ ✅ Complete
└── composables/
    ├── useParts.ts ✅
    └── useStock.ts ✅

shared/
├── types/
│   ├── part.ts ✅
│   ├── part-category.ts ✅
│   ├── stock-item.ts ✅
│   └── stock-location.ts ✅
└── validators/
    ├── part.ts ✅
    ├── part-category.ts ✅
    ├── stock-item.ts ✅
    └── stock-location.ts ✅
```

---

## Context for Session Resumption

### What Works
- Stock module: 100% complete, all components implemented
- UI library: shadcn-nuxt properly configured
- Auto-import: Working (Nuxt 4 default)
- Types & Validators: All defined in shared/
- Composables: useParts() and useStock() available

### What's Missing
- 13 Parts components (see list above)
- 1 critical bug fix in StockItemForm.vue

### Next Steps
1. Implement components in order of priority (Phase 1 → 2 → 3)
2. Use Stock components as reference patterns
3. Test each component as it's created
4. Verify auto-import registration
5. Fix StockItemForm bug
6. Test complete Parts CRUD flow

### Key Patterns to Follow
- All forms use vee-validate + zod
- All selects are based on Reka UI Select component
- All tables have sort/filter/pagination
- All cards have dropdown actions menu
- All dialogs use AlertDialog or Dialog from shadcn
- All components emit events (no direct mutations)
- All API calls go through composables

---

## References

### Stock Components to Reference
- `StockLocationSelect.vue` → Use for `PartsCategorySelect.vue` and `PartsSelect.vue`
- `StockItemForm.vue` → Use for `PartsForm.vue`
- `StockLocationForm.vue` → Use for `PartsCategoryForm.vue`
- `StockItemTable.vue` → Use for `PartsTable.vue`
- `StockItemCard.vue` → Use for `PartsCard.vue`
- `StockLocationTree.vue` → Use for `PartsCategoryTree.vue`
- `StockLocationActions.vue` → Use for `PartsCategoryActions.vue`
- `StockLocationDeleteDialog.vue` → Use for `PartsCategoryDeleteDialog.vue`

### API Endpoints (assumed from composables)
- `GET /api/parts` - List parts
- `GET /api/parts/:id` - Get part
- `POST /api/parts` - Create part
- `PATCH /api/parts/:id` - Update part
- `DELETE /api/parts/:id` - Delete part
- `GET /api/part-categories` - List categories
- Similar pattern for categories

---

**End of Audit**
