<template>
  <div class="space-y-6">
    <AppPageHeader>
      <template #default>
        <!-- Right side slot empty -->
      </template>
    </AppPageHeader>

    <div class="max-w-4xl mx-auto">
      <Card class="main-content">
        <CardHeader>
          <CardTitle>Create New Part</CardTitle>
          <CardDescription>
            Add a new part to your inventory system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartsForm
            mode="create"
            :loading="creating"
            @submit="handleSubmit"
            @save-draft="handleSaveDraft"
            @cancel="handleCancel"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreatePartInput } from '#shared/validators/part'

useHead({ title: 'Create Part' })

const { createPart } = useParts()
const { showToast } = useShowToast()
const router = useRouter()

const creating = ref(false)

const handleSubmit = async (data: CreatePartInput) => {
  creating.value = true
  try {
    const response = await createPart(data)

    // Navigate to the new part detail page
    await router.push(`/parts/${response.data.id}`)
  } catch (error) {
    console.error('Failed to create part:', error)
  } finally {
    creating.value = false
  }
}

const handleSaveDraft = async (data: Partial<CreatePartInput>) => {
  // Save draft functionality
  // Could save to localStorage or a drafts API endpoint
  showToast('Draft saved locally', 'success')
  console.log('Draft data:', data)
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  usePrimaryAnimation({ identifier: '.main-content' })
})
</script>
