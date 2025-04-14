import {
  getCustomerById,
  getCustomerPhoto,
  updateCustomerById,
  uploadCustomerPhoto,
} from '@/api/customerApi.ts'
import { Customer } from '@/types/customer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCustomerById = (
  id?: number,
  userPhotoUrl?: string,
  isAuthLoading?: boolean,
) => {
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
      if (!userPhotoUrl) {
        try {
          const response = await getCustomerPhoto(id)
          const photoUrl = response.data.imageURL
          return { ...customerData, photoUrl }
        } catch {
          return { ...customerData, photoUrl: '' }
        }
      }
      return { ...customerData, photoUrl: userPhotoUrl }
    },
    enabled: !!id && !isAuthLoading,
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
    onError: (error) => {
      console.error('Error updating customer:', error)
    },
  })

  const uploadPhoto = useMutation({
    mutationFn: async (image: File) => {
      if (id === undefined) throw new Error('Customer ID is undefined')
      const res = await uploadCustomerPhoto(id, image)
      return res.data.data.imageURL
    },
    onSuccess: (imageURL) => {
      queryClient.setQueryData(['customer', id], (old: Customer | undefined) =>
        old ? { ...old, photo_path: imageURL, photoUrl: imageURL } : undefined,
      )
    },
    onError: (error) => {
      console.error('Error uploading photo:', error)
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
