// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import { motion } from "framer-motion";
// import axios from "axios";
// import API_BASE_URL from "../Api/Api";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ArtInfo = () => {
//   const [slides, setSlides] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}api/products/`);
//         const sliced = res.data.slice(0, 3); // You can increase this number
//         setSlides(sliced);
//       } catch (err) {
//         console.error("Failed to fetch slide data", err);
//       }
//     };

//     fetchSlides();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     beforeChange: (_index, newIndex) => setCurrentSlide(newIndex),
//   };

//   if (slides.length === 0) {
//     return <p className="text-center py-10 text-gray-500">Loading...</p>;
//   }

//   return (
//     <div className="overflow-x-hidden w-full">
//       <div className="flex justify-center items-center bg-white text-black py-10 px-4 md:px-0">
//         <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-6">

//           {/* Image on Left (Mobile Overlay) */}
//           <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] order-2 md:order-1 rounded-lg overflow-hidden">
//             <motion.img
//               key={currentSlide}
//               src={slides[currentSlide].images?.[0]?.image_url || "/placeholder.png"}
//               alt={slides[currentSlide].title}
//               className="w-full h-full object-cover"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               transition={{ duration: 0.5 }}
//             />

//             {/* Mobile Overlay Text */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 text-white md:hidden">
//               <motion.h2
//                 className="text-lg sm:text-xl font-semibold mb-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {slides[currentSlide].title}
//               </motion.h2>

//               <motion.p
//                 className="text-white sm:text-base italic"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 "{slides[currentSlide].description}"
//               </motion.p>
//             </div>
//           </div>

//           {/* Desktop Text on Right */}
//           <div className="w-full md:w-1/2 text-center md:text-left flex-col justify-center order-1 md:order-2 hidden md:flex">
//             <motion.h2
//               className="text-2xl sm:text-3xl font-bold mb-4 text-black"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {slides[currentSlide].title}
//             </motion.h2>

//             <motion.p
//               className="text-black text-base sm:text-lg italic"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               "{slides[currentSlide].description}"
//             </motion.p>

//             {/* Hidden slider (just used for auto slide change) */}
//             <div className="w-full mt-6">
//               <Slider {...settings}>
//                 {slides.map((_, index) => (
//                   <div key={index}></div>
//                 ))}
//               </Slider>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtInfo;

import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArtInfo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    data: slides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["limitedProducts"],
    queryFn: () => getProducts(5),
    // staleTime: 5 * 60 * 1000, // 5 min cache
    staleTime: 0,
    cacheTime: 0, // cache store na kare
    refetchOnWindowFocus: true, // window refocus par refetch kare
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_index, newIndex) => setCurrentSlide(newIndex),
  };

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load products</p>
    );
  }

  return (
    <div className="overflow-x-hidden w-full">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Featured Art Pieces</title>
        <meta
          name="description"
          content="Explore our featured art products and their stories."
        />
      </Helmet>

      <div className="flex justify-center items-center bg-white text-black py-10 px-4 md:px-0">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-6">
          {/* Image on Left (Mobile Overlay) */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] order-2 md:order-1 rounded-lg overflow-hidden">
            <motion.img
              key={currentSlide}
              src={
                slides[currentSlide]?.images?.[0]?.image_url ||
                "/placeholder.png"
              }
              alt={slides[currentSlide]?.title || "Art Piece"}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            />

            {/* Mobile Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 text-white md:hidden">
              <motion.h2
                className="text-lg sm:text-xl font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {slides[currentSlide]?.title}
              </motion.h2>

              <motion.p
                className="text-white sm:text-base italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                "{slides[currentSlide]?.description}"
              </motion.p>
            </div>
          </div>

          {/* Desktop Text on Right */}
          <div className="w-full md:w-1/2 text-center md:text-left flex-col justify-center order-1 md:order-2 hidden md:flex">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-4 text-black"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {slides[currentSlide]?.title}
            </motion.h2>

            <motion.p
              className="text-black text-base sm:text-lg italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              "{slides[currentSlide]?.description}"
            </motion.p>

            {/* Hidden slider (for auto change) */}
            <div className="w-full mt-6">
              <Slider {...settings}>
                {slides.map((_, index) => (
                  <div key={index}></div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtInfo;
