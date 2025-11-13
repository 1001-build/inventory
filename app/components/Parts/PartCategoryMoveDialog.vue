<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Move Category</DialogTitle>
        <DialogDescription>
          Select a new parent category for "{{ category?.name }}"
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleMove" class="space-y-4">
        <!-- Current Parent Info -->
        <div v-if="category?.parentId" class="rounded-lg border bg-muted/50 p-3">
          <p class="text-sm text-muted-foreground mb-1">Current Parent:</p>
          <div class="flex items-center gap-2">
            <Icon name="lucide:folder" class="h-4 w-4" />
            <span class="text-sm font-medium">{{ currentParentName }}</span>
          </div>
        </div>
        <div v-else class="rounded-lg border bg-muted/50 p-3">
          <p class="text-sm text-muted-foreground">
            Currently a root category (no parent)
          </p>
        </div>

        <!-- New Parent Select -->
        <FormField v-slot="{ componentField }" name="newParentId">
          <FormItem>
            <FormLabel>New Parent Category</FormLabel>
            <FormControl>
              <PartCategorySelect
                v-bind="componentField"
                v-model="newParentId"
                :exclude-id="category?.id"
                :disabled="moving"
                placeholder="Select new parent category"
              />
            </FormControl>
            <FormDescription>
              Choose a new parent or select "No parent category" to make it a root category
            </FormDescription>
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
            {{ moving ? 'Moving...' : 'Move Category' }}
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
import type { PartCategory } from '~/shared/types/part-category'

interface Props {
  open: boolean
  category: PartCategory | null
  currentParentName?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentParentName: 'Unknown'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  moved: []
}>()

const { moveCategory } = useParts()

const newParentId = ref<string | null>(null)
const moving = ref(false)

// Check if parent has changed
const hasChanged = computed(() => {
  const current = props.category?.parentId ?? null
  return newParentId.value !== current
})

// Handle move
const handleMove = async () => {
  if (!props.category || !hasChanged.value) return

  moving.value = true
  try {
    await moveCategory(props.category.id, newParentId.value)
    emit('moved')
    emit('update:open', false)
  } catch (error) {
    console.error('Failed to move category:', error)
  } finally {
    moving.value = false
  }
}

// Reset when dialog opens
watch(() => props.open, (isOpen) => {
  if (isOpen && props.category) {
    newParentId.value = props.category.parentId ?? null
  }
})
</script>
