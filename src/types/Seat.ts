// src/types/Seat.ts
export interface Seat {
  id: string
  descripcion: string
  estaOcupado: boolean
  categoria: 'Estandar' | 'VIP'
  suplemento: number
  fila?: number
  columna?: number
  seleccionado?: boolean
}

export interface SeatLayout {
  rows: number[][]
  vipRows: number[][]
}
