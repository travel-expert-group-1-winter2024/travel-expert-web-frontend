// components/pdf/DownloadReceiptButton.tsx
'use client'

import { Button } from '@/components/ui/button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download } from 'lucide-react'
import { BookingReceiptPDF } from './BookingReceiptPDF'

// Temporary type - make a type in types for Booking later when booking is done 
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

interface DownloadReceiptButtonProps {
  booking: Booking
}

export const DownloadReceiptButton = ({
  booking,
}: DownloadReceiptButtonProps) => (
  <Button asChild variant='outline'>
    <PDFDownloadLink
      document={<BookingReceiptPDF booking={booking} />}
      fileName={`booking-receipt-${booking.id}.pdf`}
      className='flex items-center gap-2'
    >
      {({ loading }) => (
        <>
          <Download className='h-4 w-4' />
          {loading ? 'Preparing document...' : 'Download Receipt'}
        </>
      )}
    </PDFDownloadLink>
  </Button>
)
