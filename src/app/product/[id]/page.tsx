import { getProductById } from '@/lib/products';
import ProductDetails from './ProductDetails';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetails product={product} />;
} 