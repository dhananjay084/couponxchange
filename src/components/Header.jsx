"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ Add this
import FullLogo from "../assets/full-logo.png";
import Logo from "../assets/cx-logo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-black py-4"
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

        {/* Nav Links */}
        <nav className="flex items-center gap-8">
          {[
            { name: "Stores", href: "/stores" },
            { name: "Categories", href: "/categories" },
            { name: "Blog", href: "/blog" }
          ].map((link, index) => (
            <Link key={index} href={link.href}>
              <span
                className={`relative text-sm font-medium tracking-wide cursor-pointer transition-colors ${
                  isScrolled ? "text-gray-800" : "text-white"
                } group`}
              >
                {link.name}
                {/* underline effect */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
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
      </div>
    </header>
  );
}
