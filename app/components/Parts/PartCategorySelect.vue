<template>
  <Select v-model="selectedValue" :disabled="disabled">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="null">
          <span class="text-muted-foreground">No parent category</span>
        </SelectItem>
        <SelectItem
          v-for="category in filteredCategories"
          :key="category.id"
          :value="category.id"
          :disabled="category.id === excludeId"
        >
          <div class="flex items-center gap-2">
            <Icon name="lucide:folder" class="h-3 w-3" />
            <span>{{ getCategoryPath(category) }}</span>
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
import type { PartCategory } from '~/shared/types/part-category'

interface Props {
  modelValue?: string | null
  excludeId?: string
  disabled?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  placeholder: 'Select a category'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const { fetchCategories } = useParts()

const categories = ref<PartCategory[]>([])
const loading = ref(false)

// Two-way binding for select value
const selectedValue = computed({
  get: () => props.modelValue === null ? 'null' : props.modelValue,
  set: (value) => {
    emit('update:modelValue', value === 'null' ? null : value)
  }
})

// Filter out excluded category
const filteredCategories = computed(() => {
  if (!props.excludeId) return categories.value
  return categories.value.filter(cat => cat.id !== props.excludeId)
})

// Build category path for display (e.g., "Electronics > Components")
const getCategoryPath = (category: PartCategory): string => {
  // For now, just return the name
  // In a full implementation, we'd build the full path from parent categories
  return category.name
}

// Load categories
const loadCategories = async () => {
  loading.value = true
  try {
    const response = await fetchCategories({ limit: 1000 })
    categories.value = response.data
  } catch (error) {
    console.error('Failed to load categories:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategories()
})
</script>
