// src/App.tsx
import React from "react";
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

const App: React.FC = () => {
  const location = useLocation();

  // Simulating authentication state (replace with your AuthContext or real logic)
  const isAuthenticated = !!localStorage.getItem("access_token");

  // Hide Navbar & Footer on login page
  const hideNavFooter = location.pathname === "/login";

  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavFooter && <Navbar cartCount={2} />}

      <main className="flex-1">
        <Routes>
          {/* Redirect if already logged in */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <LoginForm />
            }
          />

          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/product" element={<CategoryProduct />} />
          <Route path="/product/:id" element={<BuyPage />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}
    </div>
  );
};

// Wrapping with BrowserRouter here so useLocation works
const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
