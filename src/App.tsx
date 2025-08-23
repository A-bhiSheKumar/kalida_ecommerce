// src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
// import CategoryProduct from "./components/CategoryProduct";
import BuyPage from "./components/Buy";
import LoginForm from "./components/Login";
import UserProfile from "./components/UserProfile";
import AddToCart from "./components/AddToCart";
import { api } from "./utils/api";
import WhoWeAre from "./components/WhoWeAre";
import ContactUs from "./components/ContactUs";

import CategoryList from "./components/CategoryList";
import CategoryProduct from "./components/CategoryProduct";
import RandomProducts from "./components/RandomProducts";

const App: React.FC = () => {
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const response = await api.auth.fetchLoginUser();

      if (response?.status === "success" && response.data) {
        const userData = response.data;

        localStorage.setItem("username", userData.username || "");
        localStorage.setItem("email", userData.email || "");
        localStorage.setItem("role", userData.role || "");
        localStorage.setItem("phone_number", userData.phone_number || "");
        localStorage.setItem("company_name", userData.company_name || "");
        localStorage.setItem("address", userData.address || "");
        localStorage.setItem("user_id", String(userData.id || ""));
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Check for token in query params when app loads or location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      fetchUser();
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);

  const isAuthenticated = !!localStorage.getItem("access_token");
  const hideNavFooter = location.pathname === "/login";

  return (
    <div className="flex min-h-screen flex-col ">
      {!hideNavFooter && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<WhoWeAre />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/product" element={<CategoryProduct />} />
          <Route path="/products" element={<RandomProducts />} />
          <Route path="/productDetails" element={<BuyPage />} />
          <Route path="/addToCart" element={<AddToCart />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
