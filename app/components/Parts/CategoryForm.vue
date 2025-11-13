<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Name Field -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Category Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="Enter category name"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          A clear, descriptive name for this category
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Description Field -->
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="Enter category description"
            rows="3"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          Optional description of this category
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Parent Category Field -->
    <FormField v-slot="{ componentField }" name="parentId">
      <FormItem>
        <FormLabel>Parent Category</FormLabel>
        <FormControl>
          <PartsCategorySelect
            v-bind="componentField"
            :exclude-id="excludeId"
            :disabled="loading"
            placeholder="Select parent category (optional)"
          />
        </FormControl>
        <FormDescription>
          Optional parent category for hierarchical organization
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Structural Checkbox -->
    <FormField v-slot="{ componentField }" name="structural">
      <FormItem class="flex items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <FormLabel class="text-base">Structural Category</FormLabel>
          <FormDescription>
            This is an organizational category - parts cannot be directly assigned to it
          </FormDescription>
        </div>
        <FormControl>
          <Checkbox v-bind="componentField" :disabled="loading" />
        </FormControl>
      </FormItem>
    </FormField>

    <!-- Form Actions -->
    <div class="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        :disabled="loading"
        @click="$emit('cancel')"
      >
        Cancel
      </Button>
      <Button type="submit" :disabled="loading">
        <Icon v-if="loading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
        {{ submitLabel }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  createPartCategorySchema,
  updatePartCategorySchema,
  type CreatePartCategoryInput,
  type UpdatePartCategoryInput
} from '#shared/validators/part-category'
import type { PartCategory } from '#shared/types/part-category'

interface Props {
  category?: PartCategory
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [data: CreatePartCategoryInput | UpdatePartCategoryInput]
  cancel: []
}>()

// Determine if we're editing
const isEditing = computed(() => !!props.category)

// Schema based on mode
const validationSchema = computed(() => {
  return isEditing.value
    ? toTypedSchema(updatePartCategorySchema)
    : toTypedSchema(createPartCategorySchema)
})

// Form setup
const { handleSubmit } = useForm({
  validationSchema: validationSchema.value,
  initialValues: {
    name: props.category?.name || '',
    description: props.category?.description || '',
    parentId: props.category?.parentId || null,
    structural: props.category?.structural || false
  }
})

// Exclude current category when selecting parent (prevent self-parenting)
const excludeId = computed(() => props.category?.id)

// Submit label
const submitLabel = computed(() => {
  if (props.loading) return 'Saving...'
  return isEditing.value ? 'Update Category' : 'Create Category'
})

// Handle form submission
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>
