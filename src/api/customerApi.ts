import api from '@/api/axios.ts'
import { Customer } from '@/types/customer.ts'

export const getCustomerById = (customerId: number) =>
  api.get<Customer>(`/api/customers/${customerId}`)
