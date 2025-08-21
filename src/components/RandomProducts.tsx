import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import type { IProduct } from "../interface/newI";

const RandomProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  // Fetch random products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.product.getRandomProductList();
      if (response?.results) {
        setProducts(response.results);
      }
    } catch (error) {
      console.error("Error fetching random products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="border-t border-black/10 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const mainImage =
                product.images?.find((img) => img.is_main)?.image ||
                product.images?.[0]?.image ||
                "https://via.placeholder.com/300x300.png?text=No+Image";

              return (
                <div
                  key={product.id}
                  className="group border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
                >
                  {/* Product Image */}
                  <Link
                    to={`/productDetails?product_id=${product.id}`}
                    state={{ product }}
                  >
                    <div className="aspect-square w-full overflow-hidden bg-gray-50">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-black/80 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.category?.name}
                    </p>

                    {/* Price */}
                    <div className="mt-3 flex items-center gap-2">
                      {product.is_on_sale ? (
                        <>
                          <span className="text-red-600 font-semibold">
                            {product.current_price} SAR
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            {product.price} SAR
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-800 font-semibold">
                          {product.price} SAR
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/product/${product.slug}`}
                      className="mt-4 inline-block w-full text-center rounded-xl bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No products available right now.</p>
        )}
      </div>
    </section>
  );
};

export default RandomProducts;
