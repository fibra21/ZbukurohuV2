import Link from 'next/link';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all transform hover:-translate-y-1"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
        {category.icon || '✨'}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-gray-600 mb-3 text-sm">{category.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-primary font-semibold text-sm">{category.productCount} products</span>
        <ArrowRight className="w-4 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
