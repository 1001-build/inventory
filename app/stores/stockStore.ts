import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import type { StockItem } from '#shared/types/stock-item'
import type { StockLocation } from '#shared/types/stock-location'
import type {
  CreateStockLocationInput,
  UpdateStockLocationInput,
  ListStockLocationsInput,
} from '#shared/validators/stock-location'
import type {
  CreateStockItemInput,
  UpdateStockItemInput,
  ListStockItemsInput,
  AdjustQuantityInput,
} from '#shared/validators/stock-item'

interface StockStoreState {
  // Domain state
  stockItems: StockItem[]
  stockLocations: StockLocation[]
  locationTree: any[] // Tree structure
  currentStockItem: StockItem | null
  currentLocation: StockLocation | null

  // UI state
  loading: boolean
  error: string | null
}

/**
 * Stock Store - Manages stock items and locations
 *
 * Handles all API calls for:
 * - Stock items (CRUD operations, move, adjust quantity)
 * - Stock locations (CRUD operations, tree structure)
 *
 * @example
 * const stockStore = useStockStore()
 * await stockStore.fetchStockItems()
 * const lowStockItems = stockStore.lowStockItems
 */
export const useStockStore = defineStore('stock', {
  state: (): StockStoreState => ({
    // Domain state
    stockItems: [],
    stockLocations: [],
    locationTree: [],
    currentStockItem: null,
    currentLocation: null,

    // UI state
    loading: false,
    error: null,
  }),

  getters: {
    /**
     * Get stock items by location ID
     */
    itemsByLocation: (state) => (locationId: string) => {
      return state.stockItems.filter(item => item.locationId === locationId)
    },

    /**
     * Get stock items by part ID
     */
    itemsByPart: (state) => (partId: string) => {
      return state.stockItems.filter(item => item.partId === partId)
    },

    /**
     * Get stock items with low quantity (assuming minQuantity field exists)
     */
    lowStockItems: (state) => {
      return state.stockItems.filter(item => {
        // Adjust this logic based on your actual schema
        return item.quantity < (item.minQuantity || 10)
      })
    },

    /**
     * Get active locations
     */
    activeLocations: (state) => state.stockLocations.filter(loc => loc.active),
  },

  actions: {
    // ========================================
    // STOCK LOCATIONS
    // ========================================

    /**
     * Fetch paginated list of stock locations
     * @param params - Filter and pagination parameters
     * @returns Promise<any> - API response payload with data and pagination
     */
    async fetchLocations(params?: Partial<ListStockLocationsInput>) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/stock-locations', {
          method: 'GET',
          query: params,
        })

        if (ok) {
          this.stockLocations = payload.data
          return payload
        }
        return { data: [], pagination: {} }
      } catch (err: any) {
        this.error = err.message
        return { data: [], pagination: {} }
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch location tree structure (hierarchical)
     * @param parentId - Optional parent location ID to fetch subtree
     * @returns Promise<any> - API response payload with data
     */
    async fetchLocationTree(parentId?: string) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/stock-locations', {
          method: 'GET',
          query: {
            tree: 'true',
            parentId,
          },
        })

        if (ok) {
          this.locationTree = payload.data
          return payload
        }
        return { data: [] }
      } catch (err: any) {
        this.error = err.message
        return { data: [] }
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch single stock location by ID
     * @param id - Location ID
     * @returns Promise<boolean> - Success/failure
     */
    async fetchLocation(id: string) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/stock-locations/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.currentLocation = payload.data
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
     * Create a new stock location
     * @param data - Location creation data
     * @returns Promise<StockLocation | null> - Created location or null
     */
    async createLocation(data: CreateStockLocationInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/stock-locations', {
          method: 'POST',
          body: data,
        })

        if (ok) {
          const newLocation = payload.data
          this.stockLocations.push(newLocation)
          toast.success('Location created successfully')
          return newLocation
        }
        return null
      } catch (error) {
        return null
      }
    },

    /**
     * Update an existing stock location
     * @param id - Location ID
     * @param data - Updated location data
     * @returns Promise<boolean> - Success/failure
     */
    async updateLocation(id: string, data: UpdateStockLocationInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/stock-locations/${id}`, {
          method: 'PUT',
          body: data,
        })

        if (ok) {
          // Update location in list
          const index = this.stockLocations.findIndex(loc => loc.id === id)
          if (index !== -1) {
            this.stockLocations[index] = payload.data
          }

          // Update current location if it's the one being updated
          if (this.currentLocation?.id === id) {
            this.currentLocation = payload.data
          }

          toast.success('Location updated successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Delete a stock location
     * @param id - Location ID
     * @param cascade - Whether to cascade delete child locations and stock items
     * @returns Promise<boolean> - Success/failure
     */
    async deleteLocation(id: string, cascade: boolean = false) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok } = await extendedFetch(`/v1/stock-locations/${id}`, {
          method: 'DELETE',
          query: { cascade: cascade.toString() },
        })

        if (ok) {
          // Remove from list
          this.stockLocations = this.stockLocations.filter(loc => loc.id !== id)

          // Clear current location if it was deleted
          if (this.currentLocation?.id === id) {
            this.currentLocation = null
          }

          toast.success('Location deleted successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    // ========================================
    // STOCK ITEMS
    // ========================================

    /**
     * Fetch paginated list of stock items
     * @param params - Filter and pagination parameters
     * @returns Promise<any> - API response payload with data and pagination
     */
    async fetchStockItems(params?: Partial<ListStockItemsInput>) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/stock-items', {
          method: 'GET',
          query: params,
        })

        if (ok) {
          this.stockItems = payload.data
          return payload
        }
        return { data: [], pagination: {} }
      } catch (err: any) {
        this.error = err.message
        return { data: [], pagination: {} }
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch single stock item by ID
     * @param id - Stock item ID
     * @returns Promise<boolean> - Success/failure
     */
    async fetchStockItem(id: string) {
      try {
        this.loading = true
        this.error = null

        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/stock-items/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.currentStockItem = payload.data
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
     * Create a new stock item
     * @param data - Stock item creation data
     * @returns Promise<StockItem | null> - Created stock item or null
     */
    async createStockItem(data: CreateStockItemInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch('/v1/stock-items', {
          method: 'POST',
          body: data,
        })

        if (ok) {
          const newItem = payload.data
          this.stockItems.push(newItem)
          toast.success('Stock item created successfully')
          return newItem
        }
        return null
      } catch (error) {
        return null
      }
    },

    /**
     * Update an existing stock item
     * @param id - Stock item ID
     * @param data - Updated stock item data
     * @returns Promise<boolean> - Success/failure
     */
    async updateStockItem(id: string, data: UpdateStockItemInput) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/stock-items/${id}`, {
          method: 'PUT',
          body: data,
        })

        if (ok) {
          // Update item in list
          const index = this.stockItems.findIndex(item => item.id === id)
          if (index !== -1) {
            this.stockItems[index] = payload.data
          }

          // Update current item if it's the one being updated
          if (this.currentStockItem?.id === id) {
            this.currentStockItem = payload.data
          }

          toast.success('Stock item updated successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Delete a stock item
     * @param id - Stock item ID
     * @returns Promise<boolean> - Success/failure
     */
    async deleteStockItem(id: string) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok } = await extendedFetch(`/v1/stock-items/${id}`, {
          method: 'DELETE',
        })

        if (ok) {
          // Remove from list
          this.stockItems = this.stockItems.filter(item => item.id !== id)

          // Clear current item if it was deleted
          if (this.currentStockItem?.id === id) {
            this.currentStockItem = null
          }

          toast.success('Stock item deleted successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Move stock item to a new location
     * @param id - Stock item ID
     * @param locationId - New location ID
     * @returns Promise<boolean> - Success/failure
     */
    async moveStockItem(id: string, locationId: string) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/stock-items/${id}/move`, {
          method: 'POST',
          body: { locationId },
        })

        if (ok) {
          // Update item in list
          const index = this.stockItems.findIndex(item => item.id === id)
          if (index !== -1) {
            this.stockItems[index] = payload.data
          }

          // Update current item if it's the one being moved
          if (this.currentStockItem?.id === id) {
            this.currentStockItem = payload.data
          }

          toast.success('Stock item moved successfully')
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    /**
     * Adjust stock item quantity
     * @param id - Stock item ID
     * @param adjustment - Quantity adjustment data
     * @returns Promise<boolean> - Success/failure
     */
    async adjustQuantity(id: string, adjustment: AdjustQuantityInput['adjustment']) {
      try {
        const { extendedFetch } = useExtendedFetch()
        const { ok, payload } = await extendedFetch(`/v1/stock-items/${id}/adjust`, {
          method: 'POST',
          body: { adjustment },
        })

        if (ok) {
          // Update item in list
          const index = this.stockItems.findIndex(item => item.id === id)
          if (index !== -1) {
            this.stockItems[index] = payload.data
          }

          // Update current item if it's the one being adjusted
          if (this.currentStockItem?.id === id) {
            this.currentStockItem = payload.data
          }

          toast.success('Quantity adjusted successfully')
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
      this.stockItems = []
      this.stockLocations = []
      this.locationTree = []
      this.currentStockItem = null
      this.currentLocation = null
      this.loading = false
      this.error = null
    },
  },

  persist: {
    // Don't persist loading/error states or large data arrays
    omit: ['loading', 'error', 'stockItems', 'stockLocations', 'locationTree'],
  },
})
