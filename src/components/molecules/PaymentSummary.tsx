import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { usePackageDetails } from '@/hooks/usePackageDetails';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const PaymentSummary = ({ tripType, travellers }) => {
  const { packageId } = useParams();
  const customerDetails = useAuth().user;
  const { data: packageDetails } = usePackageDetails(packageId);
  
  let typeOfTrip = '';
  if (tripType === 'B') {
    typeOfTrip = 'Business';
  } else if (tripType === 'L') {
    typeOfTrip = 'Leisure';
  } else if (tripType === 'G') {
    typeOfTrip = 'Group';
  }

  return (
    <section className='container mx-auto max-w-7xl px-4 py-6 sm:px-6'>
      <div className='flex flex-col gap-8'>
        {/* Package Header */}
        <div className='mb-6 xl:mb-8'>
          <Badge variant='secondary' className='xl:text-sm'>
            {packageDetails.destination}
          </Badge>
          <h1 className='mt-3 text-3xl font-bold tracking-tight xl:text-4xl'>
            {packageDetails.pkgname}
          </h1>
        </div>

        {/* Trip Details */}
        <Card className='mb-6 xl:mb-8 xl:p-6'>
          <CardHeader>
            <CardTitle className='xl:text-xl'>Trip Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 xl:space-y-6'>
            <div className='flex items-center gap-4'>
              <MapPin className='text-muted-foreground h-5 w-5' />
              <div>
                <p className='text-muted-foreground text-sm'>Destination</p>
                <p>{packageDetails.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Calendar className='text-muted-foreground h-5 w-5' />
              <div>
                <p className='text-muted-foreground text-sm'>Date</p>
                <p>
                  {new Date(packageDetails.pkgstartdate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  -{' '}
                  {new Date(packageDetails.pkgenddate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer and Trip Info */}
        <div className='mb-6'>
          <h3 className='text-xl font-bold'>Customer Info</h3>
          <p className='text-sm text-muted-foreground'>Name: {customerDetails?.name}</p>
          <p className='text-sm text-muted-foreground'>Trip Type: {typeOfTrip}</p>
          <p className='text-sm text-muted-foreground'>Travellers: {travellers}</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSummary;
