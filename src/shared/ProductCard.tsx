import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import type { Product } from "../interface/ProductInterface";

const priceSAR = (v: number | string) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 2, // SAR usually shows 2 decimals
  }).format(Number(v));

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl =
    product.images?.[0]?.image ||
    "https://via.placeholder.com/300x300.png?text=No+Image";

  const displayPrice =
    product.sale_price || product.current_price || product.price;

  const discountPercentage =
    product.price && displayPrice !== product.price
      ? Math.round(
          ((Number(product.price) - Number(displayPrice)) /
            Number(product.price)) *
            100
        )
      : null;

  return (
    <div className="group perspective-1000 w-full h-full">
      <div className="relative preserve-3d group-hover:rotate-y-10 transition-all duration-500 ease-in-out w-full h-full">
        <Link
          to={`/productDetails?product_id=${product.id}`}
          state={{ product }} // ✅ Pass full product object
          className="bg-white text-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col gap-3 h-full border border-gray-100"
          aria-label={`View ${product.name} product details`}
        >
          {/* Image with hover zoom effect */}
          <div className="relative h-52 w-full overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={product.name}
              className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Quick action buttons */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to cart"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic here
                }}
              >
                <ShoppingCart size={16} className="text-gray-800" />
              </button>
              <button
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic here
                }}
              >
                <Heart size={16} className="text-gray-800" />
              </button>
              <button
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Quick view"
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view logic here
                }}
              >
                <Eye size={16} className="text-gray-800" />
              </button>
            </div>

            {/* Discount badge */}
            {discountPercentage && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {discountPercentage}% OFF
              </div>
            )}

            {/* Featured badge */}
            {product.is_featured && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                Featured
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-2 px-1 grow">
            {/* Name */}
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 leading-snug line-clamp-2">
              {product.description}
            </p>
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 text-sm">
                <div className="bg-green-600 text-white px-1.5 py-0.5 rounded flex items-center text-xs font-semibold">
                  {product.rating.toFixed(1)}
                  <Star size={12} className="ml-1 fill-white" />
                </div>
                <span className="text-gray-500 text-xs">
                  ({Math.floor(Math.random() * 5000 + 500).toLocaleString()})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {priceSAR(displayPrice)}
                </span>
                {product.price && product.price !== displayPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {priceSAR(product.price)}
                  </span>
                )}
              </div>

              {/* <div className="text-xs text-green-600 font-medium mt-1">
                Free delivery
              </div> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
