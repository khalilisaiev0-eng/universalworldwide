'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your Stripe public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const DonationFormContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('');
  const [coverFees, setCoverFees] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe has not loaded properly. Please try again.');
      setLoading(false);
      return;
    }

    // Determine final amount - either selected preset or custom amount
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    // Add transaction fee if selected
    const transactionFee = coverFees ? finalAmount * 0.029 + 0.30 : 0;
    const totalAmount = coverFees ? finalAmount + transactionFee : finalAmount;

    try {
      // Create payment intent on the server
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: Math.round(totalAmount * 100), // Stripe requires amount in cents
          currency,
          donationType
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { clientSecret } = await response.json();

      // Use the client secret to confirm payment with the card element
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // You can add billing details here if you collect them
          },
        },
      });

      if (paymentResult.error) {
        // Show error to your customer
        setError(paymentResult.error.message || 'An error occurred with your payment');
      } else {
        if (paymentResult.paymentIntent?.status === 'succeeded') {
          // Payment successful
          setSuccess(true);
        }
      }
    } catch (err) {
      setError('There was an error processing your payment. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="p-8 text-center">
        <div className="text-3xl font-bold text-green-600 mb-4">Thank You!</div>
        <p className="text-xl">Your donation has been processed successfully.</p>
        <p className="mt-4">Your generous support will help save lives in Gaza.</p>
        <button 
          onClick={() => {
            setSuccess(false);
            setAmount(300);
            setCustomAmount('');
          }}
          className="mt-6 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">HELP SAVE LIVES IN GAZA</h1>

      {/* Donation Type Toggle */}
      <div className="bg-white rounded-md mb-6 flex">
        <button
          type="button"
          className={`flex-1 py-4 text-center rounded-l-md ${donationType === 'once' ? 'bg-[#e8f4f8] text-black' : 'text-gray-600'}`}
          onClick={() => setDonationType('once')}
        >
          Give Once
        </button>
        <button
          type="button"
          className={`flex-1 py-4 text-center rounded-r-md ${donationType === 'monthly' ? 'bg-[#e8f4f8] text-black' : 'text-gray-600'}`}
          onClick={() => setDonationType('monthly')}
        >
          ❤️ Give Monthly
        </button>
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          type="button"
          className={`py-4 rounded-md ${amount === 75 && !customAmount ? 'bg-white text-black' : 'bg-[#e8f4f8] text-black'}`}
          onClick={() => handleAmountSelect(75)}
        >
          75 US$
        </button>
        <button
          type="button"
          className={`py-4 rounded-md ${amount === 300 && !customAmount ? 'bg-white text-black' : 'bg-[#e8f4f8] text-black'}`}
          onClick={() => handleAmountSelect(300)}
        >
          300 US$
        </button>
        <button
          type="button"
          className={`py-4 rounded-md ${amount === 1000 && !customAmount ? 'bg-white text-black' : 'bg-[#e8f4f8] text-black'}`}
          onClick={() => handleAmountSelect(1000)}
        >
          1000 US$
        </button>
      </div>

      {/* Custom Amount */}
      <div className="mb-6">
        <label htmlFor="customAmount" className="block text-white mb-2">
          Or choose your own amount (US$)
        </label>
        <input
          type="number"
          id="customAmount"
          value={customAmount}
          onChange={handleCustomAmountChange}
          placeholder="Enter amount"
          className="w-full p-4 rounded-md"
          min="1"
        />
      </div>

      {/* Currency Selection */}
      <div className="mb-6">
        <label htmlFor="currency" className="block text-white mb-2">
          Choose your currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-4 rounded-md"
        >
          <option value="USD">United States Dollar</option>
          <option value="EUR">Euro</option>
          <option value="GBP">British Pound</option>
          <option value="CAD">Canadian Dollar</option>
          <option value="AUD">Australian Dollar</option>
        </select>
      </div>

      {/* Card Element */}
      <div className="mb-6 bg-white p-4 rounded-md">
        <label htmlFor="card-element" className="block text-gray-700 mb-2">
          Card Details
        </label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {/* Cover Transaction Fees */}
      <div className="flex items-center bg-white p-4 rounded-md mb-6">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={coverFees}
              onChange={() => setCoverFees(!coverFees)}
              className="sr-only"
            />
            <div className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${coverFees ? 'bg-blue-500' : ''}`}>
              <div className={`absolute w-4 h-4 bg-white rounded-full transition transform ${coverFees ? 'translate-x-5' : 'translate-x-1'} top-1`}></div>
            </div>
          </div>
          <span className="ml-3 text-gray-800">Cover transaction fees</span>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 text-red-600 bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#e8f4f8] text-black py-4 rounded-md font-bold text-xl hover:bg-white transition-colors"
      >
        {loading ? 'Processing...' : 'Donate'}
      </button>
    </form>
  );
};

export default function DonationForm() {
  return (
    <div className="bg-[#00a5dc] rounded-lg overflow-hidden max-w-md mx-auto shadow-lg">
      <Elements stripe={stripePromise}>
        <DonationFormContent />
      </Elements>
    </div>
  );
} 