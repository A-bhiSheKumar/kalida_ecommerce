import React, { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const CategoryList = () => {
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
    <div>
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Shop by Category</h2>
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
    </div>
  );
};

export default CategoryList;
