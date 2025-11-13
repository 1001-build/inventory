<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="navigateTo(`/stock/locations/${location?.id}/edit`)">
            <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
            Edit
          </Button>
          <StockLocationActions
            @view="() => {}"
            @edit="handleEdit"
            @add-child="handleAddChild"
            @delete="handleDelete"
          />
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
            <Skeleton class="h-20 w-full" />
            <Skeleton class="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Location Details -->
    <div v-else-if="location" class="space-y-6">
      <!-- Overview Card -->
      <Card class="main-content">
        <CardHeader>
          <div class="flex items-center gap-2">
            <Icon
              :name="location.structural ? 'lucide:folder' : 'lucide:map-pin'"
              class="h-6 w-6"
              :class="location.structural ? 'text-muted-foreground' : 'text-primary'"
            />
            <div class="flex-1">
              <CardTitle>{{ location.name }}</CardTitle>
              <CardDescription>{{ location.description || 'No description' }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Type Badges -->
          <div class="flex flex-wrap gap-2">
            <Badge v-if="location.structural" variant="outline">
              <Icon name="lucide:folder" class="mr-1 h-3 w-3" />
              Structural Location
            </Badge>
            <Badge v-else variant="default">
              <Icon name="lucide:map-pin" class="mr-1 h-3 w-3" />
              Storage Location
            </Badge>
            <Badge v-if="location.external" variant="secondary">
              <Icon name="lucide:external-link" class="mr-1 h-3 w-3" />
              External
            </Badge>
          </div>

          <!-- Metadata Grid -->
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Parent Location</p>
              <p class="text-sm font-medium">
                {{ location.parentId ? 'Has parent' : 'Root location' }}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Stock Items</p>
              <p class="text-sm font-medium">
                {{ location.stockItemCount || 0 }} items
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Sub-locations</p>
              <p class="text-sm font-medium">
                {{ location.childCount || 0 }} sub-locations
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Created</p>
              <p class="text-sm font-medium">
                {{ formatDate(location.createdAt) }}
              </p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" @click="viewStockItems">
              <Icon name="lucide:boxes" class="mr-2 h-4 w-4" />
              View Stock Items ({{ location.stockItemCount || 0 }})
            </Button>
            <Button variant="outline" size="sm" @click="handleAddChild">
              <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
              Add Sub-location
            </Button>
            <Button variant="outline" size="sm" @click="navigateTo('/stock/locations')">
              <Icon name="lucide:list" class="mr-2 h-4 w-4" />
              View All Locations
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Sub-locations -->
      <Card v-if="(location.childCount || 0) > 0" class="main-content">
        <CardHeader>
          <CardTitle>Sub-locations</CardTitle>
          <CardDescription>
            Child locations under "{{ location.name }}"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockLocationTree
            :root-only="false"
            @select="handleSubLocationSelect"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <Card v-else class="main-content">
      <CardContent class="py-12">
        <div class="flex flex-col items-center justify-center text-center">
          <Icon name="lucide:alert-circle" class="h-12 w-12 text-destructive mb-4" />
          <h3 class="text-lg font-medium mb-2">Location Not Found</h3>
          <p class="text-sm text-muted-foreground mb-4">
            The location you're looking for doesn't exist or has been deleted.
          </p>
          <Button @click="navigateTo('/stock/locations')">
            Back to Locations
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Delete Dialog -->
    <StockLocationDeleteDialog
      v-model:open="deleteDialogOpen"
      :location="location"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import type { StockLocation } from '~/shared/types/stock-location'

const route = useRoute()
const router = useRouter()
const { fetchLocation } = useStock()

const locationId = computed(() => route.params.id as string)

const location = ref<StockLocation | null>(null)
const loading = ref(true)

// Dialog states
const deleteDialogOpen = ref(false)

// Fetch location details
const loadLocation = async () => {
  loading.value = true
  try {
    const response = await fetchLocation(locationId.value)
    location.value = response.data

    // Set page title
    useHead({ title: `${location.value.name} - Stock Locations` })
  } catch (error) {
    console.error('Failed to fetch location:', error)
    location.value = null
  } finally {
    loading.value = false
  }
}

// Actions
const handleEdit = () => {
  navigateTo(`/stock/locations/${locationId.value}/edit`)
}

const handleAddChild = () => {
  navigateTo(`/stock/locations/create?parentId=${locationId.value}`)
}

const handleDelete = () => {
  deleteDialogOpen.value = true
}

const viewStockItems = () => {
  navigateTo(`/stock?locationId=${locationId.value}`)
}

const handleSubLocationSelect = (subLocation: StockLocation) => {
  navigateTo(`/stock/locations/${subLocation.id}`)
}

// Handle successful operations
const handleDeleted = () => {
  navigateTo('/stock/locations')
}

// Utility function
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Load on mount
onMounted(() => {
  loadLocation()
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
})

// Reload when route changes
watch(locationId, () => {
  loadLocation()
})
</script>
