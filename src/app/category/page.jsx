'use client';

import React, { useState } from 'react';
import Banner from '@/components/banner/banner';
import StoreCard from '@/components/cards/categorycard';

const allCategories = [
  { name: "Mobile", coupons: 48, offers: 811 },
  { name: "Mobile Accessories", coupons: 118, offers: 777 },
  { name: "Mobile Recharge", coupons: 18, offers: 260 },
  { name: "Men's T-shirts", coupons: 113, offers: 511 },
  { name: "Men's Shirts", coupons: 80, offers: 318 },
  { name: "Men's Underwear", coupons: 74, offers: 143 },
  { name: "Men's Lifestyle", coupons: 316, offers: 1439 },
  { name: "Men Sports Shoes", coupons: 18, offers: 222 },
  { name: "Men Sandals", coupons: 13, offers: 39 },
  { name: "Men's Flip Flops", coupons: 12, offers: 45 },
  { name: "Men's Footwear", coupons: 107, offers: 570 },
  { name: "Mens watches", coupons: 43, offers: 202 },
  { name: "Medicines", coupons: 96, offers: 496 },
  { name: "Memory Cards", coupons: 0, offers: 15 },
  { name: "Movie Tickets", coupons: 36, offers: 253 },
  { name: "Magazines", coupons: 4, offers: 116 },
  { name: "Musical Instruments", coupons: 3, offers: 40 },
  { name: "Meat & Dairy", coupons: 23, offers: 72 },
  { name: "Mattress", coupons: 78, offers: 218 },
  { name: "Matrimony", coupons: 0, offers: 54 },
  { name: "Appliances", coupons: 9, offers: 120 },
  { name: "Automobiles", coupons: 10, offers: 130 },
  { name: "Books", coupons: 25, offers: 200 },
  { name: "Beverages", coupons: 12, offers: 60 },
  { name: "Cameras", coupons: 11, offers: 90 },
  { name: "Computers", coupons: 30, offers: 300 },
  { name: "Desktops", coupons: 7, offers: 80 },
  { name: "Education", coupons: 15, offers: 100 },
  { name: "Eyewear", coupons: 16, offers: 110 },
  { name: "Fashion", coupons: 200, offers: 1000 },
  { name: "Furniture", coupons: 50, offers: 400 },
];

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const Category = () => {
  const [selectedLetter, setSelectedLetter] = useState("All");

  const filteredCategories =
    selectedLetter === "All"
      ? allCategories
      : allCategories.filter((cat) =>
          cat.name.toUpperCase().startsWith(selectedLetter)
        );

  const brands = new Array(16).fill({
    image: "https://t4.ftcdn.net/jpg/03/01/52/73/360_F_301527353_rc9kt9ZXxCHOtC3VG8kJhyAa0kEgFjMx.jpg",
    name: "Electronics",
  });

  return (
    <div className="mt-12 text-[26px] font-bold px-4">
      <h1>Top Offers Categories</h1>

      <div className="my-4">
        <Banner image="https://picsum.photos/1200/400?random=1" />
      </div>

      <h2 className="text-xl mb-2">Featured Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 mb-8">
        {brands.map((brand, index) => (
          <StoreCard key={index} {...brand} />
        ))}
      </div>

      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Browse All Categories</h2>

        {/* Alphabet Filter */}
        <div className="flex flex-wrap gap-2 mb-6 text-[18px] font-normal">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`px-2 transition ${
                selectedLetter === letter ? "text-green-600 font-semibold" : "text-gray-600 hover:text-black cursor-pointer"
              }`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[16px] font-normal">
          {filteredCategories.length ? (
            filteredCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border shadow hover:shadow-lg transition group cursor-pointer"
              >
                <h3 className="text-lg font-medium text-gray-800 ">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.coupons} Coupons | {category.offers} Offers
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
