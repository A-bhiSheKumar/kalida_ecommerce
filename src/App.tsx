// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CategoryProduct from "./components/CategoryProduct";
import BuyPage from "./components/Buy";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col text-zinc-100">
        <Navbar cartCount={2} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<CategoryProduct />} />
            <Route path="/product/:id" element={<BuyPage />} />{" "}
            {/* ✅ New route */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
