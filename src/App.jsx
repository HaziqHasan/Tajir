// App.js
import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Mainsection from './Components/Mainsection';
import './index.css';
import Cart from './Components/Cart';
import AboutUs from './Components/About';
// import Products from './Components/Products';
// import ProductPage from './Components/ProductPage';
import SignIn from './Signin/SignIn';
import LoginPage from './Signin/LoginPage';
// import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';
// import AdminDashboard from './pages/AdminDashboard';
// import VendorHome from './pages/VendorHome';
// import Shop from './pages/Shop';

function App() {
  const location = useLocation();
  const hideNavbar = ['/login', '/signin'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Mainsection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/home"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Shop />
            </ProtectedRoute>
          }
        /> */}

        {/* Fallback */}
        <Route path="/unauthorized" element={<div>🚫 Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
