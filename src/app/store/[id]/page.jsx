"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "@/api/storeApi";
import { getDeals } from "@/api/dealApi";
import { fetchStores } from "@/api/storeApi";
import { MdOutlineVerified } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { IoMdPricetag } from "react-icons/io";
import { TbCirclePercentage } from "react-icons/tb";

// --- Inline Icon Components ---
// Money-saving Tips Section Component
const MoneySavingTipsSection = ({ currentStore }) => {
  const tips = [
    {
      title: "Student discount",
      content: "Students can stretch their travel budget with a 10% Expedia voucher code. To redeem this offer, log in to your UNiDAYS account, verify your student status, and you'll be done in under a minute. Once verified, you'll get a unique discount that can be applied at the checkout page so that you can see more of the world for less.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      title: "App offers",
      content: "Booking through the Expedia app can quietly reduce your hotel costs, as mobile-only discounts of up to 20% are available on selected properties, depending on location and dates. We use the app to compare these rates against desktop prices, especially when plans are still flexible, as it gives a clearer picture of which listings genuinely offer better value before you commit.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Refer a friend",
      content: "Referring friends through Expedia can be a great way to save on future trips. Both you and your friend will receive a £25 voucher when you complete your first hotel booking using the app. You can refer up to 10 friends each year for hotel-only bookings that exceed £200. This program is ideal for travellers who like to plan ahead and prefer to build their savings gradually rather than rush to use their rewards.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      )
    },
    {
      title: "Price tracking tools",
      content: "Using Expedia's price alerts along with its price drop protection can take much of the uncertainty out of booking flights. You can set alerts in the app to monitor your selected route and travel dates, receiving notifications when fares decrease. Additionally, some bookings come with price drop protection, which tracks the exact flight daily and refunds you the difference if the price drops after your booking.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Money-saving tips at {currentStore?.storeName || "this store"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
          >
            {/* Logo/Icons Section */}
            <div className="mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-3">
                {tip.icon}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {tip.title}
            </h3>
            
            {/* Content with flex-grow to push cards to equal height */}
            <div className="flex-grow">
              <p className="text-gray-600 leading-relaxed">
                {tip.content}
              </p>
            </div>
            
        
          </div>
        ))}
      </div>
    </div>
  );
};
const FAQSection = ({ currentStore }) => {
  const faqs = [
    {
      question: "How do I apply my Expedia discount code?",
      answer: (
        <ol className="list-decimal pl-5 space-y-2">
          <li>Copy a verified Expedia discount code to save on your hotel booking.</li>
          <li>Go to the website and select the location, date, and number of guests to see the available options.</li>
          <li>Reserve a room, add any extra add-ons, and head to the secure booking page to fill in your details.</li>
          <li>Apply your Expedia coupon code in the box labelled "Use a coupon or promotion code", and you will see a green box showing your discount has been included in the total.</li>
          <li>Confirm your new discounted total and continue with your preferred payment method.</li>
        </ol>
      ),
   
    },
    {
      question: "Can I get an Expedia voucher code for my first order?",
      answer: "Currently, there is no first-order Expedia voucher code available. However, you can sign in or create a new account to receive special offers and exclusive promotions for your flight and hotel bookings.",
     
    },
    {
      question: "Is there an NHS discount?",
      answer: "An Expedia promo code is not available for NHS staff, Blue Light cardholders or even teachers. However, we regularly see seasonal deals and special sales on hotel bookings, including family-friendly offers with discounts of 25% or more on hotels near theme parks, beaches, and popular city attractions. From our research, these deals are especially helpful during peak times such as school holidays, when prices are usually higher.",
    
    }
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Frequently asked questions about {currentStore?.storeName || "Expedia"}
      </h2>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
          >
            {/* Question Row with Icon */}
            <div className="flex items-start mb-4">
            
              
              <h3 className="text-lg font-semibold text-gray-800 pt-1">
                {faq.question}
              </h3>
            </div>
            
            {/* Answer */}
            <div >
              <div className="text-gray-600 leading-relaxed">
                {typeof faq.answer === 'string' ? (
                  <p>{faq.answer}</p>
                ) : (
                  faq.answer
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
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

const CopyIcon = ({ size = 18, className = "" }) => (
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
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = ({ size = 18, className = "" }) => (
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ClockIcon = ({ size = 18, className = "" }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
// --- End Inline Icon Components ---

// Navigation links for the new left sidebar
const navLinks = [
  "A Very discount code that got everyone talking",
  "Find the best deal for you with Very's expert buying guides",
  "Our editors expert money-saving tips for Very",
  "Frequently asked questions about Very",
  "About Very",
  "Save with Very's end of summer deals",
];

const TabButton = ({ text, isActive, onClick, icon = null }) => (
  <button
    onClick={onClick}
    className={`${
      isActive
        ? "bg-orange-500 text-white"
        : "border border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-100"
    } px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-150 ease-in-out
    flex items-center gap-2`} 
  >
    {text}
  </button>
);

// Convert deal object to coupon format for display with tag assignment - UPDATED FOR EXPIRED
const convertDealToCoupon = (deal, isExpired = false) => {
  const hasCode = deal.dealCode && deal.dealCode.trim() !== "";
  
  // Determine which tag to assign based on conditions
  let assignedTag = "Deals"; // Default
  
  // Check if expires soon (within 24 hours)
  if (deal.expirationDate && !isExpired) {
    const expirationDate = new Date(deal.expirationDate);
    const currentDate = new Date();
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    if (hoursDiff <= 24 && hoursDiff > 0) {
      assignedTag = "Expires Soon";
    }
  }
  
  // If has code and not already assigned to Expires Soon
  if (hasCode && assignedTag !== "Expires Soon" && !isExpired) {
    assignedTag = "Coupons";
  }
  
  // If expired, override tag
  if (isExpired) {
    assignedTag = "Expired";
  }
  
  return {
    type: hasCode ? "CODE" : "DEAL",
    title: deal.dealTitle || "Deal",
    desc: deal.dealDescription || "",
    btnText: hasCode ? "See Code*" : "See Deal*",
    expiry: deal.expirationDate ? new Date(deal.expirationDate).toLocaleDateString('en-GB') : "No expiry",
    terms: deal.dealDescription || "No terms available",
    category: deal.dealCategory || "DEALS",
    tag: assignedTag, // Assign the calculated tag
    originalDeal: deal, // Keep original deal data
    isExpired: isExpired // Add expired flag
  };
};

// Modified CouponCard to show tag on right side - UPDATED FOR EXPIRED
const CouponCard = ({ coupon, onClickTerms, isExpired = false }) => {
  const [showTerms, setShowTerms] = useState(false);

  // Use gray color for expired cards
  const typeColor = isExpired ? "gray-500" : "orange-500";
  const bgColor = isExpired ? "bg-gray-500" : "bg-orange-500";
  const hoverBgColor = isExpired ? "hover:bg-gray-600" : "hover:bg-orange-600";
  const textColor = isExpired ? "text-gray-500" : "text-orange-500";
  
  const typeEmoji =
    coupon.type === "Reward" ? (
      <TbCirclePercentage />
    ) : coupon.type === "Code" ? (
      <IoMdPricetag />
    ) : (
      <TbCirclePercentage />
    );

  const handleCardClick = () => {
    // Don't trigger modal or redirect for expired cards
    if (!isExpired) {
      onClickTerms(coupon);
      coupon.originalDeal?.redirectLink &&
        window.open(coupon.originalDeal.redirectLink, "_blank");
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${isExpired ? 'border-gray-300' : 'border-gray-200'} mb-5 relative overflow-hidden ${isExpired ? 'opacity-80' : ''}`}>

   {/* ================= DESKTOP ================= */}
<div className="hidden lg:block">

{/* Main Desktop Row */}
<div className="flex flex-row items-center p-5 relative">

  {/* Left Discount */}
  <div className="flex flex-shrink-0 w-24 flex-col gap-1 items-center justify-center mr-6">
    <span className={`text-3xl font-extrabold leading-none ${isExpired ? 'text-gray-600' : ''}`}>10%</span>
    <span className={`text-3xl font-semibold ${isExpired ? 'text-gray-400' : 'text-gray-600'} leading-none`}>OFF</span>
  </div>

  {/* Right Content */}
  <div className="flex-1 pr-4">
    <div className="flex items-center gap-2 mb-2">
      <span
        className={`text-xs font-semibold ${bgColor} text-white px-[8px] py-[4px] rounded-xl flex items-center`}
      >
        <span className="mr-1 text-[16px]">{typeEmoji}</span>
        {coupon.type}
      </span>
      <span className={`text-[8px] ${isExpired ? 'text-gray-400' : 'text-gray-500'}`}>
        {isExpired ? "Expired" : coupon.type === "Reward" && "Exclusive"}
        {isExpired ? "" : coupon.type === "Code" && "Expires soon!"}
      </span>
    <span className={`flex items-center gap-1 p-1 text-[8px] font-semibold rounded-full ${isExpired ? 'text-gray-400' : ''}`}>
      <MdOutlineVerified size={18} />
    </span>
    </div>

    {/* Title */}
    <h3 className={`text-[20px] ${isExpired ? 'text-gray-500' : 'text-[rgb(36,38,40)]'} font-semibold mb-1 leading-none`}>
      {coupon.title}
    </h3>
  </div>

  {/* CTA */}
  <div className="flex justify-center items-center">
    <button
      className={`${bgColor} text-white px-4 py-2 rounded-full font-medium transition-all
                 duration-150 ease-in-out min-w-[150px] whitespace-nowrap
                 ${isExpired ? 'cursor-not-allowed' : `${hoverBgColor} hover:scale-[1.03] hover:shadow-lg active:scale-95`}`}
      onClick={handleCardClick}
      disabled={isExpired}
    >
      {isExpired ? "Expired" : coupon.btnText}
    </button>
  </div>
</div>

{/* ✅ Bottom Row for Terms and Expiry */}
<div className="flex justify-between items-center px-5 py-3 border-t border-gray-100">
  {/* Terms on Left */}
  <button
    onClick={() => !isExpired && setShowTerms(prev => !prev)}
    className={`${isExpired ? 'text-gray-400 cursor-not-allowed' : 'text-orange-500 hover:underline'}`}
    disabled={isExpired}
  >
    Details
  </button>

  {/* Expiration on Right */}
  {coupon.expiry && (
    <p className={`text-sm ${isExpired ? 'text-gray-400' : 'text-gray-400'}`}>
      Expiration Date: <span className={`font-medium ${isExpired ? 'text-gray-500' : ''}`}>{coupon.expiry}</span>
      {isExpired && " (Expired)"}
    </p>
  )}
</div>

{/* Expandable Terms Description */}
<div
  className={`px-5 transition-all duration-300 overflow-hidden
    ${showTerms ? "max-h-40 py-3" : "max-h-0"}`}
>
  <p className="text-sm text-gray-600">{coupon.desc}</p>
</div>
</div>


    {/* ================= MOBILE ================= */}
    <div className="lg:hidden">

      <div className="flex p-4 items-center">
        {/* Left */}
        <div className="flex-shrink-0 pr-4 py-2 flex flex-col justify-center">
          <div className={`text-4xl font-black ${isExpired ? 'text-gray-500' : 'text-black'} leading-none`}>£120</div>
          <div className={`text-lg font-bold ${isExpired ? 'text-gray-400' : 'text-black'} leading-tight mt-0.5`}>
            GIFT CARD
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 ${bgColor} text-white px-2.5 py-1 rounded text-xs font-semibold`}>
              <span className="text-sm">{typeEmoji}</span>
              {coupon.type}
            </span>
            <span className={`text-sm ${isExpired ? 'text-gray-400' : 'text-gray-700'}`}>
              {isExpired ? "Expired" : coupon.type === "Reward" && "Exclusive"}
              {isExpired ? "" : coupon.type === "Code" && "Expires soon!"}
            </span>
            <span className={`flex items-center gap-1 p-1 text-[8px] font-semibold rounded-full ${isExpired ? 'text-gray-400' : ''}`}>
              <MdOutlineVerified size={18} />
            </span>
          </div>

          <p className={`text-base ${isExpired ? 'text-gray-500' : 'text-gray-900'} leading-snug mb-3`}>
            {coupon.title}
          </p>

          <button
            className={`w-full ${bgColor} text-white py-3.5 rounded-full font-semibold text-base
                       ${isExpired ? 'cursor-not-allowed' : 'transition-all duration-150 hover:bg-orange-600 active:scale-95'}
                       flex items-center justify-center gap-2`}
            onClick={handleCardClick}
            disabled={isExpired}
          >
            {isExpired ? "Expired" : coupon.btnText}
            {!isExpired && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-gray-100">
        <button
          onClick={() => !isExpired && setShowTerms((prev) => !prev)}
          className={`${isExpired ? 'text-gray-400 cursor-not-allowed' : 'text-orange-500 hover:underline'}`}
          disabled={isExpired}
        >
          Details
        </button>

        {coupon.expiry && (
          <p className={`text-sm ${isExpired ? 'text-gray-400' : 'text-gray-400'}`}>
            Expiration Date:{" "}
            <span className={`font-medium ${isExpired ? 'text-gray-500' : ''}`}>{coupon.expiry}</span>
            {isExpired && " (Expired)"}
          </p>
        )}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden
          ${showTerms ? "max-h-40 px-4 pb-4" : "max-h-0"}`}
      >
        <p className="text-sm text-gray-600">{coupon.desc}</p>
      </div>
    </div>
  </div>
  );
};

// Store Info Display Component
const StoreInfoDisplay = ({ storeData, status }) => {
  if (status === "loading") {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (status === "failed" || !storeData) {
    return null;
  }
};

// Modal Component - Horizontal Layout
const DealModal = ({ deal, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !deal) return null;
  
  const originalDeal = deal.originalDeal;
  const hasCode = originalDeal?.dealCode && originalDeal.dealCode.trim() !== "";
  
  const handleCopyCode = () => {
    if (hasCode) {
      navigator.clipboard.writeText(originalDeal.dealCode)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy:', err));
    }
  };

  return (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999] p-4 overflow-y-auto">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-10 max-h-[90vh] overflow-y-auto relative animate-fadeIn transition-all duration-300 flex flex-col">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 hover:scale-110 transition-transform bg-white rounded-full p-1"
        >
          <CloseIcon size={22} />
        </button>

       

        {/* Right Side - Content */}
        <div className="w-full p-6 overflow-y-auto max-h-[calc(90vh-2rem)]">

          {/* Logo and Title */}
          <div className="flex items-center gap-4 mb-6">
            {originalDeal?.dealLogo && (
              <div className="flex-shrink-0">
                <img 
                  src={originalDeal.dealLogo} 
                  alt="Deal Logo" 
                  className="w-16 h-16 rounded-lg object-contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{originalDeal?.dealTitle}</h2>
              {/* Show tag in modal too */}
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${
                deal.tag === "Expires Soon" 
                  ? "bg-red-100 text-red-800" 
                  : deal.tag === "Coupons"
                  ? "bg-blue-100 text-blue-800"
                  : deal.tag === "Deals"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {deal.tag}
              </span>
            </div>
          </div>

          {/* Deal Code Section */}
          {hasCode && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Discount Code</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Use this code at checkout:</div>
                  <div className="text-2xl font-bold text-gray-900 font-mono">
                    {originalDeal.dealCode}
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckIcon size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon size={18} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {!hasCode && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-yellow-800 font-medium">No code required! This deal is automatically applied.</div>
            </div>
          )}

          {/* Deal Description */}
          {originalDeal?.dealDescription && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{originalDeal.dealDescription}</p>
            </div>
          )}

          {/* Deal Details - Grid Layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {originalDeal?.dealStore && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Store</h4>
                <p className="text-gray-800 font-medium">{originalDeal.dealStore}</p>
              </div>
            )}
            
            {originalDeal?.dealCategory && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Category</h4>
                <p className="text-gray-800 font-medium">{originalDeal.dealCategory}</p>
              </div>
            )}
            
            {originalDeal?.expirationDate && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Expires</h4>
                <p className="text-gray-800 font-medium">
                  {new Date(originalDeal.expirationDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            )}
            
            {originalDeal?.dealTag && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Original Tag</h4>
                <p className="text-gray-800 font-medium">{originalDeal.dealTag}</p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          {originalDeal?.redirectLink && (
            <div className="mt-6">
              <a 
                href={originalDeal.redirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Go to Store
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Star Rating Component with half-star selection
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isHoveringHalf, setIsHoveringHalf] = useState(false);
  const [starRefs, setStarRefs] = useState([]);
  
  // Create refs for each star
  useEffect(() => {
    setStarRefs((refs) => 
      Array(5)
        .fill()
        .map((_, i) => refs[i] || React.createRef())
    );
  }, []);

  const handleStarClick = (value, isHalf = false) => {
    const finalRating = isHalf ? value - 0.5 : value;
    setRating(finalRating);
    console.log(`Rating submitted: ${finalRating}`);
  };

  const handleStarHover = (event, starIndex, isHalf = false) => {
    const finalRating = isHalf ? starIndex + 0.5 : starIndex + 1;
    setHoverRating(finalRating);
    setIsHoveringHalf(isHalf);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
    setIsHoveringHalf(false);
  };

  const calculateHoverPosition = (event, starIndex) => {
    if (starRefs[starIndex]?.current) {
      const starRect = starRefs[starIndex].current.getBoundingClientRect();
      const mouseX = event.clientX - starRect.left;
      const starWidth = starRect.width;
      
      // If mouse is in left half of the star
      if (mouseX < starWidth / 2) {
        handleStarHover(event, starIndex, true); // Half star
      } else {
        handleStarHover(event, starIndex, false); // Full star
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="flex items-center gap-1 mb-2"
        onMouseLeave={handleMouseLeave}
      >
        {[0, 1, 2, 3, 4].map((starIndex) => {
          const starValue = starIndex + 1;
          const displayRating = hoverRating || rating;
          const isFilled = displayRating >= starValue;
          const isHalfFilled = displayRating >= starValue - 0.5 && displayRating < starValue;
          const showHalf = (hoverRating && hoverRating === starValue - 0.5) || (!hoverRating && rating === starValue - 0.5);

          return (
            <div 
              key={starIndex}
              ref={starRefs[starIndex]}
              className="relative cursor-pointer"
              onClick={(e) => {
                const starRect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - starRect.left;
                const starWidth = starRect.width;
                
                if (mouseX < starWidth / 2) {
                  handleStarClick(starValue, true); // Half star click
                } else {
                  handleStarClick(starValue, false); // Full star click
                }
              }}
              onMouseMove={(e) => calculateHoverPosition(e, starIndex)}
              onMouseEnter={(e) => calculateHoverPosition(e, starIndex)}
            >
              {/* Background Star (Always Gray) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              
              {/* Foreground Star (Orange Fill) */}
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ 
                  width: showHalf ? '50%' : isFilled ? '100%' : '0%'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-orange-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rating Labels */}
      <div className="text-center text-sm text-gray-600 mt-2">
        {rating === 0 ? (
          <span>Click to rate</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-orange-500">{rating.toFixed(1)}</span>
            <span>out of 5</span>
          </div>
        )}
      </div>
      
      {/* Rating Description */}
      <div className="text-xs text-gray-500 mt-1 text-center">
        {rating >= 4.5 && "Excellent!"}
        {rating >= 3.5 && rating < 4.5 && "Good"}
        {rating >= 2.5 && rating < 3.5 && "Average"}
        {rating >= 1.5 && rating < 2.5 && "Poor"}
        {rating > 0 && rating < 1.5 && "Very Poor"}
      </div>
    </div>
  );
};

const InlineAds = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 my-4">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
      Ads
    </h3>

    <div
      className="min-h-[90px] w-full flex items-center justify-center
                 border border-dashed border-gray-300 rounded-md
                 text-sm text-gray-400"
    >
      Ads will appear here
    </div>
  </div>
);

// ExpiredDealsSection Component
const ExpiredDealsSection = ({ expiredDeals }) => {
  if (!expiredDeals || expiredDeals.length === 0) return null;
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recently Expired Deals</h2>
        <span className="text-xs text-gray-500">Showing latest {Math.min(4, expiredDeals.length)} expired deals</span>
      </div>
      <div className="space-y-4">
        {expiredDeals.slice(0, 4).map((coupon, i) => (
          <CouponCard 
            key={`expired-${i}`} 
            coupon={coupon} 
            onClickTerms={() => {}} // Empty function for expired deals
            isExpired={true}
          />
        ))}
      </div>
     
    </div>
  );
};

export default function CouponsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Get store data from Redux
  const { currentStore, currentStoreStatus, stores: allStores } = useSelector((state) => state.stores);
  
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [activeTab, setActiveTab] = useState("All Offers");
  const [activeShopTab, setActiveShopTab] = useState("A");
  const [activeCategoryTab, setActiveCategoryTab] = useState("ALL");
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [expiredDeals, setExpiredDeals] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [storesByLetter, setStoresByLetter] = useState({});
  const [totalCouponsCount, setTotalCouponsCount] = useState(0);

  // Define the four specific tabs
  const TABS = [
    { id: "All Offers", label: "ALL OFFERS", icon: null },
    { id: "Coupons", label: "COUPONS", icon: "🏷️" },
    { id: "Deals", label: "DEALS", icon: "💡" },
    { id: "Expires Soon", label: "EXPIRES SOON", icon: <ClockIcon size={16} /> }
  ];

  // Generate all alphabet letters
  const allAlphabets = useMemo(() => {
    return [...Array(26)].map((_, i) => String.fromCharCode(65 + i));
  }, []);

  // Fetch store data
  useEffect(() => {
    if (params?.id) {
      console.log("🔍 Fetching store with ID:", params.id);
      
      dispatch(fetchStoreById(params.id))
        .then((result) => {
          if (fetchStoreById.fulfilled.match(result)) {
            console.log("✅ Store data fetched successfully:", result.payload);
          } else if (fetchStoreById.rejected.match(result)) {
            console.error("❌ Failed to fetch store:", result.error);
          }
        })
        .catch((error) => {
          console.error("💥 Error in fetch dispatch:", error);
        });
    } else {
      console.warn("⚠️ No store ID found in URL params");
    }
  }, [dispatch, params?.id]);

  // Fetch all deals when component mounts
  useEffect(() => {
    const fetchAllDeals = async () => {
      setLoadingDeals(true);
      try {
        console.log("🔄 Fetching all deals...");
        const allDeals = await getDeals();
        console.log("✅ All deals fetched:", allDeals.length);
        setDeals(allDeals);
        
        // Extract unique categories for brand section
        const categories = ["ALL", ...new Set(allDeals
          .map(deal => deal.dealCategory)
          .filter(category => category && category.trim() !== "")
        )];
        setUniqueCategories(categories);
        
      } catch (error) {
        console.error("❌ Failed to fetch deals:", error);
        setDeals([]);
        setUniqueCategories(["ALL"]);
      } finally {
        setLoadingDeals(false);
      }
    };

    fetchAllDeals();
  }, []);

  // Fetch all stores for sidebar
  useEffect(() => {
    const fetchAllStores = async () => {
      try {
        await dispatch(fetchStores());
      } catch (error) {
        console.error("❌ Failed to fetch stores:", error);
      }
    };

    fetchAllStores();
  }, [dispatch]);

  // Organize stores by first letter for sidebar
  useEffect(() => {
    if (allStores && allStores.length > 0) {
      const organized = {};
      
      // Initialize all alphabet letters
      allAlphabets.forEach(letter => {
        organized[letter] = [];
      });
      organized["0-9"] = [];
      
      // Sort stores into letter groups
      allStores.forEach(store => {
        if (store.storeName && store._id) {
          const firstLetter = store.storeName.charAt(0).toUpperCase();
          if (/^[A-Z]$/.test(firstLetter)) {
            if (!organized[firstLetter]) {
              organized[firstLetter] = [];
            }
            organized[firstLetter].push(store);
          } else {
            organized["0-9"].push(store);
          }
        }
      });
      
      // Sort stores alphabetically within each group
      Object.keys(organized).forEach(letter => {
        organized[letter].sort((a, b) => a.storeName.localeCompare(b.storeName));
      });
      
      setStoresByLetter(organized);
    }
  }, [allStores, allAlphabets]);

  // Filter deals when store data is loaded and apply tag filtering
  useEffect(() => {
    if (currentStore && currentStore.storeName && deals.length > 0) {
      console.log("🔍 Filtering deals for store:", currentStore.storeName);
      
      // First, filter deals where dealStore matches current store name
      let matchingDeals = deals.filter(deal => 
        deal.dealStore && 
        currentStore.storeName && 
        deal.dealStore.toLowerCase() === currentStore.storeName.toLowerCase()
      );
      setTotalCouponsCount(matchingDeals.length);

      // Separate active and expired deals
      const now = new Date();
      const activeDeals = [];
      const expiredDealsList = [];

      matchingDeals.forEach(deal => {
        if (deal.expirationDate) {
          const expirationDate = new Date(deal.expirationDate);
          if (expirationDate < now) {
            // Expired deal
            expiredDealsList.push(convertDealToCoupon(deal, true));
          } else {
            // Active deal
            activeDeals.push(deal);
          }
        } else {
          // No expiration date = active
          activeDeals.push(deal);
        }
      });

      // Sort expired deals by expiration date (most recent first)
      expiredDealsList.sort((a, b) => {
        if (!a.originalDeal?.expirationDate) return 1;
        if (!b.originalDeal?.expirationDate) return -1;
        return new Date(b.originalDeal.expirationDate) - new Date(a.originalDeal.expirationDate);
      });

      setExpiredDeals(expiredDealsList);

      // Convert active deals to coupon format with assigned tags
      let couponDeals = activeDeals.map(deal => convertDealToCoupon(deal, false));
      
      // Apply active tab filter
      if (activeTab !== "All Offers") {
        couponDeals = couponDeals.filter(coupon => coupon.tag === activeTab);
      }
      
      // Apply category filter if not "ALL"
      if (activeCategoryTab !== "ALL") {
        couponDeals = couponDeals.filter(coupon => 
          coupon.originalDeal?.dealCategory === activeCategoryTab
        );
      }
      
      console.log(`✅ ${couponDeals.length} matching deals found for tab "${activeTab}"`);
      console.log(`📅 ${expiredDealsList.length} expired deals found`);
      
      setFilteredDeals(couponDeals);
      
      if (matchingDeals.length === 0) {
        console.log("⚠️ No deals found for store:", currentStore.storeName);
      }
    } else if (currentStore && deals.length === 0) {
      console.log("⚠️ No deals data available to filter");
    }
  }, [currentStore, deals, activeTab, activeCategoryTab]);

  // Get stores for active letter tab
  const storesForActiveTab = useMemo(() => {
    return storesByLetter[activeShopTab] || [];
  }, [storesByLetter, activeShopTab]);

  // Handle store click - navigate to store detail page
  const handleStoreClick = (storeId) => {
    router.push(`/store/${storeId}`);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen w-full font-sans">
      
      {/* Header */}
      <div className="bg-[#f7f7f7] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 items-center bg-white shadow-sm rounded-lg min-h-[135px]">
        
        {/* Left: Store Logo - 30% on mobile, 3 cols on desktop */}
        <div className="col-span-1 lg:col-span-3 flex justify-center lg:justify-start">
          {currentStore?.storeLogo ? (
            <img 
              src={currentStore.storeLogo} 
              alt={currentStore.storeName} 
              className="w-full max-h-[135px] h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-700 font-semibold text-2xl lg:text-3xl">
                {currentStore?.storeName?.charAt(0) || 'S'}
              </span>
            </div>
          )}
        </div>

        {/* Right: Store Title and Description - 70% on mobile, 9 cols on desktop */}
        <div className="col-span-1 lg:col-span-9 py-2 px-2">
          <h1 className="text-[14px] md:text-[24px] font-bold">
            {currentStore ? `${currentStore.storeName} Promo Codes & Coupons` : "Loading Store..."}
          </h1>
          <p className="text-gray-500 text-[12px] md:text-[16px] font-semibold">
            {totalCouponsCount > 0
              ? `${totalCouponsCount} verified offers on ${new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}`
              : "Loading deals..."}
          </p>
        </div>
      </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        
        {/* Store Info Section */}
        <StoreInfoDisplay 
          storeData={currentStore} 
          status={currentStoreStatus} 
        />
        
        {/* Loading State */}
        {loadingDeals && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading deals...</p>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          
          {/* Left Navigation Section */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className=" rounded-lg sticky top-4 space-y-6">

              {/* ⭐ Rating Section */}
              <div className=" rounded-lg  p-5">
                <h3 className="text-lg font-semibold mb-3 text-center">
                  Rate our discount codes
                </h3>
                <StarRating />
              </div>

              {/* 🏪 About Store */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-2">
                  About {currentStore?.storeName || "this store"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentStore?.storeDescription ||
                    "Find the latest verified promo codes, coupons, and exclusive deals. We regularly update offers to help you save more on every purchase."}
                </p>
              </div>

              {/* 👩‍💼 About Publisher */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-4">
                  Our Coupon Publishers
                </h3>

                <div >
              
                  <div>
                    <h4 className="font-semibold text-orange-500">
                      Verity S
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                      I'm Verity, Coupons Publisher Team Lead at hotukdeals. For the past 3
                      years, I've been sharing money-saving know-how with shoppers. Even
                      small savings can add up to something meaningful.
                    </p>
                  </div>
                </div>
              </div>

              {/* 🏷 Verified offers from similar brands */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-3">
                  Verified offers from similar brands
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {uniqueCategories.map((category, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCategoryTab(category)}
                      className={`${
                        activeCategoryTab === category
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } px-3 py-1.5 text-xs rounded-full font-medium whitespace-nowrap transition-all`}
                    >
                      {category === "ALL" ? "ALL" : category}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  Showing deals from{" "}
                  <span className="font-semibold">
                    {activeCategoryTab === "ALL" ? "all categories" : activeCategoryTab}
                  </span>
                </p>
              </div>

              {/* 📢 Google Ads Section */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Ads
                </h3>

                {/* Google Ads will be injected here */}
                <div
                  id="google-ads-container"
                  className="min-h-[250px] flex items-center justify-center border border-dashed border-gray-300 rounded-md text-sm text-gray-400"
                >
                  Google Ads will appear here
                </div>
              </div>

            </div>
          </div>

          {/* Right Coupon Cards Section */}
          <div className="lg:col-span-9">
            <div className="flex overflow-x-auto pb-4 gap-3">
              {TABS.map((tab) => (
                <TabButton 
                  key={tab.id} 
                  text={tab.label} 
                  icon={tab.icon}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
            
            {/* Active Deals */}
            {!loadingDeals && filteredDeals.length > 0 ? (
              filteredDeals.map((coupon, i) => (
                <React.Fragment key={i}>
                  <CouponCard
                    coupon={coupon}
                    onClickTerms={setSelectedCoupon}
                  />

                  {/* 👉 Insert Ads after every 3 cards */}
                  {(i + 1) % 3 === 0 && (
                    <InlineAds />
                  )}
                </React.Fragment>
              ))
            ) : !loadingDeals && filteredDeals.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">😔</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No deals found
                </h3>
                <p className="text-gray-600">
                  No deals available for {currentStore?.storeName || "this store"} yet.
                  {activeTab !== "All Offers" && ` in "${activeTab}"`}
                  {activeCategoryTab !== "ALL" && ` with category "${activeCategoryTab}"`}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setActiveTab("All Offers")}
                    className="text-orange-500 hover:underline"
                  >
                    View all offers
                  </button>
                </div>
              </div>
            ) : null}

            {/* Expired Deals Section - Show after active deals */}
            {!loadingDeals && expiredDeals.length > 0 && (
              <ExpiredDealsSection expiredDeals={expiredDeals} />
            )}
                     {/* Money-saving Tips Section - Show after expired deals */}
<MoneySavingTipsSection currentStore={currentStore} />
<FAQSection currentStore={currentStore}/>

          </div>
        </div>
      </div>

      {/* Deal Modal (only for active deals) */}
      <DealModal 
        deal={selectedCoupon}
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />
    </div>
  );
}