import api from '@/api/axios'
import { useMutation } from '@tanstack/react-query'

interface BookingData {
  tripTypeId: string
  travelerCount: number
  packageId: number
}

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (bookingData: BookingData) => {
      debugger
      const token = localStorage.getItem('site')?.toString();
      const response = await api.post('/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    onSuccess: (data) => {
      console.log('Booking successful:', data)
    },
    onError: (error) => {
      console.error('Booking failed:', error)
    },
  })
}
