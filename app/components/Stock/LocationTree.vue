<template>
  <div class="space-y-2">
    <!-- Loading State -->
    <div v-if="loading" class="space-y-2">
      <Skeleton v-for="i in 5" :key="i" class="h-10 w-full" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading && locations.length === 0"
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <Icon name="lucide:map-pin" class="h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-medium mb-2">No locations found</h3>
      <p class="text-sm text-muted-foreground mb-4">
        Get started by creating your first stock location.
      </p>
    </div>

    <!-- Location Tree -->
    <div v-else class="space-y-1">
      <StockLocationTreeNode
        v-for="location in locations"
        :key="location.id"
        :location="location"
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
import type { StockLocation } from '~/shared/types/stock-location'

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
  select: [location: StockLocation]
  expand: [locationId: string]
  collapse: [locationId: string]
}>()

const { fetchLocationTree } = useStock()

const locations = ref<StockLocation[]>([])
const loading = ref(true)

const loadLocations = async () => {
  loading.value = true
  try {
    const response = await fetchLocationTree(props.rootOnly ? null : undefined)
    locations.value = response.data
  } catch (error) {
    console.error('Failed to load location tree:', error)
    locations.value = []
  } finally {
    loading.value = false
  }
}

const handleSelect = (location: StockLocation) => {
  emit('select', location)
}

const handleExpand = (locationId: string) => {
  emit('expand', locationId)
}

const handleCollapse = (locationId: string) => {
  emit('collapse', locationId)
}

// Load locations on mount
onMounted(() => {
  loadLocations()
})

// Expose refresh method
defineExpose({
  refresh: loadLocations
})
</script>
