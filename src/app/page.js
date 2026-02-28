"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "@/features/deal/dealSlice";
import { fetchStores } from "@/api/storeApi";
import { fetchCategories } from "@/api/categoryApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
import Link from "next/link";
import { fetchBlogs } from "../api/blogApi";
import { getHomepageConfig } from "@/api/homepageApi";

const DEFAULT_HOMEPAGE_CONFIG = {
  sliderDealIds: [],
  sections: {
    section1: { title: "Today's Deals", description: "" },
    section2: { title: "Featured Vouchers - Section 2", description: "" },
    section3: { title: "Exclusive Offers - Section 3", description: "" },
    section4: { title: "Hot Deals - Section 4", description: "" },
    popularStores: { title: "Popular Stores", description: "" },
  },
  midBanner: {
    imageUrl: "https://picsum.photos/1200/400?random=1",
    redirectUrl: "",
  },
  faqSection: {
    title: "FAQs",
    items: [],
  },
};

const loremText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.";

export default function Home() {
  const dispatch = useDispatch();
  const { deals = [], status, error } = useSelector((state) => state.deals);
  const { stores = [] } = useSelector((state) => state.stores);
  const { categories = [] } = useSelector((state) => state.categories);
  const { blogs } = useSelector((state) => state.blogs || {
    blogs: [],
    status: "idle",
  });
  const [homepageConfig, setHomepageConfig] = useState(DEFAULT_HOMEPAGE_CONFIG);

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(fetchStores());
    dispatch(fetchCategories());
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loadHomepageConfig = async () => {
      try {
        const response = await getHomepageConfig();
        if (response?.data) {
          setHomepageConfig({
            ...DEFAULT_HOMEPAGE_CONFIG,
            ...response.data,
            sections: {
              ...DEFAULT_HOMEPAGE_CONFIG.sections,
              ...(response.data.sections || {}),
            },
            faqSection: {
              ...DEFAULT_HOMEPAGE_CONFIG.faqSection,
              ...(response.data.faqSection || {}),
            },
            midBanner: {
              ...DEFAULT_HOMEPAGE_CONFIG.midBanner,
              ...(response.data.midBanner || {}),
            },
          });
        }
      } catch {
        // Keep defaults if config is unavailable
      }
    };
    loadHomepageConfig();
  }, []);

  const publishedBlogs = blogs.filter((blog) => blog.status === "published" || !blog.status);
  const latestBlogs = publishedBlogs.slice(0, 5);
  const firstSectionDeals = deals.filter((d) => d.dealSection === "1st Section");
  const secondSectionDeals = deals.filter((d) => d.dealSection === "2nd Section");
  const thirdSectionDeals = deals.filter((d) => d.dealSection === "3rd Section");
  const fourthSectionDeals = deals.filter((d) => d.dealSection === "4th Section");
  const popularStores = stores.filter((s) => s.popularStore === "yes");
  const homePageStores = stores.filter((s) => s.showOnHomePage === "yes");
  const homePageCategories = categories.filter((c) => c.showOnHomePage === "Yes");

  const sliderSlides = useMemo(() => {
    const selectedIds = homepageConfig.sliderDealIds || [];
    if (!selectedIds.length) return [];

    return selectedIds
      .map((dealId) => deals.find((deal) => String(deal._id) === String(dealId)))
      .filter(Boolean)
      .map((deal) => {
        const matchedStore = stores.find(
          (store) =>
            String(store.storeName || "").toLowerCase().trim() ===
            String(deal.dealStore || "").toLowerCase().trim()
        );
        return {
          id: deal._id,
          image:
            deal.dealImage ||
            deal.dealLogo ||
            "https://img.freepik.com/free-vector/modern-sale-banner-with-text-space-area_1017-27331.jpg",
          title: deal.dealTitle || "Deal",
          redirectUrl: matchedStore ? `/store/${matchedStore._id}` : deal.redirectLink || "/stores",
        };
      });
  }, [deals, stores, homepageConfig.sliderDealIds]);

  if (status === "loading") return <p className="text-center py-10">Loading deals...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  const getBlogImage = (blog) => {
    if (blog.featuredImage) return blog.featuredImage;
    if (blog.content?.includes("<img")) {
      const match = blog.content.match(/src="([^"]+)"/);
      if (match?.[1]) return match[1];
    }
    return "https://images.unsplash.com/photo-1499750310107-5fef28a66643";
  };

  const section = (key, fallbackTitle) => ({
    title: homepageConfig?.sections?.[key]?.title || fallbackTitle,
    description: homepageConfig?.sections?.[key]?.description || loremText,
  });

  const section1 = section("section1", "Today's Deals");
  const section2 = section("section2", "Featured Vouchers - Section 2");
  const section3 = section("section3", "Exclusive Offers - Section 3");
  const section4 = section("section4", "Hot Deals - Section 4");
  const popularSection = section("popularStores", "Popular Stores");

  return (
    <div>
      <ImageSlider slides={sliderSlides} />

      <h2 className="text-2xl font-bold px-4">{section1.title}</h2>
      <p className="text-justify px-4 mt-2 text-gray-400">{section1.description}</p>
      <div className="px-4 py-6">
        {firstSectionDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {firstSectionDeals.map((deal) => (
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No deals available</p>
        )}
      </div>

      <div className="flex justify-between px-4">
        <h2 className="text-2xl font-bold">{popularSection.title}</h2>
        <Link href="/stores">
          <p className="border-b border-[#000] cursor-pointer hover:text-blue-600 transition">View All</p>
        </Link>
      </div>
      <p className="text-justify px-4 mt-2 text-gray-400">{popularSection.description}</p>
      <div className="py-10 px-4 relative overflow-visible">
        {popularStores.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={6}
              navigation={{ nextEl: ".popular-next", prevEl: ".popular-prev" }}
              pagination={{ clickable: true, el: ".popular-pagination" }}
              breakpoints={{
                320: { slidesPerView: 2, slidesPerGroup: 2 },
                480: { slidesPerView: 3, slidesPerGroup: 3 },
                640: { slidesPerView: 4, slidesPerGroup: 4 },
                1024: { slidesPerView: 5, slidesPerGroup: 5 },
                1280: { slidesPerView: 7, slidesPerGroup: 7 },
              }}
              className="overflow-visible"
            >
              {popularStores.map((store) => (
                <SwiperSlide key={store._id} className="flex justify-center">
                  <StoreCard image={store.storeLogo} cashback={store.storeName} id={store._id} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="popular-prev hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-gray-400 bg-white shadow-md hover:bg-gray-100 transition z-50">
              <FiChevronLeft size={20} />
            </button>
            <button className="popular-next hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-gray-400 bg-white shadow-md hover:bg-gray-100 transition z-50">
              <FiChevronRight size={20} />
            </button>
            <div className="popular-pagination flex justify-center mt-4 md:hidden relative z-50" />
          </>
        ) : (
          <p className="text-center text-gray-500">No popular stores available</p>
        )}
      </div>

      <h2 className="text-2xl font-bold px-4">{section2.title}</h2>
      <p className="text-justify px-4 mt-2 text-gray-400">{section2.description}</p>
      <div className="px-4 py-6">
        {secondSectionDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {secondSectionDeals.map((deal) => (
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No deals available</p>
        )}
      </div>

      <h2 className="text-2xl font-bold px-4">{section3.title}</h2>
      <p className="text-justify px-4 mt-2 text-gray-400">{section3.description}</p>
      <div className="px-4 py-6">
        {thirdSectionDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {thirdSectionDeals.map((deal) => (
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No deals available</p>
        )}
      </div>

      <h2 className="text-2xl font-bold px-4">{section4.title}</h2>
      <p className="text-justify px-4 mt-2 text-gray-400">{section4.description}</p>
      <div className="px-4 py-6">
        {fourthSectionDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {fourthSectionDeals.map((deal) => (
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No deals available</p>
        )}
      </div>

      {homepageConfig?.midBanner?.imageUrl ? (
        <div className="px-4 py-4">
          {homepageConfig?.midBanner?.redirectUrl ? (
            <a href={homepageConfig.midBanner.redirectUrl} target="_blank" rel="noopener noreferrer">
              <Banner image={homepageConfig.midBanner.imageUrl} />
            </a>
          ) : (
            <Banner image={homepageConfig.midBanner.imageUrl} />
          )}
        </div>
      ) : null}

      {homePageStores.length > 0 && (
        <RetailerPartners
          heading="Our Most Popular Partners"
          description="Take a look at the shops most loved by our customers"
          retailers={homePageStores.map((store) => ({
            name: store.storeName,
            url: `/store/${store?._id}`,
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
        <p className="text-center text-gray-500 py-6">No categories available to show on homepage</p>
      )}

      <div className="py-10 px-4">
        <div className="flex justify-between items-center px-4 mb-6">
          <h2 className="text-2xl font-bold">Latest Blogs</h2>
          <Link href="/blogs" className="border-b border-black cursor-pointer hover:text-blue-600 transition">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {latestBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              image={getBlogImage(blog)}
              title={blog.title}
              description={blog.excerpt || blog.content?.replace(/<[^>]*>/g, "").substring(0, 100) + "..."}
              slug={blog.slug || blog._id}
            />
          ))}
        </div>
      </div>

      {homepageConfig?.faqSection?.items?.length > 0 ? (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">{homepageConfig.faqSection.title || "FAQs"}</h2>
          <div className="space-y-4">
            {homepageConfig.faqSection.items.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
