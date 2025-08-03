'use client';

export default function SimpleTestimonials() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Donors Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              &ldquo;My donation helped provide clean water to a village in Gaza. The impact was immediate and life-changing for those families.&rdquo;
            </p>
            <div>
              <p className="font-bold">Ahmed Khalid</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              &ldquo;I started donating monthly after seeing the difference it makes. The transparency in how funds are used gives me confidence my support matters.&rdquo;
            </p>
            <div>
              <p className="font-bold">Sarah Johnson</p>
              <p className="text-gray-500">United States</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              &ldquo;After visiting areas receiving aid, I witnessed firsthand how even small donations can transform communities in crisis.&rdquo;
            </p>
            <div>
              <p className="font-bold">Mohammed Ali</p>
              <p className="text-gray-500">Canada</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              &ldquo;Being able to help families in Gaza during these difficult times has been deeply meaningful. The medical supplies we funded saved lives.&rdquo;
            </p>
            <div>
              <p className="font-bold">Layla Hassan</p>
              <p className="text-gray-500">Australia</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              &ldquo;As a doctor, I know how critical these medical supplies are. My donation helped equip a field hospital that serves hundreds daily.&rdquo;
            </p>
            <div>
              <p className="font-bold">Omar Farooq</p>
              <p className="text-gray-500">Germany</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">
              &ldquo;Seeing children receive the emergency food packages we helped fund was an emotional moment. Every contribution matters.&rdquo;
            </p>
            <div>
              <p className="font-bold">Amina Ibrahim</p>
              <p className="text-gray-500">France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 