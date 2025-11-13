<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Adjust Stock Quantity</DialogTitle>
        <DialogDescription>
          Add or remove units from this stock item
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleAdjust" class="space-y-4">
        <!-- Current Quantity Display -->
        <div class="rounded-lg border bg-muted/50 p-4 text-center">
          <p class="text-sm text-muted-foreground mb-2">Current Quantity</p>
          <p class="text-3xl font-bold font-mono">{{ stockItem?.quantity || 0 }}</p>
        </div>

        <!-- Adjustment Input -->
        <FormField v-slot="{ componentField }" name="adjustment">
          <FormItem>
            <FormLabel>Adjustment</FormLabel>
            <FormControl>
              <div class="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  :disabled="adjusting"
                  @click="decrementAdjustment"
                >
                  <Icon name="lucide:minus" class="h-4 w-4" />
                </Button>
                <Input
                  v-bind="componentField"
                  v-model.number="adjustment"
                  type="number"
                  class="text-center font-mono"
                  :disabled="adjusting"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  :disabled="adjusting"
                  @click="incrementAdjustment"
                >
                  <Icon name="lucide:plus" class="h-4 w-4" />
                </Button>
              </div>
            </FormControl>
            <FormDescription>
              Enter a positive number to add, or negative to remove
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- New Quantity Preview -->
        <div class="rounded-lg border p-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">New Quantity:</span>
            <span
              class="text-lg font-bold font-mono"
              :class="{
                'text-green-600': adjustment > 0,
                'text-red-600': adjustment < 0 && newQuantity >= 0,
                'text-destructive': newQuantity < 0
              }"
            >
              {{ newQuantity }}
            </span>
          </div>
          <Alert v-if="newQuantity < 0" variant="destructive" class="mt-2">
            <Icon name="lucide:alert-triangle" class="h-4 w-4" />
            <AlertDescription>
              Quantity cannot be negative
            </AlertDescription>
          </Alert>
        </div>

        <!-- Reason/Notes -->
        <FormField v-slot="{ componentField }" name="reason">
          <FormItem>
            <FormLabel>Reason</FormLabel>
            <FormControl>
              <Textarea
                v-bind="componentField"
                v-model="reason"
                placeholder="Reason for adjustment..."
                rows="3"
                :disabled="adjusting"
              />
            </FormControl>
            <FormDescription>
              Explain why this adjustment is being made
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            :disabled="adjusting"
            @click="$emit('update:open', false)"
          >
            Cancel
          </Button>
          <Button type="submit" :disabled="adjusting || adjustment === 0 || newQuantity < 0">
            <Icon v-if="adjusting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ adjusting ? 'Adjusting...' : 'Adjust Quantity' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { StockItem } from '#shared/types/stock-item'

interface Props {
  open: boolean
  stockItem: StockItem | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  adjusted: []
}>()

const stockStore = useStockStore()

const adjustment = ref(0)
const reason = ref('')
const adjusting = ref(false)

// Computed new quantity
const newQuantity = computed(() => {
  const current = props.stockItem?.quantity || 0
  return current + adjustment.value
})

// Increment/decrement helpers
const incrementAdjustment = () => {
  adjustment.value++
}

const decrementAdjustment = () => {
  adjustment.value--
}

// Handle adjustment
const handleAdjust = async () => {
  if (!props.stockItem || adjustment.value === 0 || newQuantity.value < 0) return

  adjusting.value = true
  try {
    await stockStore.adjustQuantity(props.stockItem.id, adjustment.value)
    emit('adjusted')
    emit('update:open', false)
  } catch (error) {
    console.error('Failed to adjust quantity:', error)
  } finally {
    adjusting.value = false
  }
}

// Reset when dialog opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    adjustment.value = 0
    reason.value = ''
  }
})
</script>
