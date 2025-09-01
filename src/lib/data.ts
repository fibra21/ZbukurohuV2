import { Product, Brand, Seller, Category } from '@/types';

// Cache for data to avoid repeated fetches
const cache = new Map<string, any>();

async function fetchData<T>(path: string): Promise<T[]> {
  if (cache.has(path)) {
    return cache.get(path);
  }

  try {
    const response = await fetch(`/data/${path}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }
    const data = await response.json();
    cache.set(path, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
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
