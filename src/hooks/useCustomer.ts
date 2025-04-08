import { getCustomerById } from '@/api/customerApi.ts'
import { Customer } from '@/types/customer'
import { useQuery } from '@tanstack/react-query'

export const useCustomer = (id: number) => {
  return useQuery<Customer[]>({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await getCustomerById(id)
      return response.data
    },
  })
}
