<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <Tabs v-model="currentTab" class="w-full">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="attributes">Attributes</TabsTrigger>
        <TabsTrigger value="defaults">Defaults</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
      </TabsList>

      <!-- Tab 1: Basic Info -->
      <TabsContent value="basic" class="space-y-6 mt-6">
        <!-- Name -->
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Part Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="Enter part name"
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              A clear, descriptive name for this part
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- IPN -->
        <FormField v-slot="{ componentField }" name="IPN">
          <FormItem>
            <FormLabel>Internal Part Number (IPN)</FormLabel>
            <div class="flex gap-2">
              <FormControl class="flex-1">
                <Input
                  v-bind="componentField"
                  placeholder="e.g., PART-001"
                  :disabled="loading"
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                :disabled="loading"
                @click="generateIPN"
              >
                <Icon name="lucide:sparkles" class="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>
            <FormDescription>
              Unique identifier for this part
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Category -->
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <PartCategorySelect
                v-bind="componentField"
                :disabled="loading"
                placeholder="Select a category"
              />
            </FormControl>
            <FormDescription>
              Organize this part under a category
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Description -->
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                v-bind="componentField"
                placeholder="Enter part description"
                rows="4"
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              Detailed description of the part and its use
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </TabsContent>

      <!-- Tab 2: Attributes -->
      <TabsContent value="attributes" class="space-y-6 mt-6">
        <PartAttributeToggles v-model="attributesModel" :disabled="loading" />
      </TabsContent>

      <!-- Tab 3: Defaults -->
      <TabsContent value="defaults" class="space-y-6 mt-6">
        <!-- Default Location -->
        <FormField v-slot="{ componentField }" name="defaultLocationId">
          <FormItem>
            <FormLabel>Default Stock Location</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="Location ID (optional)"
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              Default location for storing this part
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Default Expiry -->
        <FormField v-slot="{ componentField }" name="defaultExpiry">
          <FormItem>
            <FormLabel>Default Expiry (days)</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="number"
                placeholder="e.g., 365"
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              Number of days until parts expire (if applicable)
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Minimum Stock -->
        <FormField v-slot="{ componentField }" name="minimumStock">
          <FormItem>
            <FormLabel>Minimum Stock Level</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="number"
                placeholder="e.g., 10"
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              Alert when stock falls below this level
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Active Status -->
        <FormField v-slot="{ componentField }" name="active">
          <FormItem class="flex items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <FormLabel class="text-base">Active</FormLabel>
              <FormDescription>
                Mark this part as active for use in inventory
              </FormDescription>
            </div>
            <FormControl>
              <Switch v-bind="componentField" :disabled="loading" />
            </FormControl>
          </FormItem>
        </FormField>
      </TabsContent>

      <!-- Tab 4: Media -->
      <TabsContent value="media" class="space-y-6 mt-6">
        <!-- Image Upload -->
        <FormField v-slot="{ componentField }" name="image">
          <FormItem>
            <FormLabel>Part Image</FormLabel>
            <FormControl>
              <PartImageUpload
                v-bind="componentField"
                :part-id="part?.id"
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              Upload an image of the part (max 5MB)
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Link -->
        <FormField v-slot="{ componentField }" name="link">
          <FormItem>
            <FormLabel>External Link</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="url"
                placeholder="https://..."
                :disabled="loading"
              />
            </FormControl>
            <FormDescription>
              Link to datasheet, product page, or documentation
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </TabsContent>
    </Tabs>

    <!-- Form Actions -->
    <div class="flex justify-between pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        :disabled="loading"
        @click="$emit('cancel')"
      >
        Cancel
      </Button>
      <div class="flex gap-2">
        <Button
          v-if="mode === 'create'"
          type="button"
          variant="outline"
          :disabled="loading"
          @click="handleSaveDraft"
        >
          Save Draft
        </Button>
        <Button type="submit" :disabled="loading">
          <Icon v-if="loading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          {{ submitLabel }}
        </Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  createPartSchema,
  updatePartSchema,
  type CreatePartInput,
  type UpdatePartInput
} from '~/shared/validators/part'
import type { Part } from '~/shared/types/part'

interface Props {
  part?: Part
  mode?: 'create' | 'edit'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  loading: false
})

const emit = defineEmits<{
  submit: [data: CreatePartInput | UpdatePartInput]
  saveDraft: [data: Partial<CreatePartInput>]
  cancel: []
}>()

// Current tab
const currentTab = ref('basic')

// Validation schema
const validationSchema = computed(() => {
  return props.mode === 'edit'
    ? toTypedSchema(updatePartSchema)
    : toTypedSchema(createPartSchema)
})

// Form setup
const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: validationSchema.value,
  initialValues: {
    name: props.part?.name || '',
    IPN: props.part?.IPN || '',
    description: props.part?.description || '',
    categoryId: props.part?.categoryId || null,
    assembly: props.part?.assembly || false,
    component: props.part?.component || false,
    trackable: props.part?.trackable || false,
    purchaseable: props.part?.purchaseable || false,
    salable: props.part?.salable || false,
    virtual: props.part?.virtual || false,
    defaultLocationId: props.part?.defaultLocationId || null,
    defaultExpiry: props.part?.defaultExpiry || null,
    minimumStock: props.part?.minimumStock || 0,
    active: props.part?.active ?? true,
    image: props.part?.image || '',
    link: props.part?.link || ''
  }
})

// Attributes model for two-way binding
const attributesModel = computed({
  get: () => ({
    assembly: values.assembly,
    component: values.component,
    trackable: values.trackable,
    purchaseable: values.purchaseable,
    salable: values.salable,
    virtual: values.virtual
  }),
  set: (newValues) => {
    Object.entries(newValues).forEach(([key, value]) => {
      setFieldValue(key, value)
    })
  }
})

// Generate IPN
const generateIPN = () => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  setFieldValue('IPN', `PART-${timestamp}-${random}`)
}

// Submit label
const submitLabel = computed(() => {
  if (props.loading) return 'Saving...'
  return props.mode === 'edit' ? 'Update Part' : 'Create Part'
})

// Handle submit
const onSubmit = handleSubmit((formValues) => {
  emit('submit', formValues)
})

// Handle save draft
const handleSaveDraft = () => {
  emit('saveDraft', values as Partial<CreatePartInput>)
}
</script>
