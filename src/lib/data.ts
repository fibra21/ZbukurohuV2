import { Product, Brand, Seller, Category } from '@/types';

// Cache for data to avoid repeated fetches
const cache = new Map<string, unknown>();

// Fallback data for development
const fallbackData = {
  products: [
    {
      id: "1",
      slug: "loreal-paris-true-match-foundation",
      name: "L'Oréal Paris True Match Foundation",
      brandId: "loreal",
      sellerId: "beauty-kosovo",
      categoryId: "makeup",
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      price: 24.99,
      currency: "EUR",
      originalPrice: 29.99,
      discount: 17,
      shades: ["1N", "2N", "3N", "4N", "5N", "1W", "2W", "3W", "4W", "5W"],
      rating: 4.5,
      reviewsCount: 128,
      tags: ["foundation", "base", "long-lasting", "natural"],
      ingredients: ["Water", "Cyclopentasiloxane", "Glycerin", "Dimethicone", "Titanium Dioxide"],
      skinTypes: ["normal", "combination", "dry"],
      concerns: ["uneven-skin-tone", "redness"],
      isNew: false,
      isBestseller: true,
      badges: ["Authorised Distributor", "Dermatologist Tested"],
      description: "A revolutionary foundation that matches your skin's texture and tone for a flawless, natural finish."
    }
  ] as Product[],
  categories: [
    {
      id: "skincare",
      slug: "skincare",
      name: "Skincare",
      description: "Essential products for healthy, glowing skin",
      productCount: 45,
      icon: "✨"
    }
  ] as Category[],
  brands: [
    {
      id: "loreal",
      slug: "loreal",
      name: "L'Oréal Paris",
      logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      country: "France",
      isOfficialDistributorInKosovo: true,
      story: "Leading beauty brand with innovative products",
      heroImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=200&fit=crop"
    }
  ] as Brand[],
  sellers: [
    {
      id: "beauty-kosovo",
      slug: "beauty-kosovo",
      name: "Beauty Kosovo",
      country: "Kosovo",
      verifiedDistributor: true,
      policies: {
        shipping: "Free shipping over €50",
        returns: "30-day return policy"
      },
      rating: 4.8,
      metrics: {
        orders: 156,
        responseTime: "2 hours"
      },
      heroImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=200&fit=crop"
    }
  ] as Seller[]
};

async function fetchData<T>(path: string): Promise<T[]> {
  if (cache.has(path)) {
    return cache.get(path) as T[];
  }

  try {
    // Try fetch first (works in production)
    const response = await fetch(`/data/${path}.json`);
    if (response.ok) {
      const data = await response.json();
      cache.set(path, data);
      return data;
    }
  } catch (error) {
    console.log(`Fetch failed for ${path}, trying fallback...`);
  }

  try {
    // Fallback to dynamic import (works in development)
    const data = await import(`../../public/data/${path}.json`);
    cache.set(path, data.default);
    return data.default as T[];
  } catch (error) {
    console.log(`Dynamic import failed for ${path}, using fallback data...`);
  }

  // Use fallback data as last resort
  const fallback = fallbackData[path as keyof typeof fallbackData] as T[];
  if (fallback) {
    cache.set(path, fallback);
    return fallback;
  }

  console.error(`No data available for ${path}`);
  return [];
}

export async function getProducts(): Promise<Product[]> {
  return fetchData<Product>('products');
}

export async function getBrands(): Promise<Brand[]> {
  return fetchData<Brand>('brands');
}

export async function getSellers(): Promise<Seller[]> {
  return fetchData<Seller>('sellers');
}

export async function getCategories(): Promise<Category[]> {
  return fetchData<Category>('categories');
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(product => product.slug === slug) || null;
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find(brand => brand.slug === slug) || null;
}

export async function getSellerBySlug(slug: string): Promise<Seller | null> {
  const sellers = await getSellers();
  return sellers.find(seller => seller.slug === slug) || null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(category => category.slug === slug) || null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => 
    product.tags.some(tag => tag.toLowerCase() === categorySlug.toLowerCase())
  );
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.brandId === brandId);
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.sellerId === sellerId);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery))
  );
}
