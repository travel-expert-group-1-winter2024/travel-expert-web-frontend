export interface User {
  id: string
  name: string
  email: string
  roles: string[]
  customerId?: number
  agentId?: number
  photoUrl?: string
}
