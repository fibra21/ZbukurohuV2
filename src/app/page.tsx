'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ProductCard } from '@/components/product/ProductCard';
import { BrandCard } from '@/components/brand/BrandCard';
import { getProducts, getBrands, getCategories } from '@/lib/data';
import { Product, Brand, Category } from '@/types';
import { 
  ArrowRight, 
  Sparkles,
  Eye,
  Heart,
  Droplets,
  FlaskConical
} from 'lucide-react';

export default function HomePage() {
  const { locale } = useAppStore();
  const effectiveLocale = (locale === 'sq-AL' || locale === 'en') ? locale : 'sq-AL';
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, brandsData, categoriesData] = await Promise.all([
          getProducts(),
          getBrands(),
          getCategories()
        ]);
        
        setProducts(productsData);
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const officialBrands = brands.filter(b => b.isOfficialDistributorInKosovo);

  const categoryIcons = {
    'mascara': Eye,
    'foundation': Sparkles,
    'moisturizer': Droplets,
    'serum': FlaskConical,
    'lipstick': Heart,
    'eyeshadow': Eye,
    'blush': Heart,
    'cleanser': Sparkles
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t(effectiveLocale, 'loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {t(effectiveLocale, 'home')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t(effectiveLocale, 'home')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="bg-white text-primary px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              {t(effectiveLocale, 'categories')}
            </Link>
            <Link
              href="/brands"
              className="border-2 border-white text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white hover:text-primary transition-colors text-lg"
            >
              {t(effectiveLocale, 'brands')}
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            {t(effectiveLocale, 'categories')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl p-4 md:p-6 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FlaskConical className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <h3 className="font-semibold text-center text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Brands */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            {t(effectiveLocale, 'brands')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {brands.slice(0, 12).map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-2xl p-4 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center mb-3 mx-auto border border-gray-200">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-medium text-center text-gray-900 group-hover:text-primary transition-colors text-sm">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            {t(effectiveLocale, 'bestsellers')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            {t(effectiveLocale, 'new')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How-to Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            {t(effectiveLocale, 'completeRoutine')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(effectiveLocale, 'skinTypes')}</h3>
              <p className="text-gray-600">
                {t(effectiveLocale, 'completeRoutine')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(effectiveLocale, 'skinConcerns')}</h3>
              <p className="text-gray-600">
                {t(effectiveLocale, 'completeRoutine')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(effectiveLocale, 'ingredients')}</h3>
              <p className="text-gray-600">
                {t(effectiveLocale, 'completeRoutine')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
