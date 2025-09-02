import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
        <Link 
          href="/categories"
          className="text-primary font-medium hover:underline flex items-center space-x-2"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
