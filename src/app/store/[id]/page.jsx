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

// --- Inline Icon Components ---
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
        : "border border-orange-500 text-orange-500 hover:bg-orange-50"
    } px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all duration-150 ease-in-out
    hover:scale-[1.03] hover:shadow-md active:scale-95 flex items-center gap-2`} 
  >
    {/* {icon && icon} */}
    {text}
  </button>
);

// Convert deal object to coupon format for display with tag assignment
const convertDealToCoupon = (deal) => {
  const hasCode = deal.dealCode && deal.dealCode.trim() !== "";
  
  // Determine which tag to assign based on conditions
  let assignedTag = "Deals"; // Default
  
  // Check if expires soon (within 24 hours)
  if (deal.expirationDate) {
    const expirationDate = new Date(deal.expirationDate);
    const currentDate = new Date();
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    if (hoursDiff <= 24 && hoursDiff > 0) {
      assignedTag = "Expires Soon";
    }
  }
  
  // If has code and not already assigned to Expires Soon
  if (hasCode && assignedTag !== "Expires Soon") {
    assignedTag = "Coupons";
  }
  
  return {
    type: hasCode ? "Code" : "Deal",
    title: deal.dealTitle || "Deal",
    desc: deal.dealDescription || "",
    btnText: hasCode ? "See Code*" : "See Deal*",
    expiry: deal.expirationDate ? new Date(deal.expirationDate).toLocaleDateString('en-GB') : "No expiry",
    terms: deal.dealDescription || "No terms available",
    category: deal.dealCategory || "DEALS",
    tag: assignedTag, // Assign the calculated tag
    originalDeal: deal // Keep original deal data
  };
};

// Modified CouponCard to show tag on right side
const CouponCard = ({ coupon, onClickTerms }) => {
  const buttonStyle =
    "bg-orange-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-150 ease-in-out min-w-[150px] whitespace-nowrap " +
    "hover:bg-orange-600 hover:scale-[1.03] hover:shadow-lg active:scale-95";

  const typeColor = "orange-500";
  const typeEmoji =
    coupon.type === "Reward" ? (
      <HiPercentBadge />
    ) : coupon.type === "Code" ? (
      <IoMdPricetag />
    ) : (
      <HiPercentBadge />
    );const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col lg:flex-row justify-between items-center p-5 mb-5 relative">
      
      {/* Tag badge on right side */}
      <div className="absolute top-0 right-4">
        <span className="flex items-center bg-green-300 gap-2 px-3 py-1 text-xs font-semibold rounded-full mt-2">
          <MdOutlineVerified size={18} />
          Verified
        </span>
      </div>

      {/* NEW LEFT SECTION — 10% OFF */}
  {/* Desktop left discount */}
<div className="hidden lg:flex flex-shrink-0 w-24 flex-col gap-1 items-center justify-center mr-6">
  <span className="text-3xl font-extrabold text-orange-500 leading-none">
    10%
  </span>
  <span className="text-3xl font-semibold text-gray-600 leading-none">
    OFF
  </span>
</div>

{/* Mobile top-left tag */}
<div className="absolute top-3 left-3 lg:hidden">
  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
    10% OFF
  </span>
</div>


      {/* Coupon Content (UNCHANGED) */}
      <div className="flex-1 w-full lg:w-auto pr-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold bg-${typeColor} text-white p-2 rounded-md flex items-center`}>
            <span className="mr-1 text-base">{typeEmoji}</span> {coupon.type}
          </span>
          <span className="text-xs text-gray-500">
            {coupon.type === "Reward" && "Exclusive"}
            {coupon.type === "Code" && "Expires soon!"}
          </span>
        </div>

        <h3 className="text-4xl font-extrabold text-gray-900 mb-1 leading-none">
          {coupon.title}
        </h3>

        <p className="text-gray-600 mt-2">{coupon.desc}</p>

        {/* Terms and Expiry */}
        <div className="flex items-center gap-4 mt-3">
        <button
  onClick={() => setShowTerms(prev => !prev)}
  className="text-gray-500 text-sm font-medium hover:underline"
>
  Terms
</button>

          {coupon.expiry && (
            <p className="text-gray-400 text-sm">
              Expiration Date:{" "}
              <span className="font-medium">{coupon.expiry}</span>
            </p>
          )}
        </div>
        <div
  className={`transition-all duration-300 overflow-hidden ${
    showTerms ? "max-h-40 mt-3" : "max-h-0"
  }`}
>
  <p className="text-sm text-gray-600">
    {coupon.desc}
  </p>
</div>

      </div>

      {/* CTA Button Section (UNCHANGED) */}
      <div className="w-full lg:w-auto mt-4 lg:mt-0 flex justify-center lg:justify-end lg:items-center">
        <button
  className={buttonStyle}
  onClick={() => {
    onClickTerms(coupon);
    if (coupon.originalDeal?.redirectLink) {
      window.open(coupon.originalDeal.redirectLink, "_blank");
    }
  }}
>

          {coupon.btnText}
        </button>
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
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [storesByLetter, setStoresByLetter] = useState({});

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
      
      // Convert to coupon format with assigned tags
      let couponDeals = matchingDeals.map(deal => convertDealToCoupon(deal));
      
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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-4">
          {/* Store Logo Block */}
          <div className="rounded-lg flex-shrink-0">
            {currentStore?.storeLogo ? (
              <img 
                src={currentStore.storeLogo} 
                alt={currentStore.storeName} 
                className="w-24 h-24 object-contain"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-700 font-semibold text-3xl">
                  {currentStore?.storeName?.charAt(0) || 'S'}
                </span>
              </div>
            )}
          </div>
          
          {/* Title Section */}
          <div className="py-2">
            <h1 className="text-xl font-semibold">
              {currentStore ? `${currentStore.storeName} Deals` : "Loading Store..."}
            </h1>
            <p className="text-gray-500 text-sm">
              {filteredDeals.length > 0 
                ? `Browse ${filteredDeals.length} working deals and save with active promo codes`
                : "Loading deals..."}
            </p>
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
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              
              <h3 className="text-lg font-semibold mb-3">How to save</h3>
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
                <h3 className="text-lg font-semibold mb-3">Verified offers from similar brands:</h3>
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
                  Showing deals from <span className="font-semibold">{activeCategoryTab === "ALL" ? "all categories" : activeCategoryTab}</span>
                </p>
              </div>
              
              {/* More discount codes for popular shops */}
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">More discount codes for popular shops:</h3>
                {/* All alphabet tabs with horizontal scroll */}
                <div className="mb-4">
                  <div className="flex overflow-x-auto pb-2 gap-1.5">
                    {allAlphabets.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => setActiveShopTab(letter)}
                        className={`
                          ${activeShopTab === letter 
                            ? "bg-orange-500 text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } 
                          text-sm px-3 py-1.5 rounded font-medium whitespace-nowrap transition-all duration-150 ease-in-out
                          hover:scale-[1.03] hover:shadow-md active:scale-95 flex-shrink-0
                        `}
                      >
                        {letter}
                      </button>
                    ))}
                    <button
                      onClick={() => setActiveShopTab("0-9")}
                      className={`
                        ${activeShopTab === "0-9" 
                          ? "bg-orange-500 text-white" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } 
                        text-sm px-3 py-1.5 rounded font-medium whitespace-nowrap transition-all duration-150 ease-in-out
                        hover:scale-[1.03] hover:shadow-md active:scale-95 flex-shrink-0
                      `}
                    >
                      0-9
                    </button>
                  </div>
                </div>
                {/* Stores list */}
                <div className="space-y-2 text-gray-700 max-h-80 overflow-y-auto">
                  {storesForActiveTab.length > 0 ? (
                    storesForActiveTab.map((store, i) => (
                      <div 
                        key={i} 
                        className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleStoreClick(store._id)}
                      >
                        <span>{store.storeName}</span>
                        <span className="text-xs text-orange-500">View Codes &gt;</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No stores found for "{activeShopTab}"
                    </div>
                  )}
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
            {!loadingDeals && filteredDeals.length > 0 ? (
              filteredDeals.map((coupon, i) => (
                <CouponCard 
                  key={i} 
                  coupon={coupon} 
                  onClickTerms={setSelectedCoupon} 
                />
              ))
            ) : !loadingDeals && filteredDeals.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">😔</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No deals found</h3>
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
          </div>
        </div>
      </div>

      {/* Deal Modal */}
      <DealModal 
        deal={selectedCoupon}
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />
    </div>
  );
}