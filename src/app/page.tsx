import Link from 'next/link';
import Image from 'next/image';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Donation Card Section with Embedded Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row shadow-lg rounded-lg">
              {/* Left side - Palestine Image */}
              <div className="md:w-1/2 relative">
                <img 
                  src="/images/palestine.jpeg" 
                  alt="Palestine Support" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-6 text-white">
                  <h2 className="text-4xl font-bold">UMMAH EMERGENCY APPEAL</h2>
                </div>
              </div>
              
              {/* Right side - Donation Form */}
              <div className="md:w-1/2">
                <StripeCheckoutForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Your Donation Helps */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How Your Donation Helps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Emergency Food */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/1.jpg"
                  alt="Emergency Food"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Emergency Food</h3>
                <p className="text-gray-600">Providing essential food supplies to families facing severe food insecurity</p>
              </div>
            </div>
            
            {/* Clean Water */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/2.jpg"
                  alt="Clean Water"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Clean Water</h3>
                <p className="text-gray-600">Delivering safe drinking water to prevent waterborne diseases</p>
              </div>
            </div>
            
            {/* Medical Aid */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/3.jpg"
                  alt="Medical Aid"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Medical Aid</h3>
                <p className="text-gray-600">Supporting emergency healthcare services and medical supplies</p>
              </div>
            </div>
            
            {/* Ummah Support */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/4.jpg"
                  alt="Ummah Support"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Ummah</h3>
                <p className="text-gray-600">With your help, this platform can become a global force for good — bringing knowledge, compassion, and real support to Muslims everywhere. You're not just giving charity — you're investing in the future of the Ummah.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Donors Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/1.jpg" 
                    alt="Ahmed Khalid" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Ahmed Khalid</h3>
                  <p className="text-blue-600 text-sm">United Kingdom</p>
                </div>
              </div>
              <p className="italic text-gray-700">"My donation helped provide clean water to a village in Gaza. The impact was immediate and life-changing for those families."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/2.jpg" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-blue-600 text-sm">United States</p>
                </div>
              </div>
              <p className="italic text-gray-700">"I started donating monthly after seeing the difference it makes. The transparency in how funds are used gives me confidence my support matters."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/3.jpg" 
                    alt="Mohammed Ali" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Mohammed Ali</h3>
                  <p className="text-blue-600 text-sm">Canada</p>
                </div>
              </div>
              <p className="italic text-gray-700">"After visiting areas receiving aid, I witnessed firsthand how even small donations can transform communities in crisis."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/4.jpg" 
                    alt="Layla Hassan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Layla Hassan</h3>
                  <p className="text-blue-600 text-sm">Australia</p>
                </div>
              </div>
              <p className="italic text-gray-700">"Being able to help families in Gaza during these difficult times has been deeply meaningful. The medical supplies we funded saved lives."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/1.jpg" 
                    alt="Omar Farooq" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Omar Farooq</h3>
                  <p className="text-blue-600 text-sm">Germany</p>
                </div>
              </div>
              <p className="italic text-gray-700">"As a doctor, I know how critical these medical supplies are. My donation helped equip a field hospital that serves hundreds daily."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/2.jpg" 
                    alt="Amina Ibrahim" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Amina Ibrahim</h3>
                  <p className="text-blue-600 text-sm">France</p>
                </div>
              </div>
              <p className="italic text-gray-700">"Seeing children receive the emergency food packages we helped fund was an emotional moment. Every contribution matters."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
