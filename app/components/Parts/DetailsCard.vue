<template>
  <Card>
    <CardHeader>
      <CardTitle>Part Information</CardTitle>
      <CardDescription>
        Details and specifications for this part
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Part Image -->
      <div v-if="part.image" class="aspect-video rounded-md overflow-hidden bg-muted">
        <img
          :src="part.image"
          :alt="part.name"
          class="w-full h-full object-contain"
        />
      </div>

      <!-- Basic Info Grid -->
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Part Name</p>
          <p class="text-sm font-medium">{{ part.name }}</p>
        </div>

        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Internal Part Number</p>
          <p class="text-sm font-medium">
            <code class="px-2 py-1 bg-muted rounded">{{ part.IPN }}</code>
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Category</p>
          <div v-if="part.category" class="flex items-center gap-2">
            <Icon name="lucide:folder" class="h-4 w-4 text-muted-foreground" />
            <NuxtLink
              :to="`/parts/categories/${part.category.id}`"
              class="text-sm font-medium hover:underline"
            >
              {{ part.category.name }}
            </NuxtLink>
          </div>
          <p v-else class="text-sm text-muted-foreground">No category</p>
        </div>

        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Status</p>
          <Badge :variant="part.active ? 'default' : 'secondary'">
            {{ part.active ? 'Active' : 'Inactive' }}
          </Badge>
        </div>
      </div>

      <!-- Description -->
      <div v-if="part.description" class="space-y-2">
        <p class="text-sm text-muted-foreground">Description</p>
        <p class="text-sm">{{ part.description }}</p>
      </div>

      <!-- Attributes -->
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Attributes</p>
        <div class="flex flex-wrap gap-2">
          <Badge v-if="part.assembly" variant="outline">
            <Icon name="lucide:boxes" class="mr-1 h-3 w-3" />
            Assembly
          </Badge>
          <Badge v-if="part.component" variant="outline">
            <Icon name="lucide:puzzle" class="mr-1 h-3 w-3" />
            Component
          </Badge>
          <Badge v-if="part.trackable" variant="outline">
            <Icon name="lucide:tag" class="mr-1 h-3 w-3" />
            Trackable
          </Badge>
          <Badge v-if="part.purchaseable" variant="outline">
            <Icon name="lucide:shopping-cart" class="mr-1 h-3 w-3" />
            Purchaseable
          </Badge>
          <Badge v-if="part.salable" variant="outline">
            <Icon name="lucide:dollar-sign" class="mr-1 h-3 w-3" />
            Salable
          </Badge>
          <Badge v-if="part.virtual" variant="outline">
            <Icon name="lucide:ghost" class="mr-1 h-3 w-3" />
            Virtual
          </Badge>
          <Badge v-if="!hasAttributes" variant="secondary">
            No special attributes
          </Badge>
        </div>
      </div>

      <!-- Defaults -->
      <div class="grid gap-4 md:grid-cols-2">
        <div v-if="part.defaultLocationId" class="space-y-1">
          <p class="text-sm text-muted-foreground">Default Location</p>
          <NuxtLink
            :to="`/stock/locations/${part.defaultLocationId}`"
            class="text-sm font-medium hover:underline flex items-center gap-2"
          >
            <Icon name="lucide:map-pin" class="h-4 w-4" />
            View Location
          </NuxtLink>
        </div>

        <div v-if="part.defaultExpiry" class="space-y-1">
          <p class="text-sm text-muted-foreground">Default Expiry</p>
          <p class="text-sm font-medium">{{ part.defaultExpiry }} days</p>
        </div>

        <div v-if="part.minimumStock" class="space-y-1">
          <p class="text-sm text-muted-foreground">Minimum Stock</p>
          <p class="text-sm font-medium">{{ part.minimumStock }} units</p>
        </div>
      </div>

      <!-- External Link -->
      <div v-if="part.link" class="pt-4 border-t">
        <a
          :href="part.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <Icon name="lucide:external-link" class="h-4 w-4" />
          View external resource
        </a>
      </div>

      <!-- Timestamps -->
      <div class="grid gap-4 md:grid-cols-2 pt-4 border-t">
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Created</p>
          <p class="text-sm">{{ formatDate(part.createdAt) }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-muted-foreground">Last Updated</p>
          <p class="text-sm">{{ formatDate(part.updatedAt) }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Part } from '~/shared/types/part'

interface Props {
  part: Part
}

const props = defineProps<Props>()

const hasAttributes = computed(() => {
  return props.part.assembly ||
         props.part.component ||
         props.part.trackable ||
         props.part.purchaseable ||
         props.part.salable ||
         props.part.virtual
})

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
