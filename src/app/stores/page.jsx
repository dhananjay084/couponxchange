'use client'
import React, { useRef } from 'react'
import { LiaStoreSolid } from "react-icons/lia";

const alphabets = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0-9']

const demoData = {
    A: ['AAA', 'Abeka', 'Ace Hardware', 'Apple', 'ASOS', 'AutoZone'],
    B: ['Best Buy', 'Bose', 'Barnes & Noble', 'Brookstone', 'Burlington', 'Bath & Body Works'],
    C: ['Costco', 'Chewy', 'Cabela’s', 'Crocs', 'Champs Sports', 'Claire’s'],
    D: ['Dell', 'DoorDash', 'Dick’s Sporting Goods', 'Dillard’s', 'Dr. Martens'],
    E: ['Etsy', 'eBay', 'Express', 'Everlane', 'Eileen Fisher'],
    F: ['Foot Locker', 'Forever 21', 'Fossil', 'Fanatics', 'Five Below'],
    G: ['GAP', 'GameStop', 'GNC', 'Godiva', 'Guitar Center'],
    H: ['HP', 'H&M', 'Hobby Lobby', 'Harbor Freight', 'Home Depot'],
    I: ['IKEA', 'iHerb', 'iTunes', 'Instacart', 'Icebreaker'],
    J: ['JCPenney', 'Joann', 'J.Crew', 'JetBlue Shop', 'JackThreads'],
    K: ['Kohl’s', 'Kmart', 'Kipling', 'Kroger', 'Kiehl’s'],
    L: ['Lowe’s', 'Lululemon', 'Levi’s', 'LensCrafters', 'LOFT'],
    M: ['Macy’s', 'Microsoft', 'Men’s Wearhouse', 'Mountain Warehouse', 'Marshalls'],
    N: ['Nike', 'Newegg', 'Nordstrom', 'Nautica', 'Nespresso'],
    O: ['Old Navy', 'Office Depot', 'Overstock', 'Onitsuka Tiger', 'Oakley'],
    P: ['Petco', 'Publix', 'Puma', 'Patagonia', 'Panera Bread'],
    Q: ['QVC', 'Quiksilver', 'Qatar Duty Free'],
    R: ['Ralph Lauren', 'REI', 'Ross', 'Reebok', 'Redbubble'],
    S: ['Staples', 'Samsung', 'Skechers', 'Sephora', 'Subway'],
    T: ['Target', 'T-Mobile', 'Timberland', 'Torrid', 'Trader Joe’s'],
    U: ['Ulta', 'Under Armour', 'Uniqlo', 'Urban Outfitters', 'Uber Eats'],
    V: ['Verizon', 'Vans', 'Victoria’s Secret', 'Vivienne Westwood'],
    W: ['Walmart', 'Wayfair', 'Walgreens', 'Wrangler', 'White House Black Market'],
    X: ['Xbox Store', 'Xfinity', 'Xiaomi', 'Xtratuf'],
    Y: ['Yankee Candle', 'Yoox', 'Yeti', 'YSL Beauty'],
    Z: ['Zappos', 'Zales', 'Zara', 'Zenni Optical'],
    '0-9': ['7-Eleven', '99 Ranch', '23andMe', '1Password', '23 Skidoo']
  }

const page = () => {
  const refs = useRef({});

  // Scroll to the section
  const scrollTo = (key) => {
    const section = refs.current[key];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className='rounded-md p-8 mt-12 py-8 border border-gray-300 bg-white px-3 text-black shadow-md'>
        <h1 className='text-[24px] font-bold'>All Stores – Grab the Latest Coupons & Promo Codes</h1>
        <p className='text-[18px]'>Explore all our retailers and find verified codes in seconds.</p>
      </div>

      {/* Alphabet Selector */}
      <div className='flex flex-wrap justify-center mt-8 gap-2'>
        {alphabets.map(letter => (
          <button
            key={letter}
            onClick={() => scrollTo(letter)}
            className='cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#ffbd59] text-white font-bold hover:bg-gray-800 transition'
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Store Sections */}
      <div className='mt-10'>
      {alphabets.map(letter => (
  <div
    key={letter}
    ref={(el) => (refs.current[letter] = el)}
    className='mb-8 scroll-mt-28'  // 👈 Fix applied here
  >
    <h2 className='text-2xl font-bold border-b pb-2 mb-4'>{letter}</h2>
    <ul className='flex flex-wrap gap-3'>
      {demoData[letter]?.map((store, idx) => (
        <li className="rounded-md cursor-pointer relative py-2  overflow-hidden border border-[#ffbd59] bg-white px-3 text-[#ffbd59] shadow-md transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#ffbd59] before:transition-all before:duration-500 hover:text-white hover:shadow-[#ffbd59] hover:before:left-0 hover:before:w-full">
        <span className="relative z-10 flex items-center gap-2"><LiaStoreSolid/>{store}</span>
      </li>
      )) || <li className='text-[#ffbd59] italic'>No stores available</li>}
    </ul>
  </div>
))}

      </div>
    </>
  )
}

export default page
