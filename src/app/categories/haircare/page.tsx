import { Metadata } from 'next';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Star, Heart, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hair Care Products | Zbukurohu',
  description: 'Discover premium hair care products for all hair types. From shampoos to styling products, find everything you need for healthy, beautiful hair.',
};

export default async function HaircarePage() {
  const products = await getProducts();
  
  // Filter haircare products
  const haircareProducts = products.filter(product => 
    product.tags?.includes('hair') || product.categoryId === 'haircare'
  );

  // Filter bestsellers
  const bestsellers = haircareProducts.filter(product => product.isBestseller).slice(0, 4);
  
  // Filter new arrivals
  const newArrivals = haircareProducts.filter(product => product.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Hair Care Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your hair with our premium collection of shampoos, conditioners, treatments, and styling products. 
            From daily care to special treatments, we have everything you need for healthy, beautiful hair.
          </p>
        </div>

        {/* Bestsellers */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Bestsellers</h2>
            </div>
            <Link 
              href="/categories/haircare?sort=bestsellers" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            </div>
            <Link 
              href="/categories/haircare?sort=newest" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Shop by Hair Concern */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Shop by Hair Concern</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/categories/haircare?concern=dry-hair" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dry Hair</h3>
                <p className="text-gray-600">Hydrating products for dry, damaged hair</p>
              </div>
            </Link>
            
            <Link href="/categories/haircare?concern=oily-hair" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Oily Hair</h3>
                <p className="text-gray-600">Balancing products for oily scalp</p>
              </div>
            </Link>
            
            <Link href="/categories/haircare?concern=color-treated" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Color Treated</h3>
                <p className="text-gray-600">Protective products for colored hair</p>
              </div>
            </Link>
            
            <Link href="/categories/haircare?concern=curly-hair" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Curly Hair</h3>
                <p className="text-gray-600">Defining products for curly hair</p>
              </div>
            </Link>
            
            <Link href="/categories/haircare?concern=thinning-hair" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thinning Hair</h3>
                <p className="text-gray-600">Volumizing products for fine hair</p>
              </div>
            </Link>
            
            <Link href="/categories/haircare?concern=scalp-issues" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Scalp Issues</h3>
                <p className="text-gray-600">Soothing products for sensitive scalp</p>
              </div>
            </Link>
          </div>
        </section>

        {/* All Haircare Products */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">All Hair Care Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {haircareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
