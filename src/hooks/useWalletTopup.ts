import api from "@/api/axios"
import { useWallet } from "./useWallet"

export interface topUpWallet{
    amount:number,
    description:string
}

export const topUpWallet = (topupData:topUpWallet) => {
    const token = localStorage.getItem('site')?.toString()
    return api.post(
      '/api/wallet/topup',topupData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }