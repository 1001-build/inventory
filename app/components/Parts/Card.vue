<template>
  <Card class="group hover:shadow-md transition-all cursor-pointer" @click="navigateTo(`/parts/${part.id}`)">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <CardTitle class="text-base truncate">{{ part.name }}</CardTitle>
          <CardDescription class="truncate">
            <code v-if="part.IPN" class="text-xs">{{ part.IPN }}</code>
            <span v-else class="text-xs text-muted-foreground">No IPN</span>
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild @click.stop>
            <Button variant="ghost" size="icon" class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="lucide:more-vertical" class="h-4 w-4" />
              <span class="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click.stop="navigateTo(`/parts/${part.id}`)">
              <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem @click.stop="navigateTo(`/parts/${part.id}/edit`)">
              <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
              Edit Part
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="text-destructive focus:text-destructive"
              @click.stop="$emit('delete', part)"
            >
              <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
              Delete Part
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Description -->
      <div v-if="part.description" class="text-sm text-muted-foreground line-clamp-2">
        {{ part.description }}
      </div>

      <!-- Category -->
      <div class="flex items-center gap-2">
        <Icon name="lucide:folder" class="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span class="text-sm truncate">{{ part.category?.name || 'No category' }}</span>
      </div>

      <!-- Status -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-muted-foreground">Status</span>
        <Badge :variant="part.active ? 'default' : 'secondary'">
          {{ part.active ? 'Active' : 'Inactive' }}
        </Badge>
      </div>

      <!-- Attributes -->
      <div v-if="hasAttributes" class="space-y-2 pt-2 border-t">
        <span class="text-xs text-muted-foreground">Attributes</span>
        <div class="flex flex-wrap gap-1">
          <Badge v-if="part.assembly" variant="outline" class="text-xs">
            <Icon name="lucide:boxes" class="mr-1 h-2 w-2" />
            Assembly
          </Badge>
          <Badge v-if="part.component" variant="outline" class="text-xs">
            <Icon name="lucide:puzzle" class="mr-1 h-2 w-2" />
            Component
          </Badge>
          <Badge v-if="part.trackable" variant="outline" class="text-xs">
            <Icon name="lucide:tag" class="mr-1 h-2 w-2" />
            Trackable
          </Badge>
          <Badge v-if="part.purchaseable" variant="outline" class="text-xs">
            <Icon name="lucide:shopping-cart" class="mr-1 h-2 w-2" />
            Purchaseable
          </Badge>
          <Badge v-if="part.salable" variant="outline" class="text-xs">
            <Icon name="lucide:dollar-sign" class="mr-1 h-2 w-2" />
            Salable
          </Badge>
          <Badge v-if="part.virtual" variant="outline" class="text-xs">
            <Icon name="lucide:ghost" class="mr-1 h-2 w-2" />
            Virtual
          </Badge>
        </div>
      </div>

      <!-- Stock Info -->
      <div v-if="part.minimumStock && part.minimumStock > 0" class="pt-2 border-t">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Min. Stock</span>
          <span class="text-sm font-medium">{{ part.minimumStock }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { Part } from '#shared/types/part'

interface Props {
  part: Part
}

const props = defineProps<Props>()

defineEmits<{
  delete: [part: Part]
}>()

const hasAttributes = computed(() => {
  return props.part.assembly ||
         props.part.component ||
         props.part.trackable ||
         props.part.purchaseable ||
         props.part.salable ||
         props.part.virtual
})
</script>
