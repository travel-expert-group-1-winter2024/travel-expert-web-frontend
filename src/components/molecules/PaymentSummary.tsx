import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { usePackageDetails } from '@/hooks/usePackageDetails';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { costSummary } from '@/types/costSummary';

const PaymentSummary = ({ tripType, travellers,costSummary }: { tripType: string; travellers: number; costSummary: costSummary }) => {
    const { packageId } = useParams();
    const customerDetails = useAuth().user;
    const { data: packageDetails } = usePackageDetails(packageId!);
  
    let typeOfTrip = '';
    if (tripType === 'B') {
      typeOfTrip = 'Business';
    } else if (tripType === 'L') {
      typeOfTrip = 'Leisure';
    } else if (tripType === 'G') {
      typeOfTrip = 'Group';
    }
  
    return (
      <section className='container mx-auto max-w-5xl px-4 py-8 sm:px-6'>
        <div className='flex flex-col gap-10'>
          {/* Page Header */}
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Review Your Trip</h1>
            <p className='mt-2 text-muted-foreground text-sm'>Please confirm the details below before proceeding to payment.</p>
          </div>
  
          {/* Summary Cards */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
  
            {/* Package Summary */}
            <Card className='p-6'>
              <CardHeader>
                <Badge variant='secondary' className='mb-2 text-sm'>{packageDetails?.destination}</Badge>
                <CardTitle className='text-xl font-semibold'>{packageDetails?.pkgname}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 mt-4'>
                <div className='flex items-start gap-4'>
                  <MapPin className='h-5 w-5 text-muted-foreground mt-1' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Destination</p>
                    <p className='text-base'>{packageDetails?.destination}</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <Calendar className='h-5 w-5 text-muted-foreground mt-1' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Dates</p>
                    <p className='text-base'>
                      {new Date(packageDetails?.pkgstartdate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })} - {new Date(packageDetails?.pkgenddate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
  
            {/* Customer Summary */}
            <Card className='p-6'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold'>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 mt-4'>
                <div>
                  <p className='text-sm text-muted-foreground'>Name</p>
                  <p className='text-base'>{customerDetails?.name}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Email</p>
                  <p className='text-base'>{customerDetails?.email}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Trip Type</p>
                  <p className='text-base'>{typeOfTrip}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Number of Travellers</p>
                  <p className='text-base'>{travellers}</p>
                </div>
              </CardContent>
            </Card>
  
            {/* Cost Summary */}
            <Card className='p-6'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold'>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 mt-4'>
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
    );
  };

export default PaymentSummary;
