'use client';

import DonationForm from '@/components/DonationForm';
import Image from 'next/image';

export default function DonatePage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Emergency Appeal for Gaza</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
          {/* Left side - Image and text */}
          <div className="lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/S1a241d55e1b84342a1baf602ad0b12d2C.jpg"
                alt="Child in Gaza"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                <h2 className="text-white text-2xl font-bold">GAZA EMERGENCY APPEAL</h2>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Critical Humanitarian Crisis</h2>
              <p className="text-gray-700 mb-4">
                The situation in Gaza is dire. Millions of people, including children, are facing severe
                shortages of food, clean water, medical supplies, and shelter.
              </p>
              <p className="text-gray-700 mb-4">
                Your donation today will provide immediate relief to families affected by this crisis.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-blue-700">2.2M+</span>
                  <span className="text-gray-600 text-sm text-center">People in need of humanitarian aid</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-blue-700">1M+</span>
                  <span className="text-gray-600 text-sm text-center">Children at risk</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-lg mb-2">Where Your Donation Goes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Emergency food and water supplies</li>
                <li>• Medical care and supplies</li>
                <li>• Emergency shelter</li>
                <li>• Psychosocial support</li>
                <li>• Humanitarian coordination</li>
              </ul>
            </div>
          </div>
          
          {/* Right side - Donation form */}
          <div className="lg:w-1/2 sticky top-24">
            <DonationForm />
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            For more information about our emergency response or other ways to help, 
            please <a href="/contact" className="text-blue-700 hover:underline">contact our support team</a>.
          </p>
          <div className="flex justify-center gap-6">
            <a href="/donate" className="text-blue-700 hover:underline">Other Ways to Help</a>
            <a href="/about" className="text-blue-700 hover:underline">Learn More About the Crisis</a>
          </div>
        </div>
      </div>
    </div>
  );
} 