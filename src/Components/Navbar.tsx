import React, { useEffect, useState, useRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPage from "../SignIn&SingUp/LoginPage";
import SignUpPage from "../SignIn&SingUp/SignUpPage";
import LoginIcon from "../assets/icons/login_14018816.png";
import TajirIcon from "../assets/icons/TajirIcon.png"
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const navigation = [
  { name: "Dashboard", type: "scroll", targetId: "home" },
  { name: "Categories", type: "scroll", targetId: "products" },
  { name: "Products", type: "route", path: "/productlist" },
  { name: "About Us", type: "route", path: "/about" },
  { name: "Contact Us", type: "scroll", targetId: "contact" },
];

export default function Navbar() {
  const { cart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pageNavigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleScroll = (id) => {
    setSidebarOpen(false);
    if (window.location.pathname !== "/") {
      pageNavigate("/", { state: { scrollToId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    pageNavigate("/");
    alert("Logged out successful!");
  };

  const handlecart = () => {
    pageNavigate("/cart");
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("accessToken", token);
    alert("Login successful!");
  };

  const sidebarVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setShowNavbar(currentY < 50 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`bg-[#F5ede5]  text-black font-serif fixed top-0 left-0 w-full z-50 h-14 xl:h-18  transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"} flex items-center justify-between px-8 py-4 shadow-lg shadow-gray-800/20 `}
      >
        {/* Sidebar Toggle */}
        <div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-white/10"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}

        {/* Logo */}
        <div>
          <img
            src={TajirIcon}
            alt="Tajir"
            className="h-20  xl:h-40 object-contain"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">

          <button
            className="rounded-full p-2 hover:bg-white/10 relative"
            onClick={handlecart}
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {isLoggedIn ? (
           <div className="flex items-center space-x-3">
  <img
    alt="User"
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    className="h-8 w-8 rounded-full"
  />
</div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-full p-2 hover:bg-white/10"
            >
              <img src={LoginIcon} alt="Login" className="h-8 w-8" />
            </button>
          )}
        </div >
      </nav >

      {
        sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Sidebar - placed first to be on the left */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-[85%] sm:w-[60%] lg:w-[35%] h-full bg-[#F5ede5]  text-black px-6 py-4 shadow-lg z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-black text-xl hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Links */}
              <motion.div
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {navigation.map((item) => (
                  <motion.div key={item.name} variants={linkVariants}>
                    {item.type === "scroll" ? (
                      <NavLink
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          handleScroll(item.targetId);
                        }}
                        className="text-lg font-medium text-gray-800 hover:text-amber-600 transition-all"
                      >
                        {item.name}
                      </NavLink>
                    ) : (
                      <NavLink
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className="text-lg font-medium text-gray-800 hover:text-amber-600 transition-all"
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-300" />

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-800 hover:text-red-500 text-md"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        setShowLoginModal(true);
                      }}
                      className="text-left text-gray-800 hover:text-blue-600 text-md"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        setShowSignupModal(true);
                      }}
                      className="text-left text-gray-800 hover:text-green-600 text-md"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Backdrop - placed second, behind sidebar */}
            <div
              className="flex-1 backdrop-blur-sm bg-black/40"
              onClick={() => setSidebarOpen(false)}
            ></div>
          </div>
        )
      }

      {/* Modals */}
      {
        showLoginModal && (
          <LoginPage
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={() => {
              setShowLoginModal(false);
              setTimeout(() => setShowSignupModal(true), 300);
            }}
            onLoginSuccess={handleLoginSuccess}
              onLoginError={(error) => alert(`Login failed: ${error.message}`)}

          />
        )
      }

      {
        showSignupModal && (
          <SignUpPage
            onClose={() => setShowSignupModal(false)}
            onSwitchToLogin={() => {
              setShowSignupModal(false);
              setTimeout(() => setShowLoginModal(true), 300);
            }}
            onSignupSuccess={handleLoginSuccess}
          />
        )
      }
    </>
  );
}