import api from '@/api/axios.ts'
import { AuthResponse, LoginRequest, SignUpProps } from '@/types/auth.ts'
import { GeneralApiResponse } from '@/types/generalApiResponse.ts'
import { User } from '@/types/userInfo.ts'

export const userLogin = (data: LoginRequest) =>
  api.post<AuthResponse<User>>('/api/login', data)

export const userRegister = (data: SignUpProps) =>
  api.post('/api/customers/register', data)

export const authUser = (token: string) =>
  api.get<GeneralApiResponse<User>>('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
