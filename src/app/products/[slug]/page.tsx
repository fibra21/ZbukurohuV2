'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ProductCard } from '@/components/product/ProductCard';
import { getProductBySlug, getProducts } from '@/lib/data';
import { useAppStore } from '@/lib/store';
import { Product } from '@/types';
import { Star, BadgeCheck } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [selectedShade, setSelectedShade] = useState<string | undefined>(undefined);
  const { addToCart, addToRecentlyViewed } = useAppStore();

  useEffect(() => {
    if (!params?.slug) return;
    (async () => {
      const p = await getProductBySlug(params.slug);
      setProduct(p);
      if (p) {
        addToRecentlyViewed(p.id);
        const all = await getProducts();
        setSimilar(all.filter(x => x.brandId === p.brandId && x.id !== p.id).slice(0, 8));
      }
    })();
  }, [params?.slug, addToRecentlyViewed]);

  if (!product) {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
    );
  }

  const productLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    brand: product.brandId,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount
    }
  } as const;

  const badges = product.badges || [];

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-soft">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.slice(1,5).map((img, idx) => (
                  <div key={idx} className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-soft">
                    <Image src={img} alt={`${product.name} ${idx+2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-500">({product.reviewsCount} reviews)</span>
            </div>

            <div className="text-2xl font-bold text-primary mb-6">{product.price} {product.currency}</div>

            {/* Shades */}
            {product.shades?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Shade</h3>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <button
                      key={shade}
                      onClick={() => setSelectedShade(shade)}
                      className={`px-3 py-1 rounded-full border ${selectedShade === shade ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}
                      aria-pressed={selectedShade === shade}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {badges.map((b, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full inline-flex items-center space-x-1">
                    <BadgeCheck className="w-3 h-3" /> <span>{b}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={() => addToCart({ productId: product.id, quantity: 1, selectedShade })}
              className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary-600 transition-colors mb-8"
            >
              Add to Cart
            </button>

            {/* Ingredients and How to Use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <p className="text-sm text-gray-700">{product.ingredients.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How to Use</h3>
                <p className="text-sm text-gray-700">Apply evenly on clean skin. Adjust coverage as needed. For external use only.</p>
              </div>
            </div>

            {/* Skin Concerns */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Skin Concerns</h3>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map((c, i) => (
                  <span key={i} className="text-xs bg-secondary/50 text-gray-800 px-2 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
  );
}
