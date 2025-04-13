import { createBooking } from '@/api/bookingApi.ts'
import { BookingCreationRequest } from '@/types/booking.ts'
import { useMutation } from '@tanstack/react-query'

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async ({
      token,
      bookingData,
    }: {
      token: string
      bookingData: BookingCreationRequest
    }) => {
      const response = await createBooking(token, bookingData)
      return response.data
    },
  })
}
