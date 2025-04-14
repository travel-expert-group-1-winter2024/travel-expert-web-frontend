import api from '@/api/axios'
import { Wallet } from '@/types/wallet'
import { useQuery } from '@tanstack/react-query'

export const useWallet = () => {
  return useQuery<Wallet>({
    queryKey: ['getWalletBalance'],
    queryFn: () =>
      api.get('/api/wallet-balance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('site')}`,
          },
        })
        .then((res) => res.data.data),
  })
}