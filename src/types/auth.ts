import { GeneralApiResponse } from '@/types/generalApiResponse.ts'

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse<T> extends GeneralApiResponse<T> {
  token: string
}
