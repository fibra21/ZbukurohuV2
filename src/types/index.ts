export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  sellerId: string;
  images: string[];
  price: number;
  currency: string;
  shades: string[];
  rating: number;
  reviewsCount: number;
  tags: string[];
  ingredients: string[];
  skinTypes: string[];
  concerns: string[];
  isNew: boolean;
  isBestseller: boolean;
  badges: string[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: string;
  country: string;
  isOfficialDistributorInKosovo: boolean;
  story: string;
  heroImage: string;
}

export interface Seller {
  id: string;
  slug: string;
  name: string;
  country: string;
  verifiedDistributor: boolean;
  policies: {
    shipping: string;
    returns: string;
  };
  rating: number;
  metrics: {
    orders: number;
    responseTime: string;
  };
  heroImage: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  icon: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedShade?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  skinTypes: string[];
  concerns: string[];
  shades: string[];
  rating: number;
  inStock: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Locale {
  code: string;
  name: string;
  flag: string;
}

export interface FaceHotspot {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
  verified: boolean;
}

export interface QnA {
  id: string;
  productId: string;
  question: string;
  answer: string;
  author: string;
  date: string;
  helpful: number;
}
