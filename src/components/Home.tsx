// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../shared/ProductCard";
import { categories, featured } from "../constants/product";

const Home: React.FC = () => {
  return (
    <main className="bg-neutral-950 text-zinc-100">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                Built for Pros • Ships PAN India
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Industrial-grade tools for people who build the future.
              </h1>
              <p className="mt-3 text-zinc-400">
                From power tools to fasteners — curated for performance,
                durability, and precision. Get same‑day dispatch on most orders.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/deals"
                  className="rounded-2xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white"
                >
                  Shop Deals
                </Link>
                <Link
                  to="/category/powertools"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10"
                >
                  Power Tools
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-400">
                <li>GST Invoice</li>
                <li>Pan-India Delivery</li>
                <li>Warranty Support</li>
                <li>Bulk Pricing</li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580893195730-1282f408b0d9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hero"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-4 -left-4 hidden select-none rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur-md md:block">
                Heavy-duty lineup • IP-rated • Pro warranties
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Shop by Category</h2>
            <Link
              to="/categories"
              className="text-sm text-zinc-300 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
                <div className="absolute bottom-2 left-2 text-sm font-medium">
                  {c.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Featured</h2>
            <Link
              to="/featured"
              className="text-sm text-zinc-300 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Same‑day Dispatch", text: "Order by 3 PM" },
              { title: "Pro Support", text: "Warranty & spares help" },
              { title: "Bulk Orders", text: "Volume pricing available" },
              { title: "Secure Payments", text: "UPI • Cards • Netbanking" },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-sm font-semibold">{v.title}</div>
                <div className="text-xs text-zinc-400">{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
