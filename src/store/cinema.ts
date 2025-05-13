// src/store/cinema.ts
import { defineStore } from 'pinia'
import type { Cinema } from '@/types/Cinema'
import cinemaService from '@/services/cinemaService'

interface CinemaState {
  cinemas: Cinema[]
  currentCinema: Cinema | null
  loading: boolean
  error: string | null
}

export const useCinemaStore = defineStore('cinema', {
  state: (): CinemaState => ({
    cinemas: [],
    currentCinema: null,
    loading: false,
    error: null
  }),

  actions: {
    /**
     * Fetch all cinemas
     */
    async fetchCinemas() {
      this.loading = true
      this.error = null

      try {
        const response = await cinemaService.getCinemas()
        this.cinemas = response.data
      } catch (error) {
        this.error = 'Error al cargar los cines'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch cinema by ID
     */
    async fetchCinemaById(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await cinemaService.getCinemaById(id)
        this.currentCinema = response.data
      } catch (error) {
        this.error = 'Error al cargar el cine'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch cinema with movies
     */
    async fetchCinemaWithMovies(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await cinemaService.getCinemaWithMovies(id)
        this.currentCinema = response.data
      } catch (error) {
        this.error = 'Error al cargar el cine con películas'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Reset current cinema
     */
    resetCurrentCinema() {
      this.currentCinema = null
    },

    /**
     * Get reserved seats for a session
     */
    async getReservedSeats(params: {
      cineName: string;
      date: string;
      sesionId: number;
    }) {
      try {
        const response = await cinemaService.getReservedSeats(params)
        return response.data
      } catch (error) {
        this.error = 'Error al obtener las butacas reservadas'
        console.error(error)
        return []
      }
    }
  }
})
