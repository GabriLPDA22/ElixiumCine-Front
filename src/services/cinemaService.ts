// src/services/cinemaService.ts
import apiClient from './api'
import type { Cinema } from '@/types/Cinema'

export default {
  /**
   * Get all cinemas
   */
  getCinemas() {
    return apiClient.get<Cinema[]>('/Cine/GetCines')
  },

  /**
   * Get cinema by ID
   */
  getCinemaById(id: number) {
    return apiClient.get<Cinema>(`/Cine/GetCineById?cineId=${id}`)
  },

  /**
   * Get cinema with movies
   */
  getCinemaWithMovies(id: number) {
    return apiClient.get<Cinema>(`/Cine/GetCineConPeliculas?cineId=${id}`)
  },

  /**
   * Get seat selection info for a specific session
   */
  getSeatSelectionInfo(params: {
    cineName: string;
    movieTitle: string;
    sessionDate: string;
    sessionTime: string;
  }) {
    return apiClient.get('/Cine/GetSeatSelectionInfo', { params })
  },

  /**
   * Get reserved seats for a specific session
   */
  getReservedSeats(params: {
    cineName: string;
    date: string;
    sesionId: number;
  }) {
    return apiClient.get('/Pedido/GetButacasReservadas', { params })
  }
}
