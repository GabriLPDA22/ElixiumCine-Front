// src/types/User.ts
export interface User {
  id?: number
  nombre: string
  correo: string
  token?: string
}

export interface LoginCredentials {
  correo: string
  contraseña: string
}

export interface RegisterCredentials {
  nombre: string
  correo: string
  contraseña: string
}
