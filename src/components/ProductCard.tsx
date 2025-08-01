'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-xl font-semibold">${product.price.toFixed(2)} USD</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Delivery: {product.shippingTime}
          </p>
        </div>
      </Link>
    </div>
  );
} 