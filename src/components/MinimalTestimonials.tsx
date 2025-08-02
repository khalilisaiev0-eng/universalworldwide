'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khalid',
    location: 'United Kingdom',
    text: 'My donation helped provide clean water to a village in Gaza. The impact was immediate and life-changing for those families.',
    avatar: '/images/1.jpg',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    location: 'United States',
    text: 'I started donating monthly after seeing the difference it makes. The transparency in how funds are used gives me confidence my support matters.',
    avatar: '/images/2.jpg',
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    location: 'Canada',
    text: 'After visiting areas receiving aid, I witnessed firsthand how even small donations can transform communities in crisis.',
    avatar: '/images/3.jpg',
  },
  {
    id: 4,
    name: 'Layla Hassan',
    location: 'Australia',
    text: 'Being able to help families in Gaza during these difficult times has been deeply meaningful. The medical supplies we funded saved lives.',
    avatar: '/images/4.jpg',
  },
  {
    id: 5,
    name: 'Omar Farooq',
    location: 'Germany',
    text: 'As a doctor, I know how critical these medical supplies are. My donation helped equip a field hospital that serves hundreds daily.',
    avatar: '/images/1.jpg',
  },
  {
    id: 6,
    name: 'Amina Ibrahim',
    location: 'France',
    text: 'Seeing children receive the emergency food packages we helped fund was an emotional moment. Every contribution matters.',
    avatar: '/images/2.jpg',
  },
];

export default function MinimalTestimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    setSelectedTestimonial(index);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full mb-3">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Community Impact</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Read inspiring stories from donors who have joined our mission to bring relief to those in need.
            </p>
          </div>

          <div ref={scrollRef} className="mb-12 bg-gray-50 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="shrink-0">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={testimonials[selectedTestimonial].avatar}
                    alt={testimonials[selectedTestimonial].name}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <svg className="h-8 w-8 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic">
                    {testimonials[selectedTestimonial].text}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {testimonials[selectedTestimonial].name}
                  </h3>
                  <p className="text-blue-600">
                    {testimonials[selectedTestimonial].location}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                className={`relative focus:outline-none group ${
                  selectedTestimonial === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="relative w-full h-16 md:h-20 rounded-md overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 768px) 100px, 120px"
                    className={`object-cover transition-opacity ${
                      selectedTestimonial === index ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'
                    }`}
                  />
                </div>
                <div className={`absolute inset-0 border-2 rounded-md transition-colors ${
                  selectedTestimonial === index ? 'border-blue-500' : 'border-transparent group-hover:border-gray-300'
                }`}></div>
              </button>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a
              href="/donate"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors shadow-md"
            >
              Join Our Donors Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 