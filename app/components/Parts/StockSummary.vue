<template>
  <Card>
    <CardHeader>
      <CardTitle>Stock Summary</CardTitle>
      <CardDescription>
        Current stock levels for this part
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-3">
        <Skeleton v-for="i in 3" :key="i" class="h-16 w-full" />
      </div>

      <!-- Summary Stats -->
      <div v-else class="grid gap-4 md:grid-cols-3">
        <!-- Total Quantity -->
        <div class="rounded-lg border p-4">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-muted-foreground">Total Stock</span>
            <span class="text-2xl font-bold font-mono">{{ totalQuantity }}</span>
          </div>
        </div>

        <!-- Locations Count -->
        <div class="rounded-lg border p-4">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-muted-foreground">Locations</span>
            <span class="text-2xl font-bold">{{ locationsCount }}</span>
          </div>
        </div>

        <!-- Status Badge -->
        <div class="rounded-lg border p-4">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-muted-foreground">Status</span>
            <Badge :variant="stockStatusVariant" class="w-fit mt-2">
              {{ stockStatusLabel }}
            </Badge>
          </div>
        </div>
      </div>

      <!-- Stock by Location -->
      <div v-if="!loading && stockByLocation.length > 0" class="space-y-2">
        <h4 class="text-sm font-medium">Stock by Location</h4>
        <div class="space-y-2">
          <div
            v-for="item in stockByLocation"
            :key="item.locationId"
            class="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors cursor-pointer"
            @click="navigateTo(`/stock?partId=${partId}&locationId=${item.locationId}`)"
          >
            <div class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="h-4 w-4 text-muted-foreground" />
              <span class="text-sm">{{ item.locationName || 'Unknown Location' }}</span>
            </div>
            <Badge variant="secondary" class="font-mono">
              {{ item.quantity }}
            </Badge>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && stockByLocation.length === 0" class="text-center py-8">
        <Icon name="lucide:inbox" class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p class="text-sm text-muted-foreground">No stock items found for this part</p>
        <Button variant="outline" size="sm" class="mt-4" @click="navigateTo(`/stock/create?partId=${partId}`)">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      <!-- Link to All Stock -->
      <div v-if="!loading && stockByLocation.length > 0" class="pt-4 border-t">
        <Button variant="outline" class="w-full" @click="navigateTo(`/stock?partId=${partId}`)">
          <Icon name="lucide:list" class="mr-2 h-4 w-4" />
          View All Stock Items
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  partId: string
}

const props = defineProps<Props>()

const stockStore = useStockStore()

interface StockLocationSummary {
  locationId: string
  locationName: string
  quantity: number
}

const loading = ref(true)
const totalQuantity = ref(0)
const locationsCount = ref(0)
const stockByLocation = ref<StockLocationSummary[]>([])

// Computed
const stockStatusVariant = computed(() => {
  const minStock = 0 // Would come from part data
  if (totalQuantity.value === 0) return 'destructive'
  if (totalQuantity.value < minStock) return 'warning'
  return 'success'
})

const stockStatusLabel = computed(() => {
  const minStock = 0
  if (totalQuantity.value === 0) return 'Out of Stock'
  if (totalQuantity.value < minStock) return 'Low Stock'
  return 'In Stock'
})

// Load stock summary
const loadStockSummary = async () => {
  loading.value = true
  try {
    const response = await stockStore.fetchStockItems({
      partId: props.partId,
      perPage: '1000'
    })

    // Calculate totals
    totalQuantity.value = response.data.reduce((sum, item) => sum + (item.quantity || 0), 0)

    // Group by location
    const locationMap = new Map<string, StockLocationSummary>()
    response.data.forEach(item => {
      const locationId = item.locationId || 'unknown'
      const locationName = item.location?.name || 'Unknown Location'

      if (locationMap.has(locationId)) {
        const existing = locationMap.get(locationId)!
        existing.quantity += item.quantity || 0
      } else {
        locationMap.set(locationId, {
          locationId,
          locationName,
          quantity: item.quantity || 0
        })
      }
    })

    stockByLocation.value = Array.from(locationMap.values())
      .sort((a, b) => b.quantity - a.quantity) // Sort by quantity descending

    locationsCount.value = stockByLocation.value.length
  } catch (error) {
    console.error('Failed to load stock summary:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStockSummary()
})
</script>
