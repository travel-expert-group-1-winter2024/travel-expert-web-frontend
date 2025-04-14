import { DownloadReceiptButton } from '@/components/organisms/DownloadReceiptButton'
import { EmailReceiptButton } from '@/components/organisms/EmailReceiptButton'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { usePackageDetails } from '@/hooks/usePackageDetails'
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  UserRound,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'

// Dummy data - replace with your actual booking data and payment summary


export default function BookingConfirmationPage() {
  debugger
  const { bookingdata } = useLocation().state || {};
  const { data: pkg } = usePackageDetails(bookingdata.data.packageId!)
  const dummyBooking = {
    id: (bookingdata.data.bookingId).toString(),
    customerName: useAuth().user?.name || "",
    customerEmail: useAuth().user?.email || "",
    bookingDate: new Date().toISOString(),
    startDate: pkg?.pkgstartdate,
    endDate: pkg?.pkgenddate,
    totalAmount: bookingdata.data.finalPrice,
    paymentMethod: 'Credit Card (•••• 4242)', // Hard coded for now
    tourName: pkg?.pkgname,
    departureLocation: 'Calgary,Alberta', // Hard coded for now
    referenceNumber: 'PAY-789456123',  // Hard coded for now
  }
  return (
    <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl space-y-6'>
        {/* Header with success message */}
        <div className='space-y-2 text-center'>
          <BadgeCheck className='mx-auto h-12 w-12 text-emerald-500' />
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Booking Confirmed!
          </h1>
          <p className='text-muted-foreground text-lg'>
            Your {dummyBooking.tourName} adventure is all set. Here are your
            booking details.
          </p>
        </div>

        {/* Main booking card */}
        <Card className='overflow-hidden'>
          <CardHeader className='bg-gradient-to-r from-blue-600 to-blue-800 p-6'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-2xl text-white'>
                {dummyBooking.tourName}
              </CardTitle>
              <div className='rounded-full bg-white/10 px-3 py-1'>
                <span className='font-medium text-white'>
                  {dummyBooking.id}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-6'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              {/* Left column - Booking Details */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <CalendarDays className='h-5 w-5 text-blue-600' />
                    Travel Dates
                  </h3>
                  <div className='space-y-1 pl-7'>
                    <p className='text-muted-foreground text-sm'>From</p>
                    <p className='font-medium'>
                      {new Date(dummyBooking.startDate).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        },
                      )}
                    </p>
                    <p className='text-muted-foreground mt-3 text-sm'>To</p>
                    <p className='font-medium'>
                      {new Date(dummyBooking.endDate).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <MapPin className='h-5 w-5 text-blue-600' />
                    Departure
                  </h3>
                  <div className='pl-7'>
                    <p className='font-medium'>
                      {dummyBooking.departureLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Customer & Payment */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <UserRound className='h-5 w-5 text-blue-600' />
                    Customer Information
                  </h3>
                  <div className='space-y-1 pl-7'>
                    <p className='font-medium'>{dummyBooking.customerName}</p>
                    <p className='text-muted-foreground text-sm'>
                      {dummyBooking.customerEmail}
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <CreditCard className='h-5 w-5 text-blue-600' />
                    Payment Details
                  </h3>
                  <div className='space-y-1 pl-7'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Amount:</span>
                      <span className='font-bold text-blue-600'>
                        ${dummyBooking.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Method:</span>
                      <span>{dummyBooking.paymentMethod}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Reference:</span>
                      <span className='font-mono text-sm'>
                        {dummyBooking.referenceNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col justify-between gap-4 border-t bg-gray-50 p-6 sm:flex-row'>
            <div className='space-y-2'>
              <h4 className='font-medium'>Need help with your booking?</h4>
              <p className='text-muted-foreground text-sm'>
                Contact our support team at support@travelexpert.com
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <DownloadReceiptButton booking={dummyBooking} />
              <EmailReceiptButton booking={dummyBooking} />
            </div>
          </CardFooter>
        </Card>

        {/* Next Steps Card */}
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='flex items-start gap-4'>
              <div className='rounded-full bg-blue-100 p-2'>
                <CalendarDays className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <h4 className='font-medium'>Pre-trip information</h4>
                <p className='text-muted-foreground text-sm'>
                  We'll email you detailed itinerary and packing list 2 weeks
                  before your trip.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='rounded-full bg-blue-100 p-2'>
                <UserRound className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <h4 className='font-medium'>Meet your guide</h4>
                <p className='text-muted-foreground text-sm'>
                  You'll receive contact information for your tour guide 1 week
                  before departure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
