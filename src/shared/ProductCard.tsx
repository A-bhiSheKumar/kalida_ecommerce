// src/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "../types/category";

const priceINR = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group rounded-2xl  bg-cream-glass p-2 hover:bg-white/10 transition block"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <div className="absolute left-2 top-2 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-900">
            {product.badge}
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <div className="line-clamp-2 text-sm text-brand-50">
          {product.title}
        </div>
        {product.rating && (
          <div className="flex items-center gap-1 text-xs text-brand-200/90">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{priceINR(product.price)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
