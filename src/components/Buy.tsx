/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../interface/ProductInterface";
import { api } from "../utils/api";

// Helper to format INR
const priceINR = (v: number | string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(v));

// Fallback image object type
type ImageObj = {
  image: string;
  is_main: boolean;
};

const BuyPage: React.FC = () => {
  const location = useLocation();
  const product: Product | undefined = location.state?.product;
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const productId = params.get("product_id");
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Product not found.
      </div>
    );
  }

  // Ensure images array is correctly structured
  const images: ImageObj[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((img, i) => ({
          image: img.image,
          is_main: typeof img.is_main === "boolean" ? img.is_main : i === 0, // fallback to first image as main
        }))
      : [
          {
            image: "https://via.placeholder.com/500x500.png?text=No+Image",
            is_main: true,
          },
        ];

  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.is_main)?.image || images[0].image
  );
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const displayPrice =
    product.sale_price || product.current_price || product.price;

  const handleLogin = () => {
    if (!isLogin) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("access_token");
      setIsLogin(!!token);
    };

    checkLogin(); // Initial check

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleDownload = async () => {
    if (!productId) {
      console.error("No product ID found");
      return;
    }

    try {
      const blob: Blob = await api.product.downloadProductPdf(productId);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${product?.name || "product"}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!product?.id) {
      console.error("No product ID found");
      return;
    }

    setIsAddingToCart(true); // Disable button immediately
    const payload = {
      product: Number(product.id),
      quantity: 1,
    };

    const token = localStorage.getItem("access_token");

    // If not logged in → save to guest cart in localStorage
    if (!token) {
      try {
        const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

        const existingIndex = cart.findIndex(
          (item: any) => item.id === product.id
        );
        if (existingIndex >= 0) {
          cart[existingIndex].quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("guest_cart", JSON.stringify(cart));

        // Trigger navbar/cart icon update
        window.dispatchEvent(new Event("cart-updated"));

        alert("Product added to cart successfully!");
      } catch (error) {
        console.error("Error saving to guest cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
      return; // Exit here — no API call for guests
    }

    // If logged in → use API
    try {
      await api.product.addToCart(payload);

      const cartData = await api.product.getCartIems();
      console.log("Cart updated:", cartData);

      window.dispatchEvent(new Event("cart-updated"));

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-300 bg-white p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto">
            {images.map((imgObj, idx) => {
              const isMain = imgObj.is_main;
              const isSelected = selectedImage === imgObj.image;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isMain || isLogin) {
                      setSelectedImage(imgObj.image);
                    } else {
                      setShowPermissionModal(true);
                    }
                  }}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border ${
                    isSelected ? "border-black" : "border-gray-300"
                  } hover:opacity-90`}
                >
                  <img
                    src={imgObj.image}
                    alt={`Preview ${idx}`}
                    className={`h-full w-full object-cover ${
                      !isMain && !isLogin ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />

                  {/* Show Locked overlay only if NOT main AND NOT logged in */}
                  {!isMain && !isLogin && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold bg-black/50 rounded-xl">
                      Locked
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-xs text-gray-600 leading-snug line-clamp-2">
            {product.description}
          </p>
          {/* Rating & Brand */}
          {/* <div className="flex items-center gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(product.rating || 4))].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-1 text-gray-500">
                ({Math.floor(Math.random() * 5000 + 500)} Reviews)
              </span>
            </div>
            <span className="hidden md:inline">•</span>
       
          </div> */}

          {/* Price */}
          <div className="text-3xl font-semibold text-black">
            {priceINR(displayPrice)}
            {product.price && product.price !== displayPrice && (
              <span className="ml-3 text-xl line-through text-gray-500">
                {priceINR(product.price)}
              </span>
            )}
          </div>

          {/* Features */}
          {/* <ul className="space-y-2 text-sm text-gray-800 mt-4">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              Industrial-grade build quality
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              Extended warranty & GST invoicing
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              Ships Pan-India
            </li>
          </ul> */}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              disabled={isAddingToCart}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition shadow-md ${
                isAddingToCart
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              {isAddingToCart ? "Added" : "Add to Cart"}
            </button>

            {isLogin && (
              <button
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-2.5 text-sm font-semibold shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 active:scale-95 transition-all duration-300"
                onClick={handleDownload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
                Download
              </button>
            )}
          </div>

          {/* Delivery & Policies */}
          {/* <div className="mt-8 border-t border-gray-300 pt-4 text-sm text-gray-700 space-y-2">
            <p>🚚 Free delivery within 2–4 days across India</p>
            <p>🔁 7-day replacement warranty</p>
            <p>🧾 GST invoice available</p>
          </div> */}
        </div>
      </div>

      {/* Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-sm w-full text-center space-y-4">
            <h2 className="text-lg font-semibold">Login Required</h2>
            <p className="text-sm text-gray-700">
              This image is locked. Please Login to access this content.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-white border text-black rounded-lg hover:bg-black hover:text-white"
                onClick={() => setShowPermissionModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
