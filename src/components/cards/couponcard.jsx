"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";

export default function CouponCard({
  discount,
  brand,
  description,
  image,
  logo,
  exclusive,
  code,
  expiration,
  redirectLink,
  showCoupon,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied!");
  };

  const handleGoToShop = () => {
    if (redirectLink) {
      window.open(redirectLink, "_blank"); // ✅ open in new tab
    } else {
      alert("Shop link not available");
    }
  };

  return (
    <>
      {/* Coupon Card */}
      <div
        className="min-w-[260px] bg-white rounded-md shadow-md overflow-hidden flex flex-col 
        transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 h-[350px] relative"
      >
        <div className="relative">
          <img src={image} alt={brand} className="w-full h-40 object-cover" />
          {exclusive && (
            <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs font-bold rounded shadow">
              {exclusive.toUpperCase()}
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-white p-1 rounded shadow">
            <img src={logo} alt={`${brand} logo`} className="w-8 h-8 object-contain" />
          </div>
        </div>

        <div className="p-4 pb-10 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            {showCoupon && (
              <p
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer text-orange-500 font-semibold"
              >
                Code
              </p>
            )}
            <p className="text-sm text-gray-500">{brand}</p>
          </div>

          <h3 className="font-bold text-lg">{discount}</h3>
          <p className="text-sm mt-1 mb-2 line-clamp-3">{description}</p>
        </div>

        <p className="absolute bottom-3 left-4 text-xs text-gray-400">
          Expires: {expiration}
        </p>
      </div>

      {/* Modal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt={`${brand} logo`} className="w-10 h-10 object-contain" />
                <h2 className="font-bold text-lg">{brand}</h2>
              </div>

              <p className="mb-4">{description}</p>

              <div className="flex items-center border border-dashed border-orange-500 rounded-md overflow-hidden">
                <span className="flex-1 text-center py-2 font-bold">{code}</span>
                <button
                  className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition"
                  onClick={handleCopy}
                >
                  Copy Code
                </button>
              </div>

              <button
                onClick={handleGoToShop}
                className="mt-4 text-orange-500 font-semibold hover:underline"
              >
                Go to shop
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
