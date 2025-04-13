import api from '@/api/axios.ts'
import {
  BookingConfirmationRequest,
  BookingCreationRequest,
} from '@/types/booking.ts'

export const getBookDetailByCustomerId = (customerId: number) =>
  api.get(`/api/bookingdetails/${customerId}`)

export const createBooking = (token: string, data: BookingCreationRequest) =>
  api.post('/api/bookings', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const confirmBooking = (
  token: string,
  data: BookingConfirmationRequest,
) =>
  api.post('/api/bookings/confirm', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
