import React from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  mobileOpen?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  mobileOpen = true,
}) => {
  return (
    <aside
      className={`${
        mobileOpen ? "block" : "hidden"
      } sm:block col-span-1 bg-white border border-gray-200 rounded-2xl p-5 shadow-md h-[60vh] relative`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filter by Category
      </h3>

      {/* Scrollable Container */}
      <div className="space-y-2 h-[calc(50vh-3rem)] overflow-y-auto pr-2 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* All Products Option */}
        <label className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-gray-50 p-2 transition">
          <input
            type="radio"
            name="category"
            value="all"
            checked={selectedCategory === "all"}
            onChange={() => setSelectedCategory("all")}
            className="text-black focus:ring-black"
          />
          <span
            className={`${
              selectedCategory === "all"
                ? "font-medium text-black"
                : "text-gray-700"
            }`}
          >
            All Products
          </span>
        </label>

        {/* Dynamic Categories */}
        {categories.map((c) => (
          <label
            key={c.id}
            className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-gray-50 p-2 transition"
          >
            <input
              type="radio"
              name="category"
              value={c.id}
              checked={selectedCategory === c.id}
              onChange={() => setSelectedCategory(c.id)}
              className="text-black focus:ring-black"
            />
            <span
              className={`${
                selectedCategory === c.id
                  ? "font-medium text-black"
                  : "text-gray-700"
              }`}
            >
              {c.name}
            </span>
          </label>
        ))}

        {/* Gradient Fade Indicator (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </aside>
  );
};

export default CategoryFilter;
