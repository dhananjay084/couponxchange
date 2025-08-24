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
          <button className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-white hover:text-black transition">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
