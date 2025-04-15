import { getUserIdByReference } from '@/api/userApi.ts'
import { useQuery } from '@tanstack/react-query'

export const useAgentUserIdByReference = (agentId?: number) => {
  return useQuery({
    queryKey: ['userIdByReference', agentId],
    queryFn: async () => {
      if (!agentId) return null
      const response = await getUserIdByReference({ agentId })
      return response.data
    },
    enabled: !!agentId,
  })
}
