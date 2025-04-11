import api from '@/api/axios'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface BookingData {
  tripTypeId: string
  travelerCount: number
  packageId: number,
  paymentMethod:string,
  paymentId:string
}

export const useCreateBooking = () => {
  const navigate = useNavigate();
  const [bookingdata, setbookingdata] = useState('')
  return useMutation({
    mutationFn: async (bookingData: BookingData) => {
      const token = localStorage.getItem('site')?.toString();
      const response = await api.post('/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setbookingdata(response.data)
      return response.data
    },
    onSuccess: (data) => {
      navigate(`/bookingconfirmation`,
        {
          state: { bookingdata:data  }
        })
      console.log('Booking successful:', data)
    },
    onError: (error) => {
      console.error('Booking failed:', error)
    },
  })
}
