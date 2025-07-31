import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPage from "../SignIn&SingUp/LoginPage";
import SignUpPage from "../SignIn&SingUp/SignUpPage";
import LoginIcon from "../assets/icons/login_14018816.png";
const navigation = [
  { name: "Dashboard", targetId: "home" },
  { name: "Products", targetId: "products" },
  { name: "About Us", targetId: "about" },
  { name: "Contact Us", targetId: "contact" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const pageNavigate = useNavigate();

  useEffect(() => {
    // initial setup
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setIsMobile(window.innerWidth < 640);

    // handlers
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true); // always show at top
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    // attach listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (id) => {
    if (window.location.pathname !== "/") {
      pageNavigate("/", { state: { scrollToId: id } });
      setDrawerOpen(false);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    pageNavigate("/");
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  return (
    <>
      {/* <Disclosure as="nav" className="bg-black font-serif text-white"> */}
      <Disclosure
        as="nav"
        className={`bg-black font-serif text-white fixed w-full z-50 transition-transform duration-300  ${
          showNavbar ? "translate-y-0" : "-translate-y-full "
        }`}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center sm:space-x-6 space-x-3">
                  <div className="sm:hidden">
                    <Disclosure>
                      {({ open }) => (
                        <div className="sm:hidden">
                          <Disclosure.Button
                            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => {
                              // Disclosure.Button will toggle its internal open state automatically.
                              // Mirror that to the drawer state:
                              if (!open) {
                                setDrawerOpen(true); // opening
                              } else {
                                setDrawerOpen(false); // closing
                              }
                            }}
                            aria-label={open ? "Close menu" : "Open menu"}
                          >
                            {open ? (
                              <XMarkIcon className="block h-6 w-6" />
                            ) : (
                              <Bars3Icon className="block h-6 w-6" />
                            )}
                          </Disclosure.Button>
                        </div>
                      )}
                    </Disclosure>
                  </div>
                  <div className="hidden sm:flex space-x-6">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href || "#"}
                        onClick={(e) => {
                          if (item.targetId) {
                            e.preventDefault(); // avoid full navigation if we're just scrolling
                            handleScroll(item.targetId);
                            // if you still want the URL to reflect href, push it:
                            if (item.href) {
                              window.history.pushState(null, "", item.href);
                            }
                          }
                        }}
                        className={({ isActive }) =>
                          `text-sm font-light tracking-wide transition-colors duration-200 ${
                            isActive
                              ? "text-white"
                              : "text-white hover:text-amber-400"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <span className="text-2xl font-bold tracking-wider font-serif text-white">
                    <i>Tajir</i>
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {!isMobile && (
                    <button className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}

                  {isLoggedIn ? (
                    !isMobile ? (
                      <>
                        <NavLink
                          to="/cart"
                          className="text-sm text-white hover:text-amber-400"
                        >
                          Cart
                        </NavLink>
                        <NavLink
                          to="/wishlist"
                          className="text-sm text-white hover:text-amber-400"
                        >
                          Wishlist
                        </NavLink>
                        <Menu as="div" className="relative">
                          <MenuButton className="flex rounded-full bg-white/10 text-sm focus:outline-none">
                            <img
                              alt="User"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              className="h-8 w-8 rounded-full"
                            />
                          </MenuButton>
                          <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 z-50">
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
                      </>
                    ) : null
                  ) : (
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="rounded-full p-2 hover:bg-white/10 focus:outline-none"
                    >
                      <img src={LoginIcon} alt="Login" className="h-18 w-18" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden px-4 pb-4 pt-2">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `block text-sm ${
                        isActive
                          ? "text-amber-400"
                          : "text-white hover:text-amber-400"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

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
