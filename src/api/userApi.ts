import api from '@/api/axios.ts'
import { GeneralApiResponse } from '@/types/generalApiResponse.ts'

export const getUserIdByReference = (params: {
  customerId?: number
  agentId?: number
}) =>
  api.get<GeneralApiResponse<{ userId: string }>>('/api/users/by-reference', {
    params,
  })
