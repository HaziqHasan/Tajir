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
import Footer from "./Components/Footer";
import AllProducts from "./Components/AllProducts";
import SingleProduct from "./Components/SingleProduct";
import ProductList from "./Components/ProductList";
import FeaturedProducts from "./Components/FeaturedProducts";
import { CartProvider } from "./context/CartContext";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signin"].includes(location.pathname);

  return (
    <CartProvider>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Mainsection />} />
        <Route path="/cart" element={<Cart />} />

        {/*from feature to product  */}
        <Route path="/featuredlist" element={<FeaturedProducts />} />
        <Route path="/productlist" element={<ProductList />} />

        {/*from home category to all product  */}
        <Route path="/HomeCategory" element={<HomeCategory />} />
        <Route path="/allproducts/:categoryId" element={<AllProducts />} />

        {/*this means product detials  */}
        <Route path="/productpage/:productId" element={<SingleProduct />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/footer" element={<Footer />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vendor" element={<VendorHome />} />

        <Route path="/unauthorized" element={<div>🚫 Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
