import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import type { IProduct } from "../interface/newI";
import { Filter, ShoppingCart, X } from "lucide-react";
import AlertModal from "../shared/AlertModel";

interface Category {
  id: string;
  name: string;
}

const RandomProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // add new state

  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  const [selectedPrice, setSelectedPrice] = useState<string>("all");

  // Loader state
  const [loading, setLoading] = useState(true);

  // Sort state
  const [sortOption, setSortOption] = useState("default");

  // "See More" state
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.product.getAllProducts();
      if (response) {
        setProducts(response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Sorting
  const sortProducts = (products: IProduct[]) => {
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);

      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);

      case "name-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name, "en"));

      case "name-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name, "en"));

      default:
        return products;
    }
  };

  // Filtering
  const filterProducts = (products: IProduct[]) => {
    return products.filter((p) => {
      let match = true;

      if (selectedCategory !== "all" && p.category?.name !== selectedCategory) {
        match = false;
      }

      if (selectedPrice !== "all") {
        const price = p.price; // already a number

        if (selectedPrice === "lt100" && price >= 100) match = false;
        if (selectedPrice === "100-200" && (price < 100 || price > 200))
          match = false;
        if (selectedPrice === "gt200" && price <= 200) match = false;
      }

      return match;
    });
  };

  // ✅ Fix handleAddToCart to accept product
  const handleAddToCart = async (product: IProduct) => {
    if (!product?.id) {
      console.error("No product ID found");
      return;
    }

    setAddingToCartId(product.id); // ✅ mark only this product as "adding"

    const payload = {
      product: Number(product.id),
      quantity: 1,
    };

    const token = localStorage.getItem("access_token");

    if (!token) {
      try {
        const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

        const existingIndex = cart.findIndex(
          (item: any) => item.id === product.id
        );
        if (existingIndex >= 0) {
          cart[existingIndex].quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("guest_cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));
        // setModalText("Product added to cart successfully!");
        setIsOpen(true);
      } catch (error) {
        console.error("Error saving to guest cart:", error);
        // setModalText("Failed to add product to cart.");
        setIsOpen(true);
      } finally {
        setAddingToCartId(null);
      }
      return;
    }

    try {
      await api.product.addToCart(payload);
      const cartData = await api.product.getCartIems();
      console.log("Cart updated:", cartData);

      window.dispatchEvent(new Event("cart-updated"));
      // setModalText("Product added to cart successfully!");
      setIsOpen(true);
    } catch (error) {
      console.error("Error saving to guest cart:", error);
      // setModalText("Something went wrong while adding product.");
      setIsOpen(true);
    } finally {
      setAddingToCartId(null);
    }
  };

  const finalProducts = sortProducts(filterProducts(products));

  return (
    <>
      <section className="border-t border-black/10 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Ceramics & Porcelain
            </h2>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Filter Button */}
              <button
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
                onClick={() => setMobileFilterOpen(true)}
              >
                <Filter className="w-4 h-4" /> Filter
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
              </div>
            ) : finalProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {finalProducts.slice(0, visibleCount).map((product) => {
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
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Sold by the carton
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
                          <button
                            disabled={addingToCartId === product.id}
                            className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition shadow-md ${
                              addingToCartId === product.id
                                ? "bg-blue-200 text-blue-200 cursor-not-allowed"
                                : "bg-blue-400 text-white hover:bg-blue-500"
                            }`}
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart size={18} />
                            {addingToCartId === product.id
                              ? "Adding..."
                              : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* See More Button */}
                {visibleCount < finalProducts.length && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setVisibleCount(visibleCount + 8)}
                      className="px-6 py-2 text-white text-sm font-medium rounded-lg 
             bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
             shadow-md hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 
             transition-all duration-300 transform hover:scale-105"
                    >
                      See More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">No products available right now.</p>
            )}
          </div>
        </div>

        {/* Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileFilterOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="ml-auto h-full w-80 bg-white shadow-xl overflow-y-auto p-6 z-50 relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Categories</h4>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>All</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name="category"
                      value={cat.name}
                      checked={selectedCategory === cat.name}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>

              {/* Price */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Price</h4>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={selectedPrice === "all"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="price"
                    value="lt100"
                    checked={selectedPrice === "lt100"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  <span>Less than 100 SAR</span>
                </label>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="price"
                    value="100-200"
                    checked={selectedPrice === "100-200"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  <span>100 SAR to 200 SAR</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="gt200"
                    checked={selectedPrice === "gt200"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  <span>More than 200 SAR</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </section>
      <AlertModal
        text="Product added to cart !"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default RandomProducts;
