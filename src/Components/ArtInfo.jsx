import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArtInfo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Starry Night",
      description:
        "A depiction of the view from the east-facing window of Van Gogh's asylum room.",
      images: [
        {
          image_url:
            "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg",
        },
      ],
    },
    {
      id: 2,
      title: "The Persistence of Memory",
      description:
        "Salvador Dalí's iconic melting clocks symbolizing the relativity of time.",
      images: [
        {
          image_url:
            "https://images.pexels.com/photos/33173985/pexels-photo-33173985.jpeg",
        },
      ],
    },
    {
      id: 3,
      title: "The Scream",
      description: "An expression of existential dread by Edvard Munch.",
      images: [
        {
          image_url:
            "https://images.pexels.com/photos/9324883/pexels-photo-9324883.jpeg",
        },
      ],
    },
  ];

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

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2] text-[#1f2937] py-10 px-4 md:px-0 mb-35">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-center gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] overflow-visible order-2 md:order-1">
          {/* <div className="w-full md:w-1/2 order-1 md:order-1 h-[300px] sm:h-[400px] md:h-[500px] md:h-[665px]"> */}
          <motion.img
            key={currentSlide}
            src={
              slides[currentSlide].images[0]?.image_url || "/placeholder.png"
            }
            alt={slides[currentSlide].title}
            className="w-full md:w-[611px] h-full md:h-[665px] object-cover rounded-lg shadow-lg border-4 border-[#4b5563] md:border-[#000000]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 text-center flex flex-col justify-center order-2 md:order-2">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4 text-[#111827]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slides[currentSlide].title}
          </motion.h2>

          <motion.p
            className="text-[#374151] text-base sm:text-lg italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            "{slides[currentSlide].description}"
          </motion.p>

          {/* Slider Navigation */}
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
  );
};

export default ArtInfo;
