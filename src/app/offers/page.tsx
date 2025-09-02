// import { Suspense } from 'react';
import { Metadata } from 'next';
import { 
  Gift, 
  Clock, 
  // Star, 
  Truck, 
  Shield, 
  Sparkles,
  TrendingUp,
  Zap,
  Heart,
  // ShoppingBag
} from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Special Offers & Deals | Zbukurohu',
  description: 'Discover amazing deals on beauty products. Seasonal sales, bundle offers, clearance items, and exclusive member benefits.',
  openGraph: {
    title: 'Special Offers & Deals | Zbukurohu',
    description: 'Discover amazing deals on beauty products. Seasonal sales, bundle offers, clearance items, and exclusive member benefits.',
  },
};

export default async function OffersPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  // Filter products for offers (mock logic)
  const featuredOffers = products.slice(0, 8);
  const seasonalDeals = products.slice(8, 16);
  const clearanceItems = products.slice(16, 24);
  const bundleOffers = products.slice(24, 32);

  const offerCategories = [
    {
      title: 'Seasonal Deals',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Autumn essentials and holiday collections',
      count: seasonalDeals.length,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Bundle Offers',
      icon: <Gift className="w-6 h-6" />,
      description: 'Save up to 40% on curated sets',
      count: bundleOffers.length,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Clearance',
      icon: <Zap className="w-6 h-6" />,
      description: 'Up to 70% off selected items',
      count: clearanceItems.length,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Member Benefits',
      icon: <Heart className="w-6 h-6" />,
      description: 'Exclusive deals for VIP members',
      count: 12,
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Gift className="w-12 h-12" />
              <h1 className="text-5xl font-serif font-bold">Special Offers</h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Discover incredible deals on premium beauty products. Limited time offers, seasonal sales, and exclusive member benefits.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Flash Sale: 24 Hours Only</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery Over €50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {offerCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{category.count}</span>
                <span className="text-sm text-gray-500">items</span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Offers */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Offers</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Ends in 2 days</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOffers.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  SALE
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Deals */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">🍂 Autumn Essentials</h2>
                <p className="text-gray-600">Hydrating formulas for changing weather</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600 mb-1">Up to 40% Off</div>
                <div className="text-sm text-gray-500">Limited Time</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalDeals.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    AUTUMN
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bundle Offers */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">🎁 Bundle & Save</h2>
                <p className="text-gray-600">Curated sets with amazing discounts</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 mb-1">Save Up to 40%</div>
                <div className="text-sm text-gray-500">On Sets</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bundleOffers.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-3 left-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    BUNDLE
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clearance Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">🔥 Clearance Sale</h2>
                <p className="text-gray-600">Last chance to grab these amazing products</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600 mb-1">Up to 70% Off</div>
                <div className="text-sm text-gray-500">Final Sale</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clearanceItems.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    CLEARANCE
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Member Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">💎 VIP Member Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our VIP program for exclusive access to early sales, member-only discounts, and birthday surprises.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Early Access</h3>
              <p className="text-gray-600 text-sm">Be the first to shop new collections and sales</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Exclusive Deals</h3>
              <p className="text-gray-600 text-sm">Member-only discounts and special offers</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Birthday Rewards</h3>
              <p className="text-gray-600 text-sm">Special birthday discounts and free gifts</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
              Join VIP Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
