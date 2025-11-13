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
            <Icon
              :name="category.structural ? 'lucide:folder' : 'lucide:tag'"
              class="h-3 w-3"
            />
            <span>{{ category.name }}</span>
            <Badge v-if="category.structural" variant="outline" class="text-xs ml-auto">
              Structural
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
import type { PartCategory } from '#shared/types/part-category'

interface Props {
  modelValue?: string | null
  excludeId?: string
  disabled?: boolean
  placeholder?: string
  allowNull?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  placeholder: 'Select a category',
  allowNull: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const partsStore = usePartsStore()

const loading = computed(() => partsStore.loading)

// Two-way binding for select value
const selectedValue = computed({
  get: () => props.modelValue === null ? 'null' : props.modelValue,
  set: (value) => {
    emit('update:modelValue', value === 'null' ? null : value)
  }
})

// Filter out excluded category
const filteredCategories = computed(() => {
  const categories = partsStore.partCategories
  if (!props.excludeId) return categories
  return categories.filter(cat => cat.id !== props.excludeId)
})

// Load categories
const loadCategories = async () => {
  try {
    await partsStore.fetchCategories({ perPage: '1000' })
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

onMounted(() => {
  loadCategories()
})
</script>
