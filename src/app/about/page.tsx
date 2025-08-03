import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About the Gaza Emergency</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-lg text-gray-600 mb-8">
              The humanitarian situation in Gaza has reached catastrophic levels. Over 1.7 million people 
              have been displaced, many for the second or third time, and essential services have collapsed.
            </p>
            
            <div className="my-8 relative h-80 w-full">
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Image placeholder - Gaza destruction</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">The Current Crisis</h2>
            <p>
              Since October 2023, the situation in Gaza has deteriorated significantly. Critical infrastructure 
              including hospitals, schools, water treatment facilities, and power plants has been severely damaged 
              or destroyed. Most people have limited or no access to:
            </p>
            
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Clean drinking water</li>
              <li>Adequate food supplies</li>
              <li>Essential medicines</li>
              <li>Electricity</li>
              <li>Safe shelter</li>
            </ul>
            
            <p>
              Overcrowded shelters and lack of sanitation facilities have created conditions where diseases 
              can spread rapidly. Many health facilities are no longer operational, and those that remain 
              are overwhelmed and critically short of supplies.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Our Response</h2>
            <p>
              We are working with local partners to provide emergency assistance to the most vulnerable 
              people in Gaza. Our current priorities include:
            </p>
            
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Emergency Food Assistance:</strong> Providing essential food packages to families facing severe food insecurity.
              </li>
              <li>
                <strong>Clean Water:</strong> Distributing clean drinking water and water purification tablets.
              </li>
              <li>
                <strong>Medical Aid:</strong> Supporting emergency healthcare services and providing essential medications and supplies.
              </li>
              <li>
                <strong>Emergency Shelter:</strong> Providing materials for temporary shelter and basic household items.
              </li>
              <li>
                <strong>Psychosocial Support:</strong> Offering support to children and adults experiencing trauma.
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">How You Can Help</h2>
            <p>
              Your donation can make a real difference in the lives of families in Gaza. Here&apos;s how your contribution can help:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="font-bold">$30</div>
                <p>Can provide emergency food supplies for a family for one week</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="font-bold">$50</div>
                <p>Can provide clean drinking water for 10 families for one week</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="font-bold">$100</div>
                <p>Can provide essential medicines and medical supplies</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="font-bold">$250</div>
                <p>Can provide emergency shelter materials for a displaced family</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 my-8">
              <p className="font-semibold">Your donation makes a difference</p>
              <p>Every contribution, no matter how small, can help provide life-saving assistance to those in need.</p>
            </div>
            
            <div className="text-center my-8">
              <Link
                href="/donate-now"
                className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-red-700 transition-colors inline-block"
              >
                Donate Now
              </Link>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Transparency and Accountability</h2>
            <p>
              We are committed to transparency and accountability in all our operations. Regular updates on our 
              emergency response activities and the impact of donations are published on our website. We work 
              with trusted partners on the ground to ensure that aid reaches those who need it most.
            </p>
            
            <div className="mt-8">
              <p className="font-semibold">For more information about our work:</p>
              <ul className="list-disc pl-6 my-2 space-y-1">
                <li><Link href="/contact" className="text-blue-700 hover:underline">Contact our team</Link></li>
                <li><Link href="/faq" className="text-blue-700 hover:underline">Read our FAQs</Link></li>
                <li><Link href="/reports" className="text-blue-700 hover:underline">View our impact reports</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 