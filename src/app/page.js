"use client";

import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "@/features/deal/dealSlice";
import { fetchStores } from "@/api/storeApi";
import { fetchCategories } from "@/api/categoryApi"; // ✅ Import Category API thunk
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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


export default function Home() {
  const dispatch = useDispatch();
  const { deals = [], status, error } = useSelector((state) => state.deals);
  const { stores = [] } = useSelector((state) => state.stores);
  const { categories = [] } = useSelector((state) => state.categories); // ✅ get categories from store
  const [expanded, setExpanded] = useState(false);
  const { blogs } = useSelector((state) => state.blogs || {
    blogs: [],
    status: "idle",
  });
  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(fetchStores());
    dispatch(fetchCategories()); 
    dispatch(fetchBlogs());


  }, [dispatch]);
  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "published" || !blog.status
  );

  // Take latest 5 blogs
  const latestBlogs = publishedBlogs.slice(0, 5);
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
  
  return (
    <div>
      <ImageSlider />

      {/* ========== 🟩 1st Section (Today’s Deals) ========== */}
      <h2 className="text-2xl font-bold px-4">Today&apos;s Deals</h2>
      <p className="text-justify px-4 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
      <div className="px-4 py-6">
  {firstSectionDeals.length > 0 ? (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-6
        justify-items-center
      "
    >
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



      {/* ========== 🟦 Popular Stores ========== */}
      <div className="flex justify-between px-4">
        <h2 className="text-2xl font-bold">Popular Stores</h2>
    
        <Link href="/stores">
  <p className="border-b border-[#000] cursor-pointer hover:text-blue-600 transition">
    View All
  </p>

</Link>
      </div>
      <p className="text-justify px-4 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
      <div className="py-10 px-4 relative overflow-visible">
  {popularStores.length > 0 ? (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={6}
        navigation={{
          nextEl: ".popular-next",
          prevEl: ".popular-prev",
        }}
        pagination={{
          clickable: true,
          el: ".popular-pagination",
        }}
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
            <StoreCard
              image={store.storeLogo}
              cashback={store.storeName}
              id={store._id}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ⬅️➡️ Custom Navigation Arrows (Desktop only) */}
      <button className="popular-prev hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-gray-400 bg-white shadow-md hover:bg-gray-100 transition z-50">
        <FiChevronLeft size={20} />
      </button>

      <button className="popular-next hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-gray-400 bg-white shadow-md hover:bg-gray-100 transition z-50">
        <FiChevronRight size={20} />
      </button>

      {/* 🔵 Pagination Dots (Mobile only) */}
      <div className="popular-pagination flex justify-center mt-4 md:hidden relative z-50" />
    </>
  ) : (
    <p className="text-center text-gray-500">No popular stores available</p>
  )}
</div>

      {/* ========== 🟨 2nd Section ========== */}
      <h2 className="text-2xl font-bold px-4">Featured Vouchers - Section 2</h2>
      <p className="text-justify px-4 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  </p>
      <div className="px-4 py-6">
  {secondSectionDeals.length > 0 ? (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-6
        justify-items-center
      "
    >
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
  ) : (
    <p className="text-center text-gray-500">No deals available</p>
  )}
</div>
    


      {/* ========== 🟧 3rd Section ========== */}
      <h2 className="text-2xl font-bold px-4">Exclusive Offers - Section 3</h2>
      <p className="text-justify px-4 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <div className="px-4 py-6">
  {thirdSectionDeals.length > 0 ? (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-6
        justify-items-center
      "
    >
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
  ) : (
    <p className="text-center text-gray-500">No deals available</p>
  )}
</div>
     

      {/* ========== 🟥 4th Section ========== */}
      <h2 className="text-2xl font-bold px-4">Hot Deals - Section 4</h2>
      <p className="text-justify px-4 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <div className="px-4 py-6">
  {fourthSectionDeals.length > 0 ? (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-6
        justify-items-center
      "
    >
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
  ) : (
    <p className="text-center text-gray-500">No deals available</p>
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
            url: `/store/${store?._id}`, // you can later add actual links
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
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-2xl font-bold">Latest Blogs</h2>

        <Link
          href="/blogs"
          className="border-b border-black cursor-pointer hover:text-blue-600 transition"
        >
          View All
        </Link>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {latestBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            image={getBlogImage(blog)}
            title={blog.title}
            description={
              blog.excerpt ||
              blog.content?.replace(/<[^>]*>/g, "").substring(0, 100) + "..."
            }
            slug={blog.slug || blog._id}
          />
        ))}
      </div>
    </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">
        How can discount codes help me?
      </h2>

      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[3000px]" : "max-h-[260px]"
        }`}
      >
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p className="font-semibold text-xl">
            At hotukdeals, saving you money is our mission!
          </p>

          <p>
            We’re a team of people who are just like you, we love saving money!
          </p>

          <p>
            One of our favourite ways to make savings is by finding and sharing
            discount codes with you – no matter what you’re purchasing or where
            you’re intending to spend, we do our best to get you the best deal
            possible.
          </p>

          <p>
            Voucher codes are a specific code or word that you can redeem on a
            retailer’s website to save money on your purchase.
          </p>

          <p>
            You can expect to find a wide variety of promo codes, ranging from
            percentage-based discounts to specific fixed money off (e.g. £10
            off), as well as codes that give you free delivery.
          </p>

          <p>
            From Black Friday to Cyber Monday, Christmas, and summer sales,
            we’re your go-to source for the hottest deals all year round.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900">
            How do I use a hotukdeals discount code?
          </h3>

          <ol className="list-decimal list-inside space-y-3">
            <li>Browse hotukdeals to find your favourite voucher code.</li>
            <li>Click the code, copy it, and visit the retailer’s site.</li>
            <li>Add items to your cart and proceed to checkout.</li>
            <li>Paste the code into the discount code box.</li>
            <li>Complete payment and enjoy your savings!</li>
          </ol>

          <p className="font-semibold text-gray-900">
            Our team of editors curates and hand-tests every discount code we publish.
          </p>
        </div>

        {/* Fade overlay when collapsed */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-24  pointer-events-none" />
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 flex items-center gap-2 text-orange-600 font-semibold hover:underline"
      >
        {expanded ? "See less" : "See more"}
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </button>
    </div>
    </div>
  );
}
