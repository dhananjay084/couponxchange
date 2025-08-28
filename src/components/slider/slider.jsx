"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://img.freepik.com/free-vector/modern-sale-banner-with-text-space-area_1017-27331.jpg",
  "https://www.shutterstock.com/image-vector/flash-sale-promotion-banner-25-600nw-2159885029.jpg",
  "https://www.shutterstock.com/image-vector/promotion-special-offer-text-effect-600nw-2460155215.jpg",
  "https://img.freepik.com/free-vector/red-blue-discount-voucher-with-pretty-letters_1017-7577.jpg?semt=ais_hybrid&w=740&q=80",
  "https://www.shutterstock.com/image-vector/88-discount-flash-sale-on-600nw-2487117915.jpg",
  "https://thumbs.dreamstime.com/b/flat-design-baner-template-online-shopping-landing-page-web-easy-to-edit-customize-vector-illustration-128181475.jpg",
  "https://t3.ftcdn.net/jpg/05/11/91/00/360_F_511910008_TG3PEdmTWbaJkzYnkDwHl7da18ik0xd2.jpg",
  "https://img.freepik.com/free-vector/modern-sale-banner-with-text-space-area_1017-27331.jpg",
  "https://www.shutterstock.com/image-vector/flash-sale-promotion-banner-25-600nw-2159885029.jpg",
];

export default function ImageSlider() {
  return (
    <div className="w-full mx-auto py-8 relative overflow-visible">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
        className="overflow-visible" // 👈 allow arrows outside
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows (Desktop) */}
      <button className="custom-prev hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-gray-400 bg-white shadow-md hover:bg-gray-100 transition z-50">
        <FiChevronLeft size={20} />
      </button>
      <button className="custom-next hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-gray-400 bg-white shadow-md hover:bg-gray-100 transition z-50">
        <FiChevronRight size={20} />
      </button>

      {/* Pagination Dots (Mobile) */}
      <div className="custom-pagination flex justify-center mt-4 md:hidden relative z-50" />
    </div>
  );
}
