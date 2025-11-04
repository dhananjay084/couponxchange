'use client'
import React, { useRef, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStores } from '@/api/storeApi'
import { LiaStoreSolid } from "react-icons/lia"

const alphabets = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0-9']

const Page = () => {
  const dispatch = useDispatch()
  const { stores = [], status, error } = useSelector((state) => state.stores)
  const refs = useRef({})

  useEffect(() => {
    dispatch(fetchStores())
  }, [dispatch])

  // Group stores alphabetically
  const groupedStores = useMemo(() => {
    const groups = Object.fromEntries(alphabets.map(letter => [letter, []]))
    stores.forEach(store => {
      const name = store.storeName?.trim() || ""
      if (!name) return
      const firstChar = name[0].toUpperCase()
      const key = /^[A-Z]$/.test(firstChar) ? firstChar : '0-9'
      groups[key].push(name)
    })
    return groups
  }, [stores])

  const scrollTo = (key) => {
    const section = refs.current[key]
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (status === "loading") return <p className="text-center py-10">Loading stores...</p>
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>

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
            className='cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#181717] text-white font-bold hover:bg-gray-800 transition'
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
            className='mb-8 scroll-mt-28'
          >
            <h2 className='text-2xl font-bold border-b pb-2 mb-4'>{letter}</h2>
            <ul className='flex flex-wrap gap-3'>
              {groupedStores[letter]?.length > 0 ? (
                groupedStores[letter].map((storeName, idx) => (
                  <li
                    key={idx}
                    className="rounded-md cursor-pointer relative py-2 overflow-hidden border border-[#181717] bg-white px-3 text-[#181717] shadow-md transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#181717] before:transition-all before:duration-500 hover:text-white hover:shadow-[#181717] hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <LiaStoreSolid /> {storeName}
                    </span>
                  </li>
                ))
              ) : (
                <li className='text-[#181717] italic'>No stores available</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Page
