import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PaymentForm from '@/components/molecules/PaymentForm'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { stripeKeys } from '@/utils/stripeKeys'
import PaymentSummary from '@/components/molecules/PaymentSummary'

const PaymentsPage = () => {
  const { packageId } = useParams()
  const { tripType, travellers } = useLocation().state || {}
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const stripePromise = loadStripe(stripeKeys.publishable);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (tripType && travellers && packageId) {
        try {
          const response = await axios.post('http://localhost:8080/api/bookings/create-payment-intent', {
            
            tripType,
            travellers,
            packageId,
          })
          setClientSecret(response.data.clientSecret)  // Ensure this is set correctly
        } catch (error) {
          console.error('Error fetching client secret:', error)
        }
      }
    }
    fetchClientSecret()
  }, [tripType, travellers, packageId])

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
