<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Basic Information Section -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Basic Information</h3>

      <!-- Name Field -->
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Part Name</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="Enter part name"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            A clear, descriptive name for this part
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Category Selection -->
      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <PartsCategorySelect
              v-bind="componentField"
              :disabled="loading"
              placeholder="Select a category"
            />
          </FormControl>
          <FormDescription>
            Category for organizing parts
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- IPN (Internal Part Number) -->
      <FormField v-slot="{ componentField }" name="IPN">
        <FormItem>
          <FormLabel>Internal Part Number (Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="e.g., IPN-2024-001"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Internal part number for identification
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Description -->
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description (Optional)</FormLabel>
          <FormControl>
            <Textarea
              v-bind="componentField"
              placeholder="Enter part description"
              rows="3"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Detailed description of the part
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Attributes Section -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Attributes</h3>

      <!-- Active Status -->
      <FormField v-slot="{ componentField }" name="active">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Active</FormLabel>
            <FormDescription>
              Part is active and available for use
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Assembly -->
      <FormField v-slot="{ componentField }" name="assembly">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Assembly</FormLabel>
            <FormDescription>
              This part is made up of other parts
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Component -->
      <FormField v-slot="{ componentField }" name="component">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Component</FormLabel>
            <FormDescription>
              This part is used in assemblies
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Trackable -->
      <FormField v-slot="{ componentField }" name="trackable">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Trackable</FormLabel>
            <FormDescription>
              Track individual instances via serial numbers
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Purchaseable -->
      <FormField v-slot="{ componentField }" name="purchaseable">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Purchaseable</FormLabel>
            <FormDescription>
              This part can be purchased from suppliers
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Salable -->
      <FormField v-slot="{ componentField }" name="salable">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Salable</FormLabel>
            <FormDescription>
              This part can be sold to customers
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Virtual -->
      <FormField v-slot="{ componentField }" name="virtual">
        <FormItem class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">Virtual</FormLabel>
            <FormDescription>
              This is a virtual part (no physical stock)
            </FormDescription>
          </div>
          <FormControl>
            <Checkbox v-bind="componentField" :disabled="loading" />
          </FormControl>
        </FormItem>
      </FormField>
    </div>

    <!-- Stock Settings Section -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Stock Settings</h3>

      <!-- Default Location -->
      <FormField v-slot="{ componentField }" name="defaultLocationId">
        <FormItem>
          <FormLabel>Default Location (Optional)</FormLabel>
          <FormControl>
            <StockLocationSelect
              v-bind="componentField"
              :disabled="loading"
              placeholder="Select default location"
            />
          </FormControl>
          <FormDescription>
            Default storage location for this part
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Minimum Stock -->
      <FormField v-slot="{ componentField }" name="minimumStock">
        <FormItem>
          <FormLabel>Minimum Stock</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="number"
              min="0"
              placeholder="0"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Minimum stock level before warning
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Default Expiry -->
      <FormField v-slot="{ componentField }" name="defaultExpiry">
        <FormItem>
          <FormLabel>Default Expiry (Days, Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="number"
              min="1"
              placeholder="e.g., 365"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Default number of days until expiry
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Units -->
      <FormField v-slot="{ componentField }" name="units">
        <FormItem>
          <FormLabel>Units (Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="e.g., pcs, kg, liters"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Unit of measurement for this part
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Additional Information Section -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Additional Information</h3>

      <!-- Revision -->
      <FormField v-slot="{ componentField }" name="revision">
        <FormItem>
          <FormLabel>Revision (Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="e.g., Rev A"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Revision or version identifier
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Keywords -->
      <FormField v-slot="{ componentField }" name="keywords">
        <FormItem>
          <FormLabel>Keywords (Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="e.g., resistor, electronic, component"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Keywords for search (comma-separated)
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Link -->
      <FormField v-slot="{ componentField }" name="link">
        <FormItem>
          <FormLabel>External Link (Optional)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://example.com/datasheet"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Link to datasheet or external resource
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Notes -->
      <FormField v-slot="{ componentField }" name="notes">
        <FormItem>
          <FormLabel>Notes (Optional)</FormLabel>
          <FormControl>
            <Textarea
              v-bind="componentField"
              placeholder="Additional notes..."
              rows="3"
              :disabled="loading"
            />
          </FormControl>
          <FormDescription>
            Any additional notes about this part
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

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
  createPartSchema,
  updatePartSchema,
  type CreatePartInput,
  type UpdatePartInput
} from '#shared/validators/part'
import type { Part } from '#shared/types/part'

interface Props {
  part?: Part
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [data: CreatePartInput | UpdatePartInput]
  cancel: []
}>()

// Determine if we're editing
const isEditing = computed(() => !!props.part)

// Schema based on mode
const validationSchema = computed(() => {
  return isEditing.value
    ? toTypedSchema(updatePartSchema)
    : toTypedSchema(createPartSchema)
})

// Form setup
const { handleSubmit } = useForm({
  validationSchema: validationSchema.value,
  initialValues: {
    name: props.part?.name || '',
    description: props.part?.description || '',
    categoryId: props.part?.categoryId || '',
    IPN: props.part?.IPN || '',
    revision: props.part?.revision || '',
    keywords: props.part?.keywords || '',
    active: props.part?.active ?? true,
    virtual: props.part?.virtual ?? false,
    template: props.part?.template ?? false,
    assembly: props.part?.assembly ?? false,
    component: props.part?.component ?? false,
    trackable: props.part?.trackable ?? false,
    purchaseable: props.part?.purchaseable ?? false,
    salable: props.part?.salable ?? false,
    testable: props.part?.testable ?? false,
    locked: props.part?.locked ?? false,
    defaultLocationId: props.part?.defaultLocationId || null,
    minimumStock: props.part?.minimumStock ?? 0,
    defaultExpiry: props.part?.defaultExpiry || null,
    units: props.part?.units || '',
    notes: props.part?.notes || '',
    link: props.part?.link || '',
    imageId: props.part?.imageId || null,
    metadata: props.part?.metadata || null
  }
})

// Submit label
const submitLabel = computed(() => {
  if (props.loading) return 'Saving...'
  return isEditing.value ? 'Update Part' : 'Create Part'
})

// Handle form submission
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>
