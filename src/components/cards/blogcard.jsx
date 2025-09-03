// src/components/BlogCard.jsx
import React from "react";

const BlogCard = ({ image, title, description, buttonText }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">{description}</p>

        {/* Button Bottom Left */}
        <div className="mt-4">
        <button class="rounded-full cursor-pointer text-red hover:before:bg-[#181717]border-[#181717] relative py-2 w-[60%] overflow-hidden border border-[#181717] bg-white px-3 text-[#181717] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#181717] before:transition-all before:duration-500 hover:text-white hover:shadow-[#181717] hover:before:left-0 hover:before:w-full"><span class="relative z-10">{buttonText}</span></button>

        </div>
      </div>
    </div>
  );
};

export default BlogCard;
