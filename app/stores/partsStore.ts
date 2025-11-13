import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import type { Part } from '#shared/types/part'
import type { PartCategory } from '#shared/types/part-category'
import type {
  CreatePartCategoryInput,
  UpdatePartCategoryInput,
  ListPartCategoriesInput,
} from '#shared/validators/part-category'
import type {
  CreatePartInput,
  UpdatePartInput,
  ListPartsInput,
} from '#shared/validators/part'

interface PartsStoreState {
  // Domain state
  parts: Part[]
  partCategories: PartCategory[]
  categoryTree: any[] // Tree structure
  currentPart: Part | null
  currentCategory: PartCategory | null

  // UI state
  loading: boolean
  error: string | null
}

/**
 * Parts Store - Manages parts and part categories
 *
 * Handles all API calls for:
 * - Parts (CRUD operations)
 * - Part categories (CRUD operations, tree structure, move operations)
 *
 * @example
 * const partsStore = usePartsStore()
 * await partsStore.fetchParts()
 * const activeParts = partsStore.activeParts
 */
export const usePartsStore = defineStore('parts', {
  state: (): PartsStoreState => ({
    // Domain state
    parts: [],
    partCategories: [],
    categoryTree: [],
    currentPart: null,
    currentCategory: null,

    // UI state
    loading: false,
    error: null,
  }),

  getters: {
    /**
     * Get all active parts
     */
    activeParts: (state) => state.parts.filter(p => p.active),

    /**
     * Get parts by category ID
     */
    partsByCategory: (state) => (categoryId: string) => {
      return state.parts.filter(p => p.categoryId === categoryId)
    },

    /**
     * Get active categories
     */
    activeCategories: (state) => state.partCategories.filter(c => c.active),
  },

  actions: {
    // ========================================
    // PART CATEGORIES
    // ========================================

    /**
     * Fetch paginated list of part categories
     * @param params - Filter and pagination parameters
     * @returns Promise<boolean> - Success/failure
     */
    async fetchCategories(params?: Partial<ListPartCategoriesInput>) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/part-categories', {
          method: 'GET',
          query: params,
        })

        if (ok) {
          this.partCategories = payload.data
          return true
        }
        return false
      } catch (err: any) {
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch category tree structure (hierarchical)
     * @param parentId - Optional parent category ID to fetch subtree
     * @returns Promise<boolean> - Success/failure
     */
    async fetchCategoryTree(parentId?: string) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/part-categories', {
          method: 'GET',
          query: {
            tree: 'true',
            parentId,
          },
        })

        if (ok) {
          this.categoryTree = payload.data
          return true
        }
        return false
      } catch (err: any) {
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch single part category by ID
     * @param id - Category ID
     * @returns Promise<boolean> - Success/failure
     */
    async fetchCategory(id: string) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/part-categories/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.currentCategory = payload.data
          return true
        }
        return false
      } catch (err: any) {
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Create a new part category
     * @param data - Category creation data
     * @returns Promise<PartCategory | null> - Created category or null
     */
    async createCategory(data: CreatePartCategoryInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/part-categories', {
          method: 'POST',
          body: data,
        })

        if (ok) {
          const newCategory = payload.data
          this.partCategories.push(newCategory)
          toast.success('Category created successfully')
          return newCategory
        }
        return null
      } catch (error) {
        return null
      }
    },

    /**
     * Update an existing part category
     * @param id - Category ID
     * @param data - Updated category data
     * @returns Promise<boolean> - Success/failure
     */
    async updateCategory(id: string, data: UpdatePartCategoryInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/part-categories/${id}`, {
          method: 'PUT',
          body: data,
        })

        if (ok) {
          // Update category in list
          const index = this.partCategories.findIndex(c => c.id === id)
          if (index !== -1) {
            this.partCategories[index] = payload.data
          }

          // Update current category if it's the one being updated
          if (this.currentCategory?.id === id) {
            this.currentCategory = payload.data
          }

          toast.success('Category updated successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Delete a part category
     * @param id - Category ID
     * @param cascade - Whether to cascade delete child categories
     * @returns Promise<boolean> - Success/failure
     */
    async deleteCategory(id: string, cascade: boolean = false) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok } = await extendedFetch(`/v1/part-categories/${id}`, {
          method: 'DELETE',
          query: { cascade: cascade.toString() },
        })

        if (ok) {
          // Remove from list
          this.partCategories = this.partCategories.filter(c => c.id !== id)

          // Clear current category if it was deleted
          if (this.currentCategory?.id === id) {
            this.currentCategory = null
          }

          toast.success('Category deleted successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Move category to a new parent
     * @param id - Category ID
     * @param newParentId - New parent category ID (null for root level)
     * @returns Promise<boolean> - Success/failure
     */
    async moveCategory(id: string, newParentId: string | null) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/part-categories/${id}/move`, {
          method: 'POST',
          body: { newParentId },
        })

        if (ok) {
          // Update category in list
          const index = this.partCategories.findIndex(c => c.id === id)
          if (index !== -1) {
            this.partCategories[index] = payload.data
          }

          toast.success('Category moved successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========================================
    // PARTS
    // ========================================

    /**
     * Fetch paginated list of parts
     * @param params - Filter and pagination parameters
     * @returns Promise<boolean> - Success/failure
     */
    async fetchParts(params?: Partial<ListPartsInput>) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/parts', {
          method: 'GET',
          query: params,
        })

        if (ok) {
          this.parts = payload.data
          return true
        }
        return false
      } catch (err: any) {
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch single part by ID
     * @param id - Part ID
     * @returns Promise<boolean> - Success/failure
     */
    async fetchPart(id: string) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/parts/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.currentPart = payload.data
          return true
        }
        return false
      } catch (err: any) {
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Create a new part
     * @param data - Part creation data
     * @returns Promise<Part | null> - Created part or null
     */
    async createPart(data: CreatePartInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/parts', {
          method: 'POST',
          body: data,
        })

        if (ok) {
          const newPart = payload.data
          this.parts.push(newPart)
          toast.success('Part created successfully')
          return newPart
        }
        return null
      } catch (error) {
        return null
      }
    },

    /**
     * Update an existing part
     * @param id - Part ID
     * @param data - Updated part data
     * @returns Promise<boolean> - Success/failure
     */
    async updatePart(id: string, data: UpdatePartInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/parts/${id}`, {
          method: 'PUT',
          body: data,
        })

        if (ok) {
          // Update part in list
          const index = this.parts.findIndex(p => p.id === id)
          if (index !== -1) {
            this.parts[index] = payload.data
          }

          // Update current part if it's the one being updated
          if (this.currentPart?.id === id) {
            this.currentPart = payload.data
          }

          toast.success('Part updated successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Delete a part
     * @param id - Part ID
     * @returns Promise<boolean> - Success/failure
     */
    async deletePart(id: string) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok } = await extendedFetch(`/v1/parts/${id}`, {
          method: 'DELETE',
        })

        if (ok) {
          // Remove from list
          this.parts = this.parts.filter(p => p.id !== id)

          // Clear current part if it was deleted
          if (this.currentPart?.id === id) {
            this.currentPart = null
          }

          toast.success('Part deleted successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Reset store to initial state
     * Called on user signout
     */
    reset() {
      this.parts = []
      this.partCategories = []
      this.categoryTree = []
      this.currentPart = null
      this.currentCategory = null
      this.loading = false
      this.error = null
    },
  },

  persist: {
    // Don't persist loading/error states or large data arrays
    omit: ['loading', 'error', 'parts', 'partCategories', 'categoryTree'],
  },
})
