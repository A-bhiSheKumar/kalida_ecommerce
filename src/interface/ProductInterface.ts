// A single image associated with a product
export interface ProductImage {
  id: number;
  image: string;
  display_order: number;
  alt_text: string; // must be a string
  is_main: boolean; // must be a boolean
}

// Category object
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// Main Product type
export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  price: string;
  sale_price?: string;
  current_price?: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  is_on_sale: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  weight?: number | null;
  images: { image: string; is_main?: boolean }[];
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
  };
  attributes: any[];
  rating?: number;
}

// Attributes (if your API supports filtering by size/color/etc.)
export interface ProductAttribute {
  name: string;
  value: string;
}
