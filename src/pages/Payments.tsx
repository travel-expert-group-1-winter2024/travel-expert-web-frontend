import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PaymentForm from '@/components/molecules/PaymentForm'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { stripeKeys } from '@/utils/stripeKeys'
import PaymentSummary from '@/components/molecules/PaymentSummary'
import { useCostSummary } from '@/hooks/usePaymentSummary'
import { costSummary } from '@/types/costSummary'

const PaymentsPage = () => {
  const { packageId } = useParams()
  const validPackageId = packageId ? parseInt(packageId) : 0;
  const { tripType, travellers } = useLocation().state || {}
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const stripePromise = loadStripe(stripeKeys.publishable);
  const { mutate: costBreakdown, data: costSummaryData } = useCostSummary();
  const hasRun = useRef(false)
  const [costSummary, setCostSummary] = useState<costSummary | null>(null);

  useEffect(() => {
    // Trigger the cost summary calculation using mutate
    if (tripType && travellers && validPackageId) {
      const paymentData = {
        tripTypeId: tripType || 'B',
        travelerCount: travellers || 1,
        packageId: validPackageId,
      };

      costBreakdown(paymentData);
    }
  }, [costBreakdown, tripType, travellers, validPackageId]);
  
  useEffect(() => {
    if (costSummaryData && costSummaryData.data) {
      // Create payment intent after cost summary is available
      const costData = costSummaryData.data;
      const total = Math.round(costData.total); // Stripe expects amount in cents

      const createPaymentIntent = async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/bookings/create-payment-intent', {
            packagePrice: total,
            tripType,
            travellers,
            packageId: validPackageId,
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      };

      createPaymentIntent();
    }
  }, [costSummaryData, tripType, travellers, validPackageId]);



  

  if (!clientSecret) {
    return <p>Loading payment details...</p>
  }

  return (
    <div className="flex flex-col xl:flex-row xl:gap-12 xl:px-8 py-6">
    {/* Left Section: Payment Summary */}
    <div className="w-full xl:w-2/3 2xl:w-3/5 mb-8 xl:mb-0">
        <PaymentSummary
          tripType={tripType}
          travellers={travellers}
          costSummary={costSummaryData.data!}
        />
      </div>

      {/* Stripe Payment Form */}
      <div className="w-full xl:w-1/3 2xl:w-2/5 flex justify-center items-center">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
      </div>
    </div>
  );
}

export default PaymentsPage
