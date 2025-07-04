import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../Api/Api";


export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // fetchProducts()
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.error("Failed to load products", err));
  //   }, []);
  //   console.log(products);
    

  // const handleClick = (product) => {
  //   navigate(`/productpage/${product.id}`, { state: { product } });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-500 to-gray-100 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-4xl font-bold tracking-wide text-center text-white">Explore Our Collection</h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  alt={product.imageAlt || product.name}
                  src={product.image }
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="mt-4 space-y-1 text-center">
                <h3 className="text-lg font-semibold text-white group-hover:underline">{product.name}</h3>
                <p className="text-md font-medium text-gray-300">${product.price}</p>
              </div>
              
                <h3 className="text-lg font-semibold text-white group-hover:underline">{product.category}</h3>
                <h3 className="text-lg font-semibold text-white group-hover:underline">{product.description}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
