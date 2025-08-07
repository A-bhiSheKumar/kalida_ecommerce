import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../utils/api";
import ProductCard from "../shared/ProductCard";
import type { Product } from "../interface/ProductInterface";

const CategoryProduct: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryName = params.get("categoryName");
  const categoryId = params.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchByCategory = useCallback(async () => {
    try {
      setLoading(true);
      const allProducts = await api.product.getProductList(categoryId || "");
      setProducts(allProducts);
    } catch (err) {
      console.error("Failed to load products by category:", err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchByCategory();
  }, [categoryName, fetchByCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-black">
        Products in:{" "}
        <span className="text-primary underline">{categoryName}</span>
      </h1>

      {loading ? (
        <div className="text-sm text-neutral-400">Loading products...</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-neutral-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
