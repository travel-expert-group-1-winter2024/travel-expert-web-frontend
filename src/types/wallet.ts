export interface Wallet {
  id: string
  customerId: number
  balance: number
  lastUpdated: string
}

export interface topUpWalletRequest {
  amount: number
  description: string
}

export interface topUpWalletResponse {
  walletId: string
  balance: number
  lastUpdated: string
}
