import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";
import { motion } from "framer-motion";

export default function AllProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/products/`);
        const filtered = response.data.filter(
          (product) => product.category === parseInt(categoryId)
        );
        setProducts(filtered);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="pt-20 min-h-screen bg-gray-50 px-4 py-10">
     

      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 "
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/productpage/${product.id}`)}
              className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl bg-white shadow-md cursor-pointer transition-transform"
            >
              <div>
                <img
                  src={product.images[0]?.image_url || "/placeholder.jpg"}
                  alt={product.name}
                  className="size-48 shadow-xl rounded-md object-cover"
                />
              </div>

              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-2xl font-medium text-gray-800">{product.name}</span>
                <span className="font-medium text-sky-500">{product.category || "Product"}</span>
                <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                  <span>₹{product.price}</span>
                  <span>·</span>
                  <span>{new Date(product.created_at).getFullYear() || "2025"}</span>
                </span>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 text-center md:text-left">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}

        </motion.div>
      )}
    </div>
  );
}
