// src/types/index.ts
export type Category = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating?: number;
  badge?: string;
};
export interface ProductImage {
  id: number;
  image: string;
  display_order: number;
  alt_text: string; // must be a string
  is_main: boolean; // must be a boolean
}

export interface IProduct {
  current_price: string;
  slug: string;
  id: number;
  name: string;
  description: string;
  category: { id: string; name: string };
  price: number;
  short_description?: string;
  sale_price?: number;
  stock_quantity?: number;
  status?: string[];
  meta_description?: string;
  meta_title?: string;
  is_active?: boolean;
  is_bestseller?: boolean;
  is_featured?: boolean;
  images: ProductImage[];
  updated_at: string;
  sku: string;
  ref_number?: number;
  is_on_sale?: boolean;
}
