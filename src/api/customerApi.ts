import api from '@/api/axios.ts'

export const getCustomerById = (customerId: number) =>
  api.get(`/customers/${customerId}`)
