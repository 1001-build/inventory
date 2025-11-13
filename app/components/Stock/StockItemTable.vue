<template>
  <div class="space-y-4">
    <!-- Filters and Search -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex-1 max-w-md">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            type="search"
            placeholder="Search by batch or serial..."
            class="pl-9"
          />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Icon name="lucide:filter" class="mr-2 h-4 w-4" />
              Filters
              <Badge v-if="activeFilterCount > 0" variant="secondary" class="ml-2">
                {{ activeFilterCount }}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="clearFilters">
              <Icon name="lucide:x" class="mr-2 h-4 w-4" />
              Clear All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-3">
      <Skeleton v-for="i in 5" :key="i" class="h-16 w-full" />
    </div>

    <!-- Table -->
    <div v-else-if="stockItems.length > 0" class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-12">
              <Checkbox v-model:checked="selectAll" />
            </TableHead>
            <TableHead class="cursor-pointer" @click="toggleSort('part')">
              <div class="flex items-center gap-1">
                Part
                <Icon
                  v-if="sortField === 'part'"
                  :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                  class="h-4 w-4"
                />
              </div>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead class="text-right">Quantity</TableHead>
            <TableHead>Batch/Serial</TableHead>
            <TableHead class="text-center">Status</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead class="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in stockItems" :key="item.id" class="cursor-pointer" @click="navigateTo(`/stock/${item.id}`)">
            <TableCell @click.stop>
              <Checkbox v-model:checked="selectedItems" :value="item.id" />
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded bg-muted flex items-center justify-center">
                  <Icon name="lucide:package" class="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="font-medium">{{ item.part?.name || 'Unknown Part' }}</p>
                  <code class="text-xs text-muted-foreground">{{ item.part?.IPN || 'N/A' }}</code>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-1">
                <Icon name="lucide:map-pin" class="h-3 w-3 text-muted-foreground" />
                <span class="text-sm">{{ item.location?.name || 'No location' }}</span>
              </div>
            </TableCell>
            <TableCell class="text-right">
              <Badge variant="secondary" class="font-mono">
                {{ item.quantity }}
              </Badge>
            </TableCell>
            <TableCell>
              <div class="space-y-1">
                <div v-if="item.batch" class="text-sm">
                  <span class="text-muted-foreground">Batch:</span> {{ item.batch }}
                </div>
                <div v-if="item.serial" class="text-sm">
                  <span class="text-muted-foreground">Serial:</span> {{ item.serial }}
                </div>
                <span v-if="!item.batch && !item.serial" class="text-sm text-muted-foreground">-</span>
              </div>
            </TableCell>
            <TableCell class="text-center">
              <Badge :variant="getStatusVariant(item.status)">
                {{ item.status }}
              </Badge>
            </TableCell>
            <TableCell>
              <div v-if="item.expiryDate">
                <p class="text-sm">{{ formatDate(item.expiryDate) }}</p>
                <Badge v-if="isExpiringSoon(item.expiryDate)" variant="warning" class="text-xs mt-1">
                  Expires soon
                </Badge>
              </div>
              <span v-else class="text-sm text-muted-foreground">-</span>
            </TableCell>
            <TableCell class="text-right" @click.stop>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="lucide:more-vertical" class="h-4 w-4" />
                    <span class="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="navigateTo(`/stock/${item.id}`)">
                    <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="navigateTo(`/stock/${item.id}/edit`)">
                    <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                    Edit Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="$emit('move', item)">
                    <Icon name="lucide:move" class="mr-2 h-4 w-4" />
                    Move Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="$emit('adjust', item)">
                    <Icon name="lucide:plus-minus" class="mr-2 h-4 w-4" />
                    Adjust Quantity
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="text-destructive focus:text-destructive"
                    @click="$emit('delete', item)"
                  >
                    <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                    Delete Stock
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-12 border rounded-md">
      <Icon name="lucide:boxes" class="h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-medium mb-2">No stock items found</h3>
      <p class="text-sm text-muted-foreground mb-4">
        {{ searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding stock items' }}
      </p>
      <Button v-if="!searchQuery" @click="navigateTo('/stock/create')">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Add Stock
      </Button>
    </div>

    <!-- Pagination -->
    <div v-if="stockItems.length > 0" class="flex items-center justify-between">
      <p class="text-sm text-muted-foreground">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalCount) }} of {{ totalCount }} items
      </p>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <Icon name="lucide:chevron-left" class="h-4 w-4" />
        </Button>
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <Icon name="lucide:chevron-right" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { StockItem } from '~/shared/types/stock-item'

interface Props {
  partId?: string
  locationId?: string
  filters?: object
}

const props = defineProps<Props>()

const emit = defineEmits<{
  move: [item: StockItem]
  adjust: [item: StockItem]
  delete: [item: StockItem]
}>()

const { fetchStockItems } = useStock()

// State
const stockItems = ref<StockItem[]>([])
const loading = ref(true)
const searchQuery = ref('')
const sortField = ref<string>('createdAt')
const sortOrder = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const pageSize = ref(20)
const totalCount = ref(0)
const selectedItems = ref<string[]>([])
const selectAll = ref(false)

// Computed
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

const activeFilterCount = computed(() => {
  let count = 0
  if (props.partId) count++
  if (props.locationId) count++
  if (props.filters && Object.keys(props.filters).length > 0) count++
  return count
})

// Methods
const loadStockItems = async () => {
  loading.value = true
  try {
    const response = await fetchStockItems({
      partId: props.partId,
      locationId: props.locationId,
      search: searchQuery.value || undefined,
      page: currentPage.value,
      limit: pageSize.value,
      sortBy: sortField.value,
      sortOrder: sortOrder.value,
      ...props.filters
    })
    stockItems.value = response.data
    totalCount.value = response.pagination.total
  } catch (error) {
    console.error('Failed to load stock items:', error)
    stockItems.value = []
  } finally {
    loading.value = false
  }
}

const toggleSort = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
  loadStockItems()
}

const clearFilters = () => {
  searchQuery.value = ''
  currentPage.value = 1
  loadStockItems()
}

const getStatusVariant = (status: string) => {
  switch (status.toUpperCase()) {
    case 'OK':
      return 'success'
    case 'DAMAGED':
    case 'LOST':
    case 'DESTROYED':
      return 'destructive'
    case 'ATTENTION':
    case 'RETURNED':
      return 'warning'
    default:
      return 'secondary'
  }
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const isExpiringSoon = (expiryDate: string | Date) => {
  const expiry = new Date(expiryDate)
  const now = new Date()
  const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilExpiry > 0 && daysUntilExpiry <= 30
}

// Watchers
watch(searchQuery, useDebounceFn(() => {
  currentPage.value = 1
  loadStockItems()
}, 500))

watch([() => props.partId, () => props.locationId, () => props.filters], () => {
  currentPage.value = 1
  loadStockItems()
}, { deep: true })

watch(currentPage, () => {
  loadStockItems()
})

// Load on mount
onMounted(() => {
  loadStockItems()
})

// Expose refresh method
defineExpose({
  refresh: loadStockItems
})
</script>
