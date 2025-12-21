'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/full-logo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Stores', href: '/stores' },
    { name: 'Categories', href: '/category' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Deals', href: '/deals/:id' },
    { name: 'Category', href: '/category/:id' },
  ];

  const adminLinks = [
    { name: 'Add Deals', href: '/admin/deals' },
    { name: 'Add Store', href: '/admin/store' },
    { name: 'Add Category', href: '/admin/category' },
    { name: 'Add Blogs', href: '/admin/blog' },


  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#181717] border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-10">
            <Link href="/">
              <Image src={Logo} alt="Logo" width={140} height={50} />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 relative">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="relative text-sm font-medium tracking-wide cursor-pointer text-white group">
                    {link.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:w-full bg-white"></span>
                  </span>
                </Link>
              ))}

              {/* ADMIN DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-white hover:text-gray-200"
                >
                  Admin <IoChevronDownOutline className="mt-[1px]" />
                </button>

                {isAdminDropdownOpen && (
                  <div className="absolute top-8 left-0 bg-white text-black rounded-md shadow-lg w-40 z-50 overflow-hidden">
                    {adminLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        onClick={() => setIsAdminDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Search + Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search store"
                className="w-full bg-transparent border border-white/30 text-white text-sm pl-10 pr-4 py-2 rounded-full placeholder-white/70 focus:outline-none"
              />
              <FiSearch className="absolute top-2.5 left-3 text-white/70 text-lg" />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300"
            >
              Submit Coupon
            </button>
            <Link href="/login">
              <button className="cursor-pointer bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300">
                Login / Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl text-white"
            >
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full px-6 pb-6 bg-black border-t border-white/10">
            <div className="flex flex-col gap-4 mt-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* ADMIN DROPDOWN MOBILE */}
              <div>
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className="flex items-center justify-between text-sm font-medium text-white w-full"
                >
                  Admin
                  <IoChevronDownOutline
                    className={`transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isAdminDropdownOpen && (
                  <div className="mt-2 flex flex-col gap-2 pl-4">
                    {adminLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-gray-300 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search store"
                  className="w-full bg-transparent border border-white/30 text-white text-sm pl-10 pr-4 py-2 rounded-full placeholder-white/70 focus:outline-none "
                />
                <FiSearch className="absolute top-2.5 left-3 text-white/70 text-lg" />
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300"
              >
                Submit Coupon
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submit a Coupon</h2>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Store name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Coupon code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              />
              <textarea
                placeholder="Description (optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
              >
                Submit Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
