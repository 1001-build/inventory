<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium">Part Attributes</h3>
    <p class="text-sm text-muted-foreground">
      Configure the characteristics and capabilities of this part
    </p>

    <div class="space-y-4 pt-4">
      <!-- Assembly -->
      <div class="flex items-center justify-between rounded-lg border p-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="lucide:boxes" class="h-5 w-5 text-muted-foreground mt-0.5" />
          <div class="space-y-0.5">
            <label
              for="assembly"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Assembly
            </label>
            <p class="text-sm text-muted-foreground">
              This part is assembled from other parts/components
            </p>
          </div>
        </div>
        <Checkbox
          id="assembly"
          v-model:checked="localValue.assembly"
          :disabled="disabled"
        />
      </div>

      <!-- Component -->
      <div class="flex items-center justify-between rounded-lg border p-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="lucide:puzzle" class="h-5 w-5 text-muted-foreground mt-0.5" />
          <div class="space-y-0.5">
            <label
              for="component"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Component
            </label>
            <p class="text-sm text-muted-foreground">
              This part is used as a component in assemblies
            </p>
          </div>
        </div>
        <Checkbox
          id="component"
          v-model:checked="localValue.component"
          :disabled="disabled"
        />
      </div>

      <!-- Trackable -->
      <div class="flex items-center justify-between rounded-lg border p-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="lucide:tag" class="h-5 w-5 text-muted-foreground mt-0.5" />
          <div class="space-y-0.5">
            <label
              for="trackable"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Trackable
            </label>
            <p class="text-sm text-muted-foreground">
              Track individual units with serial numbers or batch codes
            </p>
          </div>
        </div>
        <Checkbox
          id="trackable"
          v-model:checked="localValue.trackable"
          :disabled="disabled"
        />
      </div>

      <!-- Purchaseable -->
      <div class="flex items-center justify-between rounded-lg border p-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="lucide:shopping-cart" class="h-5 w-5 text-muted-foreground mt-0.5" />
          <div class="space-y-0.5">
            <label
              for="purchaseable"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Purchaseable
            </label>
            <p class="text-sm text-muted-foreground">
              This part can be purchased from suppliers
            </p>
          </div>
        </div>
        <Checkbox
          id="purchaseable"
          v-model:checked="localValue.purchaseable"
          :disabled="disabled"
        />
      </div>

      <!-- Salable -->
      <div class="flex items-center justify-between rounded-lg border p-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="lucide:dollar-sign" class="h-5 w-5 text-muted-foreground mt-0.5" />
          <div class="space-y-0.5">
            <label
              for="salable"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Salable
            </label>
            <p class="text-sm text-muted-foreground">
              This part can be sold to customers
            </p>
          </div>
        </div>
        <Checkbox
          id="salable"
          v-model:checked="localValue.salable"
          :disabled="disabled"
        />
      </div>

      <!-- Virtual -->
      <div class="flex items-center justify-between rounded-lg border p-4">
        <div class="flex items-start gap-3 flex-1">
          <Icon name="lucide:ghost" class="h-5 w-5 text-muted-foreground mt-0.5" />
          <div class="space-y-0.5">
            <label
              for="virtual"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Virtual
            </label>
            <p class="text-sm text-muted-foreground">
              Virtual part with no physical stock (e.g., software, service)
            </p>
          </div>
        </div>
        <Checkbox
          id="virtual"
          v-model:checked="localValue.virtual"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AttributesModel {
  assembly: boolean
  component: boolean
  trackable: boolean
  purchaseable: boolean
  salable: boolean
  virtual: boolean
}

interface Props {
  modelValue: AttributesModel
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: AttributesModel]
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
