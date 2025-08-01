import Link from 'next/link';

export default function DonatePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">How You Can Help</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            There are many ways you can contribute to the Gaza emergency relief efforts. Your support can make 
            a real difference in the lives of those affected by the crisis.
          </p>
          
          {/* Ways to Help Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Make a Donation */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-700 text-white p-4">
                <h2 className="text-xl font-semibold">Make a Donation</h2>
              </div>
              <div className="p-6">
                <p className="mb-4">
                  Your financial contribution can provide immediate relief to families in Gaza. Every donation helps 
                  provide food, water, medical supplies, and shelter to those in need.
                </p>
                <Link 
                  href="/donate-now" 
                  className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors inline-block"
                >
                  Donate Now
                </Link>
              </div>
            </div>
            
            {/* Start a Fundraiser */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-700 text-white p-4">
                <h2 className="text-xl font-semibold">Start a Fundraiser</h2>
              </div>
              <div className="p-6">
                <p className="mb-4">
                  Rally your friends, family, or community to make an even bigger impact. Create a personal 
                  fundraising campaign and help spread awareness about the crisis.
                </p>
                <Link 
                  href="/fundraise" 
                  className="bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors inline-block"
                >
                  Start Fundraising
                </Link>
              </div>
            </div>
            
            {/* Corporate Partnerships */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-700 text-white p-4">
                <h2 className="text-xl font-semibold">Corporate Partnerships</h2>
              </div>
              <div className="p-6">
                <p className="mb-4">
                  Businesses can make a significant impact through corporate donations, employee matching programs, 
                  or cause-related marketing initiatives.
                </p>
                <Link 
                  href="/corporate" 
                  className="bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors inline-block"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
            
            {/* Spread Awareness */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-700 text-white p-4">
                <h2 className="text-xl font-semibold">Spread Awareness</h2>
              </div>
              <div className="p-6">
                <p className="mb-4">
                  Share information about the crisis in Gaza with your network. Raising awareness can help 
                  generate support and encourage others to take action.
                </p>
                <div className="flex space-x-4 mt-2">
                  <Link href="#" className="text-blue-700 hover:underline">
                    Facebook
                  </Link>
                  <Link href="#" className="text-blue-700 hover:underline">
                    Twitter
                  </Link>
                  <Link href="#" className="text-blue-700 hover:underline">
                    Instagram
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Monthly Giving Program */}
          <div className="bg-gray-50 border-l-4 border-blue-700 p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">Become a Monthly Donor</h2>
            <p className="mb-4">
              Join our community of monthly donors and provide ongoing support to families affected by the crisis in Gaza. 
              Your recurring gift helps us plan for long-term assistance and respond quickly to emerging needs.
            </p>
            <Link 
              href="/monthly-giving" 
              className="bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors inline-block"
            >
              Learn More
            </Link>
          </div>
          
          {/* Impact Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">The Impact of Your Support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-700 mb-2">$30</div>
                <p>Provides emergency food supplies for a family for one week</p>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-700 mb-2">$100</div>
                <p>Provides essential medicines and medical supplies</p>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-700 mb-2">$500</div>
                <p>Supports a mobile health clinic for a day</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-blue-700 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Every Donation Makes a Difference</h2>
            <p className="mb-6">
              Join thousands of donors who are helping to provide critical humanitarian aid to families in Gaza.
            </p>
            <Link 
              href="/donate-now" 
              className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 