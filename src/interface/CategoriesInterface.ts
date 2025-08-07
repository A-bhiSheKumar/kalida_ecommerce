export interface ICategory {
  id?: string;
  _id?: string;
  slug?: string;
  name?: string;
  category?: string;
  image?: string;
  // price?: number | string | null;
  description?: string;
  createdAt?: string | number | Date;
}

export interface NormalizedProduct {
  id: number | string;
  name: string;
  category: string;
  price?: number;
  description?: string;
  createdAt?: string;
  image: string;
}
