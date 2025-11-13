<template>
  <Select v-model="selectedValue" :disabled="disabled">
    <SelectTrigger>
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="status in statuses"
          :key="status.value"
          :value="status.value"
        >
          <div class="flex items-center gap-2">
            <Icon :name="status.icon" class="h-4 w-4" :class="status.color" />
            <div>
              <p class="font-medium">{{ status.label }}</p>
              <p class="text-xs text-muted-foreground">{{ status.description }}</p>
            </div>
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

interface Props {
  modelValue?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'OK',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const statuses = [
  {
    value: 'OK',
    label: 'OK',
    description: 'Stock in good condition',
    icon: 'lucide:check-circle',
    color: 'text-green-600'
  },
  {
    value: 'ATTENTION',
    label: 'Attention',
    description: 'Requires attention or inspection',
    icon: 'lucide:alert-circle',
    color: 'text-yellow-600'
  },
  {
    value: 'DAMAGED',
    label: 'Damaged',
    description: 'Stock is damaged',
    icon: 'lucide:alert-triangle',
    color: 'text-red-600'
  },
  {
    value: 'LOST',
    label: 'Lost',
    description: 'Stock is missing',
    icon: 'lucide:help-circle',
    color: 'text-gray-600'
  },
  {
    value: 'RETURNED',
    label: 'Returned',
    description: 'Stock has been returned',
    icon: 'lucide:undo-2',
    color: 'text-blue-600'
  },
  {
    value: 'DESTROYED',
    label: 'Destroyed',
    description: 'Stock has been destroyed',
    icon: 'lucide:x-circle',
    color: 'text-red-800'
  }
]
</script>
