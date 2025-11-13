<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="navigateTo(`/stock/${stockItem?.id}/edit`)">
            <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" @click="handleMove">
            <Icon name="lucide:move" class="mr-2 h-4 w-4" />
            Move
          </Button>
          <Button variant="outline" @click="handleAdjust">
            <Icon name="lucide:plus-minus" class="mr-2 h-4 w-4" />
            Adjust Quantity
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon name="lucide:more-vertical" class="h-4 w-4" />
                <span class="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="changeStatus">
                <Icon name="lucide:check-circle" class="mr-2 h-4 w-4" />
                Change Status
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                class="text-destructive focus:text-destructive"
                @click="deleteDialogOpen = true"
              >
                <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                Delete Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Skeleton class="h-32 w-full" />
            <Skeleton class="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Stock Item Details -->
    <div v-else-if="stockItem" class="space-y-6">
      <!-- Tabs -->
      <Tabs v-model="currentTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">Tracking History</TabsTrigger>
        </TabsList>

        <!-- Details Tab -->
        <TabsContent value="details" class="space-y-6 mt-6">
          <StockItemDetails :stock-item="stockItem" class="main-content" />

          <!-- Quick Actions -->
          <Card class="main-content">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common operations for this stock item
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
              <Button variant="outline" @click="navigateTo(`/stock/${stockItem.id}/edit`)">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                Edit Stock
              </Button>
              <Button variant="outline" @click="handleMove">
                <Icon name="lucide:move" class="mr-2 h-4 w-4" />
                Move to Location
              </Button>
              <Button variant="outline" @click="handleAdjust">
                <Icon name="lucide:plus-minus" class="mr-2 h-4 w-4" />
                Adjust Quantity
              </Button>
              <Button variant="outline" @click="viewPart">
                <Icon name="lucide:package" class="mr-2 h-4 w-4" />
                View Part
              </Button>
              <Button variant="outline" @click="viewLocation">
                <Icon name="lucide:map-pin" class="mr-2 h-4 w-4" />
                View Location
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- History Tab -->
        <TabsContent value="history" class="space-y-6 mt-6">
          <Card class="main-content">
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
              <CardDescription>
                Activity log for this stock item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col items-center justify-center py-12 text-center">
                <Icon name="lucide:history" class="h-12 w-12 text-muted-foreground mb-4" />
                <h3 class="text-lg font-medium mb-2">No History</h3>
                <p class="text-sm text-muted-foreground">
                  Tracking history is not yet implemented
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

    <!-- Error State -->
    <Card v-else class="main-content">
      <CardContent class="py-12">
        <div class="flex flex-col items-center justify-center text-center">
          <Icon name="lucide:alert-circle" class="h-12 w-12 text-destructive mb-4" />
          <h3 class="text-lg font-medium mb-2">Stock Item Not Found</h3>
          <p class="text-sm text-muted-foreground mb-4">
            The stock item you're looking for doesn't exist or has been deleted.
          </p>
          <Button @click="navigateTo('/stock')">
            Back to Stock Items
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Move Dialog -->
    <StockItemMoveDialog
      v-model:open="moveDialogOpen"
      :stock-item="stockItem"
      @moved="handleMoved"
    />

    <!-- Adjust Dialog -->
    <StockItemAdjustDialog
      v-model:open="adjustDialogOpen"
      :stock-item="stockItem"
      @adjusted="handleAdjusted"
    />

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Stock Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this stock item? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="deleting">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            :disabled="deleting"
            @click="confirmDelete"
          >
            <Icon v-if="deleting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import type { StockItem } from '#shared/types/stock-item'

const route = useRoute()
const router = useRouter()
const stockStore = useStockStore()
const { showToast } = useShowToast()

const stockItemId = computed(() => route.params.id as string)

const stockItem = computed(() => stockStore.currentStockItem)
const loading = computed(() => stockStore.loading)
const currentTab = ref('details')

// Dialog states
const moveDialogOpen = ref(false)
const adjustDialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const deleting = ref(false)

// Fetch stock item details
const loadStockItem = async () => {
  try {
    const success = await stockStore.fetchStockItem(stockItemId.value)
    if (success && stockItem.value) {
      // Set page title
      const partName = stockItem.value.part?.name || 'Unknown Part'
      useHead({ title: `Stock Item: ${partName}` })
    }
  } catch (error) {
    console.error('Failed to fetch stock item:', error)
  }
}

// Actions
const handleMove = () => {
  moveDialogOpen.value = true
}

const handleAdjust = () => {
  adjustDialogOpen.value = true
}

const changeStatus = () => {
  showToast('Change status functionality coming soon', 'info')
}

const viewPart = () => {
  if (stockItem.value?.partId) {
    navigateTo(`/parts/${stockItem.value.partId}`)
  }
}

const viewLocation = () => {
  if (stockItem.value?.locationId) {
    navigateTo(`/stock/locations/${stockItem.value.locationId}`)
  }
}

const handleMoved = () => {
  loadStockItem()
}

const handleAdjusted = () => {
  loadStockItem()
}

const confirmDelete = async () => {
  if (!stockItem.value) return

  deleting.value = true
  try {
    const success = await stockStore.deleteStockItem(stockItem.value.id)
    if (success) {
      deleteDialogOpen.value = false

      // Navigate back to stock list
      await router.push('/stock')
    }
  } catch (error) {
    console.error('Failed to delete stock item:', error)
  } finally {
    deleting.value = false
  }
}

// Load on mount
onMounted(() => {
  loadStockItem()
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
})

// Reload when route changes
watch(stockItemId, () => {
  loadStockItem()
})
</script>
