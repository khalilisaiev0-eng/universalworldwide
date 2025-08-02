// @ts-check
 
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  env: {
    // Публичный ключ Stripe для использования на клиенте
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },
  // Конфигурация для обработки изображений
  images: {
    domains: ['images.unsplash.com'],
  },
}
 
export default nextConfig;
