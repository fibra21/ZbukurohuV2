'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/data';
import { Category } from '@/types';

export default function CategoriesIndexPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold text-lg">{cat.name[0]}</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
  );
}
