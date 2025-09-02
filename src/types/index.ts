export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  sellerId: string;
  categoryId: string;
  imageUrl: string;
  price: number;
  currency: string;
  originalPrice?: number;
  discount?: number;
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
  description: string;
  stock: number;
  wholesalePrice?: number;
  minimumOrderQuantity?: number;
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
  isVerified: boolean;
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
  description: string;
  productCount: number;
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

// New types for the expanded marketplace
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'distributor' | 'business';
  avatar?: string;
  phone?: string;
  address?: Address;
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'makeup' | 'nail-art' | 'hair-styling' | 'skincare' | 'massage' | 'other';
  providerId: string;
  price: number;
  currency: string;
  duration: number; // in minutes
  images: string[];
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  location: string;
  tags: string[];
}

export interface ServiceProvider {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  services: string[]; // service IDs
  portfolio: PortfolioItem[];
  rating: number;
  reviewsCount: number;
  experience: number; // years
  certifications: string[];
  location: string;
  isVerified: boolean;
  isAvailable: boolean;
  workingHours: WorkingHours;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface WorkingHours {
  monday: { start: string; end: string; isOpen: boolean };
  tuesday: { start: string; end: string; isOpen: boolean };
  wednesday: { start: string; end: string; isOpen: boolean };
  thursday: { start: string; end: string; isOpen: boolean };
  friday: { start: string; end: string; isOpen: boolean };
  saturday: { start: string; end: string; isOpen: boolean };
  sunday: { start: string; end: string; isOpen: boolean };
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  selectedShade?: string;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  providerId: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total: number;
  currency: string;
  notes?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  topProducts: Product[];
  monthlyRevenue: { month: string; revenue: number }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}
