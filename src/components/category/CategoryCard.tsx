import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon?: React.ReactNode;
    productCount: number;
    slug: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="group block"
    >
      <div className="bg-surface-elevated rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-lg transition-all duration-base hover:border-brand-accent">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-secondary transition-colors duration-base">
            {category.icon || <Sparkles className="w-8 h-8 text-text-primary" />}
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2 font-heading group-hover:text-brand-accent transition-colors duration-base">
            {category.name}
          </h3>
          <p className="text-text-secondary text-sm mb-3 font-body">
            {category.description}
          </p>
          <div className="flex items-center justify-center space-x-2 text-text-muted text-sm font-body">
            <span>{category.productCount} products</span>
            <span>•</span>
            <span className="group-hover:text-brand-accent transition-colors duration-base">
              Explore
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
