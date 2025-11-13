<template>
  <Card class="group hover:shadow-md transition-all cursor-pointer" @click="navigateTo(`/parts/${part.id}`)">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <CardTitle class="text-base truncate">{{ part.name }}</CardTitle>
          <CardDescription class="truncate">
            <code class="text-xs">{{ part.IPN }}</code>
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
      <!-- Image Thumbnail -->
      <div class="aspect-video rounded-md bg-muted flex items-center justify-center overflow-hidden">
        <img
          v-if="part.image"
          :src="part.image"
          :alt="part.name"
          class="w-full h-full object-cover"
        />
        <Icon v-else name="lucide:package" class="h-12 w-12 text-muted-foreground" />
      </div>

      <!-- Category Badge -->
      <div v-if="part.category" class="flex items-center gap-2">
        <Icon name="lucide:folder" class="h-3 w-3 text-muted-foreground" />
        <span class="text-xs text-muted-foreground truncate">{{ part.category.name }}</span>
      </div>

      <!-- Stock Level -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-muted-foreground">Stock</span>
        <Badge :variant="getStockVariant(part.stockCount)">
          {{ part.stockCount || 0 }} units
        </Badge>
      </div>

      <!-- Flags -->
      <div v-if="hasFlags" class="flex flex-wrap gap-1">
        <Badge v-if="part.assembly" variant="outline" class="text-xs">
          <Icon name="lucide:boxes" class="mr-1 h-3 w-3" />
          Assembly
        </Badge>
        <Badge v-if="part.component" variant="outline" class="text-xs">
          <Icon name="lucide:puzzle" class="mr-1 h-3 w-3" />
          Component
        </Badge>
        <Badge v-if="part.trackable" variant="outline" class="text-xs">
          <Icon name="lucide:tag" class="mr-1 h-3 w-3" />
          Trackable
        </Badge>
        <Badge v-if="part.purchaseable" variant="outline" class="text-xs">
          <Icon name="lucide:shopping-cart" class="mr-1 h-3 w-3" />
          Purchaseable
        </Badge>
        <Badge v-if="part.salable" variant="outline" class="text-xs">
          <Icon name="lucide:dollar-sign" class="mr-1 h-3 w-3" />
          Salable
        </Badge>
      </div>

      <!-- Status -->
      <div class="pt-2 border-t">
        <Badge :variant="part.active ? 'default' : 'secondary'" class="w-full justify-center">
          {{ part.active ? 'Active' : 'Inactive' }}
        </Badge>
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
import type { Part } from '~/shared/types/part'

interface Props {
  part: Part
}

const props = defineProps<Props>()

defineEmits<{
  delete: [part: Part]
}>()

const hasFlags = computed(() => {
  return props.part.assembly ||
         props.part.component ||
         props.part.trackable ||
         props.part.purchaseable ||
         props.part.salable
})

const getStockVariant = (stockCount: number = 0) => {
  if (stockCount === 0) return 'destructive'
  if (stockCount < 10) return 'warning'
  return 'success'
}
</script>
