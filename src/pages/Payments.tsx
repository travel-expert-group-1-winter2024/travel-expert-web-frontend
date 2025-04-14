import { createBooking } from '@/api/bookingApi';
import PaymentForm from '@/components/molecules/PaymentForm';
import PaymentSummary from '@/components/molecules/PaymentSummary';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth.ts';
import { useCostSummary } from '@/hooks/usePaymentSummary';
import { useWallet } from '@/hooks/useWallet';
import { stripeKeys } from '@/utils/stripeKeys';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentsPage = () => {
  const navigate = useNavigate()
  const { packageId } = useParams();
  const validPackageId = packageId ? parseInt(packageId) : 0;
  const { tripType, travellers, paymentMethod } = useLocation().state || {};
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripePromise = loadStripe(stripeKeys.publishable);
  const { isLoggedIn, token } = useAuth();
  const { mutate: costBreakdown, data: costSummaryData } = useCostSummary();
  const { data: wallet } = useWallet();
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);

  useEffect(() => {
    if (tripType && travellers && validPackageId) {
      const paymentData = {
        tripTypeId: tripType || 'B',
        travelerCount: travellers || 1,
        packageId: validPackageId,
        paymentMethod: 'STRIPE',
      };

      costBreakdown({ data: paymentData, token: token });
    }
  }, [costBreakdown, tripType, travellers, validPackageId, token, paymentMethod]);

  useEffect(() => {
    const createPaymentIntent = async (total: number) => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/bookings/create-payment-intent',
          {
            packagePrice: total,
            tripType,
            travellers,
            packageId: validPackageId,
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };
    if (costSummaryData && costSummaryData.data) {
      const costData = costSummaryData.data;
      const total = Math.round(costData.total);

      if (paymentMethod === 'Wallet') {
        if (wallet && wallet.balance < total) {
          setInsufficientFunds(true);
        } else if (!bookingCreated) {
          const resp= createBooking(token, {
            tripTypeId: tripType || 'B',
            travelerCount: travellers || 1,
            packageId: validPackageId,
            paymentMethod: 'WALLET',
          });
          setBookingCreated(true);
          if(resp !== null){
            debugger
            toast.success('Payment successful')
            navigate(`/bookingconfirmation`, {
              state: { bookingdata: resp },
            })
          }

        }
      } else {
        createPaymentIntent(total);
      }
    }
  }, [costSummaryData, tripType, travellers, validPackageId, 
    token, paymentMethod, wallet, bookingCreated]);

  if (!isLoggedIn) return null;
  

  if (paymentMethod === 'Wallet' && insufficientFunds) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Insufficient Wallet Balance</AlertTitle>
        <AlertDescription>
          Please add funds to your wallet to proceed with the booking.
        </AlertDescription>
      </Alert>
    );
  }

  if (!clientSecret) {
    return <p>Loading payment details...</p>;
  }

  return (
    <div className='flex flex-col py-6 xl:flex-row xl:gap-12 xl:px-8'>
      {/* Left Section: Payment Summary */}
      <div className='mb-8 w-full xl:mb-0 xl:w-2/3 2xl:w-3/5'>
        <PaymentSummary
          tripType={tripType}
          travellers={travellers}
          costSummary={costSummaryData?.data}
        />
      </div>

      {/* Stripe Payment Form */}
      <div className='flex w-full items-center justify-center xl:w-1/3 2xl:w-2/5'>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            clientSecret={clientSecret}
            onPaymentSuccess={() => {
              // Implement your success handler here
            }}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentsPage;
