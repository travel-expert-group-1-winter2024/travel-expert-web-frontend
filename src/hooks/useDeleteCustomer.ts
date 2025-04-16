import { deleteCustomerById } from '@/api/customerApi.ts'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: async (id?: number) => {
      if (id === undefined) throw new Error('Customer ID is undefined')
      await deleteCustomerById(id)
      return
    },
  })
}
