import api from '@/api/axios'
import { useMutation } from '@tanstack/react-query'

interface EmailData {
  to: string
  subject: string
  body: string
  pdfBase64: string
}

export const useEmailReceipt = () => {
  return useMutation({
    mutationFn: async (emailData: EmailData) => {
      const response = await api.post(
        '/api/email/send-booking-confirmation',
        {
          to: emailData.to,
          subject: emailData.subject,
          body: emailData.body,
          pdfBase64: emailData.pdfBase64,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data
    },
  })
}
