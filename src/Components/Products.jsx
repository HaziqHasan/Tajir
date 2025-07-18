import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import API_BASE_URL from '../Api/Api'
import "swiper/css";
import "swiper/css/navigation";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/`);
        setProducts(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, []);



  const handleClick = (product) => {
    navigate(`/productpage/${product.id}`, { state: { product } });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-4xl font-bold tracking-wide text-center text-gray-600">
          Explore Our Collection
        </h2>

        <Swiper
          modules={[Navigation]}
          navigation
          loop={false}
          grabCursor
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => handleClick(product)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={product.images[0]?.image_url}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-2 rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-4 space-y-1 text-center">
                  <h3 className="text-lg font-semibold text-gray-600 group-hover:underline">{product.name}</h3>
                  <p className="text-md font-medium text-gray-600">₹{product.price}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
