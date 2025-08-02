'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Image from 'next/image';

// Replace with your Stripe public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Supported currencies
const currencies = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
];

// Card element styling
const cardElementOptions = {
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
  hidePostalCode: true, // We collect it separately
};

// Donor information interface
interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  postalCode: string;
}

const OneUmmahDonationFormContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    postalCode: '',
  });
  const [formStep, setFormStep] = useState(1); // 1: Amount selection, 2: Payment details

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(0);
    setError(null);
  };

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDonorInfo({
      ...donorInfo,
      [name]: value,
    });
    setError(null);
  };

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : '');
  };

  const validateStep1 = (): boolean => {
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    if (!finalAmount || finalAmount <= 0) {
      setError('Please select or enter a valid donation amount');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (formStep === 1) {
      handleNextStep();
      return;
    }
    
    // Determine final amount - either selected preset or custom amount
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    try {
      // Create payment intent on the server
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: Math.round(finalAmount * 100), // Stripe requires amount in cents
          currency,
          donationType,
          donorInfo, // Send donor info to the server
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error('No client secret received from server');
      }

      // Get the card element
      const cardElement = elements?.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Confirm the payment intent
      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: donorInfo.firstName + ' ' + donorInfo.lastName,
            email: donorInfo.email,
            address: {
              country: donorInfo.country,
              postal_code: donorInfo.postalCode,
            },
          },
        },
      });

      if (result?.error) {
        setError(result.error.message || 'Payment failed');
        setCardError(result.error.code || '');
      } else if (result?.paymentIntent?.status === 'succeeded') {
        setSuccess(true);
        // Optionally, redirect to a success page or show a success message
        console.log('Payment succeeded:', result.paymentIntent);
      } else {
        // Handle other payment intent statuses if needed
        console.log('Unexpected payment intent status:', result?.paymentIntent?.status);
      }
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred.');
      setCardError(error.code || '');
    }
  };

  if (success) {
    return (
      <div className="p-8 text-center">
        <div className="text-3xl font-bold text-green-600 mb-4">Thank You!</div>
        <p className="text-xl">Your donation has been processed successfully.</p>
        <p className="mt-4">Your generous support will help Muslims in need around the world.</p>
        <button 
          onClick={() => {
            setSuccess(false);
            setAmount(300);
            setCustomAmount('');
            setFormStep(1);
            setDonorInfo({
              firstName: '',
              lastName: '',
              email: '',
              country: '',
              postalCode: '',
            });
          }}
          className="mt-6 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {formStep === 1 ? (
        <div>
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
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 text-red-100 bg-red-600 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8f4f8] text-black py-4 rounded-md font-bold text-xl hover:bg-white transition-colors"
            >
              {loading ? 'Processing...' : 'Donate'}
            </button>
          </form>
        </div>
      ) : (
        // Step 2 would be the payment details form
        <div>
          {/* Payment form would go here */}
        </div>
      )}
    </div>
  );
};

export default function OneUmmahDonationForm() {
  return (
    <div className="bg-[#00a5dc] rounded-lg overflow-hidden w-full shadow-lg">
      <Elements stripe={stripePromise}>
        <OneUmmahDonationFormContent />
      </Elements>
    </div>
  );
} 