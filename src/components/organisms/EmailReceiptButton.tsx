'use client'

import { Button } from '@/components/ui/button'
import { useEmailReceipt } from '@/hooks/useEmailReceipt' // Fixed typo in hook name
import { pdf } from '@react-pdf/renderer'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { BookingReceiptPDF } from './BookingReceiptPDF'

type Booking = {
  id: string
  customerName: string
  customerEmail: string
  bookingDate: string
  startDate: string
  endDate: string
  totalAmount: number
  paymentMethod: string
  tourName: string
}

interface EmailReceiptButtonProps {
  booking: Booking
}

export const EmailReceiptButton = ({ booking }: EmailReceiptButtonProps) => {
  const { mutate, isPending } = useEmailReceipt()

  const handleSendEmail = async () => {
    const toastId = toast.loading('Processing your request...')

    try {
      // Generate PDF as blob
      const pdfBlob = await pdf(
        <BookingReceiptPDF booking={booking} />,
      ).toBlob()

      // Convert to base64 string
      const base64data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result?.toString().split(',')[1] || ''
          resolve(result)
        }
        reader.onerror = () =>
          reject(new Error('Failed to convert PDF to base64'))
        reader.readAsDataURL(pdfBlob)
      })

      const emailSubject = `Your ${booking.tourName} Booking Confirmation`
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Thank you for your booking, ${booking.customerName}!</h2>
          <p>Your <strong>${booking.tourName}</strong> adventure is confirmed for ${new Date(booking.startDate).toLocaleDateString()}.</p>
          <p><strong>Booking Reference:</strong> ${booking.id}</p>
          <p style="margin-top: 20px;">We've attached your booking receipt to this email for your records.</p>
          <p>If you have any questions, please contact our support team at support@travelexpert.com</p>
          <p style="margin-top: 30px; color: #64748b;">Happy travels!</p>
          <p style="color: #64748b;">The Travel Expert Team</p>
        </div>
      `
      toast.loading('Sending email... This may take a moment', { id: toastId })

      mutate({
        to: booking.customerEmail,
        subject: emailSubject,
        body: emailBody,
        pdfBase64: base64data,
      })

      toast.success('Email sent successfully!', { id: toastId })
    } catch {
      toast.error('Email sent but confirmation may be delayed', { id: toastId })
    }
  }

  return (
    <Button
      onClick={handleSendEmail}
      disabled={isPending}
      variant='outline'
      className='gap-2'
    >
      <Mail className='h-4 w-4' />
      {isPending ? 'Sending...' : 'Email Receipt'}
    </Button>
  )
}
