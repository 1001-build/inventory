<template>
  <div class="space-y-6">
    <AppPageHeader :showBack="false">
      <template #default>
        <Button @click="navigateTo('/parts/categories/create')">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          New Category
        </Button>
      </template>
    </AppPageHeader>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Category Tree Sidebar -->
      <Card class="md:col-span-1 main-content">
        <CardHeader>
          <CardTitle>Category Tree</CardTitle>
          <CardDescription>
            Hierarchical view of all categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartCategoryTree
            ref="categoryTree"
            :selected-id="selectedCategoryId"
            @select="handleCategorySelect"
          />
        </CardContent>
      </Card>

      <!-- Category List/Details -->
      <Card class="md:col-span-2 main-content">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>
                {{ selectedCategory ? selectedCategory.name : 'All Categories' }}
              </CardTitle>
              <CardDescription>
                {{ selectedCategory?.description || 'Browse and manage part categories' }}
              </CardDescription>
            </div>
            <PartCategoryActions
              v-if="selectedCategory"
              @view="handleView"
              @edit="handleEdit"
              @move="handleMove"
              @delete="handleDelete"
            />
          </div>
        </CardHeader>
        <CardContent>
          <!-- Selected Category Details -->
          <div v-if="selectedCategory" class="space-y-6">
            <!-- Metadata -->
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Parent Category</p>
                <p class="text-sm font-medium">
                  {{ selectedCategory.parentId ? 'Has parent' : 'Root category' }}
                </p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Parts Count</p>
                <p class="text-sm font-medium">
                  {{ selectedCategory.partCount || 0 }} parts
                </p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Subcategories</p>
                <p class="text-sm font-medium">
                  {{ selectedCategory.childCount || 0 }} subcategories
                </p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Created</p>
                <p class="text-sm font-medium">
                  {{ formatDate(selectedCategory.createdAt) }}
                </p>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="handleEdit">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" @click="handleMove">
                <Icon name="lucide:move" class="mr-2 h-4 w-4" />
                Move
              </Button>
              <Button variant="outline" size="sm" @click="viewParts">
                <Icon name="lucide:package" class="mr-2 h-4 w-4" />
                View Parts
              </Button>
            </div>
          </div>

          <!-- No Selection State -->
          <div v-else class="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="lucide:folder-tree" class="h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-medium mb-2">Select a Category</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Choose a category from the tree to view details
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Delete Dialog -->
    <PartCategoryDeleteDialog
      v-model:open="deleteDialogOpen"
      :category="categoryToDelete"
      @deleted="handleDeleted"
    />

    <!-- Move Dialog -->
    <PartCategoryMoveDialog
      v-model:open="moveDialogOpen"
      :category="categoryToMove"
      @moved="handleMoved"
    />
  </div>
</template>

<script setup lang="ts">
import type { PartCategory } from '~/shared/types/part-category'

useHead({ title: 'Part Categories' })

const { fetchCategory } = useParts()
const categoryTree = ref()

// Selected category state
const selectedCategoryId = ref<string | undefined>()
const selectedCategory = ref<PartCategory | null>(null)

// Dialog states
const deleteDialogOpen = ref(false)
const moveDialogOpen = ref(false)
const categoryToDelete = ref<PartCategory | null>(null)
const categoryToMove = ref<PartCategory | null>(null)

// Handle category selection from tree
const handleCategorySelect = async (category: PartCategory) => {
  selectedCategoryId.value = category.id

  // Fetch full category details
  try {
    const response = await fetchCategory(category.id)
    selectedCategory.value = response.data
  } catch (error) {
    console.error('Failed to fetch category details:', error)
  }
}

// Actions
const handleView = () => {
  if (selectedCategory.value) {
    navigateTo(`/parts/categories/${selectedCategory.value.id}`)
  }
}

const handleEdit = () => {
  if (selectedCategory.value) {
    navigateTo(`/parts/categories/${selectedCategory.value.id}/edit`)
  }
}

const handleMove = () => {
  categoryToMove.value = selectedCategory.value
  moveDialogOpen.value = true
}

const handleDelete = () => {
  categoryToDelete.value = selectedCategory.value
  deleteDialogOpen.value = true
}

const viewParts = () => {
  if (selectedCategory.value) {
    navigateTo(`/parts?categoryId=${selectedCategory.value.id}`)
  }
}

// Handle successful operations
const handleDeleted = () => {
  selectedCategoryId.value = undefined
  selectedCategory.value = null
  categoryTree.value?.refresh()
}

const handleMoved = () => {
  categoryTree.value?.refresh()
  if (selectedCategory.value) {
    handleCategorySelect(selectedCategory.value)
  }
}

// Utility function
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
})
</script>
