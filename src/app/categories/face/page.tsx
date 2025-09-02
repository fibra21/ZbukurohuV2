import { Metadata } from 'next';
import { Sparkles, Circle, CircleDot, Heart } from 'lucide-react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Face Makeup - Zbukurohu',
  description: 'Complete collection of face makeup products including foundation, concealer, blush, and powder for flawless complexion.',
};

export default async function FacePage() {
  const products = await getProducts();
  const faceProducts = products.filter(product => 
    ['foundation', 'concealer', 'blush', 'powder'].includes(product.categoryId)
  );

  const faceCategories = [
    {
      id: 'foundation',
      name: 'Foundation',
      description: 'Base makeup products for flawless coverage',
      icon: <Circle className="w-8 h-8 text-text-primary" />,
      productCount: faceProducts.filter(p => p.categoryId === 'foundation').length,
      slug: 'foundation'
    },
    {
      id: 'concealer',
      name: 'Concealer',
      description: 'Coverage for imperfections and dark circles',
      icon: <CircleDot className="w-8 h-8 text-text-primary" />,
      productCount: faceProducts.filter(p => p.categoryId === 'concealer').length,
      slug: 'concealer'
    },
    {
      id: 'blush',
      name: 'Blush',
      description: 'Natural-looking blush for healthy glow',
      icon: <Heart className="w-8 h-8 text-text-primary" />,
      productCount: faceProducts.filter(p => p.categoryId === 'blush').length,
      slug: 'blush'
    },
    {
      id: 'powder',
      name: 'Powder',
      description: 'Setting powders for long-lasting makeup',
      icon: <Sparkles className="w-8 h-8 text-text-primary" />,
      productCount: faceProducts.filter(p => p.categoryId === 'powder').length,
      slug: 'powder'
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
                <Sparkles className="w-10 h-10 text-text-inverse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Face Makeup Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-body max-w-3xl mx-auto">
              Achieve a flawless complexion with our comprehensive range of face makeup products
            </p>
          </div>
        </div>
      </section>

      {/* Face Categories */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Shop by Face Area</h2>
            <p className="text-lg text-text-secondary font-body">Build your perfect base with these essential face products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faceCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Face Products */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Featured Face Products</h2>
            <p className="text-lg text-text-secondary font-body">Our most popular face makeup essentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faceProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Guide */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Face Makeup Application Guide</h2>
            <p className="text-lg text-text-secondary font-body">Step-by-step guide for flawless face makeup</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-accent text-text-inverse rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Prime</h3>
              <p className="text-text-secondary font-body">Start with a primer to create a smooth base and help makeup last longer.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-accent text-text-inverse rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Foundation</h3>
              <p className="text-text-secondary font-body">Apply foundation evenly using a brush, sponge, or your fingers for full coverage.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-accent text-text-inverse rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Conceal</h3>
              <p className="text-text-secondary font-body">Use concealer to cover blemishes, dark circles, and any imperfections.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-accent text-text-inverse rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Set & Blush</h3>
              <p className="text-text-secondary font-body">Set with powder and add blush to the apples of your cheeks for a healthy glow.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
