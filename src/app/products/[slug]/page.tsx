import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/data';
import { ProductDetail } from '@/components/product/ProductDetail';
import { RelatedProducts } from '@/components/product/RelatedProducts';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Zbukurohu',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | ${product.brandId} | Zbukurohu`,
    description: product.description || `Shop ${product.name} by ${product.brandId} on Zbukurohu. Premium beauty products with authentic quality.`,
    openGraph: {
      title: `${product.name} | ${product.brandId}`,
      description: product.description || `Shop ${product.name} by ${product.brandId}`,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find related products (same category or brand)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.categoryId === product.categoryId || p.brandId === product.brandId))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetail product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
