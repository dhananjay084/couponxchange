"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FullLogo from "../assets/full-logo.png";
import Logo from "../assets/cx-logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // hamburger icon

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Stores", href: "/stores" },
    { name: "Categories", href: "/categories" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#181717] shadow-md py-2" : "bg-black py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="transition-all duration-500">
          <Link href="/">
            {isScrolled ? (
              <Image src={Logo} alt="Scrolled Logo" width={120} height={40} />
            ) : (
              <Image src={FullLogo} alt="Default Logo" width={140} height={50} />
            )}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <span
                className={`relative text-sm font-medium tracking-wide cursor-pointer transition-colors group ${
                  isScrolled ? "text-white" : "text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-white" : "bg-[#181717]"
                  }`}
                ></span>
              </span>
            </Link>
          ))}

          {/* Newsletter CTA */}
          <Link href="/newsletter">
            <button
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:shadow-lg hover:scale-105"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Newsletter
            </button>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`text-2xl transition-colors ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden w-full px-6 pb-4 transition-all duration-300 ${
            isScrolled ? "bg-[#181717]" : "bg-black"
          }`}
        >
          <div className="flex flex-col gap-4 mt-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-sm font-medium ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link href="/newsletter" onClick={() => setIsMobileMenuOpen(false)}>
              <button
                className={`w-full px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:shadow-lg hover:scale-105"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Newsletter
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
