<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="navigateTo(`/parts/categories/${category?.id}/edit`)">
            <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
            Edit
          </Button>
          <PartsCategoryActions
            @view="() => {}"
            @edit="handleEdit"
            @move="handleMove"
            @delete="handleDelete"
          />
        </div>
      </template>
    </AppPageHeader>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <Card class="main-content">
        <CardHeader>
          <Skeleton class="h-8 w-64" />
          <Skeleton class="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <Skeleton class="h-20 w-full" />
            <Skeleton class="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Category Details -->
    <div v-else-if="category" class="space-y-6">
      <!-- Overview Card -->
      <Card class="main-content">
        <CardHeader>
          <CardTitle>{{ category.name }}</CardTitle>
          <CardDescription>{{ category.description || 'No description' }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Metadata Grid -->
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Parent Category</p>
              <p class="text-sm font-medium">
                {{ category.parentId ? 'Has parent' : 'Root category' }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Parts Count</p>
              <p class="text-sm font-medium">
                {{ category.partCount || 0 }} parts
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Subcategories</p>
              <p class="text-sm font-medium">
                {{ category.childCount || 0 }} subcategories
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Created</p>
              <p class="text-sm font-medium">
                {{ formatDate(category.createdAt) }}
              </p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" @click="viewParts">
              <Icon name="lucide:package" class="mr-2 h-4 w-4" />
              View Parts ({{ category.partCount || 0 }})
            </Button>
            <Button variant="outline" size="sm" @click="handleMove">
              <Icon name="lucide:move" class="mr-2 h-4 w-4" />
              Move Category
            </Button>
            <Button variant="outline" size="sm" @click="navigateTo('/parts/categories/create')">
              <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
              Add Subcategory
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Subcategories -->
      <Card v-if="(category.childCount || 0) > 0" class="main-content">
        <CardHeader>
          <CardTitle>Subcategories</CardTitle>
          <CardDescription>
            Child categories under "{{ category.name }}"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartsCategoryTree
            :root-only="false"
            @select="handleSubcategorySelect"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <Card v-else class="main-content">
      <CardContent class="py-12">
        <div class="flex flex-col items-center justify-center text-center">
          <Icon name="lucide:alert-circle" class="h-12 w-12 text-destructive mb-4" />
          <h3 class="text-lg font-medium mb-2">Category Not Found</h3>
          <p class="text-sm text-muted-foreground mb-4">
            The category you're looking for doesn't exist or has been deleted.
          </p>
          <Button @click="navigateTo('/parts/categories')">
            Back to Categories
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Delete Dialog -->
    <PartsCategoryDeleteDialog
      v-model:open="deleteDialogOpen"
      :category="category"
      @deleted="handleDeleted"
    />

    <!-- Move Dialog -->
    <PartsCategoryMoveDialog
      v-model:open="moveDialogOpen"
      :category="category"
      @moved="handleMoved"
    />
  </div>
</template>

<script setup lang="ts">
import type { PartCategory } from '~/shared/types/part-category'

const route = useRoute()
const router = useRouter()
const { fetchCategory } = useParts()

const categoryId = computed(() => route.params.id as string)

const category = ref<PartCategory | null>(null)
const loading = ref(true)

// Dialog states
const deleteDialogOpen = ref(false)
const moveDialogOpen = ref(false)

// Fetch category details
const loadCategory = async () => {
  loading.value = true
  try {
    const response = await fetchCategory(categoryId.value)
    category.value = response.data

    // Set page title
    useHead({ title: `${category.value.name} - Part Categories` })
  } catch (error) {
    console.error('Failed to fetch category:', error)
    category.value = null
  } finally {
    loading.value = false
  }
}

// Actions
const handleEdit = () => {
  navigateTo(`/parts/categories/${categoryId.value}/edit`)
}

const handleMove = () => {
  moveDialogOpen.value = true
}

const handleDelete = () => {
  deleteDialogOpen.value = true
}

const viewParts = () => {
  navigateTo(`/parts?categoryId=${categoryId.value}`)
}

const handleSubcategorySelect = (subcategory: PartCategory) => {
  navigateTo(`/parts/categories/${subcategory.id}`)
}

// Handle successful operations
const handleDeleted = () => {
  navigateTo('/parts/categories')
}

const handleMoved = () => {
  loadCategory()
}

// Utility function
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Load on mount
onMounted(() => {
  loadCategory()
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
})

// Reload when route changes
watch(categoryId, () => {
  loadCategory()
})
</script>
