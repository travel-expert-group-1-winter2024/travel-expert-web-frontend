import { getBookDetailByCustomerId } from '@/api/bookingApi.ts'
import { bookingDetail } from '@/types/bookingDetail.ts'
import { useQuery } from '@tanstack/react-query'

export const useBookingDetails = (customerId: number) => {
  return useQuery<bookingDetail[]>({
    queryKey: ['bookingDetail', customerId],
    queryFn: async () => {
      const response = await getBookDetailByCustomerId(customerId)
      if (response.status === 200) {
        // If there are errors in the response
        if (response.data.errors) {
          return response.data.errors[0]
        }
        // If no errors, return the booking details
        return response.data.data || [] // Ensure data is in the expected format
      } else {
        throw new Error('Unexpected API response')
      }
    },
  })
}
