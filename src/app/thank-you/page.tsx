'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Можно использовать sessionId для получения дополнительной информации о платеже
  useEffect(() => {
    // Аналитика или другие действия после успешного платежа
    console.log('Successful payment with session ID:', sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h1>
          
          <p className="text-gray-600 mb-8">
            Your generous contribution will make a real difference in the lives of those in need. 
            We are grateful for your support of our mission.
          </p>
          
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your Impact</h2>
            <p className="text-gray-700">
              Your donation helps provide essential food, clean water, medical supplies, and shelter 
              to families facing humanitarian crises.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
            <Link 
              href="/donate" 
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Make Another Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 