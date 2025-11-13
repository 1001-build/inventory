<template>
  <AlertDialog :open="open" @update:open="$emit('update:open', $event)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Location</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete "{{ location?.name }}"?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <!-- Cascade Option -->
      <div v-if="hasChildren || hasStockItems" class="space-y-4 py-4">
        <Alert variant="warning">
          <Icon name="lucide:alert-triangle" class="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            <span v-if="hasChildren && hasStockItems">
              This location contains {{ childCount }} sub-locations and {{ stockItemCount }} stock items.
            </span>
            <span v-else-if="hasChildren">
              This location contains {{ childCount }} sub-locations.
            </span>
            <span v-else>
              This location contains {{ stockItemCount }} stock items.
            </span>
          </AlertDescription>
        </Alert>

        <div class="flex items-start space-x-2">
          <Checkbox
            id="cascade"
            v-model:checked="cascadeDelete"
            :disabled="deleting"
          />
          <div class="grid gap-1.5 leading-none">
            <label
              for="cascade"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Delete all sub-locations and stock items
            </label>
            <p class="text-sm text-muted-foreground">
              All sub-locations and stock items will be permanently deleted.
            </p>
          </div>
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel :disabled="deleting">Cancel</AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          :disabled="deleting"
          @click="handleDelete"
        >
          <Icon v-if="deleting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          {{ deleting ? 'Deleting...' : 'Delete' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { StockLocation } from '#shared/types/stock-location'

interface Props {
  open: boolean
  location: StockLocation | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  deleted: []
}>()

const stockStore = useStockStore()

const cascadeDelete = ref(false)
const deleting = ref(false)

// Check if location has children or stock items
const hasChildren = computed(() => {
  return (props.location?.childCount ?? 0) > 0
})

const hasStockItems = computed(() => {
  return (props.location?.stockItemCount ?? 0) > 0
})

const childCount = computed(() => props.location?.childCount ?? 0)
const stockItemCount = computed(() => props.location?.stockItemCount ?? 0)

// Handle delete
const handleDelete = async () => {
  if (!props.location) return

  deleting.value = true
  try {
    await stockStore.deleteLocation(props.location.id, cascadeDelete.value)
    emit('deleted')
    emit('update:open', false)
  } catch (error) {
    console.error('Failed to delete location:', error)
  } finally {
    deleting.value = false
  }
}

// Reset cascade when dialog opens/closes
watch(() => props.open, (isOpen) => {
  if (!isOpen) {
    cascadeDelete.value = false
  }
})
</script>
