import { Metadata } from 'next';
import Link from 'next/link';
import { Palette, Eye, Sparkles, Heart } from 'lucide-react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Makeup Collection - Zbukurohu',
  description: 'Complete makeup collection organized by face parts - eyes, face, and lips. Find everything you need for the perfect look.',
};

export default async function MakeupPage() {
  const products = await getProducts();
  const makeupProducts = products.filter(product => 
    ['eyeshadow', 'mascara', 'eyeliner', 'eyebrows', 'foundation', 'concealer', 'blush', 'lipstick', 'lipgloss'].includes(product.categoryId)
  );

  const facePartCategories = [
    {
      id: 'eyes',
      name: 'Eyes',
      description: 'Eye makeup products for stunning looks',
      icon: <Eye className="w-8 h-8 text-text-primary" />,
      productCount: makeupProducts.filter(p => ['eyeshadow', 'mascara', 'eyeliner', 'eyebrows'].includes(p.categoryId)).length,
      slug: 'eyes'
    },
    {
      id: 'face',
      name: 'Face',
      description: 'Face makeup for flawless complexion',
      icon: <Sparkles className="w-8 h-8 text-text-primary" />,
      productCount: makeupProducts.filter(p => ['foundation', 'concealer', 'blush', 'powder'].includes(p.categoryId)).length,
      slug: 'face'
    },
    {
      id: 'lips',
      name: 'Lips',
      description: 'Lip products for perfect pout',
      icon: <Heart className="w-8 h-8 text-text-primary" />,
      productCount: makeupProducts.filter(p => ['lipstick', 'lipgloss', 'lipliner', 'lipbalm'].includes(p.categoryId)).length,
      slug: 'lips'
    }
  ];

  const eyeProducts = makeupProducts.filter(p => ['eyeshadow', 'mascara', 'eyeliner', 'eyebrows'].includes(p.categoryId));
  const faceProducts = makeupProducts.filter(p => ['foundation', 'concealer', 'blush', 'powder'].includes(p.categoryId));
  const lipProducts = makeupProducts.filter(p => ['lipstick', 'lipgloss', 'lipliner', 'lipbalm'].includes(p.categoryId));

  return (
    <div className="min-h-screen bg-surface-muted w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-brand text-text-primary w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center">
                <Palette className="w-10 h-10 text-text-inverse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              Complete Makeup Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-body max-w-3xl mx-auto">
              Discover our comprehensive makeup range organized by face parts for easy shopping and perfect looks
            </p>
          </div>
        </div>
      </section>

      {/* Face Parts Categories */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Shop by Face Parts</h2>
            <p className="text-lg text-text-secondary font-body">Find makeup products organized by the area of your face</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facePartCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Eye Products Section */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Eye className="w-12 h-12 text-brand-accent" />
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Eye Makeup</h2>
            <p className="text-lg text-text-secondary font-body">Create stunning eye looks with our eye makeup collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {eyeProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/categories/eyes" className="btn-accent">
              View All Eye Makeup
            </Link>
          </div>
        </div>
      </section>

      {/* Face Products Section */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-brand-accent" />
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Face Makeup</h2>
            <p className="text-lg text-text-secondary font-body">Achieve flawless complexion with our face makeup range</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {faceProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/categories/face" className="btn-accent">
              View All Face Makeup
            </Link>
          </div>
        </div>
      </section>

      {/* Lip Products Section */}
      <section className="py-16 bg-surface-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-brand-accent" />
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Lip Makeup</h2>
            <p className="text-lg text-text-secondary font-body">Perfect your pout with our lip makeup collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {lipProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/categories/lips" className="btn-accent">
              View All Lip Makeup
            </Link>
          </div>
        </div>
      </section>

      {/* Makeup Tips */}
      <section className="py-16 bg-surface-base w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">Makeup Application Order</h2>
            <p className="text-lg text-text-secondary font-body">Follow this order for the best makeup results</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Face First</h3>
              <p className="text-text-secondary font-body">Start with primer, foundation, concealer, and powder to create a smooth base for the rest of your makeup.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Eyes Second</h3>
              <p className="text-text-secondary font-body">Apply eyeshadow, eyeliner, and mascara. This prevents fallout from affecting your face makeup.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-text-inverse">3</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-heading">Lips Last</h3>
              <p className="text-text-secondary font-body">Finish with lip liner, lipstick, or gloss. Add blush for a final touch of color and warmth.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
