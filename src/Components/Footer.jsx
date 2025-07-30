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
            className="bg-black text-white border-t border-gray-700 font-bold italic"
        >
            <motion.div
                className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm"
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                {/* Quick Links */}
                <motion.div variants={fadeUp}>
                    <h3 className="text-lg mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-white">
                        <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
                        <li><a href="#" className="hover:text-gray-300 transition">Shop</a></li>
                        <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
                        <li><a href="#" className="hover:text-gray-300 transition">FAQs</a></li>
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div variants={fadeUp}>
                    <h3 className="text-lg mb-3">Newsletter</h3>
                    <p className="mb-2 text-white">Get updates on new arrivals & special offers</p>
                    <input
                        type="email"
                        placeholder="Your email"
                        className="px-3 py-2 w-full border border-gray-500 rounded outline-none focus:ring-2 focus:ring-white bg-black text-white"
                    />
                    <button className="mt-2 w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition">Subscribe</button>
                </motion.div>

                {/* Socials */}
                <motion.div variants={fadeUp}>
                    <h3 className="text-lg mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl text-white">
                        <a href="#"><FaInstagram className="hover:text-gray-300 transition" /></a>
                        <a href="#"><FaFacebookF className="hover:text-gray-300 transition" /></a>
                        <a href="#"><FaTwitter className="hover:text-gray-300 transition" /></a>
                        <a href="#"><FaYoutube className="hover:text-gray-300 transition" /></a>
                    </div>
                </motion.div>

                {/* Location */}
                <motion.div variants={fadeUp}>
                    <h3 className="text-lg mb-3">Our Location</h3>
                    <p className="mb-2 text-white">
                        Bhopal, Madhya Pradesh, India
                    </p>
                    <div className="w-full h-40 rounded overflow-hidden border border-gray-500">
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

            {/* Sliding text animation */}
            <div className="overflow-hidden border-t border-gray-700">
                <div className="whitespace-nowrap animate-slide px-4 py-2 text-sm text-center text-white">
                    Thank you for supporting handmade. • Unique | Artistic | Sustainable • Made with ❤️ for creative souls.
                </div>
            </div>
        </footer>
    );
}
