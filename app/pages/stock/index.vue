<template>
  <div class="space-y-6">
    <AppPageHeader :showBack="false">
      <template #default>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="viewMode = viewMode === 'table' ? 'grid' : 'table'">
            <Icon :name="viewMode === 'table' ? 'lucide:grid-3x3' : 'lucide:table'" class="mr-2 h-4 w-4" />
            {{ viewMode === 'table' ? 'Grid View' : 'Table View' }}
          </Button>
          <Button @click="navigateTo('/stock/create')">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
            Add Stock
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
          <!-- Part Filter -->
          <div class="space-y-2">
            <Label>Part</Label>
            <Input
              v-model="filters.partId"
              placeholder="Part ID..."
            />
          </div>

          <!-- Location Filter -->
          <div class="space-y-2">
            <Label>Location</Label>
            <StockLocationSelect
              v-model="filters.locationId"
              placeholder="All locations"
            />
          </div>

          <!-- Status Filter -->
          <div class="space-y-2">
            <Label>Status</Label>
            <Select v-model="filters.status">
              <SelectTrigger>
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="OK">OK</SelectItem>
                <SelectItem value="ATTENTION">Attention</SelectItem>
                <SelectItem value="DAMAGED">Damaged</SelectItem>
                <SelectItem value="LOST">Lost</SelectItem>
                <SelectItem value="RETURNED">Returned</SelectItem>
                <SelectItem value="DESTROYED">Destroyed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Clear Filters -->
          <Button variant="outline" class="w-full" size="sm" @click="clearFilters">
            <Icon name="lucide:x" class="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      <!-- Stock Items List/Grid -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Table View -->
        <Card v-if="viewMode === 'table'" class="main-content">
          <CardContent class="p-6">
            <StockItemTable
              ref="stockItemTable"
              :part-id="filters.partId || undefined"
              :location-id="filters.locationId || undefined"
              :filters="activeFilters"
              @move="handleMove"
              @adjust="handleAdjust"
              @delete="handleDelete"
            />
          </CardContent>
        </Card>

        <!-- Grid View -->
        <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StockItemCard
            v-for="item in gridItems"
            :key="item.id"
            :stock-item="item"
            class="main-content"
            @move="handleMove"
            @adjust="handleAdjust"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>

    <!-- Move Dialog -->
    <StockItemMoveDialog
      v-model:open="moveDialogOpen"
      :stock-item="itemToMove"
      @moved="handleMoved"
    />

    <!-- Adjust Dialog -->
    <StockItemAdjustDialog
      v-model:open="adjustDialogOpen"
      :stock-item="itemToAdjust"
      @adjusted="handleAdjusted"
    />

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Stock Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this stock item? This action cannot be undone.
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
import type { StockItem } from '#shared/types/stock-item'

useHead({ title: 'Stock Items' })

const route = useRoute()
const { deleteStockItem, fetchStockItems } = useStock()

const viewMode = ref<'table' | 'grid'>('table')
const stockItemTable = ref()

// Filters
const filters = ref({
  partId: (route.query.partId as string) || '',
  locationId: (route.query.locationId as string) || '',
  status: 'all'
})

// Grid view data (only used in grid mode)
const gridItems = ref<StockItem[]>([])
const loadingGrid = ref(false)

// Dialog states
const moveDialogOpen = ref(false)
const adjustDialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const itemToMove = ref<StockItem | null>(null)
const itemToAdjust = ref<StockItem | null>(null)
const itemToDelete = ref<StockItem | null>(null)
const deleting = ref(false)

// Computed
const activeFilters = computed(() => {
  const result: any = {}

  if (filters.value.status !== 'all') {
    result.status = filters.value.status
  }

  return result
})

// Methods
const clearFilters = () => {
  filters.value = {
    partId: '',
    locationId: '',
    status: 'all'
  }
}

const handleMove = (item: StockItem) => {
  itemToMove.value = item
  moveDialogOpen.value = true
}

const handleAdjust = (item: StockItem) => {
  itemToAdjust.value = item
  adjustDialogOpen.value = true
}

const handleDelete = (item: StockItem) => {
  itemToDelete.value = item
  deleteDialogOpen.value = true
}

const handleMoved = () => {
  if (viewMode.value === 'table') {
    stockItemTable.value?.refresh()
  } else {
    loadGridItems()
  }
}

const handleAdjusted = () => {
  if (viewMode.value === 'table') {
    stockItemTable.value?.refresh()
  } else {
    loadGridItems()
  }
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return

  deleting.value = true
  try {
    await deleteStockItem(itemToDelete.value.id)
    deleteDialogOpen.value = false

    // Refresh the list
    if (viewMode.value === 'table') {
      stockItemTable.value?.refresh()
    } else {
      loadGridItems()
    }
  } catch (error) {
    console.error('Failed to delete stock item:', error)
  } finally {
    deleting.value = false
  }
}

const loadGridItems = async () => {
  loadingGrid.value = true
  try {
    const response = await fetchStockItems({
      partId: filters.value.partId || undefined,
      locationId: filters.value.locationId || undefined,
      ...activeFilters.value,
      limit: 50
    })
    gridItems.value = response.data
  } catch (error) {
    console.error('Failed to load stock items:', error)
    gridItems.value = []
  } finally {
    loadingGrid.value = false
  }
}

// Watch for filter changes in grid mode
watch([filters, viewMode], () => {
  if (viewMode.value === 'grid') {
    loadGridItems()
  }
}, { deep: true })

onMounted(() => {
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.05 })

  if (viewMode.value === 'grid') {
    loadGridItems()
  }
})
</script>
