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
          <CardTitle>Add Stock</CardTitle>
          <CardDescription>
            Add new stock items to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockItemForm
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
import type { CreateStockItemInput } from '~/shared/validators/stock-item'

useHead({ title: 'Add Stock' })

const { createStockItem } = useStock()
const router = useRouter()
const route = useRoute()

const creating = ref(false)

const handleSubmit = async (data: CreateStockItemInput) => {
  creating.value = true
  try {
    const response = await createStockItem(data)

    // Navigate based on query params or default to detail page
    const action = route.query.action as string
    if (action === 'add-another') {
      // Reload form for another entry
      router.go(0)
    } else if (action === 'view-location' && data.locationId) {
      await router.push(`/stock/locations/${data.locationId}`)
    } else {
      // Default: navigate to detail page
      await router.push(`/stock/${response.data.id}`)
    }
  } catch (error) {
    console.error('Failed to create stock item:', error)
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
