import { Metadata } from 'next';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Clock, Tag, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Special Offers & Deals | Zbukurohu',
  description: 'Discover amazing deals, discounts, and special offers on premium beauty products.',
};

export default async function OffersPage() {
  const products = await getProducts();
  
  // Filter products with offers
  const productsWithOffers = products.filter(product => 
    product.discount && product.discount > 0
  );

  // Sort by discount percentage (highest first)
  const sortedProducts = productsWithOffers.sort((a, b) => 
    (b.discount || 0) - (a.discount || 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Tag className="w-12 h-12 text-accent" />
            <h1 className="text-5xl font-bold text-gray-900">Special Offers & Deals</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Limited time offers on premium beauty products. Don&apos;t miss out on these amazing deals!
          </p>
        </div>

        {/* Offers Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{productsWithOffers.length}</h3>
            <p className="text-gray-600">Products on Sale</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Up to {Math.max(...productsWithOffers.map(p => p.discount || 0))}%
            </h3>
            <p className="text-gray-600">Maximum Discount</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Limited Time</h3>
            <p className="text-gray-600">Offers Expire Soon</p>
          </div>
        </div>

        {/* Featured Offers */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Offers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="text-sm font-bold">
                    -{product.discount}% OFF
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Offers */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <Tag className="w-8 h-8 text-accent" />
            <h2 className="text-3xl font-bold text-gray-900">All Offers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="text-sm font-bold">
                    -{product.discount}% OFF
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">More Offers Coming Soon!</h2>
            <p className="text-xl text-white/90 mb-6">
              Sign up for our newsletter to be the first to know about new deals and exclusive offers
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
