import {
  getCustomerById,
  getCustomerPhoto,
  updateCustomerById,
  uploadCustomerPhoto,
} from '@/api/customerApi.ts'
import { Customer } from '@/types/customer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCustomerById = (id?: number) => {
  const queryClient = useQueryClient()
  const {
    data: customer,
    isLoading,
    error,
  } = useQuery<Customer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (id === undefined) throw new Error('Customer ID is undefined')
      const customerData = (await getCustomerById(id)).data
      try {
        const photoUrl = await getCustomerPhoto(id)
        return { ...customerData, photoUrl }
      } catch {
        return { ...customerData, photoUrl: '' }
      }
    },
    enabled: !!id,
  })

  const updateCustomer = useMutation({
    mutationFn: async (data: Partial<Customer>) => {
      if (id === undefined) throw new Error('Customer ID is undefined')
      const res = await updateCustomerById(id, data)
      return res.data
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['customer', id], updatedData)
    },
  })

  const uploadPhoto = useMutation({
    mutationFn: async (image: File) => {
      if (id === undefined) throw new Error('Customer ID is undefined')
      const res = await uploadCustomerPhoto(id, image)
      return res.data
    },
    onSuccess: (imagePath) => {
      queryClient.setQueryData(['customer', id], (old: Customer | undefined) =>
        old ? { ...old, photo_path: imagePath } : undefined,
      )
    },
  })

  return {
    customer,
    isLoading,
    error,
    updateCustomer: updateCustomer.mutateAsync,
    uploadPhoto: uploadPhoto.mutateAsync,
    isUpdating: updateCustomer.isPending || uploadPhoto.isPending,
  }
}
