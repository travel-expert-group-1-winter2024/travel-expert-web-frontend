import { getRatings } from '@/api/ratingApi.ts'
import { ratingsView } from '@/types/ratings'
import { useQuery } from '@tanstack/react-query'

export const useRatings = (packageId?: number) => {
  return useQuery<ratingsView[]>({
    queryKey: ['getAllRatings', packageId],
    queryFn: async () => {
      const response = await getRatings(packageId!)
      return response.data
    },
    enabled: !!packageId,
    initialData: [],
  })
}
