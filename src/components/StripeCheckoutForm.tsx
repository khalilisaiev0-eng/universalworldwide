'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Получаем публичный ключ Stripe из переменных окружения
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function StripeCheckoutForm() {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Определяем итоговую сумму (выбранная или введенная вручную)
      const finalAmount = customAmount ? parseFloat(customAmount) : amount;
      
      // Проверяем, что сумма валидная
      if (!finalAmount || finalAmount <= 0) {
        setError('Please enter a valid amount');
        setLoading(false);
        return;
      }

      // Создаем Checkout Session через наш API
      console.log('Sending request to create checkout session');
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          donationType: donationType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const { sessionId, error: apiError } = await response.json();
      console.log('Received session ID:', sessionId);

      if (apiError) {
        throw new Error(apiError);
      }
      
      if (!sessionId) {
        throw new Error('No session ID returned from API');
      }

      // Загружаем Stripe
      console.log('Loading Stripe...');
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      console.log('Redirecting to Checkout...');
      // Перенаправляем на Stripe Checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) {
        console.error('Redirect error:', redirectError);
        throw new Error(redirectError.message);
      }

    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#00a5dc] rounded-lg overflow-hidden max-w-md mx-auto shadow-lg">
      <div className="p-6">
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 text-red-100 bg-red-600 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#e8f4f8] text-black py-4 rounded-md font-bold text-xl hover:bg-white transition-colors"
        >
          {loading ? 'Processing...' : 'Donate'}
        </button>
      </div>
    </div>
  );
} 