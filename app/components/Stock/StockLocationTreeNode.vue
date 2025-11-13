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

      <!-- Location Icon -->
      <Icon
        :name="getLocationIcon()"
        class="h-4 w-4 flex-shrink-0"
        :class="location.structural ? 'text-muted-foreground' : 'text-primary'"
      />

      <!-- Location Name -->
      <span class="flex-1 truncate text-sm">{{ location.name }}</span>

      <!-- Badges -->
      <div class="flex items-center gap-1">
        <Badge v-if="location.external" variant="outline" class="text-xs">
          <Icon name="lucide:external-link" class="mr-1 h-3 w-3" />
          External
        </Badge>
        <Badge v-if="location.stockItemCount > 0" variant="secondary" class="text-xs">
          {{ location.stockItemCount }}
        </Badge>
      </div>
    </div>

    <!-- Children -->
    <Collapsible v-if="hasChildren" v-model:open="isExpanded">
      <CollapsibleContent class="pl-4 pt-1 space-y-1">
        <StockLocationTreeNode
          v-for="child in location.children"
          :key="child.id"
          :location="child"
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
import type { StockLocation } from '~/shared/types/stock-location'

interface Props {
  location: StockLocation & { children?: StockLocation[] }
  selectedId?: string
  selectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: true
})

const emit = defineEmits<{
  select: [location: StockLocation]
  expand: [locationId: string]
  collapse: [locationId: string]
}>()

const isExpanded = ref(false)

const hasChildren = computed(() => {
  return props.location.children && props.location.children.length > 0
})

const isSelected = computed(() => {
  return props.selectable && props.selectedId === props.location.id
})

const getLocationIcon = () => {
  if (props.location.structural) {
    return hasChildren.value && isExpanded.value
      ? 'lucide:folder-open'
      : 'lucide:folder'
  }
  return 'lucide:map-pin'
}

const handleClick = () => {
  if (props.selectable) {
    emit('select', props.location)
  }
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value

  if (isExpanded.value) {
    emit('expand', props.location.id)
  } else {
    emit('collapse', props.location.id)
  }
}
</script>
