'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, ProductColor } from '@/types';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const incrementQuantity = () => {
    if (quantity < product.inventory[selectedColor]) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // In a real app, this would dispatch to a cart context/store
    alert(`Added ${quantity} ${selectedColor} ${product.name} to cart!`);
  };

  const getColorClassName = (color: ProductColor) => {
    if (color === selectedColor) {
      return "border-2 border-black";
    }
    return "border border-gray-300 hover:border-gray-400";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="relative h-96 w-full mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <button 
                key={index} 
                className={`border ${mainImage === img ? 'border-black' : 'border-gray-200'} w-20 h-20 relative`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold my-4">${product.price.toFixed(2)} USD</p>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Pay over time for orders over $35.00 with 
              <span className="font-bold ml-1">Shop Pay</span> 
              <span className="text-blue-600 ml-1 cursor-pointer">Learn more</span>
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-800">Delivery time: {product.shippingTime}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <p className="text-gray-800 mb-2">Quantity</p>
            <div className="flex items-center border rounded-md w-max">
              <button 
                className="px-3 py-2"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <FiMinus className={quantity <= 1 ? "text-gray-400" : "text-gray-800"} />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button 
                className="px-3 py-2"
                onClick={incrementQuantity}
                disabled={quantity >= product.inventory[selectedColor]}
              >
                <FiPlus className={quantity >= product.inventory[selectedColor] ? "text-gray-400" : "text-gray-800"} />
              </button>
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <p className="text-gray-800 mb-2">Color</p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`py-2 px-4 rounded-md text-center ${getColorClassName(color)}`}
                  disabled={product.inventory[color] === 0}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors mb-4"
          >
            Add to cart
          </button>

          {/* Buy with Shop Pay Button */}
          <button className="w-full bg-[#5a31f4] text-white py-3 rounded-md hover:bg-[#4920d0] transition-colors mb-4 flex items-center justify-center">
            <span>Buy with</span>
            <span className="ml-2 font-bold">Shop Pay</span>
          </button>

          <button className="w-full text-center py-2 text-gray-600 hover:text-gray-800 transition-colors">
            More payment options
          </button>
        </div>
      </div>
    </div>
  );
} 