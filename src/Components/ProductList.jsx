import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import API_BASE_URL from "../Api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};


const ProductList = () => {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}api/products/`
        );
        setProduct(res.data);
        console.log(res.data, 'hhhhhh');

      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-black">
        All Products
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : product.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"

        >
          {product.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl bg-white shadow-md cursor-pointer transition-transform"
              onClick={() => navigate(`/productpage/${product.id}`)}
            >
              {/* Product Image */}
              <div>
                <img
                  src={product.images[0]?.image_url || "/placeholder.jpg"}
                  alt={product.title}
                  className="size-48 shadow-xl rounded-md object-cover"
                />
              </div>

              {/* Product Content */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <h2 className="text-2xl font-medium text-gray-800">{product.title}</h2>
                <span className="font-medium text-sky-500">{product.category || "Product"}</span>
                <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                  <span>₹{product.price}</span>
                  <span>·</span>
                  <span>{new Date(product.created_at).getFullYear() || "2025"}</span>
                </span>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 text-center md:text-left">
                  {product.description}
                </p>

                {/* View Button */}
                <button
                  className="mt-4 bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition-all"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click
                    navigate(`/productpage/${product.id}`);
                  }}
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>

  );
};

export default ProductList;
