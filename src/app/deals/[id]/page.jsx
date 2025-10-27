"use client";
import React, { useState, useMemo } from "react";
// Removed external imports for react-icons/fa and react-icons/ai
// and replaced them with inline SVG components below for self-containment.

// --- Inline Icon Components ---

// Star Icon (equivalent to FaStar)
const StarIcon = ({ size = 22, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        width={size} 
        height={size} 
        className={className}
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
);

// Close Icon (equivalent to AiOutlineClose)
const CloseIcon = ({ size = 22, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        width={size} 
        height={size} 
        className={className}
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
// --- End Inline Icon Components ---


// Navigation links for the new left sidebar
const navLinks = [
  "A Very discount code that got everyone talking",
  "Find the best deal for you with Very’s expert buying guides",
  "Our editors expert money-saving tips for Very",
  "Frequently asked questions about Very",
  "About Very",
  "Save with Very’s end of summer deals",
];

const coupons = [
  {
    type: "Reward",
    title: "£20 GIFT CARD",
    desc: "Receive a free £20 gift card when you spend £215 redeemable at 100+ retailers",
    btnText: "Get Reward*",
    expiry: "31/10/2025",
    terms: "Offer ends 31st October. Receive a free £20 gift card when you spend £215 redeemable at 100+ retailers. Valid while stocks last.",
    category: "EXCLUSIVE", // Categorizing for tab filtering
  },
  {
    type: "Code",
    title: "20% OFF",
    desc: "Get 20% off selected Shark & NINJA products with this code",
    btnText: "See Code*",
    expiry: "Expires today",
    terms: "Offer valid today only on selected Shark & NINJA products. Enter code NINJA20 at checkout to redeem.",
    category: "CODES",
  },
  {
    type: "Code",
    title: "10% OFF",
    desc: "Get 10% off ALL toys when you spend £75 or more with this code",
    btnText: "See Code*",
    expiry: "Expires today",
    terms: "Get 10% off all toys when spending £75 or more. Code TOY10 must be entered at checkout. Cannot be used with other offers.",
    category: "CODES",
  },
  {
    type: "Code",
    title: "20% OFF",
    desc: "Get 20% off selected furniture & homewares",
    btnText: "See Code*",
    expiry: "30/10/2025",
    terms: "Offer ends 30th October. Get 20% off selected furniture & homewares with code HOME20. This code can be used multiple times but can’t be used in conjunction with any other offer codes or promotions.",
    category: "CODES",
  },
  {
    type: "Code",
    title: "10% OFF",
    desc: "Get 10% off when you place an order on selected computing when you enter Very discount code at checkout",
    btnText: "See Code*",
    expiry: "30/10/2025",
    terms: "Valid on selected computing only. Enter code COMP10 at checkout. Cannot be used with other offers.",
    category: "CODES",
  },
  {
    type: "Deal",
    title: "40% OFF",
    desc: "Deals Loaded & Ready - Up to 30% off selected Tech & Gaming",
    btnText: "See Deal*",
    terms: "Discounts already applied to selected Tech & Gaming products. Limited time offer while stocks last.",
    category: "DEALS",
  },
];

// Define tab categories and their counts for the main coupon section
const TABS = [
  { label: "ALL OFFERS", filter: "ALL" },
  { label: "CODES (11)", filter: "CODES" },
  { label: "DEALS (21)", filter: "DEALS" },
  { label: "EXCLUSIVE (2)", filter: "EXCLUSIVE" },
  { label: "FREE DELIVERY (1)", filter: "FREE_DELIVERY" },
  { label: "VERIFIED (5)", filter: "VERIFIED" },
];

// Data for the new "More discount codes" section in the sidebar
const popularShopsTabs = [
    { label: "A-C", shops: ["Argos", "ASOS", "Amazon", "B&Q", "boohoo", "Currys"] },
    { label: "D-H", shops: ["Dell", "Dorothy Perkins", "Dunelm", "eBay", "Foot Locker", "Halfords"] },
    { label: "I-L", shops: ["IWOOT", "JD Sports", "John Lewis", "LOOKFANTASTIC", "Lovehoney"] },
];

const TabButton = ({ text, isActive, onClick }) => (
  <button
    onClick={onClick}
    // Added interactive transform and shadow classes
    className={`${
      isActive
        ? "bg-orange-500 text-white"
        : "border border-orange-500 text-orange-500 hover:bg-orange-50"
    } px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-150 ease-in-out
    hover:scale-[1.03] hover:shadow-md active:scale-95`} 
  >
    {text}
  </button>
);

const CouponCard = ({ coupon, onClickTerms }) => {
  // Added interactive transform and shadow classes to the buttonStyle
  const buttonStyle = "bg-orange-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-150 ease-in-out min-w-[150px] whitespace-nowrap " + 
                      "hover:bg-orange-600 hover:scale-[1.03] hover:shadow-lg active:scale-95";

  const typeColor = "text-orange-500"; 
  const typeEmoji = (coupon.type === "Reward" ? "⭐" : (coupon.type === "Code" ? "🏷️" : "💡"));


  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col lg:flex-row justify-between items-start p-5 mb-5">
      {/* Coupon Content */}
      <div className="flex-1 w-full lg:w-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold ${typeColor} flex items-center`}>
            <span className="mr-1 text-base">{typeEmoji}</span> {coupon.type}
          </span>
          {/* Expiration text aligned with the screenshot design */}
          <span className="text-xs text-gray-500">
            {coupon.type === "Reward" && "Exclusive"}
            {coupon.type === "Code" && "Expires soon!"}
          </span>
        </div>
        
        {/* Title color is kept pink as in the image */}
        <h3 className="text-4xl font-extrabold text-gray-900 mb-1 leading-none">{coupon.title}</h3>
        <p className="text-gray-600 mt-2">{coupon.desc}</p>

        {/* Terms and Expiry below the description, as per image layout */}
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={() => onClickTerms(coupon)}
            className="text-gray-500 text-sm font-medium hover:underline"
          >
            Terms
          </button>
          {coupon.expiry && (
            <p className="text-gray-400 text-sm">
              Expiration Date: <span className="font-medium">{coupon.expiry}</span>
            </p>
          )}
        </div>
      </div>

      {/* CTA Button Section */}
      <div className="w-full lg:w-auto mt-4 lg:mt-0 lg:ml-5 flex justify-end">
        <button className={buttonStyle}>
          {coupon.btnText}
        </button>
      </div>
    </div>
  );
};


export default function CouponsPage() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL"); // State for main coupon filter
  const [activeShopTab, setActiveShopTab] = useState(popularShopsTabs[0].label); // State for shop filter

  // Filter coupons based on the activeTab state
  const filteredCoupons = useMemo(() => {
    if (activeTab === "ALL") {
      return coupons;
    }
    // Filter logic: match coupon category to the active tab filter name
    return coupons.filter(c => c.category === activeTab);
  }, [activeTab]);
  
  // Get the list of shops for the active shop tab
  const shopsForActiveTab = popularShopsTabs.find(tab => tab.label === activeShopTab)?.shops || [];

  return (
    <div className="bg-[#f7f7f7] min-h-screen w-full font-sans">
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-4">
          {/* Very Logo Block (Pink) */}
          <div className="bg-[#e6007e] p-6 rounded-lg flex-shrink-0">
            <span className="text-white font-semibold text-3xl">very</span>
          </div>
          
          {/* Title Section */}
          <div className="py-2">
            <h1 className="text-xl font-semibold">
              Valid Very discount codes for October 2025
            </h1>
            <p className="text-gray-500 text-sm">
              Browse 34 working vouchers and save with our active UK Very promo codes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        
        {/* Rating Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Rate our Very discount codes</h2>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`text-orange-500 ${
                  i === 4 ? "opacity-60" : "opacity-100"
                }`}
                size={22}
              />
            ))}
          </div>
        </div>

        {/* Tabs - Now interactive for filtering */}
        <div className="flex overflow-x-auto pb-4 gap-3">
          {TABS.map((tab, i) => (
            <TabButton 
              key={i} 
              text={tab.label} 
              isActive={activeTab === tab.filter}
              onClick={() => setActiveTab(tab.filter)}
            />
          ))}
        </div>

        {/* Content Grid: Left Section (Nav) + Right Section (Coupons) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          
          {/* Left Navigation Section */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              
              {/* How to save at Very */}
              <h3 className="text-lg font-semibold mb-3">How to save at Very</h3>
              <ul className="space-y-3 text-gray-700">
                {navLinks.map((link, i) => (
                  <li key={i} className="flex items-start text-sm hover:text-orange-500 transition-colors cursor-pointer">
                    <span className="text-orange-500 mr-2 mt-1">⭐</span>
                    <span className="flex-1">{link}</span>
                  </li>
                ))}
              </ul>

              {/* Verified offers from similar brands */}
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Verified offers from similar brands you may also like:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AliExpress", "Cancer Research UK", "Findmypast.com", "Halfords", 
                    "JML", "LivingSocial", "OnBuy", "Poundland", "Redbubble", 
                    "TGJONES", "TK Maxx", "TikTok Shop", "Wish", "World Duty Free"
                  ].map((brand, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border hover:bg-gray-200 cursor-pointer">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* NEW SECTION: More discount codes for popular shops in the UK */}
              <div className="mt-8 border-t pt-4">
                  <h3 className="text-lg font-semibold mb-3">More discount codes for popular shops in the UK:</h3>
                  {/* Tabs for shop filtering */}
                  <div className="flex mb-4 overflow-x-auto gap-1.5">
                      {popularShopsTabs.map((tab) => (
                          <button
                              key={tab.label}
                              onClick={() => setActiveShopTab(tab.label)}
                              // Added interactive transform and shadow classes here too
                              className={`
                                  ${activeShopTab === tab.label 
                                      ? "bg-orange-500 text-white" 
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  } 
                                  text-sm px-3 py-1.5 rounded font-medium whitespace-nowrap transition-all duration-150 ease-in-out
                                  hover:scale-[1.03] hover:shadow-md active:scale-95
                              `}
                          >
                              {tab.label}
                          </button>
                      ))}
                  </div>
                  {/* List of shops */}
                  <div className="space-y-2 text-gray-700">
                      {shopsForActiveTab.map((shop, i) => (
                          <div key={i} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-50 cursor-pointer">
                              <span>{shop}</span>
                              <span className="text-xs text-orange-500">View Codes &gt;</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Save with Very’s end of summer deals */}
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Save with Very’s end of summer deals</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Summer is coming to an end, which means now is the perfect time to snap up some fantastic deals on summer fashion, beauty and homeware. We’ve seen savings of up to 70% in Very’s end of summer sale...
                </p>
              </div>

            </div>
          </div>

          {/* Right Coupon Cards Section */}
          <div className="lg:col-span-9">
            {filteredCoupons.length > 0 ? (
                filteredCoupons.map((c, i) => (
                    <CouponCard 
                        key={i} 
                        coupon={c} 
                        onClickTerms={setSelectedCoupon} 
                    />
                ))
            ) : (
                <div className="bg-white p-6 rounded-lg text-center text-gray-500">
                    No offers found for this category.
                </div>
            )}
          </div>
        </div>

        {/* Editor Tips/More Info Section */}
        <div className="pt-8">
            <h2 className="text-lg font-semibold mb-4">Our editors expert money-saving tips for Very</h2>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
                {[
                    {
                        title: "App discounts",
                        desc: "Download the Very app for free and unlock exclusive app-only discount codes plus get the chance to win competitions for your favourite brands.",
                        icon: "📱",
                    },
                    {
                        title: "Clearance",
                        desc: "We love exploring the clearance section with reduced prices of up to 60% off exciting designer brands, the latest beauty and electricals.",
                        icon: "🏷️",
                    },
                    {
                        title: "Newsletter offers",
                        desc: "Sign up to the Very newsletter for free and gain early access to upcoming sale events, discounts and exclusive offers.",
                        icon: "📧",
                    },
                    {
                        title: "Check the offers page",
                        desc: "Very’s offers page compiles all the latest deals and savings in one place so you can easily find the best discounts on the products you want to buy.",
                        icon: "💳",
                    },
                ].map((tip, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-sm rounded-lg p-5 border border-gray-200"
                    >
                        <div className="mb-3 text-2xl text-gray-700">{tip.icon}</div>
                        <h3 className="font-semibold mb-2">{tip.title}</h3>
                        <p className="text-gray-600 text-sm">{tip.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* About Very Section */}
        <div className="pt-12">
            <h2 className="text-2xl font-bold mb-4">About Very</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-700 leading-relaxed">
                <p>
                    Very is one of the UK’s leading online retailers, offering a massive range of fashion, tech, beauty and more all in one place. With thousands of top brands alongside its own stylish collections, Very makes it easy to find exactly what you need for every part of your life. So matter if you’re shopping for the latest gadgets, updating your wardrobe or refreshing your living space, Very brings it all together with great value and plenty of choice.
                </p>
                <p className="mt-4">
                    We’re always impressed by how much Very stands out for its fresh, trend-led approach and knack for staying ahead of what customers want. We also find their online experience smooth and stylish, with helpful filters and inspiration at every click. And, with a Very discount code sourced by us here on hotukdeals, we love that we can save with every purchase.
                </p>
            </div>
        </div>
      </div>


      {/* Terms Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative animate-fadeIn transform transition-all duration-300">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCoupon(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 hover:scale-110 transition-transform"
            >
              <CloseIcon size={22} />
            </button>

            {/* Top Section with Logo and CTA */}
            <div className="p-6 md:p-8 flex flex-col items-center text-center md:text-left md:flex-row md:gap-6">
              {/* Left logo - Pink square with 'very' */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="bg-[#e6007e] rounded-lg p-4 flex items-center justify-center w-20 h-20">
                  <span className="text-white font-bold text-xl">very</span>
                </div>
              </div>

              {/* Content and Button */}
              <div className="flex flex-col justify-center items-center md:items-start flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 leading-snug">
                  {selectedCoupon.desc}
                </h2>
                {/* Button color consistent with the coupon card CTA */}
                <button 
                  className={`text-white font-semibold px-10 py-3 rounded-full text-lg transition-all duration-200 bg-orange-500 hover:bg-orange-600 
                  hover:scale-[1.03] hover:shadow-lg active:scale-95`}
                >
                  {selectedCoupon.btnText}
                </button>
              </div>
            </div>

            {/* Bottom Section - Terms and Expiry */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t px-6 md:px-8 py-4 bg-gray-50">
              <p className="text-orange-500 font-medium">Terms and conditions</p>
              {selectedCoupon.expiry && (
                <p className="text-gray-600 mt-2 md:mt-0 text-sm">
                  Expiration Date: <span className="font-medium">{selectedCoupon.expiry}</span>
                </p>
              )}
            </div>

            {/* Terms Text */}
            <div className="px-6 md:px-8 pb-6 text-gray-600 text-sm leading-relaxed max-h-48 overflow-y-auto">
              {selectedCoupon.terms}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
