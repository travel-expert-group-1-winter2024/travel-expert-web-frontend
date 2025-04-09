import api from '@/api/axios.ts'
import { LoginResponse } from '@/types/loginResponse.ts'

export const userLogin = (data: { username: string; password: string }) =>
  api.post<LoginResponse>('/api/login', data)
