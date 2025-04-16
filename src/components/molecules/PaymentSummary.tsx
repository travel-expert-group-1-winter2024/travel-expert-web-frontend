import { useAuth } from '@/hooks/useAuth'
import { usePackageDetails } from '@/hooks/usePackageDetails'
import { costSummary } from '@/types/costSummary'
import { Calendar, MapPin } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const PaymentSummary = ({
  tripType,
  travellers,
  costSummary,
  travellerNames,
}: {
  tripType: string
  travellers: number
  costSummary: costSummary
  travellerNames: string[]
}) => {
  const { packageId } = useParams()
  const customerDetails = useAuth().user
  const { data: packageDetails } = usePackageDetails(packageId!)
  console.log(travellerNames);
  let typeOfTrip = ''
  if (tripType === 'B') {
    typeOfTrip = 'Business'
  } else if (tripType === 'L') {
    typeOfTrip = 'Leisure'
  } else if (tripType === 'G') {
    typeOfTrip = 'Group'
  }

  return (
    <section className='container mx-auto max-w-5xl px-4 py-8 sm:px-6'>
      <div className='flex flex-col gap-10'>
        {/* Page Header */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Review Your Trip
          </h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            Please confirm the details below before proceeding to payment.
          </p>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Package Summary */}
          <Card className='p-6'>
            <CardHeader>
              <Badge variant='secondary' className='mb-2 text-sm'>
                {packageDetails?.destination}
              </Badge>
              <CardTitle className='text-xl font-semibold'>
                {packageDetails?.pkgname}
              </CardTitle>
            </CardHeader>
            <CardContent className='mt-4 space-y-4'>
              <div className='flex items-start gap-4'>
                <MapPin className='text-muted-foreground mt-1 h-5 w-5' />
                <div>
                  <p className='text-muted-foreground text-sm'>Destination</p>
                  <p className='text-base'>{packageDetails?.destination}</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Calendar className='text-muted-foreground mt-1 h-5 w-5' />
                <div>
                  <p className='text-muted-foreground text-sm'>Dates</p>
                  <p className='text-base'>
                    {new Date(packageDetails?.pkgstartdate).toLocaleDateString(
                      'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      },
                    )}{' '}
                    -{' '}
                    {new Date(packageDetails?.pkgenddate).toLocaleDateString(
                      'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      },
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Summary */}
          <Card className='p-6'>
            <CardHeader>
              <CardTitle className='text-xl font-semibold'>
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className='mt-4 space-y-4'>
              <div>
                <p className='text-muted-foreground text-sm'>Name</p>
                <p className='text-base'>{customerDetails?.name}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Email</p>
                <p className='text-base'>{customerDetails?.email}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Trip Type</p>
                <p className='text-base'>{typeOfTrip}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>
                  Number of Travellers
                </p>
                <p className='text-base'>{travellers}</p>
              </div>

              {travellerNames.length > 1 && (
                <div>
                  <p className='text-muted-foreground mt-4 text-sm'>
                    Traveller Names
                  </p>
                  <ul className='list-disc pl-5 text-base'>
                    {travellerNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <Card className='p-6'>
            <CardHeader>
              <CardTitle className='text-xl font-semibold'>
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className='mt-4 space-y-4'>
              <div className='flex justify-between'>
                <span>Package Price</span>
                <span>${Number(costSummary.packagePrice).toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Discount</span>
                <span>-${Number(costSummary.discount).toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Charges</span>
                <span>${Number(costSummary.charges).toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Agency Fees</span>
                <span>${Number(costSummary.agencyFees).toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax</span>
                <span>${Number(costSummary.tax).toFixed(2)}</span>
              </div>
              <div className='flex justify-between font-bold'>
                <span>Total</span>
                <span>${Number(costSummary.total).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default PaymentSummary
