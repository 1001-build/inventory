<template>
  <div class="space-y-6">
    <AppPageHeader :showBack="false">
      <template #default>
        <Button @click="navigateTo('/stock/locations/create')">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          New Location
        </Button>
      </template>
    </AppPageHeader>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Location Tree Sidebar -->
      <Card class="md:col-span-1 main-content">
        <CardHeader>
          <CardTitle>Location Tree</CardTitle>
          <CardDescription>
            Hierarchical view of all stock locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockLocationTree
            ref="locationTree"
            :selected-id="selectedLocationId"
            @select="handleLocationSelect"
          />
        </CardContent>
      </Card>

      <!-- Location Details -->
      <Card class="md:col-span-2 main-content">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>
                {{ selectedLocation ? selectedLocation.name : 'All Locations' }}
              </CardTitle>
              <CardDescription>
                {{ selectedLocation?.description || 'Browse and manage stock locations' }}
              </CardDescription>
            </div>
            <StockLocationActions
              v-if="selectedLocation"
              @view="handleView"
              @edit="handleEdit"
              @add-child="handleAddChild"
              @delete="handleDelete"
            />
          </div>
        </CardHeader>
        <CardContent>
          <!-- Selected Location Details -->
          <div v-if="selectedLocation" class="space-y-6">
            <!-- Metadata -->
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Type</p>
                <div class="flex items-center gap-2">
                  <Badge v-if="selectedLocation.structural" variant="outline">
                    <Icon name="lucide:folder" class="mr-1 h-3 w-3" />
                    Structural
                  </Badge>
                  <Badge v-else variant="default">
                    <Icon name="lucide:map-pin" class="mr-1 h-3 w-3" />
                    Storage
                  </Badge>
                  <Badge v-if="selectedLocation.external" variant="secondary">
                    <Icon name="lucide:external-link" class="mr-1 h-3 w-3" />
                    External
                  </Badge>
                </div>
              </div>

              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Parent Location</p>
                <p class="text-sm font-medium">
                  {{ selectedLocation.parentId ? 'Has parent' : 'Root location' }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Stock Items</p>
                <p class="text-sm font-medium">
                  {{ selectedLocation.stockItemCount || 0 }} items
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Sub-locations</p>
                <p class="text-sm font-medium">
                  {{ selectedLocation.childCount || 0 }} sub-locations
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Created</p>
                <p class="text-sm font-medium">
                  {{ formatDate(selectedLocation.createdAt) }}
                </p>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="flex flex-wrap gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" @click="handleEdit">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" @click="handleAddChild">
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                Add Sub-location
              </Button>
              <Button variant="outline" size="sm" @click="viewStockItems">
                <Icon name="lucide:boxes" class="mr-2 h-4 w-4" />
                View Stock Items
              </Button>
            </div>
          </div>

          <!-- No Selection State -->
          <div v-else class="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="lucide:map-pin" class="h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-medium mb-2">Select a Location</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Choose a location from the tree to view details
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Delete Dialog -->
    <StockLocationDeleteDialog
      v-model:open="deleteDialogOpen"
      :location="locationToDelete"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import type { StockLocation } from '~/shared/types/stock-location'

useHead({ title: 'Stock Locations' })

const { fetchLocation } = useStock()
const locationTree = ref()

// Selected location state
const selectedLocationId = ref<string | undefined>()
const selectedLocation = ref<StockLocation | null>(null)

// Dialog states
const deleteDialogOpen = ref(false)
const locationToDelete = ref<StockLocation | null>(null)

// Handle location selection from tree
const handleLocationSelect = async (location: StockLocation) => {
  selectedLocationId.value = location.id

  // Fetch full location details
  try {
    const response = await fetchLocation(location.id)
    selectedLocation.value = response.data
  } catch (error) {
    console.error('Failed to fetch location details:', error)
  }
}

// Actions
const handleView = () => {
  if (selectedLocation.value) {
    navigateTo(`/stock/locations/${selectedLocation.value.id}`)
  }
}

const handleEdit = () => {
  if (selectedLocation.value) {
    navigateTo(`/stock/locations/${selectedLocation.value.id}/edit`)
  }
}

const handleAddChild = () => {
  if (selectedLocation.value) {
    navigateTo(`/stock/locations/create?parentId=${selectedLocation.value.id}`)
  }
}

const handleDelete = () => {
  locationToDelete.value = selectedLocation.value
  deleteDialogOpen.value = true
}

const viewStockItems = () => {
  if (selectedLocation.value) {
    navigateTo(`/stock?locationId=${selectedLocation.value.id}`)
  }
}

// Handle successful operations
const handleDeleted = () => {
  selectedLocationId.value = undefined
  selectedLocation.value = null
  locationTree.value?.refresh()
}

// Utility function
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
})
</script>
