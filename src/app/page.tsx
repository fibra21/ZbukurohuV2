import { Suspense } from 'react';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  Star, 
  Truck, 
  Shield, 
  Clock, 
  Heart,
  Sparkles,
  TrendingUp,
  Gift,
  Zap,
  Eye,
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { BrandCard } from '@/components/brand/BrandCard';
import { getProducts, getBrands, getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Zbukurohu - Premium Beauty & Wellness Marketplace',
  description: 'Discover premium beauty products, skincare essentials, and wellness solutions. Authentic brands, expert advice, and exclusive deals.',
  openGraph: {
    title: 'Zbukurohu - Premium Beauty & Wellness Marketplace',
    description: 'Discover premium beauty products, skincare essentials, and wellness solutions. Authentic brands, expert advice, and exclusive deals.',
  },
};

export default async function HomePage() {
  const [products, brands, categories] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategories()
  ]);

  // Filter products for different sections
  const bestsellers = products.slice(0, 8);
  const newArrivals = products.slice(8, 16);
  const trendingProducts = products.slice(16, 24);
  const featuredBrands = brands.slice(0, 8);
  const popularCategories = categories.slice(0, 6);

  const trustFeatures = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'On orders over €50',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Checkout',
      description: 'SSL encrypted payments',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Shipping',
      description: '2-3 business days',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '4.9/5 Rating',
      description: 'From 10,000+ customers',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const seasonalHighlights = [
    {
      title: '🍂 Autumn Skincare',
      description: 'Hydrating formulas for changing weather',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
      link: '/categories/skincare',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: '💄 Holiday Makeup',
      description: 'Sparkling looks for special occasions',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
      link: '/categories/makeup',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: '💇‍♀️ Hair Care',
      description: 'Professional tools and treatments',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      link: '/categories/haircare',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
                <span className="text-lg font-medium text-gray-600">Premium Beauty Marketplace</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight mb-6">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Natural Beauty
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg">
                Curated collection of premium beauty products, skincare essentials, and wellness solutions. Authentic brands, expert advice, and exclusive deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/categories"
                  className="bg-primary text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-5 lg:w-5 lg:h-5" />
                </Link>
                <Link 
                  href="/find"
                  className="border-2 border-primary/30 text-primary px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-medium text-base lg:text-lg hover:bg-primary/10 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Find Your Style</span>
                  <Eye className="w-4 h-5 lg:w-5 lg:h-5" />
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>4.9/5 from 10,000+ reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Free delivery over €50</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-3 lg:space-y-4">
                  <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop" 
                      alt="Skincare"
                      className="w-full h-24 lg:h-32 object-cover rounded-xl"
                    />
                    <div className="mt-2 lg:mt-3">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Premium Skincare</h3>
                      <p className="text-gray-600 text-xs lg:text-sm">Starting from €25</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop" 
                      alt="Makeup"
                      className="w-full h-24 lg:h-32 object-cover rounded-xl"
                    />
                    <div className="mt-2 lg:mt-3">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Luxury Makeup</h3>
                      <p className="text-gray-600 text-xs lg:text-sm">Starting from €18</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 lg:space-y-4 pt-6 lg:pt-8">
                  <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop" 
                      alt="Haircare"
                      className="w-full h-24 lg:h-32 object-cover rounded-xl"
                    />
                    <div className="mt-2 lg:mt-3">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Professional Hair</h3>
                      <p className="text-gray-600 text-xs lg:text-sm">Starting from €30</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop" 
                      alt="Wellness"
                      className="w-full h-24 lg:h-32 object-cover rounded-xl"
                    />
                    <div className="mt-2 lg:mt-3">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Wellness</h3>
                      <p className="text-gray-600 text-xs lg:text-sm">Starting from €20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections designed for every beauty need and preference
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="text-4xl lg:text-6xl mb-4 lg:mb-6 group-hover:scale-110 transition-transform">
                  {category.icon || '✨'}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold text-sm lg:text-base">{category.productCount} products</span>
                  <ArrowRight className="w-4 h-5 lg:w-5 lg:h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">Seasonal Highlights</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what&apos;s trending this season
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalHighlights.map((highlight) => (
              <Link 
                key={highlight.title} 
                href={highlight.link}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${highlight.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                    <p className="text-white/90 mb-4">{highlight.description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">Bestsellers</h2>
            <Link href="/categories" className="text-primary hover:text-primary/80 font-medium flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-2 left-2">
                  <span className="bg-accent text-white text-xs px-2 py-1 rounded-lg font-medium">BESTSELLER</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">Featured Brands</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Shop from trusted and authentic beauty brands
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">New Arrivals</h2>
            <Link href="/categories" className="text-primary hover:text-primary/80 font-medium flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-2 left-2">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-lg font-medium">NEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">Trending Now</h2>
            <Link href="/search" className="text-primary hover:text-primary/80 font-medium flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-2 left-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-medium">TRENDING</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How-to Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">Beauty Tips & Tutorials</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from beauty experts and discover new techniques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/skincare-routine" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Skincare Routine</h3>
                <p className="text-gray-600 mb-4">Build the perfect skincare routine for your skin type</p>
                <div className="flex items-center text-primary font-medium">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link href="/blog/makeup-tips" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Makeup Tips</h3>
                <p className="text-gray-600 mb-4">Professional makeup techniques for everyday looks</p>
                <div className="flex items-center text-primary font-medium">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link href="/blog/hair-styling" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hair Styling</h3>
                <p className="text-gray-600 mb-4">Easy hairstyles you can create at home</p>
                <div className="flex items-center text-primary font-medium">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest beauty tips, product launches, and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
            />
            <button className="bg-white text-primary px-8 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
