"use client";
import React, { useState, useMemo } from "react";
// Removed external imports for react-icons/fa and react-icons/ai
// and replaced them with inline SVG components below for self-containment.

// --- Inline Icon Components ---
// Chevron Down Icon (for collapsible sections)
const ChevronDownIcon = ({ size = 20, className = "" }) => (
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
        <polyline points="6 9 12 15 18 9"></polyline>
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

// --- Filter Data ---
const storeOptions = [
    'Adani One (15)', 'Air India (7)', 'Air India Express (1)', 'AirAsia (3)', 'Akbar Travels (5)', 'Booking.com (20)', 
    'Emirates (4)', 'Expedia (12)', 'Goibibo (9)', 'InterMiles (6)', 'MakeMyTrip (25)', 'Ola (10)', 'OYO (18)', 'RedBus (8)',
    'Skyscanner (11)', 'SpiceJet (2)', 'Thai Airways (3)', 'Vistara (7)', 'Yatra (14)'
];

const categoryOptions = [
    'Tickets (30)', 'Travel (15)', 'Travel VISA (5)', 'Hotels (45)', 'Flights (50)', 'Buses (10)', 'Trains (8)', 'Cabs (12)'
];
// --- End Filter Data ---


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

// Component for the scrollable checkbox list
const FilterSection = ({ title, options, isExpanded, onToggle, selectedItems, onCheckboxChange }) => {
    return (
        <div className="border-b pb-4">
            <button 
                onClick={onToggle} 
                className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 py-2 hover:text-orange-500 transition-colors"
            >
                {title}
                <ChevronDownIcon className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {/* Scrollable Checkbox List */}
            <div 
                className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-60' : 'max-h-0'}`}
                style={{ overflowY: 'auto' }} // Ensures scrollbar appears when expanded
            >
                <div className="space-y-2 pt-2 pr-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center space-x-3 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded-md cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={selectedItems.includes(option)}
                                onChange={() => onCheckboxChange(option)}
                                className="form-checkbox text-orange-500 h-4 w-4 rounded border-gray-300 focus:ring-orange-500"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default function CouponsPage() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL"); // State for main coupon filter
  
  // State for the left sidebar filters (Checkboxes)
  const [expandedStores, setExpandedStores] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle handlers for the collapsible sections
  const toggleStores = () => setExpandedStores(!expandedStores);
  const toggleCategories = () => setExpandedCategories(!expandedCategories);

  // Checkbox change handlers
  const handleStoreChange = (store) => {
    setSelectedStores(prev => 
        prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };


  // Filter coupons based on the activeTab state (original filtering logic)
  const filteredCoupons = useMemo(() => {
    if (activeTab === "ALL") {
      return coupons;
    }
    // Filter logic: match coupon category to the active tab filter name
    // This is currently NOT integrated with the new sidebar filters for simplicity.
    return coupons.filter(c => c.category === activeTab);
  }, [activeTab]);
  
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
        
        {/* Tabs - Interactive for filtering */}
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

        {/* Content Grid: Left Section (Filters) + Right Section (Coupons) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          
          {/* Left Navigation/Filter Section (UPDATED) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 sticky top-4 space-y-6">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Search & Filter</h3>

              {/* 1. Text Field: Search Bar (The single text field) */}
              <div>
                  <label htmlFor="search-term" className="block text-sm font-medium text-gray-700 mb-2">
                      Search Offers
                  </label>
                  <input
                      type="text"
                      id="search-term"
                      placeholder="e.g., Furniture or Shark"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all duration-150"
                  />
              </div>

              {/* 2. Option Field 1: Stores (Scrollable Checkboxes) */}
              <FilterSection 
                  title="Stores" 
                  options={storeOptions} 
                  isExpanded={expandedStores}
                  onToggle={toggleStores}
                  selectedItems={selectedStores}
                  onCheckboxChange={handleStoreChange}
              />

              {/* 3. Option Field 2: Categories (Scrollable Checkboxes) */}
              <FilterSection 
                  title="Categories" 
                  options={categoryOptions} 
                  isExpanded={expandedCategories}
                  onToggle={toggleCategories}
                  selectedItems={selectedCategories}
                  onCheckboxChange={handleCategoryChange}
              />
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
