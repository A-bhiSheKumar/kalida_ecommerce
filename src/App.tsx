// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import BuyPage from "./components/Buy";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-zinc-100">
        <Navbar cartCount={2} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<BuyPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
