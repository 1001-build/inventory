<template>
  <AlertDialog :open="open" @update:open="$emit('update:open', $event)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Category</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete "{{ category?.name }}"?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <!-- Cascade Option -->
      <div v-if="hasChildren || hasParts" class="space-y-4 py-4">
        <Alert variant="warning">
          <Icon name="lucide:alert-triangle" class="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            <span v-if="hasChildren && hasParts">
              This category contains {{ childCount }} sub-categories and {{ partCount }} parts.
            </span>
            <span v-else-if="hasChildren">
              This category contains {{ childCount }} sub-categories.
            </span>
            <span v-else>
              This category contains {{ partCount }} parts.
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
              Delete all sub-categories and parts
            </label>
            <p class="text-sm text-muted-foreground">
              All sub-categories and parts will be permanently deleted.
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
import type { PartCategory } from '#shared/types/part-category'

interface Props {
  open: boolean
  category: PartCategory | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  deleted: []
}>()

const partsStore = usePartsStore()

const cascadeDelete = ref(false)
const deleting = ref(false)

// Check if category has children or parts
const hasChildren = computed(() => {
  return (props.category?.childCount ?? 0) > 0
})

const hasParts = computed(() => {
  return (props.category?.partCount ?? 0) > 0
})

const childCount = computed(() => props.category?.childCount ?? 0)
const partCount = computed(() => props.category?.partCount ?? 0)

// Handle delete
const handleDelete = async () => {
  if (!props.category) return

  deleting.value = true
  try {
    await partsStore.deleteCategory(props.category.id, cascadeDelete.value)
    emit('deleted')
    emit('update:open', false)
  } catch (error) {
    console.error('Failed to delete category:', error)
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
