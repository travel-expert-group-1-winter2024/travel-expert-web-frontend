import { getAllAgencies } from '@/api/agencyApi.ts'
import { useQuery } from '@tanstack/react-query'

export const useAgencies = () => {
  return useQuery({
    queryKey: ['agencies'],
    queryFn: async () => {
      const response = await getAllAgencies()
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
