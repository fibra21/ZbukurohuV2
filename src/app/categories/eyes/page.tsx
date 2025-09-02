import { Metadata } from 'next';
import { Eye, Palette, Pen, Minus } from 'lucide-react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Eye Makeup - Zbukurohu',
  description: 'Complete collection of eye makeup products including eyeshadow, mascara, eyeliner, and eyebrow products.',
};

export default async function EyesPage() {
  const products = await getProducts();
  const eyeProducts = products.filter(product => 
    ['eyeshadow', 'mascara', 'eyeliner', 'eyebrows'].includes(product.categoryId)
  );

  const eyeCategories = [
    {
      id: 'eyeshadow',
      name: 'Eyeshadow',
      description: 'Beautiful eyeshadows for stunning looks',
      icon: <Palette className="w-8 h-8 text-text-primary" />,
      productCount: eyeProducts.filter(p => p.categoryId === 'eyeshadow').length,
      slug: 'eyeshadow'
    },
    {
      id: 'mascara',
      name: 'Mascara',
      description: 'Eye-enhancing mascaras for dramatic lashes',
      icon: <Eye className="w-8 h-8 text-text-primary" />,
      productCount: eyeProducts.filter(p => p.categoryId === 'mascara').length,
      slug: 'mascara'
    },
    {
      id: 'eyeliner',
      name: 'Eyeliner',
      description: 'Precise eyeliners for defined eyes',
      icon: <Pen className="w-8 h-8 text-text-primary" />,
      productCount: eyeProducts.filter(p => p.categoryId === 'eyeliner').length,
      slug: 'eyeliner'
    },
    {
      id: 'eyebrows',
      name: 'Eyebrows',
      description: 'Eyebrow products for perfect arches',
      icon: <Minus className="w-8 h-8 text-text-primary" />,
      productCount: eyeProducts.filter(p => p.categoryId === 'eyebrows').length,
      slug: 'eyebrows'
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
                <Eye className="w-10 h-10 text-text-inverse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Eye Makeup Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-body max-w-3xl mx-auto">
              Discover our complete range of eye makeup products to create stunning looks for every occasion
            </p>
          </div>
        </div>
      </section>

      {/* Eye Categories */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Shop by Eye Area</h2>
            <p className="text-lg text-text-secondary font-body">Choose the perfect products for each part of your eyes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eyeCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Eye Products */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Featured Eye Products</h2>
            <p className="text-lg text-text-secondary font-body">Our most popular eye makeup products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eyeProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Eye Makeup Tips</h2>
            <p className="text-lg text-text-secondary font-body">Professional tips for perfect eye makeup</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Color Coordination</h3>
              <p className="text-text-secondary font-body">Choose eyeshadow colors that complement your eye color and skin tone for the most flattering look.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Application Order</h3>
              <p className="text-text-secondary font-body">Apply eyeshadow first, then eyeliner, and finish with mascara for the best results.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Pen className="w-8 h-8 text-text-inverse" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Precision Tools</h3>
              <p className="text-text-secondary font-body">Use quality brushes and tools for precise application and professional-looking results.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
