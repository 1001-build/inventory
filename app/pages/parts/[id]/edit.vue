<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <!-- Right side slot empty -->
      </template>
    </AppPageHeader>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto">
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
    <div v-else-if="part" class="max-w-4xl mx-auto">
      <Card class="main-content">
        <CardHeader>
          <CardTitle>Edit Part: {{ part.name }}</CardTitle>
          <CardDescription>
            Update the details of this part
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartsForm
            :part="part"
            mode="edit"
            :loading="updating"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-4xl mx-auto">
      <Card class="main-content">
        <CardContent class="py-12">
          <div class="flex flex-col items-center justify-center text-center">
            <Icon name="lucide:alert-circle" class="h-12 w-12 text-destructive mb-4" />
            <h3 class="text-lg font-medium mb-2">Part Not Found</h3>
            <p class="text-sm text-muted-foreground mb-4">
              The part you're trying to edit doesn't exist or has been deleted.
            </p>
            <Button @click="navigateTo('/parts')">
              Back to Parts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Part } from '#shared/types/part'
import type { UpdatePartInput } from '#shared/validators/part'

const route = useRoute()
const router = useRouter()
const { fetchPart, updatePart } = useParts()

const partId = computed(() => route.params.id as string)

const part = ref<Part | null>(null)
const loading = ref(true)
const updating = ref(false)

// Fetch part details
const loadPart = async () => {
  loading.value = true
  try {
    const response = await fetchPart(partId.value)
    part.value = response.data

    // Set page title
    useHead({ title: `Edit ${part.value.name} - Parts` })
  } catch (error) {
    console.error('Failed to fetch part:', error)
    part.value = null
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (data: UpdatePartInput) => {
  updating.value = true
  try {
    await updatePart(partId.value, data)

    // Navigate back to part detail page
    await router.push(`/parts/${partId.value}`)
  } catch (error) {
    console.error('Failed to update part:', error)
  } finally {
    updating.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  loadPart()
  usePrimaryAnimation({ identifier: '.main-content' })
})
</script>
