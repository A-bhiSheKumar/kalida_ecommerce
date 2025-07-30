// src/pages/BuyPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, CheckCircle } from "lucide-react";
import type { Product } from "../types/category";
import { featured } from "../constants/product";

const BuyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find product by ID
  const product: Product | undefined = featured.find((p) => p.id === id);

  // Handle if product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-50">
        Product not found
      </div>
    );
  }

  const images = [product.image, product.image, product.image];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="min-h-screen bg-brand-900 text-brand-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-brand-200/20 bg-cream-glass p-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border ${
                  selectedImage === img
                    ? "border-brand-50"
                    : "border-brand-200/10"
                } hover:opacity-90`}
              >
                <img
                  src={img}
                  alt={`Preview ${idx}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>

          {/* Rating & Brand */}
          <div className="flex items-center gap-4 text-sm text-brand-200/80">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star size={16} className="text-yellow-400" />
              <span className="ml-1 text-brand-200/60">
                ({product.rating || 120} Reviews)
              </span>
            </div>
            <span className="hidden md:inline">•</span>
            <span>Brand: Kalida</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-semibold text-brand-50">
            ₹{product.price.toLocaleString("en-IN")}
          </div>

          {/* Description */}
          {/* <p className="text-sm text-brand-200/80 leading-relaxed">
            {product.description ||
              "High-performance hardware tool designed for professional-grade tasks. Reliable and durable."}
          </p> */}

          {/* Features */}
          <ul className="space-y-2 text-sm text-brand-200/90">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5" />
              Industrial-grade build quality
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5" />
              Extended warranty & GST invoicing
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5" />
              Ships Pan-India
            </li>
          </ul>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-900 to-brand-700 px-6 py-2.5 text-sm font-semibold text-brand-50 hover:from-brand-800 hover:to-brand-600 transition shadow-md">
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button className="rounded-xl bg-brand-50 text-brand-900 px-6 py-2.5 text-sm font-semibold hover:bg-brand-200 transition shadow-md">
              Buy Now
            </button>
          </div>

          {/* Delivery & Policies */}
          <div className="mt-8 border-t border-brand-200/10 pt-4 text-sm text-brand-200/70 space-y-2">
            <p>🚚 Free delivery within 2–4 days across India</p>
            <p>🔁 7-day replacement warranty</p>
            <p>🧾 GST invoice available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
