<template>
  <div class="relative">
    <div
      class="group flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer"
      :class="{
        'bg-accent': isSelected,
        'font-medium': isSelected
      }"
      @click="handleClick"
    >
      <!-- Expand/Collapse Button -->
      <button
        v-if="hasChildren"
        type="button"
        class="flex items-center justify-center w-4 h-4 hover:bg-accent-foreground/10 rounded transition-all"
        @click.stop="toggleExpand"
      >
        <Icon
          name="lucide:chevron-right"
          class="h-3 w-3 transition-transform"
          :class="{ 'rotate-90': isExpanded }"
        />
      </button>
      <div v-else class="w-4" />

      <!-- Folder Icon -->
      <Icon
        :name="isExpanded ? 'lucide:folder-open' : 'lucide:folder'"
        class="h-4 w-4 text-muted-foreground flex-shrink-0"
      />

      <!-- Category Name -->
      <span class="flex-1 truncate text-sm">{{ category.name }}</span>

      <!-- Part Count Badge -->
      <Badge v-if="category.partCount > 0" variant="secondary" class="text-xs">
        {{ category.partCount }}
      </Badge>
    </div>

    <!-- Children -->
    <Collapsible v-if="hasChildren" v-model:open="isExpanded">
      <CollapsibleContent class="pl-4 pt-1 space-y-1">
        <PartCategoryTreeNode
          v-for="child in category.children"
          :key="child.id"
          :category="child"
          :selected-id="selectedId"
          :selectable="selectable"
          @select="$emit('select', $event)"
          @expand="$emit('expand', $event)"
          @collapse="$emit('collapse', $event)"
        />
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import type { PartCategory } from '~/shared/types/part-category'

interface Props {
  category: PartCategory & { children?: PartCategory[] }
  selectedId?: string
  selectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: true
})

const emit = defineEmits<{
  select: [category: PartCategory]
  expand: [categoryId: string]
  collapse: [categoryId: string]
}>()

const isExpanded = ref(false)

const hasChildren = computed(() => {
  return props.category.children && props.category.children.length > 0
})

const isSelected = computed(() => {
  return props.selectable && props.selectedId === props.category.id
})

const handleClick = () => {
  if (props.selectable) {
    emit('select', props.category)
  }
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value

  if (isExpanded.value) {
    emit('expand', props.category.id)
  } else {
    emit('collapse', props.category.id)
  }
}
</script>
