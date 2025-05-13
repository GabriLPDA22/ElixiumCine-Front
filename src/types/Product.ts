// src/types/Product.ts
export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagenUrl: string
  categoria: string
  alergenos?: string[]
  cantidad?: number
}
