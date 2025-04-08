import api from '@/api/axios.ts'

export const getBookDetailByCustomerId = (customerId: number) =>
  api.get(`/api/bookingdetails/${customerId}`)
