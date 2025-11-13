# Frontend Architecture Refactor Checklist

**Last Updated:** 2025-11-13
**Purpose:** Complete refactor to align with conventions in `docs/CONVENTIONS.md`
**Status:** 🟡 In Progress

---

## Executive Summary

This inventory management application currently violates several critical frontend architecture conventions. The main issues are:

1. ❌ **Missing Pinia Stores** - API calls are in composables instead of stores
2. ❌ **Composable Anti-Pattern** - `useParts` and `useStock` violate composable purpose
3. ❌ **State Management** - Pages manage domain state locally instead of via stores
4. ❌ **Forms Convention** - Some forms don't use vee-validate + shared validators
5. ⚠️ **Component Organization** - Need to verify all components follow naming conventions

---

## Context & Architecture

### Current File Structure
```
app/
├── components/
│   ├── App/           # ✅ Correct naming (PascalCase)
│   ├── Generic/       # ✅ Correct naming
│   ├── Parts/         # ✅ Correct naming (15 components)
│   ├── Stock/         # ✅ Correct naming (13 components)
│   └── ui/            # ✅ Correct (shadcn-vue, kebab-case)
├── composables/
│   ├── useErrorHandler.ts      # ✅ KEEP - legitimate (reusable logic)
│   ├── useExtendedFetch.js     # ✅ KEEP - legitimate (API wrapper)
│   ├── useIsMobile.js          # ✅ KEEP - browser API
│   ├── useMultitenancy.ts      # ✅ KEEP - config utility
│   ├── usePrimaryAnimation.js  # ✅ KEEP - animation utility
│   ├── useShowToast.js         # ✅ KEEP - UI utility
│   ├── useSubdomain.ts         # ✅ KEEP - utility
│   ├── useParts.ts             # ❌ DELETE - should be store
│   └── useStock.ts             # ❌ DELETE - should be store
├── pages/
│   ├── parts/         # Pages using useParts (need refactor)
│   ├── stock/         # Pages using useStock (need refactor)
│   ├── auth/          # ✅ Forms look correct (vee-validate)
│   ├── account.vue    # ❌ Missing vee-validate
│   ├── settings.vue   # ✅ Correct (uses userStore)
│   └── index.vue      # Dashboard
└── stores/
    └── userStore.ts   # ✅ CORRECT - follows conventions

shared/
├── types/
│   ├── part.ts
│   ├── part-category.ts
│   ├── stock-item.ts
│   ├── stock-location.ts
│   └── user.ts
└── validators/
    ├── part.ts
    ├── part-category.ts
    ├── stock-item.ts
    ├── stock-location.ts
    ├── auth.ts
    ├── user.ts
    └── password.ts
```

### Current Data Flow (INCORRECT)
```
Pages → useParts/useStock (composables) → API
  ↓
Local State (gridParts, gridItems)
```

### Target Data Flow (CORRECT per conventions)
```
Pages → Pinia Stores → extendedFetch → API
  ↓           ↓
  └─ Computed from Store State
```

---

## Phase 1: Create Missing Pinia Stores

### ✅ Task 1.1: Create `app/stores/partsStore.ts`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical
**Estimated Lines:** ~400-500

**Requirements:**
- Create Pinia store using composition API: `defineStore('parts', () => { ... })`
- Import and use `useExtendedFetch()` for ALL API calls
- Include loading/error state management
- Include success/error toasts
- Return boolean from actions (success/failure)

**State to manage:**
```typescript
// Domain state (from API)
- parts: Part[]
- partCategories: PartCategory[]
- categoryTree: CategoryTreeNode[]
- currentPart: Part | null
- currentCategory: PartCategory | null

// UI state
- loading: boolean
- error: string | null

// Getters
- activeParts: computed(() => parts filtered by active)
- partsByCategory: computed((categoryId) => filtered parts)
```

**Actions to migrate from `useParts.ts`:**
```typescript
// Part Categories
- fetchCategories(params?: ListPartCategoriesInput)
- fetchCategoryTree(parentId?: string)
- fetchCategory(id: string)
- createCategory(data: CreatePartCategoryInput)
- updateCategory(id: string, data: UpdatePartCategoryInput)
- deleteCategory(id: string, cascade?: boolean)
- moveCategory(id: string, newParentId: string | null)

// Parts
- fetchParts(params?: ListPartsInput)
- fetchPart(id: string)
- createPart(data: CreatePartInput)
- updatePart(id: string, data: UpdatePartInput)
- deletePart(id: string)

// Reset function for signout
- reset()
```

**Template:**
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import type { Part, PartCategory } from '#shared/types/...'

export const usePartsStore = defineStore('parts', () => {
  // State
  const parts = ref<Part[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const activeParts = computed(() => parts.value.filter(p => p.active))

  // Actions
  async function fetchParts(params?) {
    try {
      loading.value = true
      error.value = null

      const { extendedFetch } = useExtendedFetch()
      const { ok, payload } = await extendedFetch('/v1/parts', {
        method: 'GET',
        query: params
      })

      if (ok) {
        parts.value = payload.data
        return true
      }
      return false
    } catch (err: any) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  async function createPart(data) {
    try {
      const { extendedFetch } = useExtendedFetch()
      const { ok, payload } = await extendedFetch('/v1/parts', {
        method: 'POST',
        body: data
      })

      if (ok) {
        parts.value.push(payload.data)
        toast.success('Part created successfully')
        return payload.data
      }
      return null
    } catch (error) {
      return null
    }
  }

  function reset() {
    parts.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    parts,
    loading,
    error,

    // Getters
    activeParts,

    // Actions
    fetchParts,
    createPart,
    // ... all other actions
    reset
  }
})
```

**Files to reference:**
- `/home/user/inventory/app/stores/userStore.ts` - Example of correct pattern
- `/home/user/inventory/app/composables/useParts.ts` - Source to migrate from
- `/home/user/inventory/shared/validators/part.ts` - Types
- `/home/user/inventory/shared/types/part.ts` - Types

---

### ✅ Task 1.2: Create `app/stores/stockStore.ts`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical
**Estimated Lines:** ~400-500

**Requirements:** Same as Task 1.1 but for stock management

**State to manage:**
```typescript
// Domain state
- stockItems: StockItem[]
- stockLocations: StockLocation[]
- locationTree: LocationTreeNode[]
- currentStockItem: StockItem | null
- currentLocation: StockLocation | null

// UI state
- loading: boolean
- error: string | null

// Getters
- itemsByLocation: computed((locationId) => filtered items)
- itemsByPart: computed((partId) => filtered items)
- lowStockItems: computed(() => items below threshold)
```

**Actions to migrate from `useStock.ts`:**
```typescript
// Stock Locations
- fetchLocations(params?: ListStockLocationsInput)
- fetchLocationTree(parentId?: string)
- fetchLocation(id: string)
- createLocation(data: CreateStockLocationInput)
- updateLocation(id: string, data: UpdateStockLocationInput)
- deleteLocation(id: string, cascade?: boolean)

// Stock Items
- fetchStockItems(params?: ListStockItemsInput)
- fetchStockItem(id: string)
- createStockItem(data: CreateStockItemInput)
- updateStockItem(id: string, data: UpdateStockItemInput)
- deleteStockItem(id: string)
- moveStockItem(id: string, locationId: string)
- adjustQuantity(id: string, adjustment: AdjustQuantityInput)

// Reset
- reset()
```

**Files to reference:**
- `/home/user/inventory/app/composables/useStock.ts` - Source
- `/home/user/inventory/shared/validators/stock-item.ts` - Types
- `/home/user/inventory/shared/types/stock-item.ts` - Types

---

## Phase 2: Refactor Pages to Use Stores

### ✅ Task 2.1: Refactor `app/pages/parts/index.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Current Issues:**
1. ❌ Uses `useParts()` composable directly
2. ❌ Manages local `gridParts` state (duplicate of store state)
3. ❌ Calls `fetchParts()` directly from composable

**Changes Required:**
```typescript
// BEFORE (WRONG)
const { deletePart, fetchParts } = useParts()
const gridParts = ref<Part[]>([])

const loadGridParts = async () => {
  const response = await fetchParts({ ... })
  gridParts.value = response.data
}

// AFTER (CORRECT)
const partsStore = usePartsStore()

// Consume store state via computed
const gridParts = computed(() => partsStore.parts)
const loading = computed(() => partsStore.loading)

const loadGridParts = async () => {
  await partsStore.fetchParts({ ... })
}

const handleDelete = async (part: Part) => {
  const success = await partsStore.deletePart(part.id)
  if (success && viewMode.value === 'grid') {
    // Store already updated, no manual refresh needed
  }
}
```

**Steps:**
1. Remove `const { deletePart, fetchParts } = useParts()` line
2. Add `const partsStore = usePartsStore()`
3. Convert `gridParts` from `ref()` to `computed(() => partsStore.parts)`
4. Update `loadGridParts()` to call store action
5. Update `handleDelete()` to call store action
6. Remove manual state updates (store handles it)
7. Test grid and table views
8. Test filters
9. Test delete functionality

---

### ✅ Task 2.2: Refactor `app/pages/parts/create.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Changes:**
```typescript
// BEFORE
const { createPart } = useParts()

// AFTER
const partsStore = usePartsStore()

const handleSubmit = async (data: CreatePartInput) => {
  creating.value = true
  try {
    const newPart = await partsStore.createPart(data)
    if (newPart) {
      await router.push(`/parts/${newPart.id}`)
    }
  } finally {
    creating.value = false
  }
}
```

---

### ✅ Task 2.3: Refactor `app/pages/parts/[id]/index.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Pattern:**
- Use `partsStore.fetchPart(id)` on mount
- Use `computed(() => partsStore.currentPart)` for reactivity
- Call store actions for any updates

---

### ✅ Task 2.4: Refactor `app/pages/parts/[id]/edit.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Pattern:**
- Load part via `partsStore.fetchPart(id)`
- Use form with `setValues()` from vee-validate
- Call `partsStore.updatePart(id, data)` on submit

---

### ✅ Task 2.5: Refactor Parts Category Pages

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Files:**
- `app/pages/parts/categories/index.vue`
- `app/pages/parts/categories/create.vue`
- `app/pages/parts/categories/[id]/index.vue`
- `app/pages/parts/categories/[id]/edit.vue`

**Pattern:** Same as parts pages, but use category actions from `partsStore`

---

### ✅ Task 2.6: Refactor `app/pages/stock/index.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Same pattern as parts/index.vue but with stockStore:**
```typescript
const stockStore = useStockStore()
const gridItems = computed(() => stockStore.stockItems)
const loading = computed(() => stockStore.loading)

const loadGridItems = async () => {
  await stockStore.fetchStockItems({ ... })
}
```

---

### ✅ Task 2.7: Refactor `app/pages/stock/create.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

---

### ✅ Task 2.8: Refactor `app/pages/stock/[id]/index.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

---

### ✅ Task 2.9: Refactor `app/pages/stock/[id]/edit.vue`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

---

### ✅ Task 2.10: Refactor Stock Location Pages

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Files:**
- `app/pages/stock/locations/index.vue`
- `app/pages/stock/locations/create.vue`
- `app/pages/stock/locations/[id]/index.vue`
- `app/pages/stock/locations/[id]/edit.vue`

---

## Phase 3: Update Components

### ✅ Task 3.1: Audit Parts Components

**Status:** ⬜ Not Started
**Priority:** 🟡 Medium

**Files to check:**
- `app/components/Parts/*.vue` (15 files)

**Check each component for:**
1. ❌ Direct API calls (should use stores via props/emits)
2. ❌ Using `useParts()` composable (should use stores via props/emits)
3. ✅ Proper naming convention (PartsComponentName)
4. ✅ Props/emits pattern instead of direct store access (preferred)

**Common patterns to enforce:**

**Option A (Preferred): Props/Emits Pattern**
```vue
<!-- PartsTable.vue -->
<script setup>
// ✅ GOOD - Component receives data via props, emits events
const props = defineProps<{
  parts: Part[]
  loading: boolean
}>()

const emit = defineEmits<{
  delete: [part: Part]
  edit: [part: Part]
}>()

// Component is pure - no store access, no API calls
</script>
```

**Option B (Acceptable): Direct Store Access**
```vue
<!-- PartsTable.vue -->
<script setup>
// ⚠️ ACCEPTABLE - Component accesses store directly
const partsStore = usePartsStore()
const parts = computed(() => partsStore.parts)
const loading = computed(() => partsStore.loading)

const handleDelete = async (part: Part) => {
  await partsStore.deletePart(part.id)
}
</script>
```

**Decision needed:** Choose one pattern and stick to it consistently.

---

### ✅ Task 3.2: Audit Stock Components

**Status:** ⬜ Not Started
**Priority:** 🟡 Medium

**Files:** `app/components/Stock/*.vue` (13 files)

**Same checks as Task 3.1**

---

### ✅ Task 3.3: Verify Component Naming

**Status:** ⬜ Not Started
**Priority:** 🟢 Low

**Check that all components follow conventions:**
- ✅ `app/components/Folder/File.vue` → `<FolderFile />`
- ✅ Folder names are PascalCase (Parts, Stock, App)
- ✅ File names are PascalCase (Form.vue, Table.vue, Card.vue)
- ❌ No deeply nested components (max 2 levels)
- ❌ No index.vue files (won't auto-import correctly)

**Current structure looks correct:**
```
App/
  IconButton.vue      → <AppIconButton />
  PageHeader.vue      → <AppPageHeader />
  Sidebar.vue         → <AppSidebar />
  ThemeToggle.vue     → <AppThemeToggle />

Parts/
  Form.vue            → <PartsForm />
  Table.vue           → <PartsTable />
  Card.vue            → <PartsCard />
  CategoryForm.vue    → <PartsCategoryForm />

Stock/
  ItemForm.vue        → <StockItemForm />
  ItemTable.vue       → <StockItemTable />
  LocationForm.vue    → <StockLocationForm />
```

---

## Phase 4: Delete Old Composables

### ✅ Task 4.1: Delete `app/composables/useParts.ts`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical
**Blocker:** Must complete Phase 1.1 and Phase 2 (all parts pages) first

**Pre-deletion checklist:**
- [ ] `app/stores/partsStore.ts` exists and is complete
- [ ] All parts pages refactored (Tasks 2.1-2.5)
- [ ] All components refactored (Task 3.1)
- [ ] No grep results for `useParts()` in app/ directory
- [ ] Test all parts pages work correctly

**Command to verify:**
```bash
# Should return NO results before deleting
grep -r "useParts()" app/
```

**Delete command:**
```bash
rm app/composables/useParts.ts
```

---

### ✅ Task 4.2: Delete `app/composables/useStock.ts`

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical
**Blocker:** Must complete Phase 1.2 and Phase 2 (all stock pages) first

**Pre-deletion checklist:**
- [ ] `app/stores/stockStore.ts` exists and is complete
- [ ] All stock pages refactored (Tasks 2.6-2.10)
- [ ] All components refactored (Task 3.2)
- [ ] No grep results for `useStock()` in app/ directory
- [ ] Test all stock pages work correctly

**Command to verify:**
```bash
# Should return NO results before deleting
grep -r "useStock()" app/
```

**Delete command:**
```bash
rm app/composables/useStock.ts
```

---

## Phase 5: Forms Convention Compliance

### ✅ Task 5.1: Refactor `app/pages/account.vue`

**Status:** ⬜ Not Started
**Priority:** 🟡 Medium

**Current Issues:**
1. ❌ Plain HTML form (no vee-validate)
2. ❌ No form validation
3. ❌ No shared validators
4. ❌ Not using userStore for profile data
5. ❌ No form submission handler

**Required Changes:**
```typescript
// Add vee-validate setup
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { updateUserProfileSchema } from '#shared/validators/user'

const { t } = useI18n()
const userStore = useUserStore()

// Extend schema with i18n
const formSchema = toTypedSchema(
  updateUserProfileSchema.extend({
    firstName: z.string().min(1, t('account.firstName.required')),
    lastName: z.string().min(1, t('account.lastName.required')),
    email: z.string().email(t('account.email.invalid'))
  })
)

const { handleSubmit, isSubmitting, setValues } = useForm({
  validationSchema: formSchema
})

// Load user profile and populate form
onMounted(async () => {
  await userStore.fetchUserProfile()

  setValues({
    firstName: userStore.userProfile?.firstName || '',
    lastName: userStore.userProfile?.lastName || '',
    email: userStore.userProfile?.email || ''
  })
})

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  await userStore.updateProfile(values)
})
```

**Note:** May need to add `updateProfile` action to userStore if it doesn't exist.

**Template changes:**
```vue
<form @submit.prevent="onSubmit">
  <FormField v-slot="{ componentField }" name="firstName">
    <FormItem>
      <FormLabel>{{ t('account.firstName.label') }}</FormLabel>
      <FormControl>
        <Input v-bind="componentField" :disabled="isSubmitting" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <!-- Repeat for lastName, email -->

  <Button type="submit" :disabled="isSubmitting">
    <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" />
    {{ t('account.save') }}
  </Button>
</form>
```

---

### ✅ Task 5.2: Add Password Change Section to Account Page

**Status:** ⬜ Not Started
**Priority:** 🟡 Medium

**Add separate form for password change:**
```typescript
import { changePasswordSchema } from '#shared/validators/password'

const passwordSchema = toTypedSchema(
  changePasswordSchema.extend({
    currentPassword: z.string().min(1, t('account.password.currentRequired')),
    newPassword: z.string()
      .min(8, t('account.password.min'))
      .regex(/[A-Z]/, t('account.password.uppercase')),
    newPasswordConfirmation: z.string()
  }).refine(data => data.newPassword === data.newPasswordConfirmation, {
    message: t('account.password.noMatch'),
    path: ['newPasswordConfirmation']
  })
)

const passwordForm = useForm({
  validationSchema: passwordSchema
})

const onPasswordSubmit = passwordForm.handleSubmit(async (values) => {
  await userStore.changePassword(values)
  passwordForm.resetForm()
})
```

**Note:** May need to add `changePassword` action to userStore.

---

### ✅ Task 5.3: Verify Auth Forms Compliance

**Status:** ⬜ Not Started
**Priority:** 🟢 Low

**Files to verify:**
- `app/pages/auth/signin.vue`
- `app/pages/auth/signup.vue`
- `app/pages/auth/password/reset/request.vue`
- `app/pages/auth/password/reset/index.vue`

**Check each form has:**
- ✅ vee-validate with `useForm`
- ✅ `toTypedSchema` with shared validators from `#shared/validators/auth`
- ✅ i18n error messages
- ✅ `handleSubmit`, `isSubmitting`
- ✅ Calls userStore actions (not direct API calls)
- ✅ FormField components with v-slot pattern
- ✅ FormMessage for errors

---

## Phase 6: Documentation & Testing

### ✅ Task 6.1: Add JSDoc Comments to Stores

**Status:** ⬜ Not Started
**Priority:** 🟢 Low

**Add comprehensive JSDoc to:**
- `app/stores/partsStore.ts`
- `app/stores/stockStore.ts`

**Example:**
```typescript
/**
 * Parts Store - Manages parts and part categories
 *
 * Handles all API calls for:
 * - Parts (CRUD operations)
 * - Part categories (CRUD operations, tree structure)
 *
 * @example
 * const partsStore = usePartsStore()
 * await partsStore.fetchParts()
 * const activeParts = partsStore.activeParts
 */
export const usePartsStore = defineStore('parts', () => {
  /**
   * Fetch paginated list of parts
   * @param params - Filter and pagination parameters
   * @returns Promise<boolean> - Success/failure
   */
  async function fetchParts(params?: Partial<ListPartsInput>) {
    // ...
  }
})
```

---

### ✅ Task 6.2: Create Testing Plan

**Status:** ⬜ Not Started
**Priority:** 🟡 Medium

**Create `FRONTEND_TEST_PLAN.md` with:**

1. **Manual Testing Checklist:**
   - [ ] Parts listing (table and grid views)
   - [ ] Parts filtering (category, status, attributes)
   - [ ] Part creation
   - [ ] Part editing
   - [ ] Part deletion
   - [ ] Part categories (all CRUD operations)
   - [ ] Category tree structure
   - [ ] Stock items (all CRUD operations)
   - [ ] Stock locations (all CRUD operations)
   - [ ] Stock quantity adjustments
   - [ ] Stock item moves
   - [ ] User profile update
   - [ ] Password change
   - [ ] Sign in/out
   - [ ] Form validation (all forms)
   - [ ] Error handling (network errors, validation errors)
   - [ ] Loading states
   - [ ] Toast notifications

2. **Browser Testing:**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Mobile Chrome
   - [ ] Mobile Safari

3. **Regression Testing:**
   - [ ] All pages load without console errors
   - [ ] No 404s for API calls
   - [ ] Store state persists correctly
   - [ ] Navigation works correctly
   - [ ] Auth redirects work

---

### ✅ Task 6.3: Update Project Documentation

**Status:** ⬜ Not Started
**Priority:** 🟢 Low

**Files to update:**
- `README.md` - Update frontend architecture section
- Add `docs/FRONTEND_ARCHITECTURE.md` - Detailed architecture doc

**Include:**
- Store patterns and when to use them
- Composable patterns and when to use them
- Forms convention with examples
- Component organization rules
- Common patterns and anti-patterns

---

## Phase 7: Performance & Optimization

### ✅ Task 7.1: Add Store Persistence Configuration

**Status:** ⬜ Not Started
**Priority:** 🟢 Low

**Add persistence to stores (like userStore):**
```typescript
export const usePartsStore = defineStore('parts', () => {
  // ... store implementation
}, {
  persist: {
    // Don't persist loading/error states
    omit: ['loading', 'error']
  }
})
```

**Consider:**
- What should persist across sessions?
- What should reset on page reload?
- Performance impact of persisting large arrays

---

### ✅ Task 7.2: Implement Store Reset on Signout

**Status:** ⬜ Not Started
**Priority:** 🟡 Medium

**Update `userStore.signout()` to reset all stores:**
```typescript
async signout({ redirectTo = "/auth/signin" }: SignoutParams = {}) {
  // ... existing signout logic

  // Reset all stores
  const partsStore = usePartsStore()
  const stockStore = useStockStore()

  partsStore.reset()
  stockStore.reset()
  this.reset()

  // ... navigate
}
```

**Verify:**
- All stores have `reset()` methods
- Reset clears sensitive data
- No memory leaks

---

### ✅ Task 7.3: Optimize API Calls

**Status:** ⬜ Not Started
**Priority:** 🟢 Low

**Review and optimize:**
1. **Debounce search inputs** - Don't call API on every keystroke
2. **Cache frequently accessed data** - Categories, locations (relatively static)
3. **Pagination** - Implement infinite scroll or virtual scrolling for large lists
4. **Lazy loading** - Only load data when needed

**Example debounce pattern:**
```typescript
import { useDebounceFn } from '@vueuse/core'

const searchQuery = ref('')

const debouncedSearch = useDebounceFn(async (query: string) => {
  await partsStore.fetchParts({ search: query })
}, 300)

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})
```

---

## Phase 8: Final Validation

### ✅ Task 8.1: Convention Compliance Audit

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical (before completion)

**Run automated checks:**

```bash
# 1. Verify no useParts/useStock remain
grep -r "useParts\|useStock" app/pages app/components
# Should return: No results

# 2. Verify all stores use extendedFetch
grep -r "\$fetch" app/stores
# Should return: No results (except in comments)

# 3. Verify component naming
find app/components -type f -name "*.vue" | grep -v "^app/components/ui" | grep "[a-z]"
# Should return: Only ui/ components (kebab-case is allowed for shadcn)

# 4. Verify no API calls in pages
grep -r "extendedFetch\|simpleFetch\|\$fetch" app/pages
# Should return: No results (pages should use stores)

# 5. Verify all forms use vee-validate
grep -r "<form" app/pages | grep -v "vee-validate"
# Should return: No results
```

---

### ✅ Task 8.2: Final Manual Testing

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Complete end-to-end testing:**
1. [ ] Create new part → verify in list
2. [ ] Edit part → verify changes reflected
3. [ ] Delete part → verify removed from list
4. [ ] Filter parts → verify filtering works
5. [ ] Switch table/grid views → verify both work
6. [ ] Create category → verify in tree
7. [ ] Move category → verify tree updates
8. [ ] Create stock item → verify in list
9. [ ] Adjust quantity → verify updates
10. [ ] Move stock item → verify location changes
11. [ ] Update profile → verify changes
12. [ ] Change password → verify works
13. [ ] Sign out → verify all stores reset
14. [ ] Sign in → verify persisted data loads

---

### ✅ Task 8.3: Code Review Checklist

**Status:** ⬜ Not Started
**Priority:** 🔴 Critical

**Review all modified files:**

**Stores (`app/stores/*.ts`):**
- [ ] All API calls use `extendedFetch`
- [ ] All actions return success/failure boolean
- [ ] All actions show appropriate toasts
- [ ] Loading/error states managed correctly
- [ ] Getters are computed properties
- [ ] State is properly typed
- [ ] Has `reset()` method
- [ ] Persistence config is correct

**Pages (`app/pages/**/*.vue`):**
- [ ] No direct API calls
- [ ] Uses stores via `const store = useStore()`
- [ ] Consumes state via `computed(() => store.state)`
- [ ] Calls store actions for operations
- [ ] Local UI state only (modals, filters, selected items)
- [ ] Forms use vee-validate + shared validators
- [ ] No duplicate store state in local refs

**Components (`app/components/**/*.vue`):**
- [ ] Follows naming convention
- [ ] Either props/emits OR store access (consistent)
- [ ] No direct API calls
- [ ] Proper TypeScript types
- [ ] Auto-imports work (no explicit imports needed)

---

## Completion Checklist

### Phase Completion Status

- [ ] **Phase 1: Create Missing Pinia Stores** (2 tasks)
  - [ ] Task 1.1: Create partsStore
  - [ ] Task 1.2: Create stockStore

- [ ] **Phase 2: Refactor Pages to Use Stores** (10 tasks)
  - [ ] Task 2.1: parts/index.vue
  - [ ] Task 2.2: parts/create.vue
  - [ ] Task 2.3: parts/[id]/index.vue
  - [ ] Task 2.4: parts/[id]/edit.vue
  - [ ] Task 2.5: Part category pages
  - [ ] Task 2.6: stock/index.vue
  - [ ] Task 2.7: stock/create.vue
  - [ ] Task 2.8: stock/[id]/index.vue
  - [ ] Task 2.9: stock/[id]/edit.vue
  - [ ] Task 2.10: Stock location pages

- [ ] **Phase 3: Update Components** (3 tasks)
  - [ ] Task 3.1: Audit Parts components
  - [ ] Task 3.2: Audit Stock components
  - [ ] Task 3.3: Verify component naming

- [ ] **Phase 4: Delete Old Composables** (2 tasks)
  - [ ] Task 4.1: Delete useParts.ts
  - [ ] Task 4.2: Delete useStock.ts

- [ ] **Phase 5: Forms Convention Compliance** (3 tasks)
  - [ ] Task 5.1: Refactor account.vue
  - [ ] Task 5.2: Add password change section
  - [ ] Task 5.3: Verify auth forms

- [ ] **Phase 6: Documentation & Testing** (3 tasks)
  - [ ] Task 6.1: Add JSDoc to stores
  - [ ] Task 6.2: Create testing plan
  - [ ] Task 6.3: Update project docs

- [ ] **Phase 7: Performance & Optimization** (3 tasks)
  - [ ] Task 7.1: Add store persistence
  - [ ] Task 7.2: Implement store reset
  - [ ] Task 7.3: Optimize API calls

- [ ] **Phase 8: Final Validation** (3 tasks)
  - [ ] Task 8.1: Convention compliance audit
  - [ ] Task 8.2: Final manual testing
  - [ ] Task 8.3: Code review checklist

### Overall Status

- **Total Tasks:** 26
- **Completed:** 0
- **In Progress:** 0
- **Not Started:** 26
- **Blocked:** 2 (Tasks 4.1, 4.2 - waiting for Phase 1 & 2)

---

## Session Recovery Guide

**If you're picking this up in a new session:**

1. **Check Phase Status** - Look at "Phase Completion Status" above
2. **Read Executive Summary** - Understand the main issues
3. **Review Context & Architecture** - Understand current vs target architecture
4. **Find Last Completed Task** - Look for ✅ checkmarks
5. **Start Next Uncompleted Task** - Look for ⬜ checkboxes
6. **Reference Files** - Each task lists relevant files to examine

**Quick Status Check Commands:**
```bash
# Check if stores exist
ls -la app/stores/

# Check for old composables
ls -la app/composables/useParts.ts app/composables/useStock.ts

# Check pages still using old composables
grep -r "useParts()\|useStock()" app/pages/

# Check current branch
git branch --show-current
```

---

## Key Conventions Reference

### State Management Rules
1. ✅ ALL API calls go through Pinia store actions
2. ✅ ALL store actions use `extendedFetch`
3. ✅ Pages consume state via `computed(() => store.state)`
4. ✅ Pages call store actions for operations
5. ❌ NO API calls in pages or components
6. ❌ NO `$fetch` usage outside stores (except in `useExtendedFetch`)

### Forms Rules
1. ✅ ALL forms use vee-validate
2. ✅ ALL forms use shared validators from `#shared/validators/*`
3. ✅ Extend schemas with i18n error messages
4. ✅ Use `handleSubmit`, `isSubmitting`, `v-bind="field"`
5. ✅ Call store actions for submission

### Component Rules
1. ✅ Use folder-based naming: `Folder/File.vue` → `<FolderFile />`
2. ✅ PascalCase folder and file names
3. ✅ No explicit imports (auto-imported by Nuxt)
4. ✅ Max 2 folder levels
5. ❌ No index.vue files

### Composable Rules
1. ✅ For reusable logic WITHOUT state
2. ✅ Must have `use` prefix
3. ❌ NO API calls (use stores instead)
4. ❌ NO wrappers around stores

---

## Notes & Decisions

### Decision Log

**2025-11-13:**
- Decided to use Pinia stores for ALL API calls (useParts/useStock become stores)
- Components will access stores directly (not props/emits for now - can refactor later)
- Keep existing composables that are legitimate (useExtendedFetch, useErrorHandler, etc.)
- Forms will use vee-validate + shared validators consistently

### Known Issues

1. **account.vue** - Completely non-functional (no backend integration)
2. **Missing store actions** - userStore may need `updateProfile()` and `changePassword()` actions
3. **Component pattern inconsistency** - Need to decide: props/emits vs direct store access

### Questions for Review

1. Should components use props/emits (pure) or direct store access (pragmatic)?
   - **Recommendation:** Direct store access for now (faster, less prop drilling)
   - Can refactor to props/emits later if needed

2. Should we persist parts/stock data in localStorage?
   - **Recommendation:** No for now (can be stale, large data)
   - Only persist UI preferences (view mode, filters?)

3. Do we need optimistic updates?
   - **Recommendation:** Add later if UX requires it
   - For now, wait for API response before updating store

---

## End of Checklist

**Last Updated:** 2025-11-13
**Next Update:** After completing Phase 1
