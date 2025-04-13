export interface BookingCreationRequest {
  tripTypeId: string
  travelerCount: number
  packageId: number
  paymentMethod: string
  paymentId: string
}

export interface BookingConfirmationRequest {
  bookingId: number
  paymentMethod: string
  paymentId: string
}
