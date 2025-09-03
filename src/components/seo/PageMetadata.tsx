import { Metadata } from 'next';

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-default.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: PageMetadataProps): Metadata {
  const siteName = 'ZBUKUROHU - Beauty & Wellness';
  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = url ? `https://zbukurohu-v2.vercel.app${url}` : 'https://zbukurohu-v2.vercel.app';

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [
      'beauty',
      'wellness',
      'makeup',
      'skincare',
      'haircare',
      'fragrances',
      'cosmetics',
      'Balkans',
      'Albania',
      'Kosovo',
      'Macedonia',
      'Montenegro',
      'Serbia',
      'Bosnia',
      'Croatia',
      'Slovenia',
      ...keywords
    ],
    authors: author ? [{ name: author }] : undefined,
    creator: 'ZBUKUROHU',
    publisher: 'ZBUKUROHU',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://zbukurohu-v2.vercel.app'),
    alternates: {
      canonical: fullUrl,
      languages: {
        'sq-AL': fullUrl,
        'en': fullUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'sq_AL',
      type,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@zbukurohu',
      site: '@zbukurohu',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };

  return metadata;
}

// Predefined metadata for common pages
export const commonMetadata = {
  home: {
    title: 'Beauty & Wellness Premium Collection',
    description: 'Discover authentic beauty and wellness products from the Balkans. Premium makeup, skincare, haircare, and fragrances with free delivery over €50.',
    keywords: ['beauty products', 'wellness', 'Balkans', 'authentic', 'premium'],
    image: '/images/homepage-hero.jpg',
  },
  makeup: {
    title: 'Makeup Collection - Face, Eyes, Lips & Nails',
    description: 'Complete makeup collection organized by face parts. Foundation, concealer, mascara, lipstick, nail polish and more from top brands.',
    keywords: ['makeup', 'foundation', 'mascara', 'lipstick', 'nail polish'],
    image: '/images/makeup-collection.jpg',
  },
  skincare: {
    title: 'Skincare Solutions - By Concern & Product Type',
    description: 'Targeted skincare for every concern and need. Cleansers, serums, moisturizers, and treatments for acne, aging, dryness, and more.',
    keywords: ['skincare', 'cleanser', 'serum', 'moisturizer', 'anti-aging'],
    image: '/images/skincare-collection.jpg',
  },
  haircare: {
    title: 'Haircare Solutions - Transform Your Hair',
    description: 'Professional haircare products for all hair types and concerns. Shampoo, conditioner, treatments, and styling products.',
    keywords: ['haircare', 'shampoo', 'conditioner', 'hair treatment', 'styling'],
    image: '/images/haircare-collection.jpg',
  },
  fragrances: {
    title: 'Fragrance Collection - Discover Your Signature Scent',
    description: 'Luxury fragrances for women, men, and unisex. Body mists, gift sets, and exclusive scents from renowned brands.',
    keywords: ['fragrances', 'perfume', 'cologne', 'body mist', 'gift sets'],
    image: '/images/fragrance-collection.jpg',
  },
  services: {
    title: 'Beauty Services - Consultation & Professional Care',
    description: 'Professional beauty services including skin consultation, makeup services, gift wrapping, and subscription plans.',
    keywords: ['beauty services', 'consultation', 'makeup services', 'subscriptions'],
    image: '/images/beauty-services.jpg',
  },
  offers: {
    title: 'Special Offers & Deals - Save on Beauty Products',
    description: 'Exclusive deals, flash sales, bundle offers, and seasonal collections. Save on premium beauty and wellness products.',
    keywords: ['deals', 'sales', 'bundles', 'discounts', 'offers'],
    image: '/images/special-offers.jpg',
  },
};

// Helper function to generate product metadata
export function generateProductMetadata(product: {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  slug: string;
}) {
  return generateMetadata({
    title: `${product.name} - ${product.brand}`,
    description: product.description || `${product.name} by ${product.brand}. Premium ${product.category} product available at ZBUKUROHU.`,
    keywords: [product.name, product.brand, product.category, 'beauty', 'wellness'],
    image: product.image,
    url: `/products/${product.slug}`,
    type: 'product',
    section: product.category,
    tags: [product.brand, product.category],
  });
}

// Helper function to generate category metadata
export function generateCategoryMetadata(category: {
  name: string;
  description: string;
  image: string;
  slug: string;
}) {
  return generateMetadata({
    title: `${category.name} Collection`,
    description: category.description,
    keywords: [category.name, 'collection', 'beauty', 'wellness'],
    image: category.image,
    url: `/categories/${category.slug}`,
    type: 'website',
    section: category.name,
  });
}
