import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useBookingDetails } from '@/hooks/useBookingDetail'
import { bookingDetail } from '@/types/bookingDetail'
import { groupBy } from 'lodash'
import { Link } from 'react-router-dom'

function Booking() {
  const { user } = useAuth()
  const { data, isLoading, error } = useBookingDetails(user?.customerId)

  if (isLoading) return <div>Loading booking details...</div>

  if (error instanceof Error) {
    return (
      <div className='p-4'>
        <h2 className='mb-4 text-xl font-semibold text-red-600'>Error</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <div>No Booking details.</div>
  }

  const groupedBookings = groupBy(data, 'bookingNo')

  return (
    <div className='p-4'>
      <h2 className='mb-4 text-xl font-semibold'>Your Bookings</h2>
      <Accordion type='multiple'>
        {Object.entries(groupedBookings).map(([bookingNo, bookings]) => {
          const firstBooking = bookings[0]

          // ✅ Get first booking with travellername
          const firstWithTravellerName = bookings.find(
            b => b.travellername?.trim()
          )

          return (
            <AccordionItem key={bookingNo} value={`item-${bookingNo}`}>
              <AccordionTrigger>
                Booking No: {bookingNo} — {firstBooking.tripStart.split('T')[0]} to{' '}
                {firstBooking.tripEnd.split('T')[0]}
              </AccordionTrigger>
              <AccordionContent>
                <Badge
                  variant={
                    firstBooking.bookingStatus === 'CANCELLED' ||
                    firstBooking.bookingStatus === 'EXPIRED'
                      ? 'destructive'
                      : 'secondary'
                  }
                  className={`my-2 ${
                    firstBooking.bookingStatus === 'COMPLETED'
                      ? 'bg-green-500 text-white'
                      : firstBooking.bookingStatus === 'RESERVED'
                        ? 'bg-blue-900 text-white'
                        : ''
                  }`}
                >
                  {firstBooking.bookingStatus}
                </Badge>

                {bookings.map((booking: bookingDetail, index) => (
                  <div key={booking.bookingDetailId} className='mb-4'>
                    <p>
                      <strong>Destination:</strong> {booking.destination}
                    </p>
                    <p>
                      <strong>Trip Start:</strong> {booking.tripStart.split('T')[0]}
                    </p>
                    <p>
                      <strong>Trip End:</strong> {booking.tripEnd.split('T')[0]}
                    </p>
                    {booking.description?.trim() && (
                      <p>
                        <strong>Description:</strong> {booking.description}
                      </p>
                    )}
                    {booking.region?.trim() && (
                      <p>
                        <strong>Region:</strong> {booking.region.trim()}
                      </p>
                    )}
                    {booking.className?.trim() && (
                      <p>
                        <strong>Class:</strong> {booking.className}
                      </p>
                    )}
                    {booking.fee?.trim() && (
                      <p>
                        <strong>Fees Charged:</strong> {booking.fee}
                      </p>
                    )}
                    {booking.product?.trim() && (
                      <p>
                        <strong>Product:</strong> {booking.product}
                      </p>
                    )}
                    {booking.supplier?.trim() && (
                      <p>
                        <strong>Supplier:</strong> {booking.supplier}
                      </p>
                    )}
                    {booking.travellername && (
                      <div>
                        <strong>Traveller(s):</strong>
                        <ul className='ml-4 list-inside list-disc'>
                          {booking.travellername
                            .split(',')
                            .map((name, idx) => (
                              <li key={idx}>{name.trim()}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                    {booking.basePrice !== null &&
                      !isNaN(booking.basePrice) && (
                        <p>
                          <strong>Price:</strong> ${booking.basePrice.toFixed(2)}
                        </p>
                      )}
                    {index !== bookings.length - 1 && (
                      <Separator className='my-2' />
                    )}
                  </div>
                ))}

                <Link
                  to={'/payment/' + firstBooking.packageId}
                  state={{
                    tripType: firstBooking.tripTypeId,
                    travellers: firstBooking.travelerCount,
                    isConfirmBooking: true,
                    bookingId: firstBooking.booking,
                    travellerNames: firstBooking?.travellername
                    ? firstBooking.travellername.split(',').map((n) => n.trim())
                    : [],
                  }}
                >
                  <Button
                    className='mt-4'
                    disabled={firstBooking.bookingStatus !== 'RESERVED'}
                  >
                    Confirm Booking
                  </Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default Booking
