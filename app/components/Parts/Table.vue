<template>
  <div class="space-y-4">
    <!-- Filters and Search -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex-1 max-w-md">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input v-model="searchQuery" type="search" placeholder="Search parts..." class="pl-9" />
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
                <Icon v-if="sortField === 'name'"
                  :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>IPN</TableHead>
            <TableHead>Category</TableHead>
            <TableHead class="text-center">Attributes</TableHead>
            <TableHead class="text-center">Status</TableHead>
            <TableHead class="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="part in parts" :key="part.id" class="cursor-pointer"
            @click="navigateTo(`/parts/${part.id}`)">
            <TableCell @click.stop>
              <Checkbox v-model:checked="selectedItems" :value="part.id" />
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded bg-muted flex items-center justify-center">
                  <Icon name="lucide:package" class="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="font-medium">{{ part.name }}</p>
                  <p v-if="part.description" class="text-xs text-muted-foreground line-clamp-1">
                    {{ part.description }}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <code v-if="part.IPN" class="text-sm">{{ part.IPN }}</code>
              <span v-else class="text-sm text-muted-foreground">-</span>
            </TableCell>
            <TableCell>
              <div v-if="part.category" class="flex items-center gap-1">
                <Icon name="lucide:folder" class="h-3 w-3 text-muted-foreground" />
                <span class="text-sm">{{ part.category.name }}</span>
              </div>
              <span v-else class="text-sm text-muted-foreground">No category</span>
            </TableCell>
            <TableCell class="text-center">
              <div class="flex flex-wrap gap-1 justify-center">
                <Badge v-if="part.assembly" variant="outline" class="text-xs">
                  <Icon name="lucide:boxes" class="mr-1 h-2 w-2" />
                  Assembly
                </Badge>
                <Badge v-if="part.component" variant="outline" class="text-xs">
                  <Icon name="lucide:puzzle" class="mr-1 h-2 w-2" />
                  Component
                </Badge>
                <Badge v-if="part.purchaseable" variant="outline" class="text-xs">
                  <Icon name="lucide:shopping-cart" class="mr-1 h-2 w-2" />
                  Buy
                </Badge>
                <Badge v-if="part.salable" variant="outline" class="text-xs">
                  <Icon name="lucide:dollar-sign" class="mr-1 h-2 w-2" />
                  Sell
                </Badge>
              </div>
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
                  <DropdownMenuItem class="text-destructive focus:text-destructive" @click="$emit('delete', part)">
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
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalCount) }} of {{
          totalCount }} parts
      </p>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" :disabled="currentPage === 1" @click="currentPage--">
          <Icon name="lucide:chevron-left" class="h-4 w-4" />
        </Button>
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
        <Button variant="outline" size="sm" :disabled="currentPage === totalPages" @click="currentPage++">
          <Icon name="lucide:chevron-right" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Part } from '#shared/types/part'
import { useDebounceFn } from '@vueuse/core'

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
const selectedItems = ref<string[]>([])
const selectAll = ref(false)

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
      page: currentPage.value.toString(),
      perPage: pageSize.value.toString(),
      sortBy: sortField.value as any,
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
