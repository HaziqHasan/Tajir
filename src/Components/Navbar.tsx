import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../SignIn&SingUp/LoginPage";
import LoginIcon from "../assets/icons/login_14018816.png";
import SignUpPage from "../SignIn&SingUp/SignUpPage";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Cart", href: "/cart" },
];

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const pageNavigate = useNavigate();
  // const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    pageNavigate("/login");
  };

  return (
    <>
      <Disclosure as="nav" className="bg-black font-serif text-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center sm:space-x-6 space-x-3">
                  <div className="sm:hidden">
                    <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" />
                      )}
                    </DisclosureButton>
                  </div>
                  <div className="hidden sm:flex space-x-6">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `text-sm font-light tracking-wide transition-colors duration-200 ${
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
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <span className="text-2xl font-bold tracking-wider font-serif text-white">
                    <i>Tajir</i>
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    onClick={() => setShowLoginModal(true)} // ✅ only opens login
                    className="rounded-full p-2 hover:bg-white/10 focus:outline-none"
                  >
                    <img src={LoginIcon} alt="Login" className="h-18 w-18" />
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
                          <NavLink
                            to="/settings"
                            className={`block px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Settings
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
                </div>
              </div>
            </div>

            {/* Mobile nav */}
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
