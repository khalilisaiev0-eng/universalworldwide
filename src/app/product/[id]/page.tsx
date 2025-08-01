import { getProductById } from '@/lib/products';
import ProductDetails from './ProductDetails';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetails product={product} />;
} 