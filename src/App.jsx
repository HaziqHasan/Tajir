import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Mainsection from "./Components/Mainsection";
import "./index.css";
import Cart from "./Components/Cart";
import AboutUs from "./Components/About";
import AdminDashboard from "./UserPage.tsx/AdminDashboard";
import VendorHome from "./UserPage.tsx/AdminDashboard";
import HomeCategory from "./Components/HomeCategory";
import Footer from './Components/Footer'
import AllProducts from "./Components/AllProducts";
import SingleProduct from "./Components/SingleProduct";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signin"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Mainsection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/HomeCategory" element={<HomeCategory />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/footer" element={<Footer />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vendor" element={<VendorHome />} />
        <Route path="/" element={<Mainsection />} />

        <Route path="/allproducts/:categoryId" element={<AllProducts />} />
        <Route path="/productpage/:productId" element={<SingleProduct />} />

        <Route path="/unauthorized" element={<div>🚫 Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
