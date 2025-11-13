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
    <div v-else-if="location" class="max-w-2xl">
      <Card class="main-content">
        <CardHeader>
          <CardTitle>Edit Location: {{ location.name }}</CardTitle>
          <CardDescription>
            Update the details of this stock location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockLocationForm
            :location="location"
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
            <h3 class="text-lg font-medium mb-2">Location Not Found</h3>
            <p class="text-sm text-muted-foreground mb-4">
              The location you're trying to edit doesn't exist or has been deleted.
            </p>
            <Button @click="navigateTo('/stock/locations')">
              Back to Locations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StockLocation } from '#shared/types/stock-location'
import type { UpdateStockLocationInput } from '#shared/validators/stock-location'

const route = useRoute()
const router = useRouter()
const stockStore = useStockStore()

const locationId = computed(() => route.params.id as string)

const location = computed(() => stockStore.currentLocation)
const loading = computed(() => stockStore.loading)
const updating = ref(false)

// Fetch location details
const loadLocation = async () => {
  try {
    const success = await stockStore.fetchLocation(locationId.value)
    if (success && location.value) {
      // Set page title
      useHead({ title: `Edit ${location.value.name} - Stock Locations` })
    }
  } catch (error) {
    console.error('Failed to fetch location:', error)
  }
}

const handleSubmit = async (data: UpdateStockLocationInput) => {
  updating.value = true
  try {
    const success = await stockStore.updateLocation(locationId.value, data)
    if (success) {
      // Navigate back to location detail page
      await router.push(`/stock/locations/${locationId.value}`)
    }
  } catch (error) {
    console.error('Failed to update location:', error)
  } finally {
    updating.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  loadLocation()
  usePrimaryAnimation({ identifier: '.main-content' })
})
</script>
