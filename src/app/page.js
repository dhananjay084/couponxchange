import ImageSlider from "@/components/slider/slider";
import CouponCard from "@/components/cards/couponcard";
import StoreCard from "@/components/cards/storecard";
import Banner from "@/components/banner/banner";
import BlogCard from "@/components/cards/blogcard";
import TodayDeal from "@/components/cards/TodaysDealCard"
  export default function Home() {
  const coupons = [
    {
      discount: "20%",
      brand: "Famous Footwear",
      description: "20% Off Your Purchase For Reward Member",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS9Oy9tPOCF1F0BolzJA5Sm_L9PvvvLZ35A&s",
      showCoupon: true,
    },
    {
      discount: "25%",
      brand: "Macy's",
      description: "25% Off With Macy's Text Sign Up",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS9Oy9tPOCF1F0BolzJA5Sm_L9PvvvLZ35A&s",
      showCoupon: false,
    },
    {
      discount: "15%",
      brand: "Nike",
      description: "15% Off On First Purchase",
      image: "https://i1.ypcdn.com/blob/f1a75c1b157276b5ae200591df7b9d01e98c75b4_400x260_crop.jpg",
      showCoupon: true,
    },
    {
      discount: "20%",
      brand: "Famous Footwear",
      description: "20% Off Your Purchase For Reward Member",
      image: "https://i1.ypcdn.com/blob/f1a75c1b157276b5ae200591df7b9d01e98c75b4_400x260_crop.jpg",
      showCoupon: true,
    },
    {
      discount: "25%",
      brand: "Macy's",
      description: "25% Off With Macy's Text Sign Up",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS9Oy9tPOCF1F0BolzJA5Sm_L9PvvvLZ35A&s",
      showCoupon: false,
    },
    {
      discount: "15%",
      brand: "Nike",
      description: "15% Off On First Purchase",
      image: "https://i1.ypcdn.com/blob/f1a75c1b157276b5ae200591df7b9d01e98c75b4_400x260_crop.jpg",
      showCoupon: true,
    },
    {
      discount: "20%",
      brand: "Famous Footwear",
      description: "20% Off Your Purchase For Reward Member",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS9Oy9tPOCF1F0BolzJA5Sm_L9PvvvLZ35A&s",
      showCoupon: true,
    },
    {
      discount: "25%",
      brand: "Macy's",
      description: "25% Off With Macy's Text Sign Up",
      image: "https://i1.ypcdn.com/blob/f1a75c1b157276b5ae200591df7b9d01e98c75b4_400x260_crop.jpg",
      showCoupon: false,
    },
    {
      discount: "15%",
      brand: "Nike",
      description: "15% Off On First Purchase",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS9Oy9tPOCF1F0BolzJA5Sm_L9PvvvLZ35A&s",
      showCoupon: true,
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
  return (
    <div className="max-w-[90%] mx-auto">
    <ImageSlider/>
    {/* <h2 className="text-2xl font-bold">Today's Deals</h2> */}
    <h2 className="text-2xl font-bold">Today&apos;s Deals</h2>
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-4 py-6">
        {coupons.map((coupon, index) => (
          <TodayDeal key={index} {...coupon} />
        ))}
      </div>
    </div>
    <h2 className="text-2xl font-bold">Popular store</h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 py-10">
          {brands.map((brand, index) => (
            <StoreCard key={index} {...brand} />
          ))}
    </div>
    <h2 className="text-2xl font-bold">Featured Coupons & Deals</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10">
  {coupons.map((coupon, index) => (
    <CouponCard key={index} {...coupon} />
  ))}
</div>



<div>
      <Banner image="https://picsum.photos/1200/400?random=1" />
    </div>
    
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
