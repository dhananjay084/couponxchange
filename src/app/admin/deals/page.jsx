"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals, deleteDealById } from "../../../features/deal/dealSlice";
import AddForm from "../../../components/DealForm";
import { Toaster } from "react-hot-toast";

const DealList = () => {
  const dispatch = useDispatch();
  const { deals = [], status, error } = useSelector((state) => state.deals);
  const [editingDeal, setEditingDeal] = useState(null); // 👈 store deal being edited

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  if (status === "loading") return <p className="text-center">Loading deals...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Deals</h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white mb-10">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Store</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Tag</th>
              <th className="border p-3 text-left">Code</th>
              <th className="border p-3 text-left">Redirect Link</th>
              <th className="border p-3 text-left">Expiration</th>
              <th className="border p-3 text-left">Section</th>

              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.length > 0 ? (
              deals.map((deal, i) => (
                <tr
                  key={deal._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="border p-3 font-medium">{deal.dealTitle}</td>
                  <td className="border p-3">{deal.dealStore}</td>
                  <td className="border p-3">{deal.dealCategory}</td>
                  <td className="border p-3">{deal.dealTag}</td>
                  <td className="border p-3">{deal.dealCode}</td>
                  <td className="border p-3">
                    <a
                      href={deal.redirectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Visit
                    </a>
                  </td>
                  <td className="border p-3">{deal.expirationDate?.slice(0, 10)}</td>
                  <td className="border p-3">{deal.dealSection}</td>

                  <td className="border p-3 text-center space-x-3">
                    <button
                      onClick={() => setEditingDeal(deal)} // 👈 set current deal
                      className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteDealById(deal._id)).then(() => dispatch(fetchDeals()))}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  No deals available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pass selected deal to form for editing */}
      <AddForm editingDeal={editingDeal} setEditingDeal={setEditingDeal} />
    </div>
  );
};

export default DealList;
