<template>
  <Card>
    <CardHeader>
      <CardTitle>Stock Item Details</CardTitle>
      <CardDescription>
        Complete information for this stock item
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Part Information -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Part</h3>
        <div class="rounded-lg border p-3">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-12 h-12 rounded bg-muted flex items-center justify-center">
              <Icon name="lucide:package" class="h-6 w-6 text-muted-foreground" />
            </div>
            <div class="flex-1 min-w-0">
              <NuxtLink
                v-if="stockItem.part"
                :to="`/parts/${stockItem.part.id}`"
                class="font-medium hover:underline"
              >
                {{ stockItem.part.name }}
              </NuxtLink>
              <p v-else class="text-sm text-muted-foreground">Unknown Part</p>
              <code class="text-xs text-muted-foreground">{{ stockItem.part?.IPN || 'N/A' }}</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Information -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Location</h3>
        <div class="rounded-lg border p-3">
          <NuxtLink
            v-if="stockItem.location"
            :to="`/stock/locations/${stockItem.location.id}`"
            class="flex items-center gap-2 hover:underline"
          >
            <Icon name="lucide:map-pin" class="h-4 w-4 text-muted-foreground" />
            <span>{{ stockItem.location.name }}</span>
          </NuxtLink>
          <p v-else class="text-sm text-muted-foreground">No location assigned</p>
        </div>
      </div>

      <!-- Quantity & Status -->
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <h3 class="text-sm font-medium">Quantity</h3>
          <div class="rounded-lg border p-4 text-center">
            <p class="text-3xl font-bold font-mono">{{ stockItem.quantity }}</p>
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-medium">Status</h3>
          <div class="rounded-lg border p-4 flex items-center justify-center">
            <Badge :variant="getStatusVariant(stockItem.status)" class="text-base px-4 py-1">
              {{ stockItem.status }}
            </Badge>
          </div>
        </div>
      </div>

      <!-- Tracking Information -->
      <div v-if="stockItem.batch || stockItem.serial" class="space-y-2">
        <h3 class="text-sm font-medium">Tracking Information</h3>
        <div class="rounded-lg border p-3 space-y-2">
          <div v-if="stockItem.batch" class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Batch Number</span>
            <code class="text-sm font-medium">{{ stockItem.batch }}</code>
          </div>
          <div v-if="stockItem.serial" class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Serial Number</span>
            <code class="text-sm font-medium">{{ stockItem.serial }}</code>
          </div>
        </div>
      </div>

      <!-- Expiry Information -->
      <div v-if="stockItem.expiryDate" class="space-y-2">
        <h3 class="text-sm font-medium">Expiry Information</h3>
        <div class="rounded-lg border p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-muted-foreground">Expiry Date</span>
            <span class="text-sm font-medium">{{ formatDate(stockItem.expiryDate) }}</span>
          </div>
          <Alert v-if="isExpired(stockItem.expiryDate)" variant="destructive">
            <Icon name="lucide:alert-circle" class="h-4 w-4" />
            <AlertTitle>Expired</AlertTitle>
            <AlertDescription>
              This stock has expired and should not be used
            </AlertDescription>
          </Alert>
          <Alert v-else-if="isExpiringSoon(stockItem.expiryDate)" variant="warning">
            <Icon name="lucide:alert-triangle" class="h-4 w-4" />
            <AlertTitle>Expiring Soon</AlertTitle>
            <AlertDescription>
              This stock will expire in {{ daysUntilExpiry(stockItem.expiryDate) }} days
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <!-- Purchase Information -->
      <div v-if="stockItem.purchasePrice" class="space-y-2">
        <h3 class="text-sm font-medium">Purchase Information</h3>
        <div class="rounded-lg border p-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Purchase Price (per unit)</span>
            <span class="text-sm font-medium font-mono">${{ stockItem.purchasePrice.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between mt-2 pt-2 border-t">
            <span class="text-sm font-medium">Total Value</span>
            <span class="text-base font-bold font-mono">
              ${{ (stockItem.purchasePrice * stockItem.quantity).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div v-if="stockItem.notes" class="space-y-2">
        <h3 class="text-sm font-medium">Notes</h3>
        <div class="rounded-lg border p-3">
          <p class="text-sm whitespace-pre-wrap">{{ stockItem.notes }}</p>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="grid gap-4 md:grid-cols-2 pt-4 border-t">
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Created</p>
          <p class="text-sm">{{ formatDateTime(stockItem.createdAt) }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Last Updated</p>
          <p class="text-sm">{{ formatDateTime(stockItem.updatedAt) }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { StockItem } from '#shared/types/stock-item'

interface Props {
  stockItem: StockItem
}

defineProps<Props>()

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

const formatDateTime = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const daysUntilExpiry = (expiryDate: string | Date) => {
  const expiry = new Date(expiryDate)
  const now = new Date()
  return Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

const isExpired = (expiryDate: string | Date) => {
  return daysUntilExpiry(expiryDate) < 0
}

const isExpiringSoon = (expiryDate: string | Date) => {
  const days = daysUntilExpiry(expiryDate)
  return days >= 0 && days <= 30
}
</script>
