import React from "react";import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20% 0px" });

  // Variants for stagger animation
  const container = {
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      ref={sectionRef}
      className="bg-[#F5ede5]  text-black p-10 flex flex-col items-center text-center font-sans"
    >
      <motion.div
        className="max-w-4xl"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* Heading */}
        <motion.h1
          className="text-5xl font-extrabold mb-8 tracking-wide font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
          variants={fadeUp}
        >
          About ArtCraft
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-black mb-10 font-light"
          variants={fadeUp}
        >
          At <span className="text-pink-400 font-serif">ArtCraft</span>, creativity meets craftsmanship. Explore one-of-a-kind handmade pieces crafted with heart and soul by talented local artists.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full mb-12 mx-auto"
          variants={fadeUp}
        />

        {/* Our Journey Section */}
        <motion.h2
          className="text-3xl font-bold text-black font-serif mb-4"
          variants={fadeUp}
        >
          Our Journey
        </motion.h2>

        <motion.p className="text-md leading-relaxed mb-4" variants={fadeUp}>
          Launched in 2025 with a dream to support artisans, ArtCraft began with a handful of handpicked treasures. Today, we’re a growing family of creators and supporters.
        </motion.p>

        <motion.p className="text-md leading-relaxed" variants={fadeUp}>
          By choosing ArtCraft, you're not just buying art — you're preserving tradition, empowering talent, and embracing individuality. Let's keep creativity alive, together.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
