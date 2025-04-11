export interface User {
  id: number
  name: string
  email: string
  roles: string[]
  customerId: number
  agentId?: number
}
