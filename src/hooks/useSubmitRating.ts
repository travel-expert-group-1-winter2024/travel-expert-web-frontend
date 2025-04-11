import api from '@/api/axios'
import { useMutation } from '@tanstack/react-query'

export const useSubmitRating = () => {
  // const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ratingData: {
      packageId: string | undefined
      customerId: number
      rating: number
      comments: string
    }) => {
      const response = await api.post('/api/ratings', ratingData)
      return response.data
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error submitting rating:', error)
    },
  })
}
