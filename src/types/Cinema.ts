// src/types/Cinema.ts
import type { Movie } from './Movie'

export interface Cinema {
  id: number
  nombre: string
  direccion: string
  telefono: string
  imagen: string
  logo: string
  descripcion?: string
  caracteristicas?: string[]
  peliculas?: Movie[]
}
