'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

  const handleCardChange = (event: { error?: { message: string } }) => {
    setCardError(event.error ? event.error.message : '');
  };

  const validateStep1 = (): boolean => {
    // Check if an amount is selected or a custom amount is entered
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    if (!finalAmount || finalAmount <= 0) {
      setError('Please select or enter a valid donation amount');
      return false;
    }
    
    return true;
  };

  const validateStep2 = (): boolean => {
    // Validate donor information
    if (!donorInfo.firstName.trim()) {
      setError('Please enter your first name');
      return false;
    }
    
    if (!donorInfo.lastName.trim()) {
      setError('Please enter your last name');
      return false;
    }
    
    if (!donorInfo.email.trim() || !donorInfo.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!donorInfo.country.trim()) {
      setError('Please select your country');
      return false;
    }
    
    // Card validation is handled by Stripe
    if (cardError) {
      setError(cardError);
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
    }
  };

  const handlePreviousStep = () => {
    setFormStep(1);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (formStep === 1) {
      handleNextStep();
      return;
    }
    
    // Validate step 2 before submission
    if (!validateStep2()) {
      return;
    }
    
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
          donationType,
          donorInfo, // Send donor info to the server
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
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
            name: `${donorInfo.firstName} ${donorInfo.lastName}`,
            email: donorInfo.email,
            address: {
              country: donorInfo.country,
              postal_code: donorInfo.postalCode,
            },
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'There was an error processing your payment. Please try again.';
      setError(errorMessage);
      console.error(err);
    }

    setLoading(false);
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
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">HELP SUPPORT THE UMMAH</h1>

      {formStep === 1 ? (
        // Step 1: Donation Amount
        <>
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
        </>
      ) : (
        // Step 2: Donor Information & Payment
        <>
          {/* Donor Information */}
          <div className="mb-6 bg-white p-4 rounded-md">
            <h2 className="font-semibold mb-4">Donor Information</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={donorInfo.firstName}
                  onChange={handleDonorInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={donorInfo.lastName}
                  onChange={handleDonorInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={donorInfo.email}
                onChange={handleDonorInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={donorInfo.country}
                  onChange={handleDonorInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                </select>
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={donorInfo.postalCode}
                  onChange={handleDonorInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Card Element */}
          <div className="mb-6 bg-white p-4 rounded-md">
            <label htmlFor="card-element" className="block text-gray-700 font-medium mb-2">
              Card Details *
            </label>
            <CardElement
              id="card-element"
              options={cardElementOptions}
              onChange={handleCardChange}
            />
            {cardError && (
              <div className="text-red-600 text-sm mt-2">
                {cardError}
              </div>
            )}
          </div>

          {/* Donation Summary */}
          <div className="mb-6 bg-white p-4 rounded-md">
            <h3 className="font-medium mb-2">Donation Summary</h3>
            <div className="flex justify-between mb-1">
              <span>Donation ({donationType === 'monthly' ? 'Monthly' : 'One Time'})</span>
              <span>{customAmount ? `$${customAmount}` : `$${amount}`} {currency}</span>
            </div>
            {coverFees && (
              <div className="flex justify-between mb-1">
                <span>Transaction Fee</span>
                <span>${((customAmount ? parseFloat(customAmount) : amount) * 0.029 + 0.30).toFixed(2)} {currency}</span>
              </div>
            )}
            <div className="flex justify-between font-bold mt-2 pt-2 border-t">
              <span>Total</span>
              <span>
                ${(coverFees 
                  ? (customAmount ? parseFloat(customAmount) : amount) * 1.029 + 0.30 
                  : (customAmount ? parseFloat(customAmount) : amount)
                ).toFixed(2)} {currency}
              </span>
            </div>
          </div>
          
          {/* Back button */}
          <button
            type="button"
            onClick={handlePreviousStep}
            className="text-white mb-4 underline"
          >
            &larr; Change amount
          </button>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 text-red-100 bg-red-600 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || (!stripe && formStep === 2)}
        className="w-full bg-[#e8f4f8] text-black py-4 rounded-md font-bold text-xl hover:bg-white transition-colors"
      >
        {loading ? 'Processing...' : formStep === 1 ? 'Continue' : `Donate ${customAmount ? `$${customAmount}` : `$${amount}`}`}
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