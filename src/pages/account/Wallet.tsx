import { stripeIntent } from '@/api/stripeIntentApi'
import PaymentForm from '@/components/molecules/PaymentForm'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useWallet } from '@/hooks/useWallet'
import { stripeKeys } from '@/utils/stripeKeys'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

function Wallet() {
  const { data: wallet, isLoading, error } = useWallet()
  const [showInput, setShowInput] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const stripePromise = loadStripe(stripeKeys.publishable)

  const handlePaymentSuccess = () => {
    setShowInput(false)
    setClientSecret(null)
    setShowPaymentForm(false)
    fetchUpdatedWalletData()
  }

  const fetchUpdatedWalletData = async () => {
    window.location.reload() // Or use queryClient.invalidateQueries if using React Query
  }

  const handleAddMoneyClick = () => {
    setShowInput(true)
    setClientSecret(null)
    setShowPaymentForm(false)
  }

  const handlePayment = () => {
    const parsedAmount = Number(amount)
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setAmountError('Please enter a valid amount greater than 0.')
      return
    }

    setAmountError('')

    stripeIntent({
      packagePrice: parsedAmount,
      tripType: 0,
      travellers: 0,
      packageId: 0,
    })
      .then((response) => {
        setClientSecret(response.data.clientSecret)
        setShowPaymentForm(true)
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error)
      })
  }

  if (isLoading) {
    return (
      <Card className='mx-auto mt-10 max-w-md p-4'>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='mb-2 h-8 w-3/4' />
          <Skeleton className='h-6 w-1/2' />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant='destructive' className='mx-auto mt-10 max-w-md'>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Could not load wallet information.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className='mx-auto mt-10 max-w-md rounded-2xl p-4 shadow-xl'>
      <CardHeader>
        <CardTitle className='text-xl'>Wallet Details</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <span className='font-semibold'>Balance:</span>{' '}
          <span className='font-bold text-green-600'>
            ${wallet?.balance.toFixed(2)}
          </span>
        </div>
        <div>
          <span className='font-semibold'>Last Updated:</span>{' '}
          <span className='text-muted-foreground'>
            {wallet?.lastUpdated &&
              new Date(wallet.lastUpdated).toLocaleString()}
          </span>
        </div>

        {/* Add Money Section */}
        {!showInput ? (
          <Button className='mt-4 w-full' onClick={handleAddMoneyClick}>
            Add Money to Wallet
          </Button>
        ) : (
          <>
            <div className='mt-4 space-y-2'>
              <Label htmlFor='amount'>Amount to Add (CAD)</Label>
              <Input
                id='amount'
                type='number'
                min='1'
                placeholder='Enter amount'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setAmountError('')
                }}
              />
              {amountError && (
                <p className='text-sm text-red-500'>{amountError}</p>
              )}
              <Button className='mt-2 w-full' onClick={handlePayment}>
                Pay
              </Button>
            </div>

            {/* Payment form appears after clicking "Pay" */}
            {showPaymentForm && clientSecret ? (
              <div className='mt-6'>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm
                    clientSecret={clientSecret}
                    totalAmount={Number(amount)}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </div>
            ) : (
              showPaymentForm && (
                <p className='text-muted text-sm'>Loading payment form...</p>
              )
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Wallet
