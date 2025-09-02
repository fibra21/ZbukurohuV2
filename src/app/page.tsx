import { Metadata } from 'next';
import { getProducts, getCategories, getBrands } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard } from '@/components/category/CategoryCard';
import { BrandCard } from '@/components/brand/BrandCard';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { Sparkles, Star, Heart, Truck, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zbukurohu - Premium Beauty & Skincare Marketplace',
  description: 'Discover authentic beauty and skincare products from top brands. Free delivery over €50, secure checkout, and expert beauty advice.',
  openGraph: {
    title: 'Zbukurohu - Premium Beauty & Skincare Marketplace',
    description: 'Discover authentic beauty and skincare products from top brands. Free delivery over €50, secure checkout, and expert beauty advice.',
  },
};

export default async function HomePage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  // Filter featured products
  const featuredProducts = products.filter(product => 
    product.isBestseller || product.isNew
  ).slice(0, 8);

  // Filter new arrivals
  const newArrivals = products.filter(product => 
    product.isNew
  ).slice(0, 4);

  // Filter bestsellers
  const bestsellers = products.filter(product => 
    product.isBestseller
  ).slice(0, 4);

  // Filter featured categories
  const featuredCategories = categories.slice(0, 6);

  // Filter featured brands
  const featuredBrands = brands.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Explore our curated collection of beauty essentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Discover our most popular and trending items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            </div>
            <p className="text-lg text-gray-600">Be the first to try our latest products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Bestsellers</h2>
            </div>
            <p className="text-lg text-gray-600">Customer favorites that never disappoint</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Brands</h2>
            <p className="text-lg text-gray-600">Shop from the world&apos;s most trusted beauty brands</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free shipping on orders over €50</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Checkout</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Products</h3>
              <p className="text-gray-600">Genuine products from authorized sellers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
