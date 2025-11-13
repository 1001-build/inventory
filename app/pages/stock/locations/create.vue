<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <!-- Right side slot empty -->
      </template>
    </AppPageHeader>

    <div class="max-w-2xl">
      <Card class="main-content">
        <CardHeader>
          <CardTitle>Create Stock Location</CardTitle>
          <CardDescription>
            Add a new location to organize your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockLocationForm
            :loading="creating"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreateStockLocationInput } from '#shared/validators/stock-location'

useHead({ title: 'Create Stock Location' })

const route = useRoute()
const stockStore = useStockStore()
const router = useRouter()

const creating = ref(false)

// Check for parentId query param
const parentId = computed(() => route.query.parentId as string | undefined)

const handleSubmit = async (data: CreateStockLocationInput) => {
  creating.value = true
  try {
    // If parentId was provided in query, use it
    if (parentId.value) {
      data.parentId = parentId.value
    }

    const newLocation = await stockStore.createLocation(data)
    if (newLocation) {
      // Navigate to the new location detail page
      await router.push(`/stock/locations/${newLocation.id}`)
    }
  } catch (error) {
    console.error('Failed to create location:', error)
  } finally {
    creating.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  usePrimaryAnimation({ identifier: '.main-content' })
})
</script>
