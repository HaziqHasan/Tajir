import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
        setProducts(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white py-12 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-black">
        New Arrivals And Demanding
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/productpage/${product.id}`)}
                className="flex flex-col items-center gap-4 p-4 rounded-2xl bg-white shadow-md cursor-pointer transition-transform hover:scale-[1.03]"
              >
                {/* Product Image */}
                <img
                  src={
                    product.images?.[0]?.image_url || "https://via.placeholder.com/400"
                  }
                  alt={product.title}
                  className="w-full h-72 object-cover rounded-xl shadow-lg"
                />

                {/* Product Content */}
                <div className="flex flex-col items-center gap-1 px-2 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.title || "Untitled"}
                  </h3>
                  <span className="font-medium text-sky-500">
                    {product.category || "Product"}
                  </span>
                  <span className="flex gap-2 font-medium text-gray-800">
                    <span>₹{product.price || "0"}</span>
                    <span>·</span>
                    <span>{new Date(product.created_at).getFullYear() || "2025"}</span>
                  </span>
                  <p className="text-sm text-black mt-1 line-clamp-2">
                    {product.description || "No description available."}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/productpage/${product.id}`);
                    }}
                    className="mt-3 bg-[#F5ede5]  text-black px-4 py-1 rounded-lg hover:bg-[#F5ede5] transition-all"
                  >
                    View
                  </button>
                </div>
              </div>

            ))}
          </div>

          {/* View All Products Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/productlist")}
              className="px-6 py-2 text-sm font-medium bg-[#F5ede5]  text-black  rounded-md hover:bg-white hover:text-black transition-all"
            >
              View All Products
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
