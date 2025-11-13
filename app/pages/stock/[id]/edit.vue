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
    <div v-else-if="stockItem" class="max-w-2xl">
      <Card class="main-content">
        <CardHeader>
          <CardTitle>Edit Stock Item</CardTitle>
          <CardDescription>
            Update stock item details (limited fields)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert class="mb-6">
            <Icon name="lucide:info" class="h-4 w-4" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              Part, serial number, and quantity cannot be changed after creation.
              Use "Adjust Quantity" to modify stock levels.
            </AlertDescription>
          </Alert>

          <StockItemForm
            :stock-item="stockItem"
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
            <h3 class="text-lg font-medium mb-2">Stock Item Not Found</h3>
            <p class="text-sm text-muted-foreground mb-4">
              The stock item you're trying to edit doesn't exist or has been deleted.
            </p>
            <Button @click="navigateTo('/stock')">
              Back to Stock Items
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { StockItem } from '~/shared/types/stock-item'
import type { UpdateStockItemInput } from '~/shared/validators/stock-item'

const route = useRoute()
const router = useRouter()
const { fetchStockItem, updateStockItem } = useStock()

const stockItemId = computed(() => route.params.id as string)

const stockItem = ref<StockItem | null>(null)
const loading = ref(true)
const updating = ref(false)

// Fetch stock item details
const loadStockItem = async () => {
  loading.value = true
  try {
    const response = await fetchStockItem(stockItemId.value)
    stockItem.value = response.data

    // Set page title
    const partName = stockItem.value.part?.name || 'Unknown Part'
    useHead({ title: `Edit Stock Item: ${partName}` })
  } catch (error) {
    console.error('Failed to fetch stock item:', error)
    stockItem.value = null
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (data: UpdateStockItemInput) => {
  updating.value = true
  try {
    await updateStockItem(stockItemId.value, data)

    // Navigate back to stock item detail page
    await router.push(`/stock/${stockItemId.value}`)
  } catch (error) {
    console.error('Failed to update stock item:', error)
  } finally {
    updating.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  loadStockItem()
  usePrimaryAnimation({ identifier: '.main-content' })
})
</script>
