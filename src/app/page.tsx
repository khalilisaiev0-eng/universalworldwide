import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div 
          className="relative h-[500px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('/images/S1a241d55e1b84342a1baf602ad0b12d2C.jpg')" }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gaza Emergency Appeal</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Over 1.7 million people have been displaced in Gaza. 
              Your donation can provide urgent humanitarian assistance to those in need.
            </p>
            <Link 
              href="/donate-now" 
              className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-red-700 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Gaza Humanitarian Crisis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1.7M+</div>
              <p className="text-gray-700">People displaced across Gaza</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">75%</div>
              <p className="text-gray-700">Of infrastructure has been damaged or destroyed</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">250,000+</div>
              <p className="text-gray-700">Children are in need of immediate psychosocial support</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Families in Gaza need your help now. With limited access to food, water, medicine, and shelter, 
              your contribution can make a difference in providing essential humanitarian assistance.
            </p>
            <Link 
              href="/about" 
              className="text-blue-700 font-medium hover:underline"
            >
              Learn more about the situation →
            </Link>
          </div>
        </div>
      </section>

      {/* How Your Donation Helps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">How Your Donation Helps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v.5h1a1 1 0 011 1V15a1 1 0 01-1 1H5a1 1 0 01-1-1V3.5a1 1 0 011-1h1V2zm7 1H8v2h4V3zm-3 4a2 2 0 11-4 0 2 2 0 014 0zm7 5v2a3 3 0 01-6 0v-2a3 3 0 116 0zM8 14a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Food</h3>
              <p className="text-gray-600">Providing essential food supplies to families facing severe food insecurity</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Clean Water</h3>
              <p className="text-gray-600">Delivering safe drinking water to prevent waterborne diseases</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Medical Aid</h3>
              <p className="text-gray-600">Supporting emergency healthcare services and medical supplies</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Shelter</h3>
              <p className="text-gray-600">Providing temporary shelter and protection for displaced families</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Act Now to Save Lives</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your support is urgently needed. Every donation, no matter how small, can help provide
            life-saving assistance to families in Gaza.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/donate-now" 
              className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-red-700 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/fundraise"
              className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Fundraising
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
