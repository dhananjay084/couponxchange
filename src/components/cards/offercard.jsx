"use client";
import { useState } from "react";

export default function CouponCard({ type, discount, title, code }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);

      // reset back after 2s
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col sm:flex-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 animate-shine pointer-events-none"></div>

      {/* Left - Discount */}
      <div className="flex items-center justify-center bg-black text-white w-full sm:w-28 p-4">
        <div className="text-center">
          <span className="block text-lg sm:text-2xl font-bold">{discount}</span>
          <span className="text-xs uppercase">{type}</span>
        </div>
      </div>

      {/* Center - Title */}
      <div className="flex-1 p-4 text-center sm:text-left flex items-center justify-center">
        <p className="text-gray-800 font-semibold text-sm sm:text-base">{title}</p>
      </div>

      {/* Right - Button */}
      <div className="p-4 flex items-center justify-center w-full sm:w-48">
        {type === "Coupon" ? (
          <button
            onClick={handleCopy}
            className="relative w-full h-12 rounded-xl font-medium text-white bg-black overflow-hidden cursor-pointer group border border-transparent group-hover:border-black"
          >
            {/* Sliding White Layer */}
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>

            {/* Text Layer */}
            <span className="relative z-10 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-black">
              {copied ? "Copied!" : hovered ? code : "Hover to reveal"}
            </span>
          </button>
        ) : (
            <button className="cursor-pointer w-full h-12 rounded-xl bg-black text-white font-medium border border-transparent transition duration-300 hover:bg-white hover:text-black hover:border-black">
            View Deal
          </button>
          
        )}
      </div>
    </div>
  );
}
