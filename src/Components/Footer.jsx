import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, margin: "-20% 0px" });

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
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-[#f7f1e8] to-[#e7d5c6] text-black font-serif"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg mb-4 font-bold text-black">Quick Links</h3>
          <ul className="space-y-2 text-black text-sm">
            {["Home", "Shop", "Contact", "FAQs"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-amber-600 transition duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg mb-4 font-bold text-black">Newsletter</h3>
          <p className="mb-3 text-black text-sm">
            Get updates on new arrivals & special offers
          </p>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-amber-600 transition"
            />
            <button className="mt-3 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-amber-600 transition">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg mb-4 font-bold text-black">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-amber-600 transition transform hover:scale-110">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-amber-600 transition transform hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-amber-600 transition transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-amber-600 transition transform hover:scale-110">
              <FaYoutube />
            </a>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg mb-4 font-bold text-black">Our Location</h3>
          <p className="mb-2 text-sm">Bhopal, Madhya Pradesh, India</p>
          <div className="w-full h-40 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.900028484!2d77.24107930146504!3d23.199323872014066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1753270344032!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>

      {/* Sliding Text */}
      <div className="bg-black py-3 overflow-hidden">
        <div className="animate-slide whitespace-nowrap text-sm text-center text-white font-medium tracking-wide">
          Thank you for supporting handmade. • Unique | Artistic | Sustainable • Made with ❤ for creative souls.
        </div>
      </div>
    </footer>
  );
}
