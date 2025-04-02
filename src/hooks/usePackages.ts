import api from '@/api/axios.ts'
import { Package } from '@/types/package.ts'
import { useQuery } from '@tanstack/react-query'

export const usePackages = () => {
  return useQuery<Package[]>({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await api.get('/packages')
      return response.data
    },
  })
}
