import React from "react";

export default function CashbackCard({ image, cashback }) {
  return (
    <div
      className="flex flex-col items-center min-w-[120px] 
      transition-transform duration-300 ease-in-out hover:-translate-y-2 bg-white rounded-xl p-4"
    >
      {/* Circle Logo */}
      <div className="w-28 h-28 rounded-full border flex items-center justify-center overflow-hidden shadow">
        <img src={image} alt="brand" className="w-full h-full object-contain" />
      </div>

      {/* Cashback Info */}
      <div className="mt-3 flex items-center gap-1 font-bold text-lg">
        <p className="text-sm text-gray-700">23 Offers</p>
      </div>
    </div>
  );
}
