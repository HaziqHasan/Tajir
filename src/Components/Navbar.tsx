// ✅ We are using global cart context here to show total quantity in the navbar cart icon badge

import React, { useEffect, useState, useRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPage from "../SignIn&SingUp/LoginPage";
import SignUpPage from "../SignIn&SingUp/SignUpPage";
import LoginIcon from "../assets/icons/login_14018816.png";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

type ScrollNavItem = {
  name: string;
  type: "scroll";
  targetId: string;
};

type RouteNavItem = {
  name: string;
  type: "route";
  path: string;
};

type NavItem = ScrollNavItem | RouteNavItem;

const navigation: NavItem[] = [
  { name: "Dashboard", type: "scroll", targetId: "home" },
  { name: "Categories", type: "scroll", targetId: "products" },
  { name: "Contact Us", type: "scroll", targetId: "contact" },
  { name: "Products", type: "route", path: "/productlist" },
  { name: "About Us", type: "route", path: "/about" },
];

export default function Navbar() {
  const { cart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const pageNavigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(
        currentScrollY < 50 || currentScrollY < lastScrollY.current
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  };
  const handlecart = () => {
    pageNavigate("/cart");
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const sidebarVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`bg-black text-white font-serif fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } flex items-center justify-between px-6 py-2`}
      >
        {/* Sidebar toggle button (for mobile) */}
        <div className="sm:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-white/10"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links (hidden on small screens) */}
        <div className="hidden sm:flex space-x-6">
          {navigation.map((item) =>
            item.type === "scroll" ? (
              <NavLink
                key={item.name}
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.targetId);
                }}
                className="text-sm font-light hover:text-amber-400 transition-colors"
              >
                {item.name}
              </NavLink>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className="text-sm font-light hover:text-amber-400 transition-colors"
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider text-white">
          <i>Tajir</i>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-3">
          <button className="rounded-full p-2 hover:bg-white/10">
            <BellIcon className="h-6 w-6" />
          </button>
          <button
            className="rounded-full p-2 hover:bg-white/10 relative"
            onClick={handlecart}
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <Menu as="div" className="relative">
              <MenuButton className="rounded-full bg-white/10">
                <img
                  alt="User"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  className="h-8 w-8 rounded-full"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/profile"
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Your Profile
                    </NavLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Sign out
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-full p-2 hover:bg-white/10"
            >
              <img src={LoginIcon} alt="Login" className="h-8 w-8" />
            </button>
          )}
        </div>
      </nav>

      {/* Slide-in Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 sm:hidden flex flex-row">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 h-full bg-black text-white px-4 shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded"
              >
                ✕
              </button>
            </div>

            {/* Animated Links */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              {navigation.map((item, index) => (
                <motion.div key={item.name} variants={linkVariants}>
                  {item.type === "scroll" ? (
                    <NavLink
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(item.targetId);
                        setSidebarOpen(false);
                      }}
                      className="flex gap-1 text-sm font-light hover:text-amber-400 transition-colors"
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className="flex gap-1 text-sm font-light hover:text-amber-400 transition-colors"
                    >
                      {item.name}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Login / Logout */}
            <div className="pt-4 border-t border-white/20 mt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm hover:text-amber-400"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full text-left text-sm hover:text-amber-400"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* LOGIN / SIGNUP MODALS */}
      {showLoginModal && (
        <LoginPage
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setTimeout(() => setShowSignupModal(true), 300);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showSignupModal && (
        <SignUpPage
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setTimeout(() => setShowLoginModal(true), 300);
          }}
          onSignupSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
