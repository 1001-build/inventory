<template>
  <div class="space-y-6">
    <AppPageHeader :showBack="false">
      <template #default>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="viewMode = viewMode === 'table' ? 'grid' : 'table'">
            <Icon :name="viewMode === 'table' ? 'lucide:grid-3x3' : 'lucide:table'" class="mr-2 h-4 w-4" />
            {{ viewMode === 'table' ? 'Grid View' : 'Table View' }}
          </Button>
          <Button @click="navigateTo('/parts/create')">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
            New Part
          </Button>
        </div>
      </template>
    </AppPageHeader>

    <div class="grid gap-6 lg:grid-cols-4">
      <!-- Filter Sidebar -->
      <Card class="lg:col-span-1 h-fit main-content">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Refine your search</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Category Filter -->
          <div class="space-y-2">
            <Label>Category</Label>
            <PartsCategorySelect
              v-model="filters.categoryId"
              placeholder="All categories"
            />
          </div>

          <!-- Active Status -->
          <div class="space-y-2">
            <Label>Status</Label>
            <Select v-model="filters.active">
              <SelectTrigger>
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Attribute Filters -->
          <div class="space-y-3">
            <Label>Attributes</Label>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <Checkbox id="filter-assembly" v-model:checked="filters.assembly" />
                <label
                  for="filter-assembly"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Assembly
                </label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="filter-component" v-model:checked="filters.component" />
                <label
                  for="filter-component"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Component
                </label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="filter-trackable" v-model:checked="filters.trackable" />
                <label
                  for="filter-trackable"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Trackable
                </label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="filter-purchaseable" v-model:checked="filters.purchaseable" />
                <label
                  for="filter-purchaseable"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Purchaseable
                </label>
              </div>
            </div>
          </div>

          <!-- Clear Filters -->
          <Button variant="outline" class="w-full" size="sm" @click="clearFilters">
            <Icon name="lucide:x" class="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      <!-- Parts List/Grid -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Table View -->
        <Card v-if="viewMode === 'table'" class="main-content">
          <CardContent class="p-6">
            <PartsTable
              ref="partTable"
              :category-id="filters.categoryId || undefined"
              :filters="activeFilters"
              @delete="handleDelete"
            />
          </CardContent>
        </Card>

        <!-- Grid View -->
        <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <PartsCard
            v-for="part in gridParts"
            :key="part.id"
            :part="part"
            class="main-content"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Part</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{{ partToDelete?.name }}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="deleting">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            :disabled="deleting"
            @click="confirmDelete"
          >
            <Icon v-if="deleting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import type { Part } from '#shared/types/part'

useHead({ title: 'Parts' })

const partsStore = usePartsStore()

const viewMode = ref<'table' | 'grid'>('table')
const partTable = ref()

// Filters
const filters = ref({
  categoryId: null as string | null,
  active: 'all',
  assembly: false,
  component: false,
  trackable: false,
  purchaseable: false
})

// Delete dialog
const deleteDialogOpen = ref(false)
const partToDelete = ref<Part | null>(null)
const deleting = ref(false)

// Consume store state via computed
const gridParts = computed(() => partsStore.parts)
const loadingGrid = computed(() => partsStore.loading)

// Computed
const activeFilters = computed(() => {
  const result: any = {}

  if (filters.value.active !== 'all') {
    result.active = filters.value.active === 'true'
  }

  if (filters.value.assembly) result.assembly = true
  if (filters.value.component) result.component = true
  if (filters.value.trackable) result.trackable = true
  if (filters.value.purchaseable) result.purchaseable = true

  return result
})

// Methods
const clearFilters = () => {
  filters.value = {
    categoryId: null,
    active: 'all',
    assembly: false,
    component: false,
    trackable: false,
    purchaseable: false
  }
}

const handleDelete = (part: Part) => {
  partToDelete.value = part
  deleteDialogOpen.value = true
}

const confirmDelete = async () => {
  if (!partToDelete.value) return

  deleting.value = true
  try {
    const success = await partsStore.deletePart(partToDelete.value.id)
    if (success) {
      deleteDialogOpen.value = false

      // Refresh the list if in table mode
      if (viewMode.value === 'table') {
        partTable.value?.refresh()
      }
      // Grid view automatically updates via computed property
    }
  } catch (error) {
    console.error('Failed to delete part:', error)
  } finally {
    deleting.value = false
  }
}

const loadGridParts = async () => {
  await partsStore.fetchParts({
    categoryId: filters.value.categoryId || undefined,
    ...activeFilters.value,
    limit: 50
  })
}

// Watch for filter changes in grid mode
watch([filters, viewMode], () => {
  if (viewMode.value === 'grid') {
    loadGridParts()
  }
}, { deep: true })

onMounted(() => {
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.05 })

  if (viewMode.value === 'grid') {
    loadGridParts()
  }
})
</script>
