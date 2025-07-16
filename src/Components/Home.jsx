import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Floating Image Component
const FloatingImage = ({ src, delay = 0 }) => {
  return (
    <motion.div
      className="h-64 w-44 overflow-hidden rounded-lg shadow-lg"
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        x: [0, 10, -10, 0],
        y: [0, -10, 10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
};

// Scroll-Animated Text Component
const ScrollAnimatedText = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 10], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.3, 0]);

  return (
    <motion.div ref={ref} style={{ x, opacity }} className="max-w-lg z-10">
      <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
        Summer styles are finally here
      </h1>
      <p className="mt-4 text-xl text-black">
        Discover our brand new summer collection, designed to turn heads and keep you cool under pressure.
      </p>
      <a
        href="/products"
        className="inline-block mt-8 rounded-md border border-black bg-black px-8 py-3 text-center font-semibold text-white transition hover:bg-gray-900"
      >
        Shop Collection
      </a>
    </motion.div>
  );
};

const Home = () => {
  const images = [
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg",
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg",
  ];

  const columns = [
    images.slice(0, 2),
    images.slice(2, 5),
    images.slice(5, 7),
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left: Scroll Animated Text */}
          <ScrollAnimatedText />

          {/* Right: Floating Images */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {columns.map((colImages, colIndex) => (
              <div
                key={colIndex}
                className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
              >
                {colImages.map((img, i) => (
                  <FloatingImage
                    key={img}
                    src={img}
                    delay={(colIndex + i) * 0.4}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
