<template>
  <div class="space-y-4">
    <!-- Upload Area -->
    <div
      v-if="!imageUrl"
      class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
      :class="{ 'border-primary bg-primary/5': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <Icon name="lucide:upload" class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p class="text-sm font-medium mb-1">
        Drop an image here or click to browse
      </p>
      <p class="text-xs text-muted-foreground">
        PNG, JPG, GIF up to 5MB
      </p>
    </div>

    <!-- Preview -->
    <div v-else class="space-y-3">
      <div class="relative aspect-video rounded-lg bg-muted overflow-hidden">
        <img
          :src="imageUrl"
          alt="Part image preview"
          class="w-full h-full object-contain"
        />
        <Button
          variant="destructive"
          size="icon"
          class="absolute top-2 right-2"
          :disabled="disabled || uploading"
          @click="removeImage"
        >
          <Icon name="lucide:x" class="h-4 w-4" />
        </Button>
      </div>
      <p class="text-xs text-muted-foreground text-center">
        Click the X button to remove the image
      </p>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="space-y-2">
      <Progress :model-value="uploadProgress" />
      <p class="text-xs text-muted-foreground text-center">
        Uploading... {{ uploadProgress }}%
      </p>
    </div>

    <!-- Error Message -->
    <Alert v-if="error" variant="destructive">
      <Icon name="lucide:alert-circle" class="h-4 w-4" />
      <AlertTitle>Upload Error</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/png,image/jpeg,image/gif"
      class="hidden"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Props {
  modelValue?: string
  partId?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)
const error = ref('')

const imageUrl = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const triggerFileInput = () => {
  if (!props.disabled && !uploading.value) {
    fileInput.value?.click()
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false

  if (props.disabled || uploading.value) return

  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files && files.length > 0) {
    processFile(files[0])
  }
}

const processFile = async (file: File) => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file'
    return
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image size must be less than 5MB'
    return
  }

  error.value = ''
  uploading.value = true
  uploadProgress.value = 0

  try {
    // Simulate upload progress
    // In a real implementation, use FormData and XMLHttpRequest for progress
    const formData = new FormData()
    formData.append('file', file)

    // Simulate progress
    const progressInterval = setInterval(() => {
      uploadProgress.value = Math.min(uploadProgress.value + 10, 90)
    }, 200)

    // For now, convert to base64 for preview
    // In production, upload to server
    const reader = new FileReader()
    reader.onload = (e) => {
      clearInterval(progressInterval)
      uploadProgress.value = 100

      imageUrl.value = e.target?.result as string

      setTimeout(() => {
        uploading.value = false
        uploadProgress.value = 0
      }, 500)
    }
    reader.onerror = () => {
      clearInterval(progressInterval)
      error.value = 'Failed to read file'
      uploading.value = false
      uploadProgress.value = 0
    }
    reader.readAsDataURL(file)
  } catch (err) {
    error.value = 'Failed to upload image'
    uploading.value = false
    uploadProgress.value = 0
  }
}

const removeImage = () => {
  imageUrl.value = ''
  error.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
