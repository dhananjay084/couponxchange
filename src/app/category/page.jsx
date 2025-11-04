"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "@/components/banner/banner";
import StoreCard from "@/components/cards/categorycard";
import { fetchCategories } from "@/api/categoryApi";

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const Category = () => {
  const dispatch = useDispatch();
  const { categories = [], status, error } = useSelector(
    (state) => state.categories
  );

  const [selectedLetter, setSelectedLetter] = useState("All");

  // ✅ Load categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading")
    return (
      <p className="text-center py-10 text-gray-600">Loading categories...</p>
    );
  if (error)
    return <p className="text-center text-red-500 py-10">{error}</p>;

  // ✅ Popular Categories (Featured)
  const popularCategories = categories.filter(
    (cat) => cat.popularCategory === "Yes"
  );

  // ✅ Filter by letter
  const filteredCategories =
    selectedLetter === "All"
      ? categories
      : categories.filter((cat) =>
          cat.categoryName?.toUpperCase().startsWith(selectedLetter)
        );

  return (
    <div className="mt-12 text-[26px] font-bold px-4">
      <h1>Top Offers Categories</h1>

      <div className="my-4">
        <Banner image="https://picsum.photos/1200/400?random=1" />
      </div>

      {/* ✅ Featured Categories */}
      <h2 className="text-xl mb-2">Featured Categories</h2>
      {popularCategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 mb-8">
          {popularCategories.map((cat) => (
            <StoreCard
              key={cat._id}
              image={cat.categoryImage}
              name={cat.categoryName} // ✅ fixed: use categoryName
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">No popular categories available.</p>
      )}

      {/* ✅ Browse All Categories */}
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Browse All Categories</h2>

        {/* Alphabet Filter */}
        <div className="flex flex-wrap gap-2 mb-6 text-[18px] font-normal">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`px-2 transition ${
                selectedLetter === letter
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 hover:text-black cursor-pointer"
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
            filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white p-4 rounded-lg border shadow hover:shadow-lg transition group cursor-pointer"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {category.categoryName} {/* ✅ fixed */}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.couponsCount || 0} Coupons |{" "}
                  {category.offersCount || 0} Offers
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No categories found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
