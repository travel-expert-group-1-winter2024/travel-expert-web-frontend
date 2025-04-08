import { getPackageDetails } from '@/api/packageApi.ts'
import { useQuery } from '@tanstack/react-query'

export const usePackageDetails = (packageId: string) => {
  return useQuery({
    queryKey: ['package', packageId],
    queryFn: async () => {
      const response = await getPackageDetails(packageId)
      return response.data
    },
  })
}