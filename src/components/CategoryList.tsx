import { useCallback, useEffect, useState } from "react";
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
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Shop by Category
          </h2>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/product?category=${encodeURIComponent(
                  c.id
                )}&categoryName=${encodeURIComponent(c.name)}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                aria-label={`Browse ${c.name} category`}
              >
                {/* Image smaller height like Zara */}
                <div className="h-36 sm:h-40 lg:h-44 overflow-hidden flex items-center justify-center bg-gray-50">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-600">
                      {c.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition duration-500" />

                {/* Text */}
                <div className="absolute bottom-2 left-0 right-0 px-2">
                  <h3 className="text-sm font-semibold text-white text-center truncate">
                    {c.name}
                  </h3>
                  <span className="block text-xs text-white/80 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Shop →
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
    </section>
  );
};

export default CategoryList;
