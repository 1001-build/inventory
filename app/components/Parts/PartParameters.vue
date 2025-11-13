<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>Custom Parameters</CardTitle>
          <CardDescription>
            Additional specifications and properties for this part
          </CardDescription>
        </div>
        <Button
          v-if="editable"
          size="sm"
          variant="outline"
          @click="addDialogOpen = true"
        >
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add Parameter
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <!-- Loading State -->
      <div v-if="loading" class="space-y-3">
        <Skeleton v-for="i in 3" :key="i" class="h-12 w-full" />
      </div>

      <!-- Parameters Table -->
      <div v-else-if="parameters.length > 0" class="rounded-md border">
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
            <TableRow v-for="param in parameters" :key="param.id">
              <TableCell class="font-medium">{{ param.name }}</TableCell>
              <TableCell>{{ param.value }}</TableCell>
              <TableCell>
                <span v-if="param.unit" class="text-muted-foreground">{{ param.unit }}</span>
                <span v-else class="text-muted-foreground">-</span>
              </TableCell>
              <TableCell v-if="editable" class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Icon name="lucide:more-vertical" class="h-4 w-4" />
                      <span class="sr-only">Actions</span>
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
      <div v-else class="flex flex-col items-center justify-center py-8 text-center">
        <Icon name="lucide:file-text" class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-medium mb-2">No Parameters</h3>
        <p class="text-sm text-muted-foreground mb-4">
          {{ editable ? 'Add custom parameters to track additional specifications' : 'No custom parameters defined for this part' }}
        </p>
        <Button v-if="editable" size="sm" @click="addDialogOpen = true">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add Parameter
        </Button>
      </div>
    </CardContent>

    <!-- Add/Edit Dialog -->
    <Dialog v-model:open="addDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {{ editingParameter ? 'Edit Parameter' : 'Add Parameter' }}
          </DialogTitle>
          <DialogDescription>
            Define a custom specification or property for this part
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-4 py-4">
          <!-- Name -->
          <div class="space-y-2">
            <Label for="param-name">Parameter Name</Label>
            <Input
              id="param-name"
              v-model="paramForm.name"
              placeholder="e.g., Voltage, Weight, Color"
            />
          </div>

          <!-- Value -->
          <div class="space-y-2">
            <Label for="param-value">Value</Label>
            <Input
              id="param-value"
              v-model="paramForm.value"
              placeholder="e.g., 12, 500, Red"
            />
          </div>

          <!-- Unit -->
          <div class="space-y-2">
            <Label for="param-unit">Unit (Optional)</Label>
            <Input
              id="param-unit"
              v-model="paramForm.unit"
              placeholder="e.g., V, g, mm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="cancelEdit">Cancel</Button>
          <Button @click="saveParameter">
            {{ editingParameter ? 'Update' : 'Add' }} Parameter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Card>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface Props {
  partId: string
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: false
})

interface Parameter {
  id: string
  name: string
  value: string
  unit?: string
}

const loading = ref(true)
const parameters = ref<Parameter[]>([])
const addDialogOpen = ref(false)
const editingParameter = ref<Parameter | null>(null)

const paramForm = ref({
  name: '',
  value: '',
  unit: ''
})

// Methods
const loadParameters = async () => {
  loading.value = true
  try {
    // Fetch parameters for this part
    // For now, use mock data
    // In production: const response = await $fetch(`/api/v1/parts/${props.partId}/parameters`)

    // Mock data
    await new Promise(resolve => setTimeout(resolve, 300))

    parameters.value = [
      { id: '1', name: 'Voltage', value: '12', unit: 'V' },
      { id: '2', name: 'Weight', value: '500', unit: 'g' },
      { id: '3', name: 'Color', value: 'Blue' }
    ]
  } catch (error) {
    console.error('Failed to load parameters:', error)
    parameters.value = []
  } finally {
    loading.value = false
  }
}

const editParameter = (param: Parameter) => {
  editingParameter.value = param
  paramForm.value = {
    name: param.name,
    value: param.value,
    unit: param.unit || ''
  }
  addDialogOpen.value = true
}

const deleteParameter = async (param: Parameter) => {
  // In production: await $fetch(`/api/v1/parts/${props.partId}/parameters/${param.id}`, { method: 'DELETE' })
  parameters.value = parameters.value.filter(p => p.id !== param.id)
}

const saveParameter = async () => {
  if (!paramForm.value.name || !paramForm.value.value) return

  if (editingParameter.value) {
    // Update existing
    const index = parameters.value.findIndex(p => p.id === editingParameter.value!.id)
    if (index !== -1) {
      parameters.value[index] = {
        ...editingParameter.value,
        ...paramForm.value
      }
    }
  } else {
    // Add new
    parameters.value.push({
      id: Date.now().toString(),
      ...paramForm.value
    })
  }

  cancelEdit()
}

const cancelEdit = () => {
  addDialogOpen.value = false
  editingParameter.value = null
  paramForm.value = {
    name: '',
    value: '',
    unit: ''
  }
}

onMounted(() => {
  loadParameters()
})
</script>
