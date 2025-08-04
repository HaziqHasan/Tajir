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
        setProducts(res.data.slice(0,4));
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/productpage/${product.id}`)}
                className="flex flex-col items-center gap-6 p-6 md:flex-row md:gap-8 rounded-2xl bg-white shadow-md cursor-pointer transition-transform hover:scale-[1.03]"
              >
                <div>
                  <img
                    src={
                      product.images?.[0]?.image_url ||
                      "https://via.placeholder.com/200"
                    }
                    alt={product.title}
                    className="w-48 h-48 shadow-xl rounded-md object-cover"
                  />
                </div>

                <div className="flex flex-col items-center md:items-start gap-2">
                  <h3 className="text-2xl font-medium text-gray-800">
                    {product.title || "Untitled"}
                  </h3>
                  <span className="font-medium text-sky-500">
                    {product.category || "Product"}
                  </span>
                  <span className="flex gap-2 font-medium text-gray-600">
                    <span>₹{product.price || "0"}</span>
                    <span>·</span>
                    <span>{new Date(product.created_at).getFullYear() || "2025"}</span>
                  </span>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 text-center md:text-left">
                    {product.description || "No description available."}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/productpage/${product.id}`);
                    }}
                    className="mt-4 bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition-all"
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
              className="px-6 py-2 text-sm font-medium text-white bg-black border border-black rounded-md hover:bg-white hover:text-black transition-all"
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
