import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Category } from "../interface/newI";

const navClass =
  "text-sm md:text-[15px] tracking-wide px-3 py-2 rounded-xl hover:bg-black/5 transition-colors text-black";

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
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("access_token");
      setIsLogin(!!token);
    };

    checkLogin(); // Initial check

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // const handleProfileClick = () => {
  //   if (!isLogin) {
  //     toast.info("Navigating to login...", { position: "top-center" });
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 1000);
  //   } else {
  //     navigate("/account");
  //   }
  // };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left — Logo */}
          <div className="flex items-center gap-3">
            <Link to="/home" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900" />
              <span className="font-semibold tracking-wide text-black">
                Kalida
              </span>
            </Link>
          </div>

          {/* Center — Search */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <div className="group relative w-full max-w-xl">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                size={18}
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tools, SKUs, brands..."
                className="w-full rounded-2xl border border-black/10 bg-black/5 pl-10 pr-12 py-2 text-sm outline-none placeholder:text-neutral-500 text-black focus:ring-2 focus:ring-black/20"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-neutral-500 hover:bg-black/10"
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

            {/* Profile Click */}
            <button
              onMouseEnter={() => {
                if (!isLogin) {
                  toast.info("We are navigating you to login page...", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                  });
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                }
              }}
              onClick={() => {
                if (isLogin) {
                  navigate("/account");
                }
              }}
              className={navClass}
              aria-label="Account"
            >
              <User size={18} />
            </button>

            <Link to="/cart" className={navClass} aria-label="Cart">
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-black px-1 text-[11px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="group relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              size={18}
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools, SKUs, brands..."
              className="w-full rounded-2xl border border-black/10 bg-black/5 pl-10 pr-3 py-2 text-sm outline-none text-black placeholder:text-neutral-500 focus:ring-2 focus:ring-black/20"
            />
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
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
        <div className="absolute right-0 mt-2 w-[540px] rounded-2xl border border-black/10 bg-white p-4 shadow-2xl backdrop-blur-xl text-black">
          <div className="grid grid-cols-3 gap-3">
            {items.map((i) => (
              <Link
                key={i.id}
                to={`/category/${i.id}`}
                className="rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm hover:bg-black/10"
              >
                {i.name}
              </Link>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-neutral-500">
            Browse by brand • Voltage • Material • Size • Use-case
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
