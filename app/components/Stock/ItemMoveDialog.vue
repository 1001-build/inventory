<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Move Stock Item</DialogTitle>
        <DialogDescription>
          Change the storage location for this stock item
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleMove" class="space-y-4">
        <!-- Current Location Info -->
        <div v-if="stockItem?.location" class="rounded-lg border bg-muted/50 p-3">
          <p class="text-sm text-muted-foreground mb-1">Current Location:</p>
          <div class="flex items-center gap-2">
            <Icon name="lucide:map-pin" class="h-4 w-4" />
            <span class="text-sm font-medium">{{ stockItem.location.name }}</span>
          </div>
        </div>

        <!-- New Location Select -->
        <FormField v-slot="{ componentField }" name="newLocationId">
          <FormItem>
            <FormLabel>New Location</FormLabel>
            <FormControl>
              <StockLocationSelect
                v-bind="componentField"
                v-model="newLocationId"
                :disabled="moving"
                placeholder="Select new location"
              />
            </FormControl>
            <FormDescription>
              Choose where to move this stock item
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
                v-model="notes"
                placeholder="Reason for move..."
                rows="3"
                :disabled="moving"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            :disabled="moving"
            @click="$emit('update:open', false)"
          >
            Cancel
          </Button>
          <Button type="submit" :disabled="moving || !hasChanged">
            <Icon v-if="moving" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ moving ? 'Moving...' : 'Move Stock' }}
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
import type { StockItem } from '#shared/types/stock-item'

interface Props {
  open: boolean
  stockItem: StockItem | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  moved: []
}>()

const { moveStockItem } = useStock()

const newLocationId = ref<string>('')
const notes = ref('')
const moving = ref(false)

// Check if location has changed
const hasChanged = computed(() => {
  const current = props.stockItem?.locationId || ''
  return newLocationId.value !== '' && newLocationId.value !== current
})

// Handle move
const handleMove = async () => {
  if (!props.stockItem || !hasChanged.value) return

  moving.value = true
  try {
    await moveStockItem(props.stockItem.id, newLocationId.value)
    emit('moved')
    emit('update:open', false)
  } catch (error) {
    console.error('Failed to move stock item:', error)
  } finally {
    moving.value = false
  }
}

// Reset when dialog opens
watch(() => props.open, (isOpen) => {
  if (isOpen && props.stockItem) {
    newLocationId.value = props.stockItem.locationId || ''
    notes.value = ''
  }
})
</script>
