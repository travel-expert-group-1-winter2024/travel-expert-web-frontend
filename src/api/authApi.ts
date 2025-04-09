import api from '@/api/axios.ts'
import { LoginRequest } from '@/types/auth.ts'
import { LoginResponse } from '@/types/loginResponse.ts'

export const userLogin = (data: LoginRequest) =>
  api.post<LoginResponse>('/api/login', data)
