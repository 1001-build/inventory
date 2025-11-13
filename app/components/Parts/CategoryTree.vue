<template>
  <div class="space-y-2">
    <!-- Loading State -->
    <div v-if="loading" class="space-y-2">
      <Skeleton v-for="i in 5" :key="i" class="h-10 w-full" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading && categories.length === 0"
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <Icon name="lucide:folder" class="h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-medium mb-2">No categories found</h3>
      <p class="text-sm text-muted-foreground mb-4">
        Get started by creating your first part category.
      </p>
    </div>

    <!-- Category Tree -->
    <div v-else class="space-y-1">
      <PartsCategoryTreeNode
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :selected-id="selectedId"
        :selectable="selectable"
        @select="handleSelect"
        @expand="handleExpand"
        @collapse="handleCollapse"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PartCategory } from '#shared/types/part-category'

interface Props {
  rootOnly?: boolean
  selectable?: boolean
  selectedId?: string
}

const props = withDefaults(defineProps<Props>(), {
  rootOnly: false,
  selectable: true
})

const emit = defineEmits<{
  select: [category: PartCategory]
  expand: [categoryId: string]
  collapse: [categoryId: string]
}>()

const partsStore = usePartsStore()

const categories = computed(() => partsStore.categoryTree)
const loading = computed(() => partsStore.loading)

const loadCategories = async () => {
  try {
    await partsStore.fetchCategoryTree(props.rootOnly ? null : undefined)
  } catch (error) {
    console.error('Failed to load category tree:', error)
  }
}

const handleSelect = (category: PartCategory) => {
  emit('select', category)
}

const handleExpand = (categoryId: string) => {
  emit('expand', categoryId)
}

const handleCollapse = (categoryId: string) => {
  emit('collapse', categoryId)
}

// Load categories on mount
onMounted(() => {
  loadCategories()
})

// Expose refresh method
defineExpose({
  refresh: loadCategories
})
</script>
