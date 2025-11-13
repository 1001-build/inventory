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

export function useStock() {
  const { $fetch } = useExtendedFetch()
  const { handleError } = useErrorHandler()
  const { showToast } = useShowToast()

  // ========================================
  // STOCK LOCATIONS
  // ========================================

  /**
   * Fetch paginated list of stock locations
   */
  const fetchLocations = async (params?: Partial<ListStockLocationsInput>) => {
    try {
      const response = await $fetch('/api/v1/stock-locations', {
        method: 'GET',
        query: params,
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch stock locations')
      throw error
    }
  }

  /**
   * Fetch location tree structure (hierarchical)
   */
  const fetchLocationTree = async (parentId?: string) => {
    try {
      const response = await $fetch('/api/v1/stock-locations', {
        method: 'GET',
        query: {
          tree: 'true',
          parentId,
        },
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch location tree')
      throw error
    }
  }

  /**
   * Fetch single stock location by ID
   */
  const fetchLocation = async (id: string) => {
    try {
      const response = await $fetch(`/api/v1/stock-locations/${id}`, {
        method: 'GET',
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch location')
      throw error
    }
  }

  /**
   * Create a new stock location
   */
  const createLocation = async (data: CreateStockLocationInput) => {
    try {
      const response = await $fetch('/api/v1/stock-locations', {
        method: 'POST',
        body: data,
      })
      showToast('Location created successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to create location')
      throw error
    }
  }

  /**
   * Update an existing stock location
   */
  const updateLocation = async (id: string, data: UpdateStockLocationInput) => {
    try {
      const response = await $fetch(`/api/v1/stock-locations/${id}`, {
        method: 'PUT',
        body: data,
      })
      showToast('Location updated successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to update location')
      throw error
    }
  }

  /**
   * Delete a stock location
   */
  const deleteLocation = async (id: string, cascade: boolean = false) => {
    try {
      const response = await $fetch(`/api/v1/stock-locations/${id}`, {
        method: 'DELETE',
        query: { cascade: cascade.toString() },
      })
      showToast('Location deleted successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to delete location')
      throw error
    }
  }

  // ========================================
  // STOCK ITEMS
  // ========================================

  /**
   * Fetch paginated list of stock items
   */
  const fetchStockItems = async (params?: Partial<ListStockItemsInput>) => {
    try {
      const response = await $fetch('/api/v1/stock-items', {
        method: 'GET',
        query: params,
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch stock items')
      throw error
    }
  }

  /**
   * Fetch single stock item by ID
   */
  const fetchStockItem = async (id: string) => {
    try {
      const response = await $fetch(`/api/v1/stock-items/${id}`, {
        method: 'GET',
      })
      return response
    } catch (error) {
      handleError(error, 'Failed to fetch stock item')
      throw error
    }
  }

  /**
   * Create a new stock item
   */
  const createStockItem = async (data: CreateStockItemInput) => {
    try {
      const response = await $fetch('/api/v1/stock-items', {
        method: 'POST',
        body: data,
      })
      showToast('Stock item created successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to create stock item')
      throw error
    }
  }

  /**
   * Update an existing stock item
   */
  const updateStockItem = async (id: string, data: UpdateStockItemInput) => {
    try {
      const response = await $fetch(`/api/v1/stock-items/${id}`, {
        method: 'PUT',
        body: data,
      })
      showToast('Stock item updated successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to update stock item')
      throw error
    }
  }

  /**
   * Delete a stock item
   */
  const deleteStockItem = async (id: string) => {
    try {
      const response = await $fetch(`/api/v1/stock-items/${id}`, {
        method: 'DELETE',
      })
      showToast('Stock item deleted successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to delete stock item')
      throw error
    }
  }

  /**
   * Move stock item to a new location
   */
  const moveStockItem = async (id: string, locationId: string) => {
    try {
      const response = await $fetch(`/api/v1/stock-items/${id}/move`, {
        method: 'POST',
        body: { locationId },
      })
      showToast('Stock item moved successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to move stock item')
      throw error
    }
  }

  /**
   * Adjust stock item quantity
   */
  const adjustQuantity = async (id: string, adjustment: AdjustQuantityInput['adjustment']) => {
    try {
      const response = await $fetch(`/api/v1/stock-items/${id}/adjust`, {
        method: 'POST',
        body: { adjustment },
      })
      showToast('Quantity adjusted successfully', 'success')
      return response
    } catch (error) {
      handleError(error, 'Failed to adjust quantity')
      throw error
    }
  }

  return {
    // Stock Locations
    fetchLocations,
    fetchLocationTree,
    fetchLocation,
    createLocation,
    updateLocation,
    deleteLocation,

    // Stock Items
    fetchStockItems,
    fetchStockItem,
    createStockItem,
    updateStockItem,
    deleteStockItem,
    moveStockItem,
    adjustQuantity,
  }
}
