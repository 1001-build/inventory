<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>Parameters</CardTitle>
          <CardDescription>
            Custom parameters for this part
          </CardDescription>
        </div>
        <Button v-if="editable && !isAdding" variant="outline" size="sm" @click="startAdding">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add Parameter
        </Button>
      </div>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-3">
        <Skeleton v-for="i in 3" :key="i" class="h-12 w-full" />
      </div>

      <!-- Parameters Table -->
      <div v-else-if="parameters.length > 0 || isAdding" class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead v-if="editable" class="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <!-- Add Form Row -->
            <TableRow v-if="isAdding">
              <TableCell>
                <Input
                  v-model="newParameter.name"
                  placeholder="Parameter name"
                  :disabled="saving"
                />
              </TableCell>
              <TableCell>
                <Input
                  v-model="newParameter.value"
                  placeholder="Value"
                  :disabled="saving"
                />
              </TableCell>
              <TableCell>
                <Input
                  v-model="newParameter.unit"
                  placeholder="Unit (optional)"
                  :disabled="saving"
                />
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    :disabled="saving"
                    @click="cancelAdding"
                  >
                    <Icon name="lucide:x" class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    :disabled="saving || !newParameter.name || !newParameter.value"
                    @click="saveParameter"
                  >
                    <Icon v-if="saving" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
                    <Icon v-else name="lucide:check" class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>

            <!-- Existing Parameters -->
            <TableRow v-for="param in parameters" :key="param.id">
              <TableCell class="font-medium">{{ param.name }}</TableCell>
              <TableCell>{{ param.value }}</TableCell>
              <TableCell>
                <span v-if="param.unit" class="text-sm text-muted-foreground">{{ param.unit }}</span>
                <span v-else class="text-sm text-muted-foreground">-</span>
              </TableCell>
              <TableCell v-if="editable" class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Icon name="lucide:more-vertical" class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="editParameter(param)">
                      <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      class="text-destructive focus:text-destructive"
                      @click="deleteParameter(param)"
                    >
                      <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-8 border rounded-lg">
        <Icon name="lucide:list" class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p class="text-sm text-muted-foreground mb-4">No parameters defined for this part</p>
        <Button v-if="editable" variant="outline" size="sm" @click="startAdding">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add First Parameter
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { PartParameter } from '#shared/types/part'

interface Props {
  partId: string
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: false
})

const loading = ref(true)
const saving = ref(false)
const isAdding = ref(false)
const parameters = ref<PartParameter[]>([])

const newParameter = ref({
  name: '',
  value: '',
  unit: ''
})

// Methods
const loadParameters = async () => {
  loading.value = true
  try {
    // TODO: Implement API call to fetch parameters
    // const response = await fetchPartParameters(props.partId)
    // parameters.value = response.data
    parameters.value = [] // Placeholder
  } catch (error) {
    console.error('Failed to load parameters:', error)
  } finally {
    loading.value = false
  }
}

const startAdding = () => {
  isAdding.value = true
  newParameter.value = { name: '', value: '', unit: '' }
}

const cancelAdding = () => {
  isAdding.value = false
  newParameter.value = { name: '', value: '', unit: '' }
}

const saveParameter = async () => {
  if (!newParameter.value.name || !newParameter.value.value) return

  saving.value = true
  try {
    // TODO: Implement API call to create parameter
    // await createPartParameter(props.partId, newParameter.value)
    await loadParameters()
    cancelAdding()
  } catch (error) {
    console.error('Failed to save parameter:', error)
  } finally {
    saving.value = false
  }
}

const editParameter = (param: PartParameter) => {
  // TODO: Implement edit functionality
  console.log('Edit parameter:', param)
}

const deleteParameter = async (param: PartParameter) => {
  if (!confirm(`Delete parameter "${param.name}"?`)) return

  try {
    // TODO: Implement API call to delete parameter
    // await deletePartParameter(param.id)
    await loadParameters()
  } catch (error) {
    console.error('Failed to delete parameter:', error)
  }
}

onMounted(() => {
  loadParameters()
})
</script>
