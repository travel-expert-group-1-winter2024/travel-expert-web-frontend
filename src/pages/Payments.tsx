import PaymentForm from '@/components/molecules/PaymentForm'
import PaymentSummary from '@/components/molecules/PaymentSummary'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth.ts'
import { useCreateBooking } from '@/hooks/useBookings'
import { useCostSummary } from '@/hooks/usePaymentSummary'
import { useWallet } from '@/hooks/useWallet'
import { stripeKeys } from '@/utils/stripeKeys'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const PaymentsPage = () => {
  const { packageId } = useParams()
  const validPackageId = packageId ? parseInt(packageId) : 0
  const { tripType, travellers, paymentMethod, travellerNames } =
    useLocation().state || {}
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const stripePromise = loadStripe(stripeKeys.publishable)
  const { isLoggedIn, token } = useAuth()
  const { mutate: costBreakdown, data: costSummaryData } = useCostSummary()
  const { data: wallet } = useWallet()
  const [insufficientFunds, setInsufficientFunds] = useState(false)
  const [bookingCreated, setBookingCreated] = useState(false)
  const [remainingBalance, setRemainingBalance] = useState(0)

  const navigate = useNavigate()
  const {
    mutate: createBooking,
    data: bookingResponse,
    isSuccess: isBookingCreated,
    isError: isBookingCreateError,
  } = useCreateBooking()

  useEffect(() => {
    if (isBookingCreated) {
      toast.success('Payment successful')
      bookingResponse['travellerNames'] = travellerNames
      navigate(`/bookingconfirmation`, {
        state: { bookingdata: bookingResponse },
      })
    }
    if (isBookingCreateError) {
      toast.error('Failed to proceed payment')
    }
  }, [isBookingCreated, isBookingCreateError])

  useEffect(() => {
    if (tripType && travellers && validPackageId) {
      const paymentData = {
        tripTypeId: tripType || 'B',
        travelerCount: travellers || 1,
        packageId: validPackageId,
        paymentMethod: 'STRIPE',
        travellerNames: travellerNames,
      }

      costBreakdown({ data: paymentData, token: token })
    }
  }, [
    costBreakdown,
    tripType,
    travellers,
    validPackageId,
    token,
    paymentMethod,
  ])

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
          },
        )
        setClientSecret(response.data.clientSecret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
      }
    }

    if (costSummaryData && costSummaryData.data) {
      const costData = costSummaryData.data
      const total = Math.round(costData.total)
      if (paymentMethod === 'Wallet') {
        if (wallet && wallet.balance < total) {
          setRemainingBalance(total - wallet.balance)
          setInsufficientFunds(true)
        } else if (!bookingCreated) {
          setBookingCreated(true)
        }
      } else {
        createPaymentIntent(total)
      }
    }
  }, [
    costSummaryData,
    tripType,
    travellers,
    validPackageId,
    token,
    paymentMethod,
    wallet,
    bookingCreated,
  ])

  if (!isLoggedIn) return null

  return (
    <div className='flex flex-col py-6 xl:flex-row xl:gap-12 xl:px-8'>
      {/* Left Section: Payment Summary */}
      <div className='mb-8 w-full xl:mb-0 xl:w-2/3 2xl:w-3/5'>
        {costSummaryData?.data && (
          <PaymentSummary
            tripType={tripType}
            travellers={travellers}
            costSummary={costSummaryData.data}
            travellerNames={travellerNames}
          />
        )}
      </div>

      {/* Right Section: Stripe or Other Payment */}
      <div className='flex w-full items-center justify-center xl:w-1/3 2xl:w-2/5'>
        {paymentMethod === 'Card' ? (
          !clientSecret ? (
            <p>Loading payment details...</p>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                clientSecret={clientSecret}
                onPaymentSuccess={() => {}}
                totalAmount={costSummaryData.data.total}
              />
            </Elements>
          )
        ) : paymentMethod === 'Wallet' && !insufficientFunds ? (
          <Card className='w-full max-w-md border-green-600 bg-green-50 shadow'>
            <CardHeader>
              <CardTitle className='text-lg text-green-700'>
                Ready to Pay
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <CardDescription className='text-green-700'>
                You're using your wallet to complete this booking.
              </CardDescription>
              <CardDescription className='text-sm text-green-600'>
                Wallet Balance: ${wallet?.balance?.toFixed(2)}
              </CardDescription>
              <button
                className='w-full rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700'
                onClick={() => {
                  createBooking({
                    token: token,
                    bookingData: {
                      tripTypeId: tripType || 'B',
                      travelerCount: travellers || 1,
                      packageId: validPackageId,
                      paymentMethod: 'WALLET',
                      travellerNames: travellerNames,
                    },
                  })
                  console.log('Booking with wallet...')
                }}
              >
                Pay with Wallet
              </button>
            </CardContent>
          </Card>
        ) : null}
        {paymentMethod === 'Wallet' && insufficientFunds && (
          <div className='mt-6 flex justify-center'>
            <Card className='w-full max-w-md border-red-600 bg-red-50 shadow-lg'>
              <CardHeader className='flex flex-row items-center gap-2'>
                <CardTitle className='text-lg text-red-700'>
                  Insufficient Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='mb-4 text-red-600'>
                  Please add ${remainingBalance} to your wallet to proceed with
                  the booking.
                </CardDescription>
                <button
                  className='rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700'
                  onClick={() => navigate('/account/wallet')}
                >
                  Go to Wallet
                </button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentsPage
