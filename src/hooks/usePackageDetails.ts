import { useQuery } from '@tanstack/react-query'
import api from '@/api/axios.ts'

export const usePackageDetails = (packageId: string) => {
  return useQuery({
    queryKey: ['package', packageId],
    queryFn: async () => {
      const response = await api.get(`/packages/${packageId}/details`)
      console.log("Response from hook: ", response)
      return response.data
    },
  })
}