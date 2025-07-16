import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Products', href: '/products', current: false },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Cart', href: '/cart', current: false },
]


export default function Navbar() {
  const pageNavigate = useNavigate()

const handleLogout = ()=>{
    pageNavigate("/login")
  }
  return (
    <Disclosure as="nav" className="bg-black text-white shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              {/* Left: Navigation links */}
              <div className="flex items-center sm:space-x-6 space-x-3">
                <div className="sm:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>

                <div className="hidden sm:flex space-x-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-amber-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Center: Brand */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <span className="text-2xl font-bold tracking-wider font-serif text-white">
                  <i>Tajir</i>
                </span>
              </div>

              {/* Right: Profile and Bell */}
              <div className="flex items-center space-x-3">
                <button className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                    <img
                      alt="User"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <MenuItem>
                      {({ active }) => (
                        <a href="#" className={`block px-4 py-2 text-sm ${active && 'bg-gray-100'}`}>
                          Your Profile
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a href="#" className={`block px-4 py-2 text-sm ${active && 'bg-gray-100'}`}>
                          Settings
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left block px-4 py-2 text-sm ${active && 'bg-gray-100'}`}
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

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden px-4 pb-4 pt-2">
            <div className="space-y-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block text-white hover:text-amber-400 transition"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>

  )
}
