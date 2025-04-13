import PaymentForm from '@/components/molecules/PaymentForm'
import PaymentSummary from '@/components/molecules/PaymentSummary'
import { useAuth } from '@/hooks/useAuth.ts'
import { useCostSummary } from '@/hooks/usePaymentSummary'
import { stripeKeys } from '@/utils/stripeKeys'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const PaymentsPage = () => {
  const { packageId } = useParams()
  const validPackageId = packageId ? parseInt(packageId) : 0
  const { tripType, travellers } = useLocation().state || {}
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const stripePromise = loadStripe(stripeKeys.publishable)
  const { isLoggedIn, token } = useAuth()
  const { mutate: costBreakdown, data: costSummaryData } = useCostSummary()

  useEffect(() => {
    if (tripType && travellers && validPackageId) {
      const paymentData = {
        tripTypeId: tripType || 'B',
        travelerCount: travellers || 1,
        packageId: validPackageId,
        paymentMethod: 'STRIPE',
      }

      costBreakdown({ data: paymentData, token: token })
    }
  }, [costBreakdown, tripType, travellers, validPackageId, token])

  useEffect(() => {
    if (costSummaryData && costSummaryData.data) {
      // Create payment intent after cost summary is available
      const costData = costSummaryData.data
      const total = Math.round(costData.total)

      const createPaymentIntent = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/bookings/create-payment-intent',
            {
              packagePrice: total,
              tripType,
              travellers,
              packageId: validPackageId,
            },
          )
          setClientSecret(response.data.clientSecret)
        } catch (error) {
          console.error('Error creating payment intent:', error)
        }
      }

      createPaymentIntent()
    }
  }, [costSummaryData, tripType, travellers, validPackageId])

  if (!isLoggedIn) return null

  if (!clientSecret) {
    return <p>Loading payment details...</p>
  }

  return (
    <div className='flex flex-col py-6 xl:flex-row xl:gap-12 xl:px-8'>
      {/* Left Section: Payment Summary */}
      <div className='mb-8 w-full xl:mb-0 xl:w-2/3 2xl:w-3/5'>
        <PaymentSummary
          tripType={tripType}
          travellers={travellers}
          costSummary={costSummaryData.data!}
        />
      </div>

      {/* Stripe Payment Form */}
      <div className='flex w-full items-center justify-center xl:w-1/3 2xl:w-2/5'>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  )
}

export default PaymentsPage
