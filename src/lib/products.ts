import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'bubble-gun-1',
    name: 'Full-Automatic Space Bubble Gun',
    description: 'A fun automatic bubble gun that creates a stream of bubbles with just a press of the trigger. Great for kids and parties!',
    price: 20.00,
    images: [
      '/images/S1a241d55e1b84342a1baf602ad0b12d2C.jpg', 
      '/images/S1a2c1ba8915e4f2696a9217bd1d5b45eI.jpg'
    ],
    colors: [
      'Red', 
      'Space Red', 
      'Space Blue', 
      'Dinosaur Green', 
      'Dinosaur Blue', 
      'Gray', 
      'Pink', 
      'Blue', 
      'Deep Blue'
    ],
    inventory: {
      'Red': 10,
      'Space Red': 8,
      'Space Blue': 12,
      'Dinosaur Green': 5,
      'Dinosaur Blue': 7,
      'Gray': 9,
      'Pink': 15,
      'Blue': 11,
      'Deep Blue': 6
    },
    shippingTime: '7-15 days'
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getAllProducts(): Product[] {
  return products;
} 