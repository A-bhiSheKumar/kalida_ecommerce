import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import type { IProduct } from "../interface/newI";
import { Filter } from "lucide-react";
import CategoryFilter from "../shared/CategoryFilter";

interface Category {
  id: string;
  name: string;
}

const RandomProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Loader state
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch all random products (initial load)
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.product.getAllProducts();
      if (response) {
        setProducts(response);
      }
    } catch (error) {
      console.error("Error fetching random products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products by category (using API)
  const fetchProductsByCategoryname = useCallback(
    async (categoryName: string) => {
      try {
        setLoading(true);
        if (categoryName === "all") {
          await fetchProducts();
        } else {
          const response = await api.product.getProductList(categoryName);
          if (response) {
            setProducts(response);
          } else {
            setProducts([]);
          }
        }
        setCurrentPage(1); // reset pagination on category change
      } catch (error) {
        console.error("Error fetching products by category:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchProducts]
  );

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.categories.getCategoryList();
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Initial load: products + categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Whenever category changes → fetch from API
  useEffect(() => {
    fetchProductsByCategoryname(selectedCategory);
  }, [selectedCategory, fetchProductsByCategoryname]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <section className="border-t border-black/10 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          {/* Mobile Filter Button */}
          <button
            className="sm:hidden flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Category Filter Sidebar */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            mobileOpen={mobileFilterOpen}
          />

          {/* Products Grid */}
          <div className="sm:col-span-3 lg:col-span-4">
            {loading ? (
              // Loader (Skeleton / Spinner)
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentProducts.map((product) => {
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
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-black/80 line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.category?.name}
                          </p>

                          {/* Price */}
                          <div className="mt-2 flex items-center gap-2">
                            {product.is_on_sale ? (
                              <>
                                <span className="text-red-600 font-semibold text-sm">
                                  {product.current_price} SAR
                                </span>
                                <span className="text-gray-400 line-through text-xs">
                                  {product.price} SAR
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-800 font-semibold text-sm">
                                {product.price} SAR
                              </span>
                            )}
                          </div>

                          {/* CTA Button */}
                          <Link
                            to={`/productDetails?product_id=${product.id}`}
                            state={{ product }}
                            className="mt-3 inline-block w-full text-center rounded-lg bg-black text-white py-2 text-xs font-medium hover:bg-gray-800 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex justify-end mt-6">
                  <div className="inline-flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            currentPage === page
                              ? "bg-black text-white"
                              : "border hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No products available right now.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomProducts;
