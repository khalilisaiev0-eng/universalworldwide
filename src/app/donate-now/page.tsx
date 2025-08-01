'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    city: '',
    postalCode: ''
  });
  
  const predefinedAmounts = [30, 50, 100, 250, 500];
  
  const handleAmountSelection = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount(false);
  };
  
  const handleCustomAmount = () => {
    setCustomAmount(true);
    setDonationAmount('');
  };
  
  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDonorInfo({
      ...donorInfo,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your donation! This is a demo - no actual donation has been processed.');
  };
  
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Make a Donation</h1>
          <p className="text-center text-gray-600 mb-8">
            Your generous contribution will help provide emergency relief to those affected in Gaza.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              {/* Donation Amount Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Select Donation Amount</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`py-3 px-4 rounded-md border ${
                        donationAmount === amount && !customAmount
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-700'
                      }`}
                      onClick={() => handleAmountSelection(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={customAmount}
                      onChange={handleCustomAmount}
                    />
                    Enter custom amount
                  </label>
                  
                  {customAmount && (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value ? Number(e.target.value) : '')}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                        min="1"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Donation Frequency */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Donation Frequency</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 rounded-md border bg-blue-700 text-white border-blue-700"
                  >
                    One Time
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 rounded-md border bg-white text-gray-700 border-gray-300 hover:border-blue-700"
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              {/* Donor Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Donor Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={donorInfo.country}
                    onChange={handleDonorInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={donorInfo.address}
                    onChange={handleDonorInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={donorInfo.city}
                      onChange={handleDonorInfoChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-md text-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Donate ${donationAmount || '0'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  By proceeding, you agree to our <Link href="/terms" className="text-blue-700 hover:underline">Terms of Service</Link>
                </p>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need help? <Link href="/contact" className="text-blue-700 hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 