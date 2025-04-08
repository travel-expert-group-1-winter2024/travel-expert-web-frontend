import { getSearchAndSortPackage } from '@/api/packageApi.ts'
import { Package } from '@/types/package.ts'
import { useQuery } from '@tanstack/react-query'

export const useSearchAndSortPackage = (params: {
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}) => {
  return useQuery<Package[]>({
    queryKey: ['packages', params],
    queryFn: async () => {
      const response = await getSearchAndSortPackage(params)
      return response.data.data // data was wrap but data : {}
    },
  })
}
