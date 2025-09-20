import { Metadata } from 'next';
import { Star, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { BrandCard } from '@/components/brand/BrandCard';
import { getProducts, getCategories, getBrands } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Premium Beauty & Skincare Marketplace',
  description: 'Discover premium makeup, skincare, and beauty products from top brands. Shop authentic beauty essentials with fast delivery across the Balkans.',
  keywords: ['beauty marketplace', 'makeup', 'skincare', 'cosmetics', 'premium brands', 'Balkans'],
  openGraph: {
    title: 'Zbukurohu - Premium Beauty & Skincare Marketplace',
    description: 'Discover premium makeup, skincare, and beauty products from top brands. Shop authentic beauty essentials with fast delivery across the Balkans.',
    type: 'website',
  },
};

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();

  // Filter featured products
  const featuredProducts = products.filter(product => product.isBestseller || product.isNew).slice(0, 8);
  
  // Filter new arrivals (products added in last 30 days)
  const newArrivals = products.filter(product => product.isNew).slice(0, 8);
  
  // Filter bestsellers (products with highest ratings)
  const bestsellers = products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);

  // Filter featured categories
  const featuredCategories = categories.slice(0, 6);

  // Filter featured brands
  const featuredBrands = brands.slice(0, 8);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Categories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="mb-4">
              <span className="inline-block bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-medium">
                🛍️ Kategoritë tona
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-heading gradient-text">
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary font-body max-w-3xl mx-auto">
              Zbuloni koleksionin tonë të kujdesshëm të produkteve të bukurisë dhe mirëqenies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredCategories.map((category, index) => (
              <div key={category.id} className={`animate-fade-in-up delay-${index * 100}`}>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 lg:py-24 w-full bg-gradient-to-br from-white to-surface-muted">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="mb-4">
              <span className="inline-block bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-medium">
                ⭐ Produkte të veçanta
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-heading">
              Featured Products
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary font-body max-w-3xl mx-auto">
              Zbuloni produktet tona më të popullarizuara dhe trendet e fundit në bukuri
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={`animate-fade-in-up hover-lift delay-${(index % 4) * 100}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-8 h-8 text-brand-accent" />
              <h2 className="text-4xl font-bold text-text-primary font-heading">New Arrivals</h2>
            </div>
            <p className="text-lg text-text-secondary font-body">Be the first to try our latest products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-semantic-warning" />
              <h2 className="text-4xl font-bold text-text-primary font-heading">Bestsellers</h2>
            </div>
            <p className="text-lg text-text-secondary font-body">Customer favorites that never disappoint</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Top Brands</h2>
            <p className="text-lg text-text-secondary font-body">Shop from the world&apos;s most trusted beauty brands</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
