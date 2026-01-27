"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "@/components/banner/banner";
import StoreCard from "@/components/cards/categorycard";
import { fetchCategories } from "@/api/categoryApi";
import { HiChevronRight } from 'react-icons/hi'

const alphabets = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0-9']

const Category = () => {
  const dispatch = useDispatch();
  const { categories = [], status, error } = useSelector(
    (state) => state.categories
  );

  // All hooks must be called unconditionally at the top level
  const sectionRefs = useRef({})
  const [selectedLetter, setSelectedLetter] = useState("All"); // If you still need this

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ✅ Group categories alphabetically - must be before conditional returns
  const groupedCategories = useMemo(() => {
    const groups = Object.fromEntries(alphabets.map(l => [l, []]))

    categories.forEach(category => {
      const name = category.categoryName?.trim()
      if (!name || !category._id) return

      const firstChar = name[0].toUpperCase()
      const key = /^[A-Z]$/.test(firstChar) ? firstChar : '0-9'

      groups[key].push({
        id: category._id,
        name,
        coupons: category.couponsCount || 0,
        offers: category.offersCount || 0,
      })
    })

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }, [categories])

  // ✅ Popular Categories (Featured) - must be before conditional returns
  const popularCategories = useMemo(() => 
    categories.filter(cat => cat.popularCategory === "Yes"),
    [categories]
  )

  // Event handlers - these can stay here
  const handleAlphabetClick = (letter) => {
    sectionRefs.current[letter]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleCategoryClick = (id) => {
    console.log('Category clicked:', id)
  }

  // Now we can do conditional rendering
  if (status === "loading")
    return (
      <p className="text-center py-10 text-gray-600">Loading categories...</p>
    );
  if (error)
    return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="mt-12 px-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Top Offers Categories</h1>
      <p className="text-gray-600 mb-6">
        Explore all our categories and find verified codes in seconds.
      </p>

      <div className="my-4">
        <Banner image="https://picsum.photos/1200/400?random=1" />
      </div>

      {/* ✅ Featured Categories */}
      <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
      {popularCategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 mb-12">
          {popularCategories.map((cat) => (
            <StoreCard
              key={cat._id}
              image={cat.categoryImage}
              name={cat.categoryName}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-12">No popular categories available.</p>
      )}

      {/* ✅ Browse All Categories */}
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-6">Browse All Categories</h2>

        {/* Alphabet Selector - Same as Store page */}
        <div className="mt-4 mb-8 flex flex-wrap justify-center gap-2 py-4">
          {alphabets.map(letter => (
            <button
              key={letter}
              onClick={() => handleAlphabetClick(letter)}
              className="w-10 h-10 rounded-full font-bold transition
                bg-gray-200 hover:bg-black hover:text-white"
            >
              {letter}
            </button>
          ))}
        </div>

        {/* All Alphabet Sections - Same card design as Store page */}
        <div className="mt-6 mb-12 space-y-14">
          {alphabets.map(letter => {
            const categoriesForLetter = groupedCategories[letter] || []

            return (
              <div
                key={letter}
                ref={(el) => (sectionRefs.current[letter] = el)}
                className="scroll-mt-[120px]"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{letter}</h2>
                  <span className="text-sm text-gray-500 font-bold">
                    {categoriesForLetter.length} CATEGORIES
                  </span>
                </div>

                {/* Category Cards - Same design as Store cards */}
                {categoriesForLetter.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {categoriesForLetter.map(category => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4
                          shadow-sm transition-all duration-300
                          hover:-translate-y-1 hover:shadow-lg 
                          flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {category.name}
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700
                              group-hover:bg-blue-200">
                              {category.coupons} Coupons
                            </span>
                            <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700
                              group-hover:bg-green-200">
                              {category.offers} Offers
                            </span>
                          </div>
                        </div>

                        <HiChevronRight className="text-gray-400 text-xl group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="italic text-gray-500">
                    No categories available for {letter}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;