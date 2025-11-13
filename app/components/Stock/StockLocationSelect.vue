<template>
  <Select v-model="selectedValue" :disabled="disabled">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="null">
          <span class="text-muted-foreground">No parent location</span>
        </SelectItem>
        <SelectItem
          v-for="location in filteredLocations"
          :key="location.id"
          :value="location.id"
          :disabled="location.id === excludeId"
        >
          <div class="flex items-center gap-2">
            <Icon
              :name="location.structural ? 'lucide:folder' : 'lucide:map-pin'"
              class="h-3 w-3"
            />
            <span>{{ location.name }}</span>
            <Badge v-if="location.external" variant="outline" class="text-xs ml-auto">
              External
            </Badge>
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { StockLocation } from '~/shared/types/stock-location'

interface Props {
  modelValue?: string | null
  excludeId?: string
  disabled?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  placeholder: 'Select a location'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const { fetchLocations } = useStock()

const locations = ref<StockLocation[]>([])
const loading = ref(false)

// Two-way binding for select value
const selectedValue = computed({
  get: () => props.modelValue === null ? 'null' : props.modelValue,
  set: (value) => {
    emit('update:modelValue', value === 'null' ? null : value)
  }
})

// Filter out excluded location
const filteredLocations = computed(() => {
  if (!props.excludeId) return locations.value
  return locations.value.filter(loc => loc.id !== props.excludeId)
})

// Load locations
const loadLocations = async () => {
  loading.value = true
  try {
    const response = await fetchLocations({ limit: 1000 })
    locations.value = response.data
  } catch (error) {
    console.error('Failed to load locations:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadLocations()
})
</script>
