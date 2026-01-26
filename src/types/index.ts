export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  videoUrl?: string;
  category: Category;
  brand: Brand;
  tags: string[];
  colors?: string[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  specifications?: Record<string, string>;
  returnPolicy?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';

export type PaymentMethod = 
  | 'bkash' 
  | 'nagad' 
  | 'rocket' 
  | 'sslcommerz' 
  | 'cod';

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  content: string;
  isFromSupport: boolean;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  expiresAt: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating';
}
