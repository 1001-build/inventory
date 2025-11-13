<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Move Category</DialogTitle>
        <DialogDescription>
          Select a new parent category for "{{ category?.name }}"
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 py-4">
        <!-- New Parent Selection -->
        <div class="space-y-2">
          <Label>New Parent Category</Label>
          <PartsCategorySelect
            v-model="newParentId"
            :exclude-id="category?.id"
            :disabled="moving"
            placeholder="Select new parent (or none for root)"
          />
          <p class="text-sm text-muted-foreground">
            Select a parent category or leave empty to move to root level
          </p>
        </div>

        <!-- Current Info -->
        <div class="rounded-lg bg-muted p-4">
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:info" class="h-4 w-4 text-muted-foreground" />
            <div>
              <p class="font-medium">Current parent:</p>
              <p class="text-muted-foreground">
                {{ category?.parent?.name || 'Root level' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          :disabled="moving"
          @click="$emit('update:open', false)"
        >
          Cancel
        </Button>
        <Button
          :disabled="moving"
          @click="handleMove"
        >
          <Icon v-if="moving" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          {{ moving ? 'Moving...' : 'Move Category' }}
        </Button>
      </DialogFooter>
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
import type { PartCategory } from '#shared/types/part-category'

interface Props {
  open: boolean
  category: PartCategory | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  moved: []
}>()

const partsStore = usePartsStore()

const newParentId = ref<string | null>(null)
const moving = ref(false)

// Handle move
const handleMove = async () => {
  if (!props.category) return

  moving.value = true
  try {
    await partsStore.moveCategory(props.category.id, newParentId.value)
    emit('moved')
    emit('update:open', false)
  } catch (error) {
    console.error('Failed to move category:', error)
  } finally {
    moving.value = false
  }
}

// Reset form when dialog opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    newParentId.value = props.category?.parentId || null
  } else {
    newParentId.value = null
  }
})
</script>
