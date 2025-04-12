import { getCustomerById, getCustomerPhoto, updateCustomerById, uploadCustomerPhoto } from '@/api/customerApi.ts'
import { Customer } from '@/types/customer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCustomerById = (id: number) => {
  const queryClient = useQueryClient()

  const { data: customer, isLoading, error } = useQuery<Customer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const customerData = (await getCustomerById(id)).data;
      try {
        const photoUrl = await getCustomerPhoto(id);
        return { ...customerData, photoUrl };
      } catch {
        return { ...customerData, photoUrl: '' };
      }
    },
  });

  const updateCustomer = useMutation({
    mutationFn: (data: Partial<Customer>) => 
      updateCustomerById(id, data).then(res => res.data),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['customer', id], updatedData);
    }
  });

  const uploadPhoto = useMutation({
    mutationFn: (image: File) => 
      uploadCustomerPhoto(id, image).then(res => res.data),
    onSuccess: (imagePath) => {
      queryClient.setQueryData(['customer', id], (old: Customer | undefined) => 
        old ? { ...old, photo_path: imagePath } : undefined
      );
    }
  });

  return {
    customer,
    isLoading,
    error,
    updateCustomer: updateCustomer.mutateAsync,
    uploadPhoto: uploadPhoto.mutateAsync,
    isUpdating: updateCustomer.isPending || uploadPhoto.isPending,
  };
}
