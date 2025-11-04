"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "@/features/deal/dealSlice";
import { fetchStores } from "@/api/storeApi";
import { fetchCategories } from "@/api/categoryApi"; // ✅ Import Category API thunk

import ImageSlider from "@/components/slider/slider";
import CouponCard from "@/components/cards/couponcard";
import StoreCard from "@/components/cards/storecard";
import Banner from "@/components/banner/banner";
import BlogCard from "@/components/cards/blogcard";
import RetailerPartners from "@/components/RetailerPartners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { deals = [], status, error } = useSelector((state) => state.deals);
  const { stores = [] } = useSelector((state) => state.stores);
  const { categories = [] } = useSelector((state) => state.categories); // ✅ get categories from store

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(fetchStores());
    dispatch(fetchCategories()); 

  }, [dispatch]);

  const firstSectionDeals = deals.filter((d) => d.dealSection === "1st Section");
  const secondSectionDeals = deals.filter((d) => d.dealSection === "2nd Section");
  const thirdSectionDeals = deals.filter((d) => d.dealSection === "3rd Section");
  const fourthSectionDeals = deals.filter((d) => d.dealSection === "4th Section");
  const popularStores = stores.filter((s) => s.popularStore === "yes");
  const homePageStores = stores.filter((s) => s.showOnHomePage === "yes");
  const homePageCategories = categories.filter(
    (c) => c.showOnHomePage === "Yes"
  );
  if (status === "loading") return <p className="text-center py-10">Loading deals...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  const brands = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 4,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 2,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 8,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 10,
    },
  ];

  const blogs = [
    {
      image: "https://picsum.photos/400/200?random=1",
      title: "How to Start Blogging",
      description:
        "Learn how to set up your blog and start writing content that attracts readers.",
      buttonText: "Read More",
    },
    {
      image: "https://picsum.photos/400/200?random=2",
      title: "Top 10 SEO Tips",
      description: "Boost your blog traffic with these proven SEO strategies.",
      buttonText: "Read More",
    },
  ];

  const retailerData = [
    { name: "Temu", url: "https://www.temu.com" },
    { name: "Amazon", url: "https://www.amazon.co.uk" },
    { name: "Boots", url: "https://www.boots.com" },
    { name: "Samsung", url: "https://www.samsung.com/uk/" },
  ];

  if (status === "loading") return <p className="text-center py-10">Loading deals...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div>
      <ImageSlider />

      {/* ========== 🟩 1st Section (Today’s Deals) ========== */}
      <h2 className="text-2xl font-bold px-4">Today&apos;s Deals</h2>
      <div className="px-4 py-6">
        {firstSectionDeals.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12 !overflow-hidden"
          >
            {firstSectionDeals.map((deal) => (
              <SwiperSlide key={deal._id} className="!w-[280px] !h-auto flex justify-center">
                <CouponCard
              key={deal._id}

                  discount={deal.dealTitle || "Deal"}
                  brand={deal.dealStore}
                  description={deal.dealDescription}
                  image={deal.dealImage}
                  logo={deal.dealLogo}
                  exclusive={deal.dealTag}
                  code={deal.dealCode}
                  expiration={deal.expirationDate?.slice(0, 10)}
                  redirectLink={deal.redirectLink}
                  showCoupon={!!deal.dealCode} // ✅ only true if code exists
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No deals available</p>
        )}
      </div>


      {/* ========== 🟦 Popular Stores ========== */}
      <div className="flex justify-between px-4">
        <h2 className="text-2xl font-bold">Popular Stores</h2>
        <p className="border-b border-[#000] cursor-pointer">View All</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 py-10 px-4">
        {popularStores.length > 0 ? (
          popularStores.map((store) => (
            <StoreCard
              key={store._id}
              image={store.storeLogo}
              cashback={store.storeName}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No popular stores available</p>
        )}
      </div>

      {/* ========== 🟨 2nd Section ========== */}
      <h2 className="text-2xl font-bold px-4">Featured Vouchers - Section 2</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-4">
        {secondSectionDeals.length > 0 ? (
          secondSectionDeals.map((deal) => (
            <CouponCard
            key={deal._id}

            discount={deal.dealTitle || "Deal"}
            brand={deal.dealStore}
            description={deal.dealDescription}
            image={deal.dealImage}
            logo={deal.dealLogo}
            exclusive={deal.dealTag}
            code={deal.dealCode}
            expiration={deal.expirationDate?.slice(0, 10)}
            redirectLink={deal.redirectLink}
            showCoupon={!!deal.dealCode}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No deals in this section</p>
        )}
      </div>


      {/* ========== 🟧 3rd Section ========== */}
      <h2 className="text-2xl font-bold px-4">Exclusive Offers - Section 3</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-4">
        {thirdSectionDeals.length > 0 ? (
          thirdSectionDeals.map((deal) => (
            <CouponCard
            key={deal._id}

            discount={deal.dealTitle || "Deal"}
            brand={deal.dealStore}
            description={deal.dealDescription}
            image={deal.dealImage}
            logo={deal.dealLogo}
            exclusive={deal.dealTag}
            code={deal.dealCode}
            expiration={deal.expirationDate?.slice(0, 10)}
            redirectLink={deal.redirectLink}
            showCoupon={!!deal.dealCode}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No deals in this section</p>
        )}
      </div>

      {/* ========== 🟥 4th Section ========== */}
      <h2 className="text-2xl font-bold px-4">Hot Deals - Section 4</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-4">
        {fourthSectionDeals.length > 0 ? (
          fourthSectionDeals.map((deal) => (
            <CouponCard
            key={deal._id}

            discount={deal.dealTitle || "Deal"}
            brand={deal.dealStore}
            description={deal.dealDescription}
            image={deal.dealImage}
            logo={deal.dealLogo}
            exclusive={deal.dealTag}
            code={deal.dealCode}
            expiration={deal.expirationDate?.slice(0, 10)}
            redirectLink={deal.redirectLink}
            showCoupon={!!deal.dealCode}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No deals in this section</p>
        )}
      </div>

      <div>
        <Banner image="https://picsum.photos/1200/400?random=1" />
      </div>

      {homePageStores.length > 0 && (
        <RetailerPartners
          heading="Our Most Popular Partners"
          description="Take a look at the shops most loved by our customers"
          retailers={homePageStores.map((store) => ({
            name: store.storeName,
            url: "#", // you can later add actual links
          }))}
        />
      )}
          {homePageCategories.length > 0 ? (
        <RetailerPartners
          heading="Our Most Popular Categories"
          description="Explore the top categories loved by our users"
          retailers={homePageCategories.map((cat) => ({
            name: cat.categoryName,
            url: "#",
          }))}
        />
      ) : (
        <p className="text-center text-gray-500 py-6">
          No categories available to show on homepage
        </p>
      )}

      {/* ========== Blogs ========== */}
      <div className="py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
