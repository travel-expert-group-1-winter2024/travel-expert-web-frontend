export interface BookingCreationRequest {
  tripTypeId: string
  travelerCount: number
  packageId: number
  bookingMode?: string
  paymentMethod?: string
  paymentId?: string
  travellerNames?:string[]
}

export interface BookingConfirmationRequest {
  bookingId: number
  paymentMethod: string
  paymentId: string
  travellerNames?:string[]
}
