'use client';

import DonationForm from '@/components/DonationForm';

export default function DonatePage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Make a Donation</h1>
          <p className="text-center text-gray-600 mb-8">
            Your generous contribution will help provide emergency relief to those affected in Gaza.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Donation Form */}
            <div className="md:w-1/2">
              <DonationForm />
            </div>
            
            {/* Info Panel */}
            <div className="md:w-1/2 bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">Your Donation Makes a Difference</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Where Your Money Goes</h3>
                  <p className="text-gray-600">
                    100% of your donation goes directly to providing emergency assistance
                    to families in Gaza, including food, clean water, medical supplies, and shelter.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Monthly Giving</h3>
                  <p className="text-gray-600">
                    By becoming a monthly donor, you provide consistent support that helps us plan and
                    implement long-term solutions alongside emergency relief.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-lg mb-2">Donation Impact</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>$75</strong> - Provides emergency food supplies for a family for two weeks</li>
                    <li><strong>$300</strong> - Delivers clean water and hygiene kits to 20 families</li>
                    <li><strong>$1,000</strong> - Supports medical care for 50 people</li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-lg mb-2">Secure Donation</h3>
                  <p className="text-gray-600">
                    All donations are processed securely through Stripe. Your financial information
                    is encrypted and never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Need help? <a href="/contact" className="text-blue-700 hover:underline">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 