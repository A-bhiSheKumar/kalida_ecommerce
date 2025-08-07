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
