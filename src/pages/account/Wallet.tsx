import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useWallet } from '@/hooks/useWallet';
import { stripeKeys } from '@/utils/stripeKeys';
import PaymentForm from '@/components/molecules/PaymentForm';
import { stripeIntent } from '@/api/stripeIntentApi';

function Wallet() {
  const { data: wallet, isLoading, error } = useWallet();
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const stripePromise = loadStripe(stripeKeys.publishable);

  const handlePaymentSuccess = () => {
    setShowInput(false);
    setClientSecret(null);
    setShowPaymentForm(false);
    fetchUpdatedWalletData();
  };

  const fetchUpdatedWalletData = async () => {
    useWallet();
    window.location.reload(); // Or use queryClient.invalidateQueries if using React Query
  };

  const handleAddMoneyClick = () => {
    setShowInput(true);
    setClientSecret(null);
    setShowPaymentForm(false);
  };

  const handlePayment = () => {
    const parsedAmount = Number(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setAmountError('Please enter a valid amount greater than 0.');
      return;
    }

    setAmountError('');

    stripeIntent({
      packagePrice: parsedAmount,
      tripType: 0,
      travellers: 0,
      packageId: 0
    }).then((response) => {
        setClientSecret(response.data.clientSecret);
        setShowPaymentForm(true);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
      });
  };

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto mt-10 p-4">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-10">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Could not load wallet information.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Wallet Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="font-semibold">Balance:</span>{' '}
          <span className="text-green-600 font-bold">
            ${wallet?.balance.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="font-semibold">Last Updated:</span>{' '}
          <span className="text-muted-foreground">
            {wallet?.lastUpdated &&
              new Date(wallet.lastUpdated).toLocaleString()}
          </span>
        </div>

        {/* Add Money Section */}
        {!showInput ? (
          <Button className="w-full mt-4" onClick={handleAddMoneyClick}>
            Add Money to Wallet
          </Button>
        ) : (
          <>
            <div className="space-y-2 mt-4">
              <Label htmlFor="amount">Amount to Add (CAD)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setAmountError('');
                }}
              />
              {amountError && (
                <p className="text-sm text-red-500">{amountError}</p>
              )}
              <Button className="w-full mt-2" onClick={handlePayment}>
                Pay
              </Button>
            </div>

            {/* Payment form appears after clicking "Pay" */}
            {showPaymentForm && clientSecret ? (
            <div className="mt-6">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  clientSecret={clientSecret}
                  totalAmount={Number(amount)}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Elements>
            </div>
          ) : (
            showPaymentForm && <p className="text-sm text-muted">Loading payment form...</p>
          )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Wallet;
