<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Part Selection -->
    <FormField v-slot="{ componentField }" name="partId">
      <FormItem>
        <FormLabel>Part</FormLabel>
        <FormControl>
          <PartCategorySelect
            v-bind="componentField"
            :disabled="loading || isEditing"
            placeholder="Select a part"
          />
        </FormControl>
        <FormDescription>
          {{ isEditing ? 'Part cannot be changed after creation' : 'Select the part for this stock item' }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Location Selection -->
    <FormField v-slot="{ componentField }" name="locationId">
      <FormItem>
        <FormLabel>Location</FormLabel>
        <FormControl>
          <StockLocationSelect
            v-bind="componentField"
            :disabled="loading"
            placeholder="Select a location"
          />
        </FormControl>
        <FormDescription>
          Storage location for this stock item
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Quantity -->
    <FormField v-slot="{ componentField }" name="quantity">
      <FormItem>
        <FormLabel>Quantity</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="number"
            min="1"
            placeholder="e.g., 100"
            :disabled="loading || isEditing"
            @input="handleQuantityChange"
          />
        </FormControl>
        <FormDescription>
          {{ isEditing ? 'Use adjust quantity to change amount' : 'Number of units in stock' }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Batch -->
    <FormField v-slot="{ componentField }" name="batch">
      <FormItem>
        <FormLabel>Batch Number (Optional)</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="e.g., BATCH-2024-001"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          Batch or lot number for tracking
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Serial Number -->
    <FormField v-slot="{ componentField }" name="serial">
      <FormItem>
        <FormLabel>Serial Number (Optional)</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="e.g., SN-123456"
            :disabled="loading || serialDisabled || isEditing"
          />
        </FormControl>
        <FormDescription>
          {{ isEditing ? 'Serial cannot be changed after creation' : serialDisabled ? 'Serial numbers require quantity = 1' : 'Unique serial number (quantity must be 1)' }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Status -->
    <FormField v-slot="{ componentField }" name="status">
      <FormItem>
        <FormLabel>Status</FormLabel>
        <FormControl>
          <StockItemStatusSelect
            v-bind="componentField"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          Current condition of the stock
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Expiry Date -->
    <FormField v-slot="{ componentField }" name="expiryDate">
      <FormItem>
        <FormLabel>Expiry Date (Optional)</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="date"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          When this stock expires
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Purchase Price -->
    <FormField v-slot="{ componentField }" name="purchasePrice">
      <FormItem>
        <FormLabel>Purchase Price (Optional)</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            :disabled="loading"
          />
        </FormControl>
        <FormDescription>
          Cost per unit in your currency
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
          Any additional information about this stock
        </FormDescription>
        <FormMessage />
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
  createStockItemSchema,
  updateStockItemSchema,
  type CreateStockItemInput,
  type UpdateStockItemInput
} from '#shared/validators/stock-item'
import type { StockItem } from '#shared/types/stock-item'

interface Props {
  stockItem?: StockItem
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [data: CreateStockItemInput | UpdateStockItemInput]
  cancel: []
}>()

const route = useRoute()

// Determine if we're editing
const isEditing = computed(() => !!props.stockItem)

// Schema based on mode
const validationSchema = computed(() => {
  return isEditing.value
    ? toTypedSchema(updateStockItemSchema)
    : toTypedSchema(createStockItemSchema)
})

// Form setup
const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: validationSchema.value,
  initialValues: {
    partId: props.stockItem?.partId || route.query.partId as string || '',
    locationId: props.stockItem?.locationId || route.query.locationId as string || '',
    quantity: props.stockItem?.quantity || 1,
    batch: props.stockItem?.batch || '',
    serial: props.stockItem?.serial || '',
    status: props.stockItem?.status || 'OK',
    expiryDate: props.stockItem?.expiryDate || null,
    purchasePrice: props.stockItem?.purchasePrice || null,
    notes: props.stockItem?.notes || ''
  }
})

// Disable serial if quantity > 1
const serialDisabled = computed(() => {
  return values.quantity > 1
})

// Watch quantity and clear serial if needed
const handleQuantityChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const qty = parseInt(target.value)

  if (qty > 1 && values.serial) {
    setFieldValue('serial', '')
  }
}

// Submit label
const submitLabel = computed(() => {
  if (props.loading) return 'Saving...'
  return isEditing.value ? 'Update Stock' : 'Add Stock'
})

// Handle form submission
const onSubmit = handleSubmit((formValues) => {
  emit('submit', formValues)
})
</script>
