// src/services/productService.ts
import apiClient from './api'
import type { Product } from '@/types/Product'

export default {
  /**
   * Get all products
   */
  getProducts(categoria?: string) {
    return apiClient.get<Product[]>('/Productos/GetProductos', {
      params: { categoria }
    })
  },

  /**
   * Get products by IDs
   */
  getProductsByIds(ids: number[]) {
    return apiClient.get<Product[]>(`/Productos/GetProductos?ids=${ids.join(',')}`)
  },

  /**
   * Get product categories
   */
  getCategories() {
    return apiClient.get<string[]>('/Productos/GetCategorias')
  }
}
