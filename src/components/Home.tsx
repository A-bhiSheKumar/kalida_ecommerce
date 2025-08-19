import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import WhoWeAre from "./WhoWeAre";
import OurPartners from "./OurPartners";
// import { featured } from "../constants/products";
// import ProductCard from "../shared/ProductCard";

// Interfaces
interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.categories.getCategoryList();
      console.log("responsecheckforthisdesc-->>", response);
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <main className="bg-white text-black">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-neutral-600">
                Premium materials, exceptional service, professionalism — now on
                LinkedIn.
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Welcome to Kalida - Exclusive Distributor of High-End
                Construction Materials!
              </h1>
              <p className="mt-3 text-neutral-600">
                From power tools to fasteners — curated for performance,
                durability, and precision. Get same‑day dispatch on most orders.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/deals"
                  className="rounded-2xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Shop Deals
                </Link>
                <Link
                  to="/category/powertools"
                  className="rounded-2xl border border-black/10 bg-black/5 px-5 py-2.5 text-sm hover:bg-black/10"
                >
                  Power Tools
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-500">
                <li>GST Invoice</li>
                <li>Pan-India Delivery</li>
                <li>Warranty Support</li>
                <li>Bulk Pricing</li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl border border-black/10 bg-black/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hero"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-4 -left-4 hidden select-none rounded-2xl border border-black/10 bg-black/5 px-3 py-1 text-xs text-neutral-600 backdrop-blur-md md:block">
                Heavy-duty lineup • IP-rated • Pro warranties
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhoWeAre />
      {/* Categories */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Shop by Category</h2>
            <Link to="/" className="text-sm text-neutral-600 hover:underline">
              View all
            </Link>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {categories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/product?category=${encodeURIComponent(
                        c.id
                      )}&categoryName=${encodeURIComponent(c.name)}`}
                      className="group relative block overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                      aria-label={`Browse ${c.name} category`}
                    >
                      <div className="aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
                        {c.image ? (
                          <img
                            src={c.image}
                            alt={c.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-3xl font-bold text-gray-600">
                            {c.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-white text-center">
                          {c.name}
                        </h3>
                        <span className="block mt-1 text-sm text-white/90 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Shop now →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading categories...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <OurPartners />
    </main>
  );
};

export default Home;
