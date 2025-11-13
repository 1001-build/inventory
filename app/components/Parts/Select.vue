<template>
  <Select v-model="selectedValue" :disabled="disabled">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="part in filteredParts"
          :key="part.id"
          :value="part.id"
        >
          <div class="flex items-center gap-2">
            <Icon name="lucide:package" class="h-3 w-3" />
            <div class="flex flex-col">
              <span>{{ part.name }}</span>
              <span v-if="part.IPN" class="text-xs text-muted-foreground">{{ part.IPN }}</span>
            </div>
            <Badge v-if="!part.active" variant="secondary" class="text-xs ml-auto">
              Inactive
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
import type { Part } from '#shared/types/part'

interface Props {
  modelValue?: string | null
  categoryId?: string
  disabled?: boolean
  placeholder?: string
  activeOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  placeholder: 'Select a part',
  activeOnly: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const { fetchParts } = useParts()

const parts = ref<Part[]>([])
const loading = ref(false)

// Two-way binding for select value
const selectedValue = computed({
  get: () => props.modelValue || '',
  set: (value) => {
    emit('update:modelValue', value || null)
  }
})

// Filter parts
const filteredParts = computed(() => {
  let filtered = parts.value

  // Filter by active status if enabled
  if (props.activeOnly) {
    filtered = filtered.filter(part => part.active)
  }

  return filtered
})

// Load parts
const loadParts = async () => {
  loading.value = true
  try {
    const params: any = {
      perPage: '1000'
    }

    if (props.categoryId) {
      params.categoryId = props.categoryId
    }

    if (props.activeOnly) {
      params.active = 'true'
    }

    const response = await fetchParts(params)
    parts.value = response.data
  } catch (error) {
    console.error('Failed to load parts:', error)
  } finally {
    loading.value = false
  }
}

// Watch for category changes
watch(() => props.categoryId, () => {
  loadParts()
})

onMounted(() => {
  loadParts()
})
</script>
