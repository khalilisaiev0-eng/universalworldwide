export type ProductColor = 
  | 'Red'
  | 'Space Red'
  | 'Space Blue'
  | 'Dinosaur Green'
  | 'Dinosaur Blue'
  | 'Gray'
  | 'Pink'
  | 'Blue'
  | 'Deep Blue';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: ProductColor[];
  inventory: Record<ProductColor, number>;
  shippingTime: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color: ProductColor;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: Date;
  total: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
} 