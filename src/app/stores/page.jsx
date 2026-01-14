'use client'
import React, { useEffect, useMemo, useState } from 'react'
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

  const [activeLetter, setActiveLetter] = useState('A')

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
        offers: store.totalOffers || 0 // adjust if API field differs
      })
    })

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }, [stores])

  const activeStores = groupedStores[activeLetter] || []

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
      <div className="mt-12 rounded-md border bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">
          All Stores – Grab the Latest Coupons & Promo Codes
        </h1>
        <p className="text-gray-600 mt-1">
          Explore all our retailers and find verified codes in seconds.
        </p>
      </div>

      {/* Alphabet Selector */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {alphabets.map(letter => (
          <button
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className={`w-10 h-10 rounded-full font-bold transition
              ${
                activeLetter === letter
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 mb-12">
        
        {/* Store Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeStores.length > 0 ? (
            activeStores.map(store => (
              <div
              key={store.id}
              onClick={() => handleStoreClick(store.id)}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4
                         shadow-sm transition-all duration-300
                         hover:-translate-y-1 hover:shadow-lg hover:border-black
                         flex items-center justify-between"
            >
            
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <LiaStoreSolid />
                    {store.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700
                 transition-colors duration-300 group-hover:bg-green-200">
  {store.offers} Offers
</span>

                </div>

                <HiChevronRight className="text-gray-400 text-xl transition-transform duration-300 group-hover:translate-x-1" />

              </div>
            ))
          ) : (
            <p className="italic text-gray-500">
              No stores available for {activeLetter}
            </p>
          )}
        </div>

        {/* Right Side Info */}
        <div className="hidden lg:flex flex-col items-end justify-start">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            Total Stores
          </span>
          <span className="text-3xl font-bold">
            {activeStores.length}
          </span>
        </div>
      </div>
    </>
  )
}

export default Page
