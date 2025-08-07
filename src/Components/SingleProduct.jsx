// ✅ We are connecting the Add to Cart button with the global CartContext to add products to cart from single product page
// Now we enhance it to show quantity buttons if product is already in cart, and prevent adding more than available stock.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import API_BASE_URL from "../Api/Api";
import { useCart } from "../context/CartContext";

export default function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}api/products/${productId}/`
        );
        console.log(res.data.product, "asdfghjklxcvbn");

        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!product) return null;

  const cartItem = cart.find((item) => item.id === product.id);
  const inCartQty = cartItem?.quantity || 0;
  const maxQty = Math.min(product.stock_quantity, 5);

  const handleAdd = () => {
    if (inCartQty < maxQty) addToCart(product);
  };

  const handleIncrement = () => {
    if (inCartQty < maxQty) updateQuantity(product.id, 1);
  };

  const handleDecrement = () => {
    if (inCartQty > 1) updateQuantity(product.id, -1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 px-4 py-12"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:flex md:gap-8">
        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            className="rounded-xl overflow-hidden"
          >
            {product.images.map((img) => (
              <SwiperSlide key={img.id}>
                <motion.img
                  src={img.image_url}
                  alt="Product"
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-80 object-cover rounded-xl shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-800 mb-4 text-sm">
            Category: #{product.category}
          </p>
          <p className="text-black text-lg mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-800">
              {product.stock_quantity} in stock
            </span>
          </div>

          {cartItem ? (
            <div className="flex items-center gap-4 mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 px-4 py-2 rounded-full"
                onClick={handleDecrement}
              >
                -
              </motion.button>
              <span className="text-lg font-medium">{inCartQty}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={inCartQty >= maxQty}
                className={`px-4 py-2 rounded-full ${
                  inCartQty >= maxQty
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                onClick={handleIncrement}
              >
                +
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleAdd}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-md font-medium shadow-md"
            >
              Add to Cart
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
