import React, { useRef } from "react";
import { motion, useScroll, useTransform, useAnimation  } from "framer-motion";
import { useState, useEffect } from "react";




const FloatingImage = ({ src, delay = 0 }) => {
  return (
    <motion.div
      className="h-577px w-460px overflow-hidden rounded-lg shadow-lg hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
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
      <img src={src} alt="" className="w-full h-full object-cover "/>
    </motion.div>
  );
};

// ⬇ Auto Slider with FloatingImage
const AutoImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const isResetting = useRef(false);

  // Clone the first image for seamless loop
  const extendedImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
   if (index === images.length) {
  isResetting.current = true;

  // Slide to the cloned first image
  controls.start({
    x: `-${index * 100}vw`,
    transition: { ease: "easeInOut", duration: 0.8 },
  }).then(() => {
    // Wait for a bit before resetting
    setTimeout(() => {
      controls.set({ x: "0vw" }); // instantly reset
      setIndex(1); // Start again smoothly from real first image
      isResetting.current = false;
    }, 1000); 
  });
} else if (!isResetting.current) {
      controls.start({
        x: `-${index * 100}vw`,
        transition: { ease: "easeInOut", duration: 0.8 },
      });
    }
  }, [index, controls, images.length]);

  return (
    <div className="relative w-full overflow-hidden mt-8">
      <motion.div
        className="flex"
        animate={controls}
        style={{ width: `${extendedImages.length * 100}vw` }}
      >
        {extendedImages.map((src, i) => (
          <div
            key={i}
            className=" flex items-center justify-center"
            style={{ width: "100vw" }}
          >
            <FloatingImage src={src} delay={0} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Scroll-Animated Text Component
const ScrollAnimatedText = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 3], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.8, 1], [1, 0.5, 0.5]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="max-w-lg p-10 bg-white !text-black mb-10 font-serif">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl drop-shadow-lg">
        Summer styles are finally here
      </h1>
      <p className="mt-4 text-xl text-black drop-shadow-sm">
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
    // "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg",
    // "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg",
    // "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg",
  ];

  const columns = [
    images.slice(0, 2),
    images.slice(2, 5),
    images.slice(5, 7),
  ];

  return (
    <>
     <div className="relative overflow-hidden bg-white sm:p-10 lg:p-8 text-black">
  <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-center">

    <div className="relative flex flex-col items-center justify-center bg-white sm:px-8 lg:px-10 w-full">

     
<div className="lg:hidden w-full flex flex-col items-center justify-center">
  <AutoImageSlider images={images} />
  <ScrollAnimatedText />
</div>


      {/* 👇 DESKTOP FLOATING LAYOUT 👇 */}
      <div className="hidden lg:flex flex-col items-center justify-center w-full">
        {/* Top Row - reversed */}
        <div className="flex gap-6 flex-row-reverse mb-8">
          <FloatingImage src={images[0]} delay={0} />
          <FloatingImage src={images[1]} delay={0.2} />
        </div>

        {/* Middle Row - Side Images + Text */}
        <div className="flex flex-row items-center justify-center gap-12 text-center m-5">
          <FloatingImage src={images[2]} delay={0.4} />
          <ScrollAnimatedText />
          <FloatingImage src={images[3]} delay={0.6} />
        </div>
      </div>

    </div>
  </div>
</div>

    </>
  );
};

export default Home;
