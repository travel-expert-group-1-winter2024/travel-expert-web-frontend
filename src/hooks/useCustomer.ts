import api from '@/api/axios.ts'
import { useQuery } from '@tanstack/react-query'
import { Customer } from '@/types/customer'

export const useCustomer = (id: number) => {
  return useQuery<Customer[]>({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await api.get(`/customers/${id}`)
      return response.data
    },
  })
}
