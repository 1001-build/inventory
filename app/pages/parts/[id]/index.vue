<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="navigateTo(`/parts/${part?.id}/edit`)">
            <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon name="lucide:more-vertical" class="h-4 w-4" />
                <span class="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="duplicatePart">
                <Icon name="lucide:copy" class="mr-2 h-4 w-4" />
                Duplicate Part
              </DropdownMenuItem>
              <DropdownMenuItem @click="navigateTo(`/stock/create?partId=${partId}`)">
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                Add Stock
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                class="text-destructive focus:text-destructive"
                @click="deleteDialogOpen = true"
              >
                <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                Delete Part
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

    <!-- Part Details -->
    <div v-else-if="part" class="space-y-6">
      <!-- Tabs -->
      <Tabs v-model="currentTab" class="w-full">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <!-- Overview Tab -->
        <TabsContent value="overview" class="space-y-6 mt-6">
          <div class="grid gap-6 lg:grid-cols-2">
            <!-- Part Details -->
            <PartDetailsCard :part="part" class="main-content" />

            <!-- Stock Summary -->
            <PartStockSummary
              :part-id="partId"
              :minimum-stock="part.minimumStock || 0"
              class="main-content"
            />
          </div>

          <!-- Quick Actions -->
          <Card class="main-content">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common operations for this part
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
              <Button variant="outline" @click="navigateTo(`/parts/${partId}/edit`)">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                Edit Part
              </Button>
              <Button variant="outline" @click="navigateTo(`/stock/create?partId=${partId}`)">
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                Add Stock
              </Button>
              <Button variant="outline" @click="navigateTo(`/stock?partId=${partId}`)">
                <Icon name="lucide:boxes" class="mr-2 h-4 w-4" />
                View All Stock
              </Button>
              <Button variant="outline" @click="duplicatePart">
                <Icon name="lucide:copy" class="mr-2 h-4 w-4" />
                Duplicate Part
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Stock Tab -->
        <TabsContent value="stock" class="space-y-6 mt-6">
          <Card class="main-content">
            <CardHeader>
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle>Stock Items</CardTitle>
                  <CardDescription>
                    All stock items for this part
                  </CardDescription>
                </div>
                <Button @click="navigateTo(`/stock/create?partId=${partId}`)">
                  <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                  Add Stock
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Stock items table would go here. Navigate to
                <NuxtLink :to="`/stock?partId=${partId}`" class="text-primary hover:underline">
                  Stock Items page
                </NuxtLink>
                to view and manage stock.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Parameters Tab -->
        <TabsContent value="parameters" class="space-y-6 mt-6">
          <PartParameters :part-id="partId" :editable="true" class="main-content" />
        </TabsContent>

        <!-- History Tab -->
        <TabsContent value="history" class="space-y-6 mt-6">
          <Card class="main-content">
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>
                Audit log and change history for this part
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col items-center justify-center py-12 text-center">
                <Icon name="lucide:history" class="h-12 w-12 text-muted-foreground mb-4" />
                <h3 class="text-lg font-medium mb-2">No History</h3>
                <p class="text-sm text-muted-foreground">
                  Audit logging is not yet implemented
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
          <h3 class="text-lg font-medium mb-2">Part Not Found</h3>
          <p class="text-sm text-muted-foreground mb-4">
            The part you're looking for doesn't exist or has been deleted.
          </p>
          <Button @click="navigateTo('/parts')">
            Back to Parts
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Part</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{{ part?.name }}"? This action cannot be undone and may affect existing stock items.
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import type { Part } from '~/shared/types/part'

const route = useRoute()
const router = useRouter()
const { fetchPart, deletePart } = useParts()
const { showToast } = useShowToast()

const partId = computed(() => route.params.id as string)

const part = ref<Part | null>(null)
const loading = ref(true)
const currentTab = ref('overview')

// Delete dialog
const deleteDialogOpen = ref(false)
const deleting = ref(false)

// Fetch part details
const loadPart = async () => {
  loading.value = true
  try {
    const response = await fetchPart(partId.value)
    part.value = response.data

    // Set page title
    useHead({ title: `${part.value.name} - Parts` })
  } catch (error) {
    console.error('Failed to fetch part:', error)
    part.value = null
  } finally {
    loading.value = false
  }
}

const duplicatePart = () => {
  showToast('Duplicate part functionality coming soon', 'info')
}

const confirmDelete = async () => {
  if (!part.value) return

  deleting.value = true
  try {
    await deletePart(part.value.id)
    deleteDialogOpen.value = false

    // Navigate back to parts list
    await router.push('/parts')
  } catch (error) {
    console.error('Failed to delete part:', error)
  } finally {
    deleting.value = false
  }
}

// Load on mount
onMounted(() => {
  loadPart()
  usePrimaryAnimation({ identifier: '.main-content', stagger: 0.1 })
})

// Reload when route changes
watch(partId, () => {
  loadPart()
})
</script>
