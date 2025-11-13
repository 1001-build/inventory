<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <!-- Right side slot empty -->
      </template>
    </AppPageHeader>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-2xl">
      <Card class="main-content">
        <CardHeader>
          <Skeleton class="h-8 w-48" />
          <Skeleton class="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <Skeleton class="h-20 w-full" />
            <Skeleton class="h-20 w-full" />
            <Skeleton class="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Edit Form -->
    <div v-else-if="category" class="max-w-2xl">
      <Card class="main-content">
        <CardHeader>
          <CardTitle>Edit Category: {{ category.name }}</CardTitle>
          <CardDescription>
            Update the details of this part category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartsCategoryForm
            :category="category"
            :loading="updating"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-2xl">
      <Card class="main-content">
        <CardContent class="py-12">
          <div class="flex flex-col items-center justify-center text-center">
            <Icon name="lucide:alert-circle" class="h-12 w-12 text-destructive mb-4" />
            <h3 class="text-lg font-medium mb-2">Category Not Found</h3>
            <p class="text-sm text-muted-foreground mb-4">
              The category you're trying to edit doesn't exist or has been deleted.
            </p>
            <Button @click="navigateTo('/parts/categories')">
              Back to Categories
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PartCategory } from '~/shared/types/part-category'
import type { UpdatePartCategoryInput } from '~/shared/validators/part-category'

const route = useRoute()
const router = useRouter()
const { fetchCategory, updateCategory } = useParts()

const categoryId = computed(() => route.params.id as string)

const category = ref<PartCategory | null>(null)
const loading = ref(true)
const updating = ref(false)

// Fetch category details
const loadCategory = async () => {
  loading.value = true
  try {
    const response = await fetchCategory(categoryId.value)
    category.value = response.data

    // Set page title
    useHead({ title: `Edit ${category.value.name} - Part Categories` })
  } catch (error) {
    console.error('Failed to fetch category:', error)
    category.value = null
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (data: UpdatePartCategoryInput) => {
  updating.value = true
  try {
    await updateCategory(categoryId.value, data)

    // Navigate back to category detail page
    await router.push(`/parts/categories/${categoryId.value}`)
  } catch (error) {
    console.error('Failed to update category:', error)
  } finally {
    updating.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  loadCategory()
  usePrimaryAnimation({ identifier: '.main-content' })
})
</script>
