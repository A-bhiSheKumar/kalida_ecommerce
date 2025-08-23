import React from "react";
import { Link } from "react-router-dom";

import OurPartners from "./OurPartners";
import CategoryList from "./CategoryList";

const Home: React.FC = () => {
  return (
    <main className="bg-white text-black">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-white via-blue-50/40 to-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm text-neutral-700">
            Premium materials • Exceptional service • Dubai Standard
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Welcome to <span className="text-blue-600">Kalida</span> — Exclusive
            Distributor of <br className="hidden sm:block" />
            High-End Construction Materials
          </h1>

          {/* Paragraph */}
          <p className="mt-5 max-w-3xl mx-auto text-lg text-neutral-600 leading-relaxed">
            At Kalida, we specialize in delivering premium-grade construction
            materials that embody innovation, durability, and luxury. Trusted by
            architects, developers, and contractors across the region, we bring
            Dubai’s standard of excellence straight to your projects.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/deals"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-neutral-800 transition"
            >
              Explore Deals
            </Link>
            <Link
              to="/category"
              className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 transition"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryList />

      {/* Partners */}
      <OurPartners />
    </main>
  );
};

export default Home;
