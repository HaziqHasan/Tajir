import React from "react";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import API_BASE_URL from "../Api/Api";
import axios from "axios";

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}api/products/`
        );
        setProduct(res.data);
        console.log(res.data,'hhhhhh');
        
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {product.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <img
              src={product.images[0]?.image_url || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-black mb-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 flex-grow">
                {product.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-black">
                  {product.price}
                </span>
                <button className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition-all">
                  View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
