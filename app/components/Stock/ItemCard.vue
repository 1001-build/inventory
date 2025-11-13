<template>
  <Card class="group hover:shadow-md transition-all cursor-pointer" @click="navigateTo(`/stock/${stockItem.id}`)">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <CardTitle class="text-base truncate">{{ stockItem.part?.name || 'Unknown Part' }}</CardTitle>
          <CardDescription class="truncate">
            <code class="text-xs">{{ stockItem.part?.IPN || 'N/A' }}</code>
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
            <DropdownMenuItem @click.stop="navigateTo(`/stock/${stockItem.id}`)">
              <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem @click.stop="navigateTo(`/stock/${stockItem.id}/edit`)">
              <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
              Edit Stock
            </DropdownMenuItem>
            <DropdownMenuItem @click.stop="$emit('move', stockItem)">
              <Icon name="lucide:move" class="mr-2 h-4 w-4" />
              Move Stock
            </DropdownMenuItem>
            <DropdownMenuItem @click.stop="$emit('adjust', stockItem)">
              <Icon name="lucide:plus-minus" class="mr-2 h-4 w-4" />
              Adjust Quantity
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="text-destructive focus:text-destructive"
              @click.stop="$emit('delete', stockItem)"
            >
              <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
              Delete Stock
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Quantity (Large Display) -->
      <div class="text-center py-4 bg-muted rounded-lg">
        <p class="text-sm text-muted-foreground mb-1">Quantity</p>
        <p class="text-3xl font-bold font-mono">{{ stockItem.quantity }}</p>
      </div>

      <!-- Location -->
      <div class="flex items-center gap-2">
        <Icon name="lucide:map-pin" class="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span class="text-sm truncate">{{ stockItem.location?.name || 'No location' }}</span>
      </div>

      <!-- Status -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-muted-foreground">Status</span>
        <Badge :variant="getStatusVariant(stockItem.status)">
          {{ stockItem.status }}
        </Badge>
      </div>

      <!-- Batch/Serial -->
      <div v-if="stockItem.batch || stockItem.serial" class="space-y-2 pt-2 border-t">
        <div v-if="stockItem.batch" class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Batch</span>
          <code class="text-sm">{{ stockItem.batch }}</code>
        </div>
        <div v-if="stockItem.serial" class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Serial</span>
          <code class="text-sm">{{ stockItem.serial }}</code>
        </div>
      </div>

      <!-- Expiry -->
      <div v-if="stockItem.expiryDate" class="pt-2 border-t">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Expiry</span>
          <span class="text-sm">{{ formatDate(stockItem.expiryDate) }}</span>
        </div>
        <Badge v-if="isExpiringSoon(stockItem.expiryDate)" variant="warning" class="w-full justify-center mt-2">
          <Icon name="lucide:alert-triangle" class="mr-1 h-3 w-3" />
          Expires soon
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
import type { StockItem } from '#shared/types/stock-item'

interface Props {
  stockItem: StockItem
}

defineProps<Props>()

defineEmits<{
  move: [item: StockItem]
  adjust: [item: StockItem]
  delete: [item: StockItem]
}>()

const getStatusVariant = (status: string) => {
  switch (status.toUpperCase()) {
    case 'OK':
      return 'success'
    case 'DAMAGED':
    case 'LOST':
    case 'DESTROYED':
      return 'destructive'
    case 'ATTENTION':
    case 'RETURNED':
      return 'warning'
    default:
      return 'secondary'
  }
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const isExpiringSoon = (expiryDate: string | Date) => {
  const expiry = new Date(expiryDate)
  const now = new Date()
  const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilExpiry > 0 && daysUntilExpiry <= 30
}
</script>
