import { topUpWallet } from '@/api/walletApi.ts'
import { topUpWalletRequest } from '@/types/wallet.ts'
import { useMutation } from '@tanstack/react-query'

export const useTopUpWallet = () => {
  return useMutation({
    mutationFn: async (data: topUpWalletRequest) => {
      const response = await topUpWallet(data)
      return response.data
    },
  })
}
