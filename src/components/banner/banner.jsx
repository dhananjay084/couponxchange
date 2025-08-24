// src/components/Banner.jsx
import React from "react";

const Banner = ({ image }) => {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl">
      <img
        src={image}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Banner;
