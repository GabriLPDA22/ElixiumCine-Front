// src/services/movieService.ts
import apiClient from './api'
import type { Movie } from '@/types/Movie'

export default {
  /**
   * Get all movies
   */
  getMovies() {
    return apiClient.get<Movie[]>('/Movie/GetPeliculas')
  },

  /**
   * Get movie by ID
   */
  getMovieById(id: number) {
    return apiClient.get<Movie>(`/Movie/GetPeliculaById?id=${id}`)
  },

  /**
   * Get movies currently in theaters
   */
  getMoviesInTheater() {
    return apiClient.get<Movie[]>('/Movie/GetPeliculasEnCartelera')
  },

  /**
   * Get upcoming movies
   */
  getUpcomingMovies() {
    return apiClient.get<Movie[]>('/Movie/GetPeliculasProximas')
  },

  /**
   * Get pre-sale movies
   */
  getPreSaleMovies() {
    return apiClient.get<Movie[]>('/Movie/GetPeliculasEnVentaAnticipada')
  }
}
