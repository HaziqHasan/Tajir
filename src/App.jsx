import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Mainsection from './Components/Mainsection';
import './index.css';
import Cart from './Components/Cart';
import AboutUs from './Components/About';
import SignIn from './Signin/SignIn';
import LoginPage from './Signin/LoginPage';
import AdminDashboard from './UserPage.tsx/AdminDashboard';
import  VendorHome from './UserPage.tsx/AdminDashboard';
import Products from './Components/Products';
import ProductPage from './Components/ProductPage';


function App() {
  const location = useLocation();
  const hideNavbar = ['/login', '/signin'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Mainsection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vendor" element={<VendorHome />} />
        <Route path="/" element={<Mainsection />} />
        <Route path="/productpage/:id" element={<ProductPage />} />

        <Route path="/unauthorized" element={<div>🚫 Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
