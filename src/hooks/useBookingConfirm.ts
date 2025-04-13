import { confirmBooking } from '@/api/bookingApi.ts'
import { BookingConfirmationRequest } from '@/types/booking.ts'
import { useMutation } from '@tanstack/react-query'

export const useBookingConfirm = () => {
  return useMutation({
    mutationFn: async ({
      token,
      bookingData,
    }: {
      token: string
      bookingData: BookingConfirmationRequest
    }) => {
      const response = await confirmBooking(token, bookingData)
      return response.data
    },
  })
}
