'use client';

import { useState, useRef, useEffect } from 'react';
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

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isVisible }: { testimonial: typeof testimonials[0], isVisible: boolean }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="h-2 bg-blue-600"></div>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-600">
            <Image 
              src={testimonial.avatar} 
              alt={testimonial.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{testimonial.name}</h3>
            <p className="text-blue-600 text-sm">{testimonial.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <svg width="36" height="36" viewBox="0 0 36 36" className="text-blue-100 fill-current">
            <path d="M13.5 16.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm0 0h-9a9 9 0 0 0 9 9M31.5 16.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm0 0h-9a9 9 0 0 0 9 9"></path>
          </svg>
        </div>
        <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
      </div>
    </div>
  );
};

export default function TestimonialCards() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start showing testimonials one by one with delays
          const showItems = () => {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 200); // 200ms delay between each card animation
            });
          };
          
          showItems();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Donor Testimonials</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what our donors have to say about their experiences supporting our mission to provide aid to those in need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              isVisible={visibleItems.includes(index)} 
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/donate" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Make Your Impact
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 