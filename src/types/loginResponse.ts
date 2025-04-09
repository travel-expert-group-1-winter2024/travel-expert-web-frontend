import { User } from '@/types/userInfo.ts'

export interface LoginResponse {
  data: User
  token: string
}
