import { notFound } from 'next/navigation';
import { getCategories, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts();
  const categoryProducts = products.filter(p => p.categoryId === category.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-xl opacity-90 max-w-2xl">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Info */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{category.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">Products:</span>
                  <span className="text-sm text-gray-900">{categoryProducts.length} items</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">Category ID:</span>
                  <span className="text-sm text-gray-900">{category.id}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-400">{category.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {category.name} Products ({categoryProducts.length})
          </h3>
          
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
