<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>Stock Summary</CardTitle>
          <CardDescription>
            Current stock levels and locations for this part
          </CardDescription>
        </div>
        <Button size="sm" @click="navigateTo(`/stock?partId=${partId}`)">
          <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
          View All
        </Button>
      </div>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-3">
        <Skeleton v-for="i in 3" :key="i" class="h-16 w-full" />
      </div>

      <!-- Stock Data -->
      <div v-else-if="summary" class="space-y-6">
        <!-- Total Stock by Status -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium">Stock by Status</h4>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="status in stockByStatus"
              :key="status.status"
              class="rounded-lg border p-3 space-y-1"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">{{ formatStatus(status.status) }}</span>
                <Badge :variant="getStatusVariant(status.status)">
                  {{ status.count }}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Stock Count -->
        <div class="rounded-lg bg-muted p-4">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Total Stock</p>
              <p class="text-2xl font-bold">{{ totalStock }}</p>
            </div>
            <Icon name="lucide:boxes" class="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <!-- Top Locations -->
        <div v-if="topLocations.length > 0" class="space-y-3">
          <h4 class="text-sm font-medium">Top Locations</h4>
          <div class="space-y-2">
            <div
              v-for="location in topLocations"
              :key="location.locationId"
              class="flex items-center justify-between rounded-lg border p-3"
            >
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <Icon name="lucide:map-pin" class="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <NuxtLink
                  :to="`/stock/locations/${location.locationId}`"
                  class="text-sm font-medium hover:underline truncate"
                >
                  {{ location.locationName || 'Unknown Location' }}
                </NuxtLink>
              </div>
              <Badge variant="secondary">{{ location.count }} units</Badge>
            </div>
          </div>
        </div>

        <!-- Low Stock Warning -->
        <Alert v-if="isLowStock" variant="warning">
          <Icon name="lucide:alert-triangle" class="h-4 w-4" />
          <AlertTitle>Low Stock Warning</AlertTitle>
          <AlertDescription>
            Stock level ({{ totalStock }}) is below minimum ({{ minimumStock }})
          </AlertDescription>
        </Alert>

        <!-- Add Stock Button -->
        <div class="pt-4 border-t">
          <Button class="w-full" @click="navigateTo(`/stock/create?partId=${partId}`)">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-8 text-center">
        <Icon name="lucide:package-x" class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-medium mb-2">No Stock</h3>
        <p class="text-sm text-muted-foreground mb-4">
          There are currently no stock items for this part
        </p>
        <Button size="sm" @click="navigateTo(`/stock/create?partId=${partId}`)">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Props {
  partId: string
  minimumStock?: number
}

const props = withDefaults(defineProps<Props>(), {
  minimumStock: 0
})

interface StockByStatus {
  status: string
  count: number
}

interface TopLocation {
  locationId: string
  locationName: string
  count: number
}

interface StockSummary {
  totalStock: number
  byStatus: StockByStatus[]
  topLocations: TopLocation[]
}

const loading = ref(true)
const summary = ref<StockSummary | null>(null)

// Computed
const totalStock = computed(() => summary.value?.totalStock || 0)

const stockByStatus = computed(() => summary.value?.byStatus || [])

const topLocations = computed(() => {
  const locations = summary.value?.topLocations || []
  return locations.slice(0, 5) // Top 5
})

const isLowStock = computed(() => {
  return totalStock.value > 0 && totalStock.value < props.minimumStock
})

// Methods
const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

const getStatusVariant = (status: string) => {
  switch (status.toUpperCase()) {
    case 'OK':
      return 'success'
    case 'DAMAGED':
    case 'LOST':
      return 'destructive'
    case 'DESTROYED':
      return 'destructive'
    case 'ATTENTION':
    case 'RETURNED':
      return 'warning'
    default:
      return 'secondary'
  }
}

const loadStockSummary = async () => {
  loading.value = true
  try {
    // Fetch stock items for this part
    // For now, use mock data
    // In production: const response = await $fetch(`/api/v1/stock-items?partId=${props.partId}`)

    // Mock data
    await new Promise(resolve => setTimeout(resolve, 500))

    summary.value = {
      totalStock: 45,
      byStatus: [
        { status: 'OK', count: 40 },
        { status: 'DAMAGED', count: 3 },
        { status: 'ATTENTION', count: 2 }
      ],
      topLocations: [
        { locationId: '1', locationName: 'Warehouse A - Shelf 1', count: 25 },
        { locationId: '2', locationName: 'Warehouse B - Shelf 2', count: 15 },
        { locationId: '3', locationName: 'Storage Room', count: 5 }
      ]
    }
  } catch (error) {
    console.error('Failed to load stock summary:', error)
    summary.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStockSummary()
})
</script>
