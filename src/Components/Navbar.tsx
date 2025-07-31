import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  Transition,
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPage from "../SignIn&SingUp/LoginPage";
import SignUpPage from "../SignIn&SingUp/SignUpPage";

const navigation = [
  { name: "Dashboard", targetId: "home" },
  { name: "Products", targetId: "products" },
  { name: "About Us", targetId: "about" },
  { name: "Contact Us", targetId: "contact" },
];


export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pageNavigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const handleLogout = () => {
    pageNavigate("/login");
  };

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



  useEffect(() => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <Disclosure
        as="nav"
        className={`bg-black font-serif text-white fixed w-full z-50 transition-transform duration-300  ${showNavbar ? "translate-y-0" : "-translate-y-full "
          }`}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center sm:space-x-6 space-x-3">
                  <div className="sm:hidden">
                    <button
                      className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none"
                      onClick={() => setDrawerOpen(true)}
                    >
                      <Bars3Icon className="block h-6 w-6" />
                    </button>
                  </div>
                  <div className="hidden sm:flex space-x-6">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleScroll(item.targetId)}
                        className="text-sm font-light tracking-wide text-white hover:text-amber-400 transition-colors duration-200"
                      >
                        {item.name}
                      </button>

                    ))}
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <span className="text-2xl font-bold tracking-wider font-serif text-white">
                    <i>Tajir</i>
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="rounded-full p-2 hover:bg-white/10 focus:outline-none">
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="rounded-full p-2 hover:bg-white/10 focus:outline-none"
                  >
                    <img src="https://www.google.com/imgres?q=login%20image&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190919%2Fourmid%2Fpngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1742031.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Flogin&docid=_XtCt7g8_zv5yM&tbnid=2h-FzyrHbO0Y-M&vet=12ahUKEwjf0NfIl9OOAxWHXmwGHdT0JgoQM3oECB4QAA..i&w=360&h=360&hcb=2&ved=2ahUKEwjf0NfIl9OOAxWHXmwGHdT0JgoQM3oECB4QAA" alt="Login" className="h-6 w-6" />
                  </button>

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
                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                          >
                            Your Profile
                          </NavLink>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <NavLink
                            to="/settings"
                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                          >
                            Settings
                          </NavLink>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>

            {/* Right Drawer */}
            <Transition show={drawerOpen} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={() => setDrawerOpen(false)}>
                {/* Overlay */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                {/* Drawer */}
                {/* Drawer (50% height, top positioned) */}
                <div className="fixed inset-0 overflow-hidden z-50 text-white">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-x-0 top-0 flex justify-center">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500"
                        enterFrom="-translate-y-full"
                        enterTo="translate-y-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-y-0"
                        leaveTo="-translate-y-full"
                      >
                        <Dialog.Panel className="pointer-events-auto w-full max-w-md h-1/2 bg-black text-white shadow-xl p-6 z-50 font-serif font-bold rounded-b-2xl">
                          <div className="flex flex-col gap-6">
                            {navigation.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleScroll(item.targetId)}
                                className="text-lg text-left font-medium text-white hover:text-amber-400 transition duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>


              </Dialog>

            </Transition>
          </>
        )}
      </Disclosure>

      {/* Show Modal */}
      {showLoginModal && (
        <LoginPage
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setTimeout(() => setShowSignupModal(true), 300);
          }}
        />
      )}

      {showSignupModal && (
        <SignUpPage
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setTimeout(() => setShowLoginModal(true), 300);
          }}
        />
      )}
    </>
  );
}
