import type {
  CreatePartCategoryInput,
  UpdatePartCategoryInput,
  ListPartCategoriesInput,
} from '~/shared/validators/part-category'
import type {
  CreatePartInput,
  UpdatePartInput,
  ListPartsInput,
} from '~/shared/validators/part'

export function useParts() {
  const { $fetch } = useExtendedFetch()
  const { handleError } = useErrorHandler()
  const { showToast } = useShowToast()

  // ========================================
  // PART CATEGORIES
  // ========================================

  /**
   * Fetch paginated list of part categories
   */
  const fetchCategories = async (params?: Partial<ListPartCategoriesInput>) => {
    try {
      const response = await $fetch('/api/v1/part-categories', {
        method: 'GET',
        query: params,
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch part categories')
      throw error
    }
  }

  /**
   * Fetch category tree structure (hierarchical)
   */
  const fetchCategoryTree = async (parentId?: string) => {
    try {
      const response = await $fetch('/api/v1/part-categories', {
        method: 'GET',
        query: {
          tree: 'true',
          parentId,
        },
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch category tree')
      throw error
    }
  }

  /**
   * Fetch single part category by ID
   */
  const fetchCategory = async (id: string) => {
    try {
      const response = await $fetch(`/api/v1/part-categories/${id}`, {
        method: 'GET',
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch category')
      throw error
    }
  }

  /**
   * Create a new part category
   */
  const createCategory = async (data: CreatePartCategoryInput) => {
    try {
      const response = await $fetch('/api/v1/part-categories', {
        method: 'POST',
        body: data,
      })
      showToast('Category created successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to create category')
      throw error
    }
  }

  /**
   * Update an existing part category
   */
  const updateCategory = async (id: string, data: UpdatePartCategoryInput) => {
    try {
      const response = await $fetch(`/api/v1/part-categories/${id}`, {
        method: 'PUT',
        body: data,
      })
      showToast('Category updated successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to update category')
      throw error
    }
  }

  /**
   * Delete a part category
   */
  const deleteCategory = async (id: string, cascade: boolean = false) => {
    try {
      const response = await $fetch(`/api/v1/part-categories/${id}`, {
        method: 'DELETE',
        query: { cascade: cascade.toString() },
      })
      showToast('Category deleted successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to delete category')
      throw error
    }
  }

  /**
   * Move category to a new parent
   */
  const moveCategory = async (id: string, newParentId: string | null) => {
    try {
      const response = await $fetch(`/api/v1/part-categories/${id}/move`, {
        method: 'POST',
        body: { newParentId },
      })
      showToast('Category moved successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to move category')
      throw error
    }
  }

  // ========================================
  // PARTS
  // ========================================

  /**
   * Fetch paginated list of parts
   */
  const fetchParts = async (params?: Partial<ListPartsInput>) => {
    try {
      const response = await $fetch('/api/v1/parts', {
        method: 'GET',
        query: params,
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch parts')
      throw error
    }
  }

  /**
   * Fetch single part by ID
   */
  const fetchPart = async (id: string) => {
    try {
      const response = await $fetch(`/api/v1/parts/${id}`, {
        method: 'GET',
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch part')
      throw error
    }
  }

  /**
   * Create a new part
   */
  const createPart = async (data: CreatePartInput) => {
    try {
      const response = await $fetch('/api/v1/parts', {
        method: 'POST',
        body: data,
      })
      showToast('Part created successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to create part')
      throw error
    }
  }

  /**
   * Update an existing part
   */
  const updatePart = async (id: string, data: UpdatePartInput) => {
    try {
      const response = await $fetch(`/api/v1/parts/${id}`, {
        method: 'PUT',
        body: data,
      })
      showToast('Part updated successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to update part')
      throw error
    }
  }

  /**
   * Delete a part
   */
  const deletePart = async (id: string) => {
    try {
      const response = await $fetch(`/api/v1/parts/${id}`, {
        method: 'DELETE',
      })
      showToast('Part deleted successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to delete part')
      throw error
    }
  }

  return {
    // Part Categories
    fetchCategories,
    fetchCategoryTree,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    moveCategory,

    // Parts
    fetchParts,
    fetchPart,
    createPart,
    updatePart,
    deletePart,
  }
}
