import { Metadata } from 'next';
import { Heart, Sparkles, Pen, Shield } from 'lucide-react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Lip Makeup - Zbukurohu',
  description: 'Complete collection of lip products including lipstick, lip gloss, lip liner, and lip balm for the perfect pout.',
};

export default async function LipsPage() {
  const products = await getProducts();
  const lipProducts = products.filter(product => 
    ['lipstick', 'lipgloss', 'lipliner', 'lipbalm'].includes(product.categoryId)
  );

  const lipCategories = [
    {
      id: 'lipstick',
      name: 'Lipstick',
      description: 'Beautiful lip colors for every occasion',
      icon: <Heart className="w-8 h-8 text-text-primary" />,
      productCount: lipProducts.filter(p => p.categoryId === 'lipstick').length,
      slug: 'lipstick'
    },
    {
      id: 'lipgloss',
      name: 'Lip Gloss',
      description: 'Glossy lip products for shine and color',
      icon: <Sparkles className="w-8 h-8 text-text-primary" />,
      productCount: lipProducts.filter(p => p.categoryId === 'lipgloss').length,
      slug: 'lipgloss'
    },
    {
      id: 'lipliner',
      name: 'Lip Liner',
      description: 'Define and shape your lips perfectly',
      icon: <Pen className="w-8 h-8 text-text-primary" />,
      productCount: lipProducts.filter(p => p.categoryId === 'lipliner').length,
      slug: 'lipliner'
    },
    {
      id: 'lipbalm',
      name: 'Lip Balm',
      description: 'Nourishing lip care for healthy lips',
      icon: <Shield className="w-8 h-8 text-text-primary" />,
      productCount: lipProducts.filter(p => p.categoryId === 'lipbalm').length,
      slug: 'lipbalm'
    }
  ];

  return (
    <div className="min-h-screen bg-surface-muted w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-brand text-text-primary w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-text-inverse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Lip Makeup Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-body max-w-3xl mx-auto">
              Create the perfect pout with our extensive range of lip products for every style and occasion
            </p>
          </div>
        </div>
      </section>

      {/* Lip Categories */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Shop by Lip Product</h2>
            <p className="text-lg text-text-secondary font-body">Find the perfect lip products for your desired look</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lipCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lip Products */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Featured Lip Products</h2>
            <p className="text-lg text-text-secondary font-body">Our most popular lip makeup essentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lipProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Lip Care Tips */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Lip Care & Application Tips</h2>
            <p className="text-lg text-text-secondary font-body">Expert tips for beautiful, healthy lips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Prep Your Lips</h3>
              <p className="text-text-secondary font-body">Exfoliate and moisturize your lips before applying any lip products for smooth application and better color payoff.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Pen className="w-8 h-8 text-text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Perfect Precision</h3>
              <p className="text-text-secondary font-body">Use a lip liner to define your lip shape and prevent lipstick from bleeding for a professional finish.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-text-inverse" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Long-Lasting Color</h3>
              <p className="text-text-secondary font-body">Apply lipstick, blot with tissue, then apply a second layer for longer-lasting, more vibrant color.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Guide */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Find Your Perfect Shade</h2>
            <p className="text-lg text-text-secondary font-body">Choose lip colors that complement your skin tone</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-elevated rounded-xl p-6 text-center border border-neutral-200">
              <h3 className="text-xl font-bold text-text-primary mb-4 font-heading">Cool Undertones</h3>
              <p className="text-text-secondary font-body mb-4">Best with berry, plum, and blue-based reds</p>
              <div className="flex justify-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-600"></div>
                <div className="w-8 h-8 rounded-full bg-red-700"></div>
                <div className="w-8 h-8 rounded-full bg-pink-600"></div>
              </div>
            </div>
            
            <div className="bg-surface-elevated rounded-xl p-6 text-center border border-neutral-200">
              <h3 className="text-xl font-bold text-text-primary mb-4 font-heading">Warm Undertones</h3>
              <p className="text-text-secondary font-body mb-4">Perfect with coral, orange, and warm reds</p>
              <div className="flex justify-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                <div className="w-8 h-8 rounded-full bg-red-500"></div>
                <div className="w-8 h-8 rounded-full bg-pink-400"></div>
              </div>
            </div>
            
            <div className="bg-surface-elevated rounded-xl p-6 text-center border border-neutral-200">
              <h3 className="text-xl font-bold text-text-primary mb-4 font-heading">Neutral Undertones</h3>
              <p className="text-text-secondary font-body mb-4">Versatile with most shades and tones</p>
              <div className="flex justify-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-rose-500"></div>
                <div className="w-8 h-8 rounded-full bg-red-600"></div>
                <div className="w-8 h-8 rounded-full bg-pink-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
