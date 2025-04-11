import { getUserIdByReference } from '@/api/customerApi.ts'
import { useQuery } from '@tanstack/react-query'

export const useUserIdByReference = (customerId?: number, agentId?: number) => {
  return useQuery({
    queryKey: ['userIdByReference', customerId, agentId],
    queryFn: async () => {
      const response = await getUserIdByReference({ customerId, agentId })
      return response.data
    },
    enabled: !!customerId || !!agentId,
  })
}
