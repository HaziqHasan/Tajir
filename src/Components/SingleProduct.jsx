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
        const res = await axios.get(`${API_BASE_URL}api/products/${productId}/`);
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
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:flex md:gap-10">
        {/* Left: Image Slider */}
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
                  className="w-full h-96 object-cover rounded-xl shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* Right: Info & Cart */}
        <div className="w-full md:w-1/2 flex flex-col justify-end space-y-6 mt-8 md:mt-0">
          <div>
            {/* Title, Category, Artist */}
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Category:</span> {product.category_name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Artist:</span> {product.artist_name}
            </p>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <span className="text-3xl font-bold text-green-600">₹{product.price}</span>


          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-md font-medium shadow-md"
          >
            Add to Cart
          </motion.button>

        </div>
      </div>

      {/* Bottom Details Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-md p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Color:</span>
            <p>{product.color}</p>
          </div>
          <div>
            <span className="font-semibold">Size:</span>
            <p>{product.size_inches}</p>
          </div>
          <div>
            <span className="font-semibold">Material:</span>
            <p>{product.material}</p>
          </div>
          <div>
            <span className="font-semibold">Framed:</span>
            <p>{product.is_framed ? "Yes" : "No"}</p>
          </div>
          <div className="md:col-span-2">
            <span className="font-semibold">Delivery Note:</span>
            <p>{product.delivery_note}</p>
          </div>
          <div className="md:col-span-2">
            <span className="font-semibold">Shipping Note:</span>
            <p>{product.shipping_note}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
