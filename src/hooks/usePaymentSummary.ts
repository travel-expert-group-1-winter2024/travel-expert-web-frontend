import api from "@/api/axios"
import { useMutation } from "@tanstack/react-query"

interface PaymentSummaryData {
    tripTypeId: string
    travelerCount: number
    packageId: number
  }


  export const useCostSummary = () => {
    return useMutation({
      mutationFn: async (data: PaymentSummaryData) => {
        const token = localStorage.getItem('site')?.toString();
        const response = await api.post('/api/bookings/cost-summary', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data
      },
      onSuccess: (data) => {
        console.log('Got Payment Summary:', data)
      },
      onError: (error) => {
        console.error('Error gettong Payment Summary:', error)
      },
    })
  }