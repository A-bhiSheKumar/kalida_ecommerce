/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Category } from "../interface/newI";
import { api } from "../utils/api";
import kalidaPng from "../assets/kalida.png";

const navClass =
  "text-sm md:text-[15px] tracking-wide px-3 py-2 rounded-xl hover:bg-black/5 transition-colors text-black";

type NavbarProps = {
  categories?: Category[];
};

export const Navbar: React.FC<NavbarProps> = () => {
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
      console.log("Responsecheckfortheitemscart-->", response);
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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-gradient-to-r from-blue-50 via-white to-blue-200 text-black shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={kalidaPng}
                alt="Kalida"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle Navbar Links */}
          <nav className="hidden md:flex md:gap-6">
            <Link to="/about" className={navClass}>
              About Us
            </Link>
            <Link to="/category" className={navClass}>
              Category
            </Link>
            <Link to="/products" className={navClass}>
              Products
            </Link>
            <Link to="/contact" className={navClass}>
              Contact Us
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Profile / Login */}
            {!isLogin ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
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
