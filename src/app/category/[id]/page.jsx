"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchCategories } from "@/api/categoryApi";
import { fetchDeals } from "@/features/deal/dealSlice";
import CouponCard from "@/components/cards/couponcard";

const normalize = (value) => String(value || "").trim().toLowerCase();

export default function CategoryDealsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories = [], status: categoryStatus } = useSelector((state) => state.categories || {});
  const { deals = [], status: dealStatus } = useSelector((state) => state.deals || {});

  useEffect(() => {
    if (!categories.length && categoryStatus !== "loading") {
      dispatch(fetchCategories());
    }
    if (!deals.length && dealStatus !== "loading") {
      dispatch(fetchDeals());
    }
  }, [dispatch, categories.length, categoryStatus, deals.length, dealStatus]);

  const selectedCategory = useMemo(
    () => categories.find((category) => String(category._id) === String(id)),
    [categories, id]
  );

  const categoryDeals = useMemo(() => {
    if (!selectedCategory) return [];
    const selectedName = normalize(selectedCategory.categoryName);
    return deals.filter((deal) => normalize(deal.dealCategory) === selectedName);
  }, [deals, selectedCategory]);

  const couponCount = useMemo(
    () => categoryDeals.filter((deal) => String(deal?.dealCode || "").trim()).length,
    [categoryDeals]
  );

  const dealsByStore = useMemo(() => {
    const grouped = {};
    categoryDeals.forEach((deal) => {
      const storeName = deal.dealStore || "Other Store";
      if (!grouped[storeName]) grouped[storeName] = [];
      grouped[storeName].push(deal);
    });
    return grouped;
  }, [categoryDeals]);

  if (categoryStatus === "loading" || dealStatus === "loading") {
    return <p className="text-center py-10">Loading category deals...</p>;
  }

  if (!selectedCategory) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-700 mb-4">Category not found.</p>
        <button
          type="button"
          onClick={() => router.push("/category")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="mb-8">
        <Link href="/category" className="text-sm text-blue-600 hover:underline">
          Back to Categories
        </Link>
        <h1 className="text-3xl font-bold mt-2">{selectedCategory.categoryName} Offers & Coupons</h1>
        <p className="text-gray-500 mt-1">
          Showing {categoryDeals.length} offers including {couponCount} coupons, grouped by store.
        </p>
      </div>

      {Object.keys(dealsByStore).length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No offers/coupons available for this category.
        </p>
      ) : (
        Object.entries(dealsByStore).map(([storeName, storeDeals]) => (
          <section key={storeName} className="mb-10">
            <h2 className="text-2xl font-bold px-1 mb-4">{storeName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {storeDeals.map((deal) => (
                <CouponCard
                  key={deal._id}
                  discount={deal.dealTitle || "Deal"}
                  brand={deal.dealStore}
                  description={deal.dealDescription}
                  image={deal.dealImage}
                  logo={deal.dealLogo}
                  exclusive={deal.dealTag}
                  code={deal.dealCode}
                  expiration={deal.expirationDate?.slice(0, 10)}
                  redirectLink={deal.redirectLink}
                  showCoupon={!!deal.dealCode}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
