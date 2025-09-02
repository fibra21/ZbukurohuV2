import { notFound } from 'next/navigation';
import { getBrands, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brands = await getBrands();
  const brand = brands.find(b => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const products = await getProducts();
  const brandProducts = products.filter(p => p.brandId === brand.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{brand.name}</h1>
            <p className="text-xl opacity-90 max-w-2xl">{brand.story}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Info */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {brand.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{brand.story}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">Country:</span>
                  <span className="text-sm text-gray-900">{brand.country}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    brand.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {brand.isVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
                {brand.isOfficialDistributorInKosovo && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">Official Distributor in Kosovo</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ✓ Confirmed
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-400">{brand.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Products by {brand.name} ({brandProducts.length})
          </h3>
          
          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brandProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for this brand.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
