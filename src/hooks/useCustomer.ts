import { getCustomerById } from '@/api/customerApi.ts'
import { Customer } from '@/types/customer'
import { useQuery } from '@tanstack/react-query'

export const useCustomerById = (id: number) => {
  return useQuery<Customer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await getCustomerById(id)
      return response.data
    },
  })
}
