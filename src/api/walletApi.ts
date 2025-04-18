import api from '@/api/axios.ts'
import { GeneralApiResponse } from '@/types/generalApiResponse.ts'
import { topUpWalletRequest, topUpWalletResponse } from '@/types/wallet.ts'

export const topUpWallet = (data: topUpWalletRequest) => {
  return api.post<GeneralApiResponse<topUpWalletResponse>>(
    '/api/wallet/topup',
    data,
  )
}
