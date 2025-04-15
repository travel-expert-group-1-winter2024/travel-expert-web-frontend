import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth.ts'
import { useBookingConfirm } from '@/hooks/useBookingConfirm.ts'
import { useCreateBooking } from '@/hooks/useBookings'
import { topUpWallet } from '@/hooks/useWalletTopup'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

interface PaymentFormProps {
  clientSecret: string | null
  totalAmount?: number
  onPaymentSuccess?: () => void
}

const PaymentForm = ({
  clientSecret,
  totalAmount,
  onPaymentSuccess,
}: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { packageId } = useParams()
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { isLoggedIn, token } = useAuth()
  const { tripType, travellers, bookingId, isConfirmBooking, travellerNames } =
    location.state || {}

  const {
    mutate: createBooking,
    data: bookingResponse,
    isSuccess: isBookingCreated,
    isError: isBookingCreateError,
    isPending: isBookingCreating,
  } = useCreateBooking()
  const {
    mutate: confirmBooking,
    data: confirmBookingResponse,
    isError: isBookingConfirmError,
    isPending: isBookingConfirming,
    isSuccess: isBookingConfirmed,
  } = useBookingConfirm()

  useEffect(() => {
    if (isBookingConfirmed || isBookingCreated) {
      toast.success('Payment successful')
      bookingResponse['travellerNames'] = travellerNames;
      bookingResponse['TotalPrice'] = totalAmount;
      navigate(`/bookingconfirmation`, {
        state: { bookingdata: bookingResponse || confirmBookingResponse },
      })
    }
    if (isBookingConfirmError || isBookingCreateError) {
      toast.error('Failed to proceed payment')
    }
  }, [
    isBookingConfirmed,
    isBookingCreated,
    isBookingConfirmError,
    isBookingCreateError,
  ])

  if (!isLoggedIn) {
    console.error('User is not logged in.')
    return null
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)

    // Get the card element
    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      console.error('Card element not found')
      setIsProcessing(false)
      return
    }

    let result = null
    // Confirm payment
    result =
      clientSecret &&
      (await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      }))

    if (result) {
      if (result.error) {
        console.error('Payment failed:', result.error.message)
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === 'succeeded'
      ) {
        if (currentPath.includes('wallet')) {
          const response = await topUpWallet({
            amount: totalAmount || 0,
            description: 'Top-up from credit card',
          })
          if (response) {
            onPaymentSuccess?.()
          } else {
            console.log('Top-up failed. Please try again.')
          }
        } else {
          const validPackageId = packageId ? parseInt(packageId) : null
          if (validPackageId !== null) {
            if (isConfirmBooking) {
              confirmBooking({
                token: token,
                bookingData: {
                  bookingId: bookingId,
                  paymentMethod: 'STRIPE',
                  paymentId: result.paymentIntent.id,
                },
              })
            } else {
              createBooking({
                token: token,
                bookingData: {
                  tripTypeId: tripType || 'B',
                  travelerCount: travellers || 1,
                  packageId: validPackageId,
                  paymentMethod: 'STRIPE',
                  paymentId: result.paymentIntent.id,
                  travellerNames: travellerNames,
                },
              })
            }
          }
        }
      }
    } else {
      console.error('No result from payment confirmation.')
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='flex flex-col xl:flex-row xl:space-x-8'>
        <div className='w-full max-w-[600px]' style={{ width: '600px' }}>
          <h3 className='mb-4 text-2xl font-semibold'>Payment Information</h3>
          <div className='stripe-input'>
            <CardElement
              options={{
                style: {
                  base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
              }}
            />
          </div>
          <Button
            type='submit'
            disabled={
              isProcessing ||
              !stripe ||
              !elements ||
              isBookingConfirming ||
              isBookingCreating
            }
            className='mt-6 w-full'
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default PaymentForm
