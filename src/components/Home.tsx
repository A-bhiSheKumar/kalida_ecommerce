import React from "react";
import { Link } from "react-router-dom";

import OurPartners from "./OurPartners";
// import { featured } from "../constants/products";
// import ProductCard from "../shared/ProductCard";

// Interfaces

const Home: React.FC = () => {
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

      {/* Categories */}

      <OurPartners />
    </main>
  );
};

export default Home;
