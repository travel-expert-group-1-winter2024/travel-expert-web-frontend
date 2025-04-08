import { getPackages } from '@/api/packageApi.ts'
import { Package } from '@/types/package.ts'
import { useQuery } from '@tanstack/react-query'

export const usePackages = () => {
  return useQuery<Package[]>({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await getPackages()
      return response.data
    },
  })
}
