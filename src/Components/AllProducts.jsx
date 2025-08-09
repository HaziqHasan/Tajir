import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function AllProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 0, // hamesha stale
    cacheTime: 0, // cache store na kare
    refetchOnWindowFocus: true, // window refocus par refetch kare
  });

  const filteredProducts = products.filter(
    (product) => product.category === parseInt(categoryId)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load products</p>
    );

  return (
    <div className="pt-20 min-h-screen bg-gray-50 px-4 py-10">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Products - Category {categoryId}</title>
        <meta
          name="description"
          content="Browse our products in this category"
        />
      </Helmet>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/productpage/${product.id}`)}
              >
                <div className="flex flex-col items-center gap-4 p-4 rounded-2xl bg-white shadow-md cursor-pointer transition-transform hover:scale-[1.03]">
                  <img
                    src={
                      product.images?.[0]?.image_url ||
                      "https://via.placeholder.com/400"
                    }
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex flex-col items-center gap-1 px-2 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {product.name || "Untitled"}
                    </h3>
                    <span className="flex gap-2 font-medium text-gray-800">
                      <span>₹{product.price || "0"}</span>
                      <span>·</span>
                      <span>
                        {new Date(product.created_at).getFullYear() || "2025"}
                      </span>
                    </span>
                    <p className="text-sm text-black mt-1 line-clamp-2">
                      {product.description || "No description available."}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/productpage/${product.id}`);
                      }}
                      className="mt-3 bg-[#F5ede5] text-black px-4 py-1 rounded-lg hover:bg-[#F5ede5] transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
