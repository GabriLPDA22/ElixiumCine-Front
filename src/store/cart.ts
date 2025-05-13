// src/store/cart.ts
import { defineStore } from 'pinia'
import type { Product } from '@/types/Product'
import type { Seat } from '@/types/Seat'
import productService from '@/services/productService'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  type: 'product' | 'seat'
  imageUrl?: string
}

interface CartState {
  seats: Seat[]
  products: CartItem[]
  movieTitle: string | null
  cineName: string | null
  date: string | null
  time: string | null
  room: string | null
  sessionId: number | null
  totalPrice: number
  loading: boolean
  error: string | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    seats: [],
    products: [],
    movieTitle: null,
    cineName: null,
    date: null,
    time: null,
    room: null,
    sessionId: null,
    totalPrice: 0,
    loading: false,
    error: null
  }),

  getters: {
    normalSeatCount: (state) => {
      return state.seats.filter(seat => seat.categoria === 'Estandar').length
    },

    vipSeatCount: (state) => {
      return state.seats.filter(seat => seat.categoria === 'VIP').length
    },

    /**
     * Get total order price (seats + products)
     */
    orderTotal: (state) => {
      // Calculate seats price
      const seatsPrice = state.seats.reduce((total, seat) => {
        return total + (seat.categoria === 'Estandar' ? 6.9 : 8.1)
      }, 0)

      // Calculate products price
      const productsPrice = state.products.reduce((total, product) => {
        return total + (product.price * product.quantity)
      }, 0)

      return seatsPrice + productsPrice
    }
  },

  actions: {
    /**
     * Set session information
     */
    setSessionInfo(info: {
      movieTitle: string
      cineName: string
      date: string
      time: string
      room: string
      sessionId: number
    }) {
      this.movieTitle = info.movieTitle
      this.cineName = info.cineName
      this.date = info.date
      this.time = info.time
      this.room = info.room
      this.sessionId = info.sessionId
    },

    /**
     * Add seats to cart
     */
    addSeats(seats: Seat[]) {
      this.seats = seats
      this.calculateTotal()
    },

    /**
     * Add product to cart
     */
    addProduct(product: Product, quantity: number = 1) {
      const existingProduct = this.products.find(p => p.id === product.id)

      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        this.products.push({
          id: product.id,
          name: product.nombre,
          price: product.precio,
          quantity,
          type: 'product',
          imageUrl: product.imagenUrl
        })
      }

      this.calculateTotal()
    },

    /**
     * Update product quantity
     */
    updateProductQuantity(productId: number, quantity: number) {
      const product = this.products.find(p => p.id === productId)

      if (product) {
        product.quantity = quantity

        // Remove product if quantity is 0
        if (quantity <= 0) {
          this.products = this.products.filter(p => p.id !== productId)
        }

        this.calculateTotal()
      }
    },

    /**
     * Remove product from cart
     */
    removeProduct(productId: number) {
      this.products = this.products.filter(p => p.id !== productId)
      this.calculateTotal()
    },

    /**
     * Calculate total price
     */
    calculateTotal() {
      // Calculate seats price
      const seatsPrice = this.seats.reduce((total, seat) => {
        return total + (seat.categoria === 'Estandar' ? 6.9 : 8.1)
      }, 0)

      // Calculate products price
      const productsPrice = this.products.reduce((total, product) => {
        return total + (product.price * product.quantity)
      }, 0)

      this.totalPrice = seatsPrice + productsPrice
    },

    /**
     * Clear cart
     */
    clearCart() {
      this.seats = []
      this.products = []
      this.movieTitle = null
      this.cineName = null
      this.date = null
      this.time = null
      this.room = null
      this.sessionId = null
      this.totalPrice = 0
    },

    /**
     * Fetch product details by IDs
     */
    async fetchProductDetails(productIds: number[]) {
      if (productIds.length === 0) return []

      this.loading = true
      this.error = null

      try {
        const response = await productService.getProductsByIds(productIds)
        return response.data
      } catch (error) {
        this.error = 'Error al cargar los detalles de los productos'
        console.error(error)
        return []
      } finally {
        this.loading = false
      }
    }
  }
})
