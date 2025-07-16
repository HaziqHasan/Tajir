import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center text-center font-sans">
      {/* Heading */}
      <motion.h1
        className="text-5xl font-extrabold mb-8 tracking-wide font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About ArtCraft
      </motion.h1>

      {/* Description */}
      <motion.p
        className="max-w-3xl text-lg md:text-xl text-gray-300 mb-10 font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        At <span className="text-pink-400 font-semibold">ArtCraft</span>, creativity meets craftsmanship. Explore one-of-a-kind handmade pieces crafted with heart and soul by talented local artists. Our mission is to bring you closer to authenticity and timeless beauty.
      </motion.p>

      {/* Animated Divider */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full mb-12"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      />

      {/* Our Journey Section */}
      <motion.div
        className="max-w-4xl text-left text-gray-200 space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-white font-serif mb-2">Our Journey</h2>
        <p className="text-md leading-relaxed">
          Launched in 2025 with a dream to support artisans, ArtCraft began with a handful of handpicked treasures. Today, we’re a growing family of creators and supporters. Every product you see here carries the story of someone’s imagination and hard work.
        </p>
        <p className="text-md leading-relaxed">
          By choosing ArtCraft, you're not just buying art — you're preserving tradition, empowering talent, and embracing individuality. Let's keep creativity alive, together.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
