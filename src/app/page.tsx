import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function Home() {
  const products = getAllProducts();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Universal</h1>
          <p className="text-xl mb-8">Discover amazing products for every occasion</p>
          <Link href="/catalog" className="bg-white text-purple-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Browse Catalog
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Stay updated on our newest products and special offers</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-800 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
