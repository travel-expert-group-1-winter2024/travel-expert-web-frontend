import api from '@/api/axios.ts'
import { LoginRequest } from '@/types/auth.ts'
import { GeneralApiResponse } from '@/types/generalApiResponse.ts'
import { LoginResponse } from '@/types/loginResponse.ts'
import { User } from '@/types/userInfo.ts'

export const userLogin = (data: LoginRequest) =>
  api.post<LoginResponse>('/api/login', data)

export const authUser = (token: string) =>
  api.get<GeneralApiResponse<User>>('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
