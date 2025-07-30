// src/components/Navbar.tsx
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import type { Category } from "../types/category";

const navClass =
  "text-sm md:text-[15px] tracking-wide px-3 py-2 rounded-xl hover:bg-white/5 transition-colors";

const categoriesPreset: Category[] = [
  { id: "powertools", name: "Power Tools" },
  { id: "handtools", name: "Hand Tools" },
  { id: "fasteners", name: "Fasteners" },
  { id: "electrical", name: "Electrical" },
  { id: "plumbing", name: "Plumbing" },
  { id: "safety", name: "Safety" },
];

type NavbarProps = {
  cartCount?: number;
  categories?: Category[];
};

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 0,
  categories,
}) => {
  const [q, setQ] = useState("");
  const cats = useMemo(() => categories ?? categoriesPreset, [categories]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left — Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-400" />
              <span className="font-semibold tracking-wide text-zinc-100">
                Kalida
              </span>
            </Link>
          </div>

          {/* Center — Search */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <div className="group relative w-full max-w-xl">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={18}
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tools, SKUs, brands..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-12 py-2 text-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-400/50"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-zinc-300 hover:bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-1">
            {/* Desktop categories */}
            <div className="hidden md:block">
              <CategoriesMenu items={cats} />
            </div>

            <NavLink to="/account" className={navClass} aria-label="Account">
              <User size={18} />
            </NavLink>

            <NavLink to="/cart" className={navClass} aria-label="Cart">
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-zinc-200 px-1 text-[11px] font-semibold text-zinc-900">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="group relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools, SKUs, brands..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-400/50"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
    </header>
  );
};

const CategoriesMenu: React.FC<{ items: Category[] }> = ({ items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className={`${navClass} flex items-center gap-1`}>
        Categories <ChevronDown size={16} className="opacity-80" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[540px] rounded-2xl border border-white/10 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-3">
            {items.map((i) => (
              <Link
                key={i.id}
                to={`/category/${i.id}`}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                {i.name}
              </Link>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-zinc-400">
            Browse by brand • Voltage • Material • Size • Use-case
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
