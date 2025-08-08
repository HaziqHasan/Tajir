import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../Api/Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mostSelling, setMostSelling] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/products/`);
        const sliced = res.data.slice(0, 6); // Change number as needed
        setSlides(sliced);
      } catch (err) {
        console.error("Failed to fetch slide data", err);
      }
    };

    const fetchMostSelling = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/products/`);
        const topSelling = res.data.slice(-3); // Pick last 4 items as example
        setMostSelling(topSelling);
      } catch (err) {
        console.error("Failed to fetch most selling products", err);
      }
    };

    fetchSlides();
    fetchMostSelling();
  }, []);

  const settingsMobile = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_index, newIndex) => setCurrentSlide(newIndex),
  };

  const settingsDesktop = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_index, newIndex) => setCurrentSlide(newIndex),
  };

  if (slides.length === 0) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <Slider {...settingsMobile}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-[90vh] relative">
              <motion.img
                src={slide.images?.[0]?.image_url || "/placeholder.png"}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 text-white">
                <motion.h2
                  className="text-xl sm:text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-white sm:text-lg italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  "{slide.description}"
                </motion.p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <Slider {...settingsDesktop}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-[90vh] relative px-2 lg:pt-20">
              <motion.img
                src={slide.images?.[0]?.image_url || "/placeholder.png"}
                alt={slide.name}
                className="w-full h-full object-cover rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-[#F5ede5] via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <motion.h2
                  className="text-xl sm:text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {slide.name}
                </motion.h2>
                <motion.p
                  className="text-white sm:text-lg italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  "{slide.description}"
                </motion.p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Text Below Images */}
      <div className="max-w-5xl mx-auto py-10 px-4 text-center">
        <h3 className="text-2xl font-semibold text-black mb-4">
          Discover the World of Arts & Crafts
        </h3>
        <p className="text-black mb-2 text-xl">
          Our handmade collection is inspired by the beauty of tradition and the
          creativity of modern design.
        </p>
        <p className="text-black mb-2 text-xl">
          Every piece tells a story — crafted with passion, precision, and
          purpose.
        </p>
        <p className="text-black text-xl">
          Explore a range of unique wall art, calligraphy, and custom
          showpieces.
        </p>
      </div>

      {/* Most Selling Products Section */}
      <div className="max-w-7xl mx-auto px-4 pb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">
          Most Selling Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {mostSelling.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/productpage/${product.id}`)}
              className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <img
                src={product.images?.[0]?.image_url || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="flex flex-col items-center gap-1 px-2 text-center">
                <h3 className="text-xl font-semibold text-black">
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
                  className="mb-2 bg-[#F5ede5]  text-black px-4 py-1 rounded-lg hover:bg-[#F5ede5] transition-all"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
