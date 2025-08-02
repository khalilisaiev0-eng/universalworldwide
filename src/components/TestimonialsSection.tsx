'use client';

import { useState } from 'react';
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
  {
    id: 9,
    name: 'Khalid Ahmed',
    location: 'Singapore',
    text: 'Our community mosque organized a fundraiser that exceeded all expectations. The solidarity shown was incredible.',
    avatar: '/images/1.jpg',
  },
  {
    id: 10,
    name: 'Zainab Ali',
    location: 'United Arab Emirates',
    text: 'As someone who lived through conflict, I know how vital this humanitarian aid is. Your work restores dignity to those suffering.',
    avatar: '/images/2.jpg',
  },
  {
    id: 11,
    name: 'Ibrahim Mahmoud',
    location: 'Malaysia',
    text: 'The emergency shelter kits provided safety for displaced families. It\'s moving to see how our donations create immediate impact.',
    avatar: '/images/3.jpg',
  },
  {
    id: 12,
    name: 'Mariam Yusuf',
    location: 'South Africa',
    text: 'I\'ve been donating monthly for over a year now. Seeing regular updates about how the aid is helping gives me great satisfaction.',
    avatar: '/images/4.jpg',
  },
  {
    id: 13,
    name: 'Tariq Abdullah',
    location: 'Jordan',
    text: 'The mobile health clinics funded by donations have reached areas where medical care was completely absent. This saves countless lives.',
    avatar: '/images/1.jpg',
  },
  {
    id: 14,
    name: 'Rania Hasan',
    location: 'Egypt',
    text: 'After participating in a fundraising campaign, I\'ve seen how collective effort can make an enormous difference in crisis response.',
    avatar: '/images/2.jpg',
  },
  {
    id: 15,
    name: 'Bilal Khan',
    location: 'Pakistan',
    text: 'The water filtration systems installed in refugee camps are preventing disease and keeping children healthy. This work matters deeply.',
    avatar: '/images/3.jpg',
  },
  {
    id: 16,
    name: 'Noor Fatima',
    location: 'Turkey',
    text: 'Supporting educational programs for displaced children ensures they don\'t lose hope for the future. Every child deserves this chance.',
    avatar: '/images/4.jpg',
  },
  {
    id: 17,
    name: 'Hassan Mohammad',
    location: 'Saudi Arabia',
    text: 'The winter supplies distributed to families living in makeshift shelters provided crucial protection during the cold months.',
    avatar: '/images/1.jpg',
  },
  {
    id: 18,
    name: 'Aisha Rahman',
    location: 'Qatar',
    text: 'Being part of the monthly giving program connects me to a cause I deeply believe in. The regular impact updates are inspiring.',
    avatar: '/images/2.jpg',
  },
  {
    id: 19,
    name: 'Jamal Kareem',
    location: 'Kuwait',
    text: 'After donating to emergency food relief, I received a detailed report showing exactly how the funds were used. This transparency is remarkable.',
    avatar: '/images/3.jpg',
  },
  {
    id: 20,
    name: 'Samira Ahmed',
    location: 'Bahrain',
    text: 'Our family donates together as a way to teach our children about compassion and global citizenship. This cause unites us in purpose.',
    avatar: '/images/4.jpg',
  },
];

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 6;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Voices of Compassion</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read inspiring stories from donors around the world who have joined our mission to support those in need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="relative">
                  <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative pl-6 italic text-gray-600">{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {pageCount > 1 && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={handlePrevPage}
              className="mx-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-700">
                Page {currentPage + 1} of {pageCount}
              </span>
            </div>
            <button 
              onClick={handleNextPage}
              className="mx-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 