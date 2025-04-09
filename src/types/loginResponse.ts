export interface LoginResponse {
  data: User
  token: string
}

export interface User {
  id: number
  name: string
  email: string
  roles: string[]
}
