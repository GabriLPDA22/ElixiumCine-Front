// src/types/Movie.ts
import type { Session } from './Session'

export interface Movie {
  id: number
  titulo: string
  descripcion: string
  duracion: string
  genero: string
  fechaEstreno: string
  director: string
  actores: string
  calificacion: number
  imagen: string       // URL de la imagen de fondo/banner
  cartel: string       // URL del cartel de la película
  edadRecomendada: number
  imagenEdadRecomendada: string
  enCartelera?: boolean
  proximoEstreno?: boolean
  ventaAnticipada?: boolean
  sesiones?: Record<string, Record<string, Session[]>> // Formato: {cineName: {date: [sessions]}}
}
