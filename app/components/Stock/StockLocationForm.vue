<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name Field -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Location Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="Enter location name"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          A clear, descriptive name for this location
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
            placeholder="Enter location description"
            rows="3"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          Optional description of this location
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Parent Location Field -->
    <FormField v-slot="{ componentField }" name="parentId">
      <FormItem>
        <FormLabel>Parent Location</FormLabel>
        <FormControl>
          <StockLocationSelect
            v-bind="componentField"
            :exclude-id="excludeId"
            :disabled="loading"
            placeholder="Select parent location (optional)"
          />
        </FormControl>
        <FormDescription>
          Optional parent location for hierarchical organization
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Structural Checkbox -->
    <FormField v-slot="{ componentField }" name="structural">
      <FormItem class="flex items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <FormLabel class="text-base">Structural Location</FormLabel>
          <FormDescription>
            This is an organizational location that cannot hold stock items directly
          </FormDescription>
        </div>
        <FormControl>
          <Checkbox v-bind="componentField" :disabled="loading" />
        </FormControl>
      </FormItem>
    </FormField>

    <!-- External Checkbox -->
    <FormField v-slot="{ componentField }" name="external">
      <FormItem class="flex items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <FormLabel class="text-base">External Location</FormLabel>
          <FormDescription>
            This location is outside the main warehouse or facility
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
  createStockLocationSchema,
  updateStockLocationSchema,
  type CreateStockLocationInput,
  type UpdateStockLocationInput
} from '~/shared/validators/stock-location'
import type { StockLocation } from '~/shared/types/stock-location'

interface Props {
  location?: StockLocation
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [data: CreateStockLocationInput | UpdateStockLocationInput]
  cancel: []
}>()

// Determine if we're editing
const isEditing = computed(() => !!props.location)

// Schema based on mode
const validationSchema = computed(() => {
  return isEditing.value
    ? toTypedSchema(updateStockLocationSchema)
    : toTypedSchema(createStockLocationSchema)
})

// Form setup
const { handleSubmit } = useForm({
  validationSchema: validationSchema.value,
  initialValues: {
    name: props.location?.name || '',
    description: props.location?.description || '',
    parentId: props.location?.parentId || null,
    structural: props.location?.structural || false,
    external: props.location?.external || false
  }
})

// Exclude current location when selecting parent (prevent self-parenting)
const excludeId = computed(() => props.location?.id)

// Submit label
const submitLabel = computed(() => {
  if (props.loading) return 'Saving...'
  return isEditing.value ? 'Update Location' : 'Create Location'
})

// Handle form submission
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>
