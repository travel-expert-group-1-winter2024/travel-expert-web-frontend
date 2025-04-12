import api from '@/api/axios.ts'
import { Customer } from '@/types/customer.ts'

export const getCustomerById = (customerId: number) =>
  api.get<Customer>(`/api/customers/${customerId}`)

export const updateCustomerById = (customerId: number, data: Partial<Customer>) =>
  api.put<Customer>(`/api/customers/${customerId}`, data)

export const uploadCustomerPhoto = (customerId: number, image: File) => {
  const formData = new FormData()
  formData.append('image', image)
  return api.post<string>(`/api/customers/${customerId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getCustomerPhoto = async (id: number): Promise<string> => {
  const response = await api.get(`/api/customers/${id}/photo`, {
    responseType: 'blob' // Important for binary data
  });
  return URL.createObjectURL(response.data);
};