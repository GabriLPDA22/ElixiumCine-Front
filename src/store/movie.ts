// src/store/movie.ts
import { defineStore } from 'pinia'
import type { Movie } from '@/types/Movie'
import movieService from '@/services/movieService'

interface MovieState {
  movies: Movie[]
  currentMovie: Movie | null
  moviesInTheater: Movie[]
  upcomingMovies: Movie[]
  preSaleMovies: Movie[]
  loading: boolean
  error: string | null
}

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    movies: [],
    currentMovie: null,
    moviesInTheater: [],
    upcomingMovies: [],
    preSaleMovies: [],
    loading: false,
    error: null
  }),

  getters: {
    /**
     * Get unique movies by title
     */
    uniqueMovies: (state) => {
      const uniqueMoviesMap = new Map<string, Movie>()

      state.movies.forEach(movie => {
        if (!uniqueMoviesMap.has(movie.titulo)) {
          uniqueMoviesMap.set(movie.titulo, movie)
        }
      })

      return Array.from(uniqueMoviesMap.values())
    }
  },

  actions: {
    /**
     * Fetch all movies
     */
    async fetchMovies() {
      this.loading = true
      this.error = null

      try {
        const response = await movieService.getMovies()
        this.movies = response.data
      } catch (error) {
        this.error = 'Error al cargar las películas'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch movie by ID
     */
    async fetchMovieById(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await movieService.getMovieById(id)
        this.currentMovie = response.data
      } catch (error) {
        this.error = 'Error al cargar la película'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch movies in theater
     */
    async fetchMoviesInTheater() {
      this.loading = true
      this.error = null

      try {
        const response = await movieService.getMoviesInTheater()
        this.moviesInTheater = response.data
      } catch (error) {
        this.error = 'Error al cargar las películas en cartelera'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch upcoming movies
     */
    async fetchUpcomingMovies() {
      this.loading = true
      this.error = null

      try {
        const response = await movieService.getUpcomingMovies()
        this.upcomingMovies = response.data
      } catch (error) {
        this.error = 'Error al cargar las películas próximas'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch pre-sale movies
     */
    async fetchPreSaleMovies() {
      this.loading = true
      this.error = null

      try {
        const response = await movieService.getPreSaleMovies()
        this.preSaleMovies = response.data
      } catch (error) {
        this.error = 'Error al cargar las películas en venta anticipada'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Reset current movie
     */
    resetCurrentMovie() {
      this.currentMovie = null
    }
  }
})
