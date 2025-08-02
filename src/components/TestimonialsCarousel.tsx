'use client';

import { useState, useEffect, useCallback } from 'react';
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
  {
    id: 7,
    name: 'Yusuf Rahman',
    location: 'Sweden',
    text: 'The psychological support services for traumatized children are making a real difference. I\'m proud to support this essential work.',
    avatar: '/images/3.jpg',
  },
  {
    id: 8,
    name: 'Fatima Zahra',
    location: 'Netherlands',
    text: 'After losing contact with family in Gaza, knowing that aid is reaching people there gives me hope. Thank you for your dedication.',
    avatar: '/images/4.jpg',
  },
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (!isPaused) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Auto-advance every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, nextSlide]);

  return (
    <div className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">What Our Donors Say</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto my-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from those who have already joined our mission to provide relief to those in need.
          </p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 bg-white"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-blue-600 text-white p-8 flex flex-col justify-center items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
                        <Image 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                      <p className="text-blue-100">{testimonial.location}</p>
                    </div>
                    <div className="md:w-2/3 p-8 md:p-12 flex items-center">
                      <div>
                        <svg className="h-10 w-10 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-gray-700 text-lg leading-relaxed">{testimonial.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicator Dots */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`mx-1 h-3 w-3 rounded-full focus:outline-none ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/donate" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Join Our Donors
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 