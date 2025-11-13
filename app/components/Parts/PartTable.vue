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
            placeholder="Search by name or IPN..."
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
            <DropdownMenuItem @click="filterDialog = true">
              <Icon name="lucide:settings-2" class="mr-2 h-4 w-4" />
              Advanced Filters
            </DropdownMenuItem>
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
    <div v-else-if="parts.length > 0" class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-12">
              <Checkbox v-model:checked="selectAll" />
            </TableHead>
            <TableHead class="cursor-pointer" @click="toggleSort('name')">
              <div class="flex items-center gap-1">
                Name
                <Icon
                  v-if="sortField === 'name'"
                  :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                  class="h-4 w-4"
                />
              </div>
            </TableHead>
            <TableHead>IPN</TableHead>
            <TableHead>Category</TableHead>
            <TableHead class="text-center">Stock</TableHead>
            <TableHead class="text-center">Status</TableHead>
            <TableHead class="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="part in parts" :key="part.id" class="cursor-pointer" @click="navigateTo(`/parts/${part.id}`)">
            <TableCell @click.stop>
              <Checkbox v-model:checked="selectedParts" :value="part.id" />
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded bg-muted flex items-center justify-center">
                  <Icon
                    v-if="part.image"
                    name="lucide:image"
                    class="h-5 w-5 text-muted-foreground"
                  />
                  <Icon
                    v-else
                    name="lucide:package"
                    class="h-5 w-5 text-muted-foreground"
                  />
                </div>
                <div>
                  <p class="font-medium">{{ part.name }}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <Badge v-if="part.assembly" variant="outline" class="text-xs">
                      <Icon name="lucide:boxes" class="mr-1 h-3 w-3" />
                      Assembly
                    </Badge>
                    <Badge v-if="part.component" variant="outline" class="text-xs">
                      <Icon name="lucide:puzzle" class="mr-1 h-3 w-3" />
                      Component
                    </Badge>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <code class="text-sm text-muted-foreground">{{ part.IPN }}</code>
            </TableCell>
            <TableCell>
              <span v-if="part.category" class="text-sm">{{ part.category.name }}</span>
              <span v-else class="text-sm text-muted-foreground">No category</span>
            </TableCell>
            <TableCell class="text-center">
              <Badge :variant="getStockVariant(part.stockCount)">
                {{ part.stockCount || 0 }}
              </Badge>
            </TableCell>
            <TableCell class="text-center">
              <Badge :variant="part.active ? 'default' : 'secondary'">
                {{ part.active ? 'Active' : 'Inactive' }}
              </Badge>
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
                  <DropdownMenuItem @click="navigateTo(`/parts/${part.id}`)">
                    <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="navigateTo(`/parts/${part.id}/edit`)">
                    <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                    Edit Part
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="text-destructive focus:text-destructive"
                    @click="handleDelete(part)"
                  >
                    <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                    Delete Part
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
      <Icon name="lucide:package" class="h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-medium mb-2">No parts found</h3>
      <p class="text-sm text-muted-foreground mb-4">
        {{ searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first part' }}
      </p>
      <Button v-if="!searchQuery" @click="navigateTo('/parts/create')">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Create Part
      </Button>
    </div>

    <!-- Pagination -->
    <div v-if="parts.length > 0" class="flex items-center justify-between">
      <p class="text-sm text-muted-foreground">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalCount) }} of {{ totalCount }} parts
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
import type { Part } from '~/shared/types/part'

interface Props {
  categoryId?: string
  filters?: object
}

const props = defineProps<Props>()

const emit = defineEmits<{
  delete: [part: Part]
}>()

const { fetchParts } = useParts()

// State
const parts = ref<Part[]>([])
const loading = ref(true)
const searchQuery = ref('')
const sortField = ref<string>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const pageSize = ref(20)
const totalCount = ref(0)
const selectedParts = ref<string[]>([])
const selectAll = ref(false)
const filterDialog = ref(false)

// Computed
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

const activeFilterCount = computed(() => {
  let count = 0
  if (props.categoryId) count++
  if (props.filters && Object.keys(props.filters).length > 0) count++
  return count
})

// Methods
const loadParts = async () => {
  loading.value = true
  try {
    const response = await fetchParts({
      categoryId: props.categoryId,
      search: searchQuery.value || undefined,
      page: currentPage.value,
      limit: pageSize.value,
      sortBy: sortField.value,
      sortOrder: sortOrder.value,
      ...props.filters
    })
    parts.value = response.data
    totalCount.value = response.pagination.total
  } catch (error) {
    console.error('Failed to load parts:', error)
    parts.value = []
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
  loadParts()
}

const clearFilters = () => {
  searchQuery.value = ''
  currentPage.value = 1
  loadParts()
}

const handleDelete = (part: Part) => {
  emit('delete', part)
}

const getStockVariant = (stockCount: number = 0) => {
  if (stockCount === 0) return 'destructive'
  if (stockCount < 10) return 'warning'
  return 'success'
}

// Watchers
watch(searchQuery, useDebounceFn(() => {
  currentPage.value = 1
  loadParts()
}, 500))

watch([() => props.categoryId, () => props.filters], () => {
  currentPage.value = 1
  loadParts()
}, { deep: true })

watch(currentPage, () => {
  loadParts()
})

// Load on mount
onMounted(() => {
  loadParts()
})

// Expose refresh method
defineExpose({
  refresh: loadParts
})
</script>
