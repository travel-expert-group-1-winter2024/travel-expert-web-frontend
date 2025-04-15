export interface BookingCreationRequest {
  tripTypeId: string
  travelerCount: number
  packageId: number
  bookingMode?: string
  paymentMethod?: string
  paymentId?: string
  travellerNames?:[]
}

export interface BookingConfirmationRequest {
  bookingId: number
  paymentMethod: string
  paymentId: string
}
