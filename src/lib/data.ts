import { Product, Brand, Seller, Category } from '@/types';

// Import JSON data directly for static generation
import productsData from '../../public/data/products.json';
import brandsData from '../../public/data/brands.json';
import sellersData from '../../public/data/sellers.json';
import categoriesData from '../../public/data/categories.json';

export async function getProducts(): Promise<Product[]> {
  return productsData as Product[];
}

export async function getBrands(): Promise<Brand[]> {
  return brandsData as Brand[];
}

export async function getSellers(): Promise<Seller[]> {
  return sellersData as Seller[];
}

export async function getCategories(): Promise<Category[]> {
  return categoriesData as Category[];
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
