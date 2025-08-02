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
 <div className="overflow-x-hidden w-full ">
  <div className="flex justify-center items-center bg-white text-black py-10 px-4 md:px-0 mb-45">
    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-6">

      {/* Image with Text Overlay on Mobile */}
      <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] order-2 md:order-1 rounded-lg overflow-hidden">
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].images[0]?.image_url || "/placeholder.png"}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        />

        {/* Mobile Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 text-white md:hidden">
          <motion.h2
            className="text-lg sm:text-xl font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slides[currentSlide].title}
          </motion.h2>

          <motion.p
            className="text-white sm:text-base italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            "{slides[currentSlide].description}"
          </motion.p>
        </div>
      </div>

      {/* Desktop Text on Right Side */}
      <div className="w-full md:w-1/2 text-center md:text-left  flex-col justify-center order-1 md:order-2 hidden md:flex">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-4 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {slides[currentSlide].title}
        </motion.h2>

        <motion.p
          className="text-black text-base sm:text-lg italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          "{slides[currentSlide].description}"
        </motion.p>

        {/* Optional Slider (or CTA) */}
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
