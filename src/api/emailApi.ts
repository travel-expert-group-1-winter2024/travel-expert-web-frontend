import api from '@/api/axios.ts'
import { Email } from '@/types/email.ts'

export const sendEmail = (emailData: Email) =>
  api.post(`/api/email/send`, null, { params: emailData })
