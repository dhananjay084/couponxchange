'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { fetchStores } from '@/api/storeApi'
import { LiaStoreSolid } from 'react-icons/lia'
import { HiChevronRight } from 'react-icons/hi'

const alphabets = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0-9']

const Page = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { stores = [], status, error } = useSelector((state) => state.stores)

  // Refs for scrolling
  const sectionRefs = useRef({})

  useEffect(() => {
    dispatch(fetchStores())
  }, [dispatch])

  // Group stores alphabetically
  const groupedStores = useMemo(() => {
    const groups = Object.fromEntries(alphabets.map(l => [l, []]))

    stores.forEach(store => {
      const name = store.storeName?.trim()
      if (!name || !store._id) return

      const firstChar = name[0].toUpperCase()
      const key = /^[A-Z]$/.test(firstChar) ? firstChar : '0-9'

      groups[key].push({
        id: store._id,
        name,
        offers: store.totalOffers || 0,
      })
    })

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }, [stores])

  const handleAlphabetClick = (letter) => {
    sectionRefs.current[letter]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleStoreClick = (id) => {
    router.push(`/store/${id}`)
  }

  if (status === 'loading') {
    return <p className="text-center py-10">Loading stores...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>
  }

  return (
    <>
      {/* Header */}
      <div className="mt-12 rounded-md  bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">
          All Stores – Grab the Latest Coupons & Promo Codes
        </h1>
        <p className="text-gray-600 mt-1">
          Explore all our retailers and find verified codes in seconds.
        </p>
      </div>

      {/* Alphabet Selector */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 py-4 ">
        {alphabets.map(letter => (
          <button
            key={letter}
            onClick={() => handleAlphabetClick(letter)}
            className="w-10 h-10 rounded-full font-bold transition
              bg-gray-200 hover:bg-black hover:text-white"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* All Alphabet Sections */}
      <div className="mt-10 mb-12 space-y-14">
        {alphabets.map(letter => {
          const storesForLetter = groupedStores[letter] || []

          return (
            <div
              key={letter}
              ref={(el) => (sectionRefs.current[letter] = el)}
              className="scroll-mt-[120px]"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{letter}</h2>
                <span className="text-sm text-gray-500">
                  {storesForLetter.length} Stores
                </span>
              </div>

              {/* Store Cards */}
              {storesForLetter.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                  {storesForLetter.map(store => (
                    <div
                      key={store.id}
                      onClick={() => handleStoreClick(store.id)}
                      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4
                        shadow-sm transition-all duration-300
                        hover:-translate-y-1 hover:shadow-lg 
                        flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {store.name}
                        </h3>
                        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700
                          group-hover:bg-green-200">
                          {store.offers} Offers
                        </span>
                      </div>

                      <HiChevronRight className="text-gray-400 text-xl group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-500">
                  No stores available for {letter}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Page
