// Components/FeaturedProducts.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
const controls = useAnimation();
const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

useEffect(() => {
  if (inView) {
    controls.start("visible");
  }
}, [inView, controls]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/products/`);
        setProducts(res.data.slice(0, 4)); // ✅ Limit to 4 products
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
   <motion.div
  ref={ref}
  variants={containerVariants}
  initial="hidden"
  animate={controls}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto"
>
  {products.map((product, index) => (
    <motion.div
      key={product.id}
      className="bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
      variants={cardVariants}
    >
      <img
        src={product.images[0]?.image_url || "/placeholder.jpg"}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black mb-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-md font-bold text-black">
            ₹{product.price}
          </span>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

  );
};

export default FeaturedProducts;
