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
import CategoryProduct from "./components/CategoryProduct";
import BuyPage from "./components/Buy";
import LoginForm from "./components/Login";
import UserProfile from "./components/UserProfile";
import AddToCart from "./components/AddToCart";

const App: React.FC = () => {
  const location = useLocation();

  // Check for token in query params when app loads or location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      // Save token to localStorage
      localStorage.setItem("access_token", token);

      // Optionally trigger any login fetch to get user data here
      // api.auth.getProfile().then(...)

      // Remove token from URL without reloading
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);

  const isAuthenticated = !!localStorage.getItem("access_token");
  const hideNavFooter = location.pathname === "/login";

  return (
    <div className="flex min-h-screen flex-col">
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
          <Route path="/account" element={<UserProfile />} />
          <Route path="/product" element={<CategoryProduct />} />
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
