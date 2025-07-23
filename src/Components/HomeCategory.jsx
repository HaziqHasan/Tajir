import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import API_BASE_URL from "../Api/Api";
import "swiper/css";
import "swiper/css/navigation";
import "../SwiperCustom.css";


export default function HomeCategory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories/`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleClick = (product) => {
    navigate(`/allproducts/${product.id}`, { state: { product } });
  };

const ensureMinSlides = (items, minCount = 6) => {
  if (!items || items.length === 0) return []; // prevent infinite loop
  let result = [...items];
  while (result.length < minCount) {
    result = [...result, ...items];
    if (result.length > 20) break; // safety break
  }
  return result.slice(0, minCount);
};

const displayedProducts = ensureMinSlides(products, 6);


  
  return (
    <div className="min-100% pb-10 bg-white font-serif">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-4xl font-bold tracking-wide text-center text-black">
          Explore Our Collection
        </h2>

       <div className="relative">
  {/* Custom Navigation Buttons */}
  <div className="swiper-button-prev custom-prev"></div>
  <div className="swiper-button-next custom-next"></div>

<Swiper
  modules={[Navigation]}
  navigation={{
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  }}
  centeredSlides={true}
 loop={displayedProducts.length > 1}   grabCursor={true}
  spaceBetween={30}
  slidesPerView={1.2}
  breakpoints={{
    640: { slidesPerView: 1.5 },
    768: { slidesPerView: 2.2 },
    1024: { slidesPerView: 2.8 },
    1280: { slidesPerView: 3.2 },
  }}
  className="custom-swiper"
>
  {displayedProducts.map((product, index) => (
    <SwiperSlide key={`${product.id}-${index}`}>
      <div
        onClick={() => handleClick(product)}
        className="card w-full h-full group cursor-pointer rounded-2xl bg-white p-4 shadow-xl transition-all duration-300"
      >
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-40 object-cover mb-2 rounded-lg shadow-md"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-black group-hover:underline">
            {product.name}
          </h3>
          <p className="text-sm text-black">{product.description}</p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


</div>

      </div>
    </div>
  );
}
