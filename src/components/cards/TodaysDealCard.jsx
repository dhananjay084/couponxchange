import React from "react";
import { FaFire } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";


export default function CouponCard({
  discount,
  brand,
  description,
  image,
  showCoupon,
}) {
  return (
    <div className="min-w-[260px] bg-white rounded-xl shadow-md overflow-hidden border flex flex-col">
      {" "}
      {/* Discount Badge */}{" "}
      <div className="relative">
        {" "}
        <img
          src={image}
          alt={brand}
          className="w-full h-32 object-fill "
        />{" "}
        <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold shadow">
          {" "}
          <BiSolidOffer className="text-yellow-500" /> {discount} Off{" "}
        </div>{" "}
      </div>{" "}
      {/* Card Content */}{" "}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {" "}
        <h3 className="font-bold text-sm uppercase">{brand}</h3>{" "}
        <p className="text-sm mt-1 mb-4">{description}</p>{" "}
        {showCoupon && (
          <button className="bg-gray-200 hover:bg-gray-300 font-semibold px-4 py-2 rounded-full text-sm w-[60%]">
            {" "}
            Coupon code{" "}
          </button>
        )}{" "}
      </div>{" "}
    </div>
  );
}
