export interface bookingDetail {
  bookingDetailId: number
  itineraryNo: number
  tripStart: string
  tripEnd: string
  description: string
  destination: string
  basePrice: number
  agencyCommission: number
  agentid: number
  customerid: number
  firstname: string
  lastname: string
  booking: number
  bookingNo: string
  bookingStatus: BookingStatus
  region: string
  className: string
  fee: string
  product: string
  supplier: string
}

export type BookingStatus =
  | 'PENDING'
  | 'RESERVED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'EXPIRED'
