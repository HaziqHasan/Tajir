import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import Home from './Components/Home';
import Mainsection from './Components/Mainsection';
import './index.css';
import Cart from './Components/Cart';
import AboutUs from './Components/About';
import Products from './Components/Products';
import ProductPage from './Components/ProductPage';

function App() {
  return (
    <>
        <Navbar />    
      <Routes>
        <Route path="/" element={<Mainsection />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<AboutUs />} /> 
        <Route path="products" element={<Products />} /> 
        <Route path="/productpage" element={<ProductPage />} />
        </Routes>
    </>
  );
}

export default App;
