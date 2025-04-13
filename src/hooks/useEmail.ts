import { sendEmail } from '@/api/emailApi.ts'
import { Email } from '@/types/email.ts'
import { useMutation } from '@tanstack/react-query'

export const useEmail = () => {
  return useMutation({
    mutationFn: async (emailData: Email) => {
      const response = await sendEmail(emailData)
      return response.data
    },
  })
}
