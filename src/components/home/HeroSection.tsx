import Link from 'next/link';
import { ArrowRight, Eye, Star, Truck } from 'lucide-react';

export function HeroSection() {
  return (
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-600">Premium Beauty Marketplace</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
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
                  <div className="w-full h-24 lg:h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl">✨</span>
                  </div>
                  <div className="mt-2 lg:mt-3">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Premium Skincare</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Starting from €25</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                  <div className="w-full h-24 lg:h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl">💄</span>
                  </div>
                  <div className="mt-2 lg:mt-3">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Luxury Makeup</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Starting from €18</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:space-y-4 pt-6 lg:pt-8">
                <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                  <div className="w-full h-24 lg:h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl">💇‍♀️</span>
                  </div>
                  <div className="mt-2 lg:mt-3">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Professional Hair</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Starting from €30</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg border border-gray-100">
                  <div className="w-full h-24 lg:h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl">🌿</span>
                  </div>
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
  );
}
