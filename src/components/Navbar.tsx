import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Category } from "../interface/newI";
import { api } from "../utils/api";

const navClass =
  "text-sm md:text-[15px] tracking-wide px-3 py-2 rounded-xl hover:bg-black/5 transition-colors text-black";

type NavbarProps = {
  categories?: Category[];
};

export const Navbar: React.FC<NavbarProps> = () => {
  const [q, setQ] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // Guest cart count from localStorage
        const guestCart = JSON.parse(
          localStorage.getItem("guest_cart") || "[]"
        );
        setCartCount(
          guestCart.reduce(
            (total: number, item: any) => total + (item.quantity || 1),
            0
          )
        );
        return;
      }
      // Logged-in cart from API
      const response = await api.product.getCartIems();
      setCartCount(response.total_items || 0);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("access_token");
      setIsLogin(!!token);
    };

    checkLogin();
    fetchCartItems();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("cart-updated", fetchCartItems);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("cart-updated", fetchCartItems);
    };
  }, [fetchCartItems]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900" />
              <span className="font-semibold tracking-wide text-black">
                Kalida
              </span>
            </Link>
          </div>

          {/* Search */}
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

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Profile / Login */}
            {!isLogin ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => navigate("/account")}
                className={navClass}
                aria-label="Account"
              >
                <User size={18} />
              </button>
            )}

            {/* Cart */}
            <Link to="/addToCart" className={navClass} aria-label="Cart">
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
      </div>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
