import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useCreateBooking } from '@/hooks/useBookings'
import { topUpWallet } from '@/hooks/useWalletTopup'

interface PaymentFormProps {
  clientSecret: string | null;
  amount?: number;
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ clientSecret,amount,onPaymentSuccess }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { packageId } = useParams()
  const location = useLocation()
  const currentPath = location.pathname
  const { tripType, travellers } = location.state || {}
  const { mutate: createBooking } = useCreateBooking();
  // const { mutate, isPending, isSuccess, isError } = useTopUpWallet()

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
  
          // Make the top-up API call
          const response = await topUpWallet({
            amount: amount || 0, 
            description: 'Top-up from credit card'
          });
          
          if (response!) {
            onPaymentSuccess(); 
          } else {
            console.log('Top-up failed. Please try again.');
          }
        } else {
          // We're on a booking page
          const validPackageId = packageId ? parseInt(packageId) : null
      
          if (validPackageId !== null) {
            createBooking({
              tripTypeId: tripType || 'B',
              travelerCount: travellers || 1,
              packageId: validPackageId,
              paymentMethod: 'STRIPE',
              paymentId: result.paymentIntent.id,
            })
          }
        }
      }
    } else {
      console.error('No result from payment confirmation.')
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col xl:flex-row xl:space-x-8">
        {/* Right side: Stripe Payment Form */}
        <div className="w-full max-w-[600px]" style={{ width: '600px' }}>
  <h3 className="text-2xl font-semibold mb-4">Payment Information</h3>
  <div className="stripe-input">
    {/* Card Element with styles */}
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
    type="submit"
    disabled={isProcessing || !stripe || !elements}
    className="mt-6 w-full"
  >
    {isProcessing ? 'Processing...' : 'Pay Now'}
  </Button>
</div>

      </div>
    </form>
  )
}

export default PaymentForm

