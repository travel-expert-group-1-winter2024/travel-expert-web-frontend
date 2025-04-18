import { stripeIntent } from '@/api/stripeIntentApi'
import PaymentForm from '@/components/molecules/PaymentForm'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useWallet } from '@/hooks/useWallet'
import { topUpWalletResponse } from '@/types/wallet.ts'
import { getFormattedCurrency } from '@/utils/currency.ts'
import { stripeKeys } from '@/utils/stripeKeys'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

function Wallet() {
  const { data: wallet, isLoading, error } = useWallet()
  const [showInput, setShowInput] = useState(false)
  const [amount, setAmount] = useState<number | ''>('')
  const [displayAmount, setDisplayAmount] = useState<string>('')
  const [amountError, setAmountError] = useState('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [balance, setBalance] = useState<string>('0.00')
  const [lastUpdated, setLastUpdate] = useState<string>('')

  useEffect(() => {
    if (wallet) {
      // format balance
      const formattedBalance = getFormattedCurrency(wallet.balance)
      // format date
      const formattedDate = new Date(wallet.lastUpdated).toLocaleString()

      setBalance(formattedBalance)
      setLastUpdate(formattedDate)
    }
  }, [wallet])

  const stripePromise = loadStripe(stripeKeys.publishable)

  const handlePaymentSuccess = (data: topUpWalletResponse) => {
    setShowInput(false)
    setClientSecret(null)
    setShowPaymentForm(false)
    setAmount(0)
    setDisplayAmount('')
    setAmountError('')

    const formattedBalance = getFormattedCurrency(data.balance)
    const formattedDate = new Date(data.lastUpdated).toLocaleString()
    setBalance(formattedBalance)
    setLastUpdate(formattedDate)

    toast.success('Payment successful! Your wallet has been topped up.')
  }

  const handlePaymentFailure = () => {
    setShowInput(false)
    setClientSecret(null)
    setShowPaymentForm(false)
    setAmount(0)
    setDisplayAmount('')
    setAmountError('')

    toast.error('Payment failed. Please try again.')
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
          <span className='font-bold text-green-600'>{balance}</span>
        </div>
        <div>
          <span className='font-semibold'>Last Updated:</span>{' '}
          <span className='text-muted-foreground'>{lastUpdated}</span>
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
                type='text'
                placeholder='Enter amount'
                value={displayAmount}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, '')
                  const num = Number(raw)
                  if (!isNaN(num)) {
                    setAmount(num)
                    setDisplayAmount(num.toLocaleString())
                  } else {
                    setAmount('')
                    setDisplayAmount('')
                  }
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
                    onPaymentFailure={handlePaymentFailure}
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
