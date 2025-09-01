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
          <p className="text-gray-600">{t(locale, 'loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
              Zbuloni Botën e Bukurisë
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Platforma kryesore për kozmetikë dhe kujdesin e lëkurës në Kosovë. 
              Produkte të origjinale nga distributuesit e autorizuar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/categories"
                className="bg-primary text-white px-8 py-3 rounded-2xl font-semibold hover:bg-primary-600 transition-colors inline-flex items-center justify-center"
              >
                Shiko Kategoritë
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/find"
                className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-2xl font-semibold hover:bg-primary hover:text-white transition-colors inline-flex items-center justify-center"
              >
                Gjej Produkte
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Kategoritë e Popullarizuara
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zbuloni produktet më të mira për çdo pjesë të fytyrës suaj
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => {
              const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Sparkles;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Markat e Autorizuara
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vetëm nga distributuesit e autorizuar në Kosovë
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {officialBrands.slice(0, 8).map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/brands"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Shiko të gjitha markat
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Më të Shiturit
              </h2>
              <p className="text-gray-600">
                Produktet më të kërkuara nga klientët tanë
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Shiko të gjitha
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Produkte të Reja
              </h2>
              <p className="text-gray-600">
                Zbuloni produktet më të fundit në treg
              </p>
            </div>
            <Link
              href="/categories?filter=new"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Shiko të gjitha
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  Si të Zgjidhni Produktet e Duha
                </h2>
                <p className="text-gray-700 mb-6">
                  Ekspertët tanë ju ndihmojnë të zbuloni rutinën perfekte për lëkurën tuaj. 
                  Nga pastrimi deri te hidratimi, ne kemi gjithçka që ju nevojitet.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-2xl font-semibold hover:bg-primary-600 transition-colors"
                >
                  Lexo Më Shumë
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 bg-white rounded-2xl shadow-soft mx-auto flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
