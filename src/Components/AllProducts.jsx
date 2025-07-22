import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";

export default function AllProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-gray-50 ">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-10">
        Products in Category #{categoryId}
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/productpage/${product.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <img
                src={product.images[0]?.image_url || "/placeholder.jpg"}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {product.description}
                </p>
                <p className="text-md font-bold text-gray-800">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
