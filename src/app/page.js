"use client";

import ImageSlider from "@/components/slider/slider";
import CouponCard from "@/components/cards/couponcard";
import StoreCard from "@/components/cards/storecard";
import Banner from "@/components/banner/banner";
import BlogCard from "@/components/cards/blogcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import RetailerPartners from "@/components/RetailerPartners";
  export default function Home() {
    const coupons = [
      {
        discount: "15% OFF",
        brand: "Samsung",
        description: "Get 15% off the entire Galaxy S25 Series plus instant discounts when you trade in at Samsung",
        image: "https://static2.hotukdeals.com/images/640x/HOF-Spring-14-02-23_0029--1-_5.jpg",
        logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
        exclusive: "Exclusive",  // optional
        code: "S25SAVE15",
        expiration: "21/10/2025",
        showCoupon: true,
      },
      {
        discount: "20% OFF",
        brand: "Flannels",
        description: "Get 20% off outlet orders with this Flannels discount code",
        image: "https://static2.hotukdeals.com/images/640x/HOF-Spring-14-02-23_0029--1-_5.jpg",
        logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
        exclusive: "Hot",  // could also be null
        code: "OUTLET20",
        expiration: "31/12/2025",
        showCoupon: true,
      },
      {
        discount: "25% OFF",
        brand: "Macy's",
        description: "25% Off With Macy's Text Sign Up",
        image: "https://static2.hotukdeals.com/images/640x/HOF-Spring-14-02-23_0029--1-_5.jpg",
        logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
        exclusive: null,  // no tag shown
        code: "MACY25",
        expiration: "15/11/2025",
        showCoupon: false,
      },
      {
        discount: "15% OFF",
        brand: "Samsung",
        description: "Get 15% off the entire Galaxy S25 Series plus instant discounts when you trade in at Samsung",
        image: "https://static2.hotukdeals.com/images/640x/HOF-Spring-14-02-23_0029--1-_5.jpg",
        logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
        exclusive: "Exclusive",  // optional
        code: "S25SAVE15",
        expiration: "21/10/2025",
        showCoupon: true,
      },
      {
        discount: "20% OFF",
        brand: "Flannels",
        description: "Get 20% off outlet orders with this Flannels discount code",
        image: "https://static2.hotukdeals.com/images/640x/HOF-Spring-14-02-23_0029--1-_5.jpg",
        logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
        exclusive: "Hot",  // could also be null
        code: "OUTLET20",
        expiration: "31/12/2025",
        showCoupon: true,
      },
      {
        discount: "25% OFF",
        brand: "Macy's",
        description: "25% Off With Macy's Text Sign Up",
        image: "https://static2.hotukdeals.com/images/640x/HOF-Spring-14-02-23_0029--1-_5.jpg",
        logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
        exclusive: null,  // no tag shown
        code: "MACY25",
        expiration: "15/11/2025",
        showCoupon: false,
      },
    ];
    
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
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 3,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 5,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 5,
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      cashback: 4,
    },
  ];
  const blogs = [
    {
      image: "https://picsum.photos/400/200?random=1",
      title: "How to Start Blogging",
      description: "Learn how to set up your blog and start writing content that attracts readers.",
      buttonText:"Read More"
    },
    {
      image: "https://picsum.photos/400/200?random=2",
      title: "Top 10 SEO Tips",
      description: "Boost your blog traffic with these proven SEO strategies.",
      buttonText:"Read More"

    },
    {
      image: "https://picsum.photos/400/200?random=3",
      title: "React vs Next.js",
      description: "A comparison between React and Next.js for modern web development.",
      buttonText:"Read More"

    },
    {
      image: "https://picsum.photos/400/200?random=4",
      title: "UI/UX Best Practices",
      description: "Design principles to make your blog more user-friendly and attractive.",
      buttonText:"Read More"

    },
    {
      image: "https://picsum.photos/400/200?random=5",
      title: "Making Money from Blogging",
      description: "Explore ways to monetize your blog and turn passion into profit.",
      buttonText:"Read More"

    },
  ];
  const retailerData = [
    { name: 'Temu', url: 'https://www.temu.com' },
    { name: 'Amazon', url: 'https://www.amazon.co.uk' },
    { name: 'Boots', url: 'https://www.boots.com' },
    { name: 'Samsung', url: 'https://www.samsung.com/uk/' },
    { name: 'ASOS', url: 'https://www.asos.com' },
    { name: 'Uber', url: 'https://www.uber.com' },
    { name: 'Domino’s UK', url: 'https://www.dominos.co.uk' },
    { name: 'Temu', url: 'https://www.temu.com' },
    { name: 'Amazon', url: 'https://www.amazon.co.uk' },
    { name: 'Boots', url: 'https://www.boots.com' },
    { name: 'Samsung', url: 'https://www.samsung.com/uk/' },
    { name: 'ASOS', url: 'https://www.asos.com' },
    { name: 'Uber', url: 'https://www.uber.com' },
    { name: 'Domino’s UK', url: 'https://www.dominos.co.uk' },
    { name: 'Temu', url: 'https://www.temu.com' },
    { name: 'Amazon', url: 'https://www.amazon.co.uk' },
    { name: 'Boots', url: 'https://www.boots.com' },
    { name: 'Samsung', url: 'https://www.samsung.com/uk/' },
    { name: 'ASOS', url: 'https://www.asos.com' },
    { name: 'Uber', url: 'https://www.uber.com' },
    { name: 'Domino’s UK', url: 'https://www.dominos.co.uk' },
  ];
  return (
    <div>
      <ImageSlider />

      {/* Today’s Deals with Swiper */}
      <h2 className="text-2xl font-bold px-4">Today&apos;s Deals</h2>
      <div className="px-4 py-6">
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
  onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = ".swiper-button-prev";
    swiper.params.navigation.nextEl = ".swiper-button-next";
  }}
  navigation={false}   // 👈 disable default arrows
  className="pb-12 !overflow-hidden"
>

  {coupons.map((coupon, index) => (
    <SwiperSlide key={index} className="!w-[280px] !h-auto flex justify-center">
      <CouponCard {...coupon} />
    </SwiperSlide>
  ))}

  <div className="swiper-button-prev !w-8 !h-8 !rounded-full !bg-white !shadow-md flex items-center justify-center !text-black hover:!bg-gray-100"></div>
  <div className="swiper-button-next !w-8 !h-8 !rounded-full !bg-white !shadow-md flex items-center justify-center !text-black hover:!bg-gray-100"></div>
  <div className="swiper-pagination !bottom-0 !mt-4"></div>
</Swiper>


</div>


      {/* Popular store */}
      <div className="flex justify-between px-4">
        <h2 className="text-2xl font-bold">Popular store</h2>
        <p className="border-b border-[#000] cursor-pointer">View All</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 py-10 px-4">
        {brands.map((brand, index) => (
          <StoreCard key={index} {...brand} />
        ))}
      </div>

      {/* Featured Coupons & Deals (NOT slider) */}
      <h2 className="text-2xl font-bold px-4">Browse our featured vouchers for more exclusive savings. Never pay full price again!
      </h2>
      <p className="px-4">There are so many ways you can save money when you buy online. We've made it even easier to find offers at your chosen shops!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-4">
        {coupons.map((coupon, index) => (
          <CouponCard key={index} {...coupon} />
        ))}
      </div>
      <h2 className="text-2xl font-bold px-4">Browse our featured vouchers for more exclusive savings. Never pay full price again!
      </h2>
      <p className="px-4">There are so many ways you can save money when you buy online. We've made it even easier to find offers at your chosen shops!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-4">
        {coupons.map((coupon, index) => (
          <CouponCard key={index} {...coupon} />
        ))}
      </div>
      <h2 className="text-2xl font-bold px-4">Browse our featured vouchers for more exclusive savings. Never pay full price again!
      </h2>
      <p className="px-4">There are so many ways you can save money when you buy online. We've made it even easier to find offers at your chosen shops!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-4">
        {coupons.map((coupon, index) => (
          <CouponCard key={index} {...coupon} />
        ))}
      </div>
      <div>
        <Banner image="https://picsum.photos/1200/400?random=1" />
      </div>
      <RetailerPartners
      heading="Our most popular  partners"
      description="Take a look at the shops most loved by our customers"
      retailers={retailerData}
    />
     <RetailerPartners
      heading="Our most popular  Categories"
      description="Take a look at the shops most loved by our customers"
      retailers={retailerData}
    />
      {/* Latest Blogs */}
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
