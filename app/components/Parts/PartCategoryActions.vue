<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" :disabled="disabled">
        <Icon name="lucide:more-vertical" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-48">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <!-- View -->
      <DropdownMenuItem @click="$emit('view')">
        <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
        View Details
      </DropdownMenuItem>

      <!-- Edit -->
      <DropdownMenuItem @click="$emit('edit')">
        <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
        Edit Category
      </DropdownMenuItem>

      <!-- Move -->
      <DropdownMenuItem @click="$emit('move')">
        <Icon name="lucide:move" class="mr-2 h-4 w-4" />
        Move Category
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <!-- Delete -->
      <DropdownMenuItem
        class="text-destructive focus:text-destructive"
        @click="$emit('delete')"
      >
        <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
        Delete Category
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})

defineEmits<{
  view: []
  edit: []
  move: []
  delete: []
}>()
</script>
