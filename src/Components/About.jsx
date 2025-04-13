import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r text-3xl font-thin from-black via-gray-500 to-gray-100 text-white shadow-lg p-10 flex flex-col items-center text-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="max-w-3xl text-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        At ArtCraft, we believe in the power of creativity. Our platform showcases unique, handmade items crafted with passion and precision by local artisans. We are dedicated to bringing you authentic, quality products that tell a story.
      </motion.p>

      <motion.div
        className="max-w-4xl text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
        <p className="text-md">
          Founded in 2025, ArtCraft started with a simple vision: to connect artists and craft lovers in a meaningful way. We began with a small collection of handpicked items and have grown into a thriving community of creatives. Whether you're searching for a gift or a personal treasure, you're supporting artists with every purchase.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;