import { GeneralApiResponse } from '@/types/generalApiResponse.ts'

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse<T> extends GeneralApiResponse<T> {
  token: string
}

export interface SignUpProps {
  custfirstname: string
  custlastname: string
  custaddress: string
  custcity: string
  custprov: string
  custpostal: string
  custcountry: string
  custhomephone: string
  custbusphone: string
  custemail: string
  password: string
}
