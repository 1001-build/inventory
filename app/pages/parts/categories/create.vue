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
          <CardTitle>Create Part Category</CardTitle>
          <CardDescription>
            Add a new category to organize your parts inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartCategoryForm
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
import type { CreatePartCategoryInput } from '~/shared/validators/part-category'

useHead({ title: 'Create Part Category' })

const { createCategory } = useParts()
const router = useRouter()

const creating = ref(false)

const handleSubmit = async (data: CreatePartCategoryInput) => {
  creating.value = true
  try {
    const response = await createCategory(data)

    // Navigate to the new category detail page
    await router.push(`/parts/categories/${response.data.id}`)
  } catch (error) {
    console.error('Failed to create category:', error)
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
