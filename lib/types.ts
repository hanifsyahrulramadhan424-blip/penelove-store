export interface ProductVariantType {
  id: string;
  productId: string;
  duration: string;
  accountType: string;
  price: number;
  originalPrice?: number | null;
  isDefault: boolean;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  features: string[] | string;
  icon: string;
  badge?: string | null;
  badgeColor?: string | null;
  isPopular: boolean;
  warrantyDays: number;
  order: number;
  category?: CategoryType;
  variants: ProductVariantType[];
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string | null;
  order: number;
  products?: ProductType[];
  _count?: {
    products: number;
  };
}

export interface InquiryPayload {
  productId?: string;
  variantId?: string;
  productName: string;
  variantDuration: string;
  price: number;
  accountType?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name-asc';
