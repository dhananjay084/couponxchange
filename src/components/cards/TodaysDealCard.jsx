import React from "react";
import { BiSolidOffer } from "react-icons/bi";

export default function CouponCard({
  discount,
  brand,
  description,
  image,
  showCoupon,
}) {
  return (
    <div className="min-w-[260px] bg-white rounded-xl shadow-md overflow-hidden border flex flex-col 
      transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      
      {/* Discount Badge */}
      <div className="relative">
        <img
          src={image}
          alt={brand}
          className="w-full h-32 object-fill"
        />
        <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold shadow">
          <BiSolidOffer className="text-yellow-500" /> {discount} Off
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="font-bold text-sm uppercase">{brand}</h3>
        <p className="text-sm mt-1 mb-4">{description}</p>

        {showCoupon && (
          <button className="rounded-full cursor-pointer relative py-2 w-[60%] overflow-hidden border border-[#181717] bg-white px-3 text-[#181717] shadow-md transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#181717] before:transition-all before:duration-500 hover:text-white hover:shadow-[#181717] hover:before:left-0 hover:before:w-full">
            <span className="relative z-10">Coupon code</span>
          </button>
        )}
      </div>
    </div>
  );
}
