"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals, deleteDealById } from "../../../features/deal/dealSlice";
import AddForm from "../../../components/DealForm";
import { Toaster } from "react-hot-toast";
import BulkDealUpload from "@/components/BulkDealUpload";
import {
  approveCouponWithEdits,
  getPendingCoupons,
  rejectCoupon,
  updatePendingCoupon,
} from "@/api/couponSubmissionApi";
import { getStoredUser } from "@/utils/session";
const pendingInitialForm = {
  dealTitle: "",
  dealDescription: "",
  dealStore: "",
  dealImage: "",
  dealLogo: "",
  dealTag: "",
  dealCategory: "",
  dealCode: "",
  redirectLink: "",
  expirationDate: "",
  dealSection: "None",
};
const DealList = () => {
  const dispatch = useDispatch();
  const { deals = [], status, error } = useSelector((state) => state.deals);
  const [editingDeal, setEditingDeal] = useState(null); // 👈 store deal being edited
  const [pendingCoupons, setPendingCoupons] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [selectedPending, setSelectedPending] = useState(null);
  const [pendingForm, setPendingForm] = useState(pendingInitialForm);
  const [pendingActionLoading, setPendingActionLoading] = useState(false);

  const loadPendingCoupons = async () => {
    try {
      setLoadingPending(true);
      const response = await getPendingCoupons();
      setPendingCoupons(response?.data || []);
    } catch {
      setPendingCoupons([]);
    } finally {
      setLoadingPending(false);
    }
  };

  useEffect(() => {
    const user = getStoredUser();
    if (!user || user.role !== "admin") return;
    dispatch(fetchDeals());
    loadPendingCoupons();
  }, [dispatch]);

  const openPendingEditor = (item) => {
    setSelectedPending(item);
    setPendingForm({
      dealTitle: item.dealTitle || "",
      dealDescription: item.dealDescription || "",
      dealStore: item.dealStore || "",
      dealImage: item.dealImage || "",
      dealLogo: item.dealLogo || "",
      dealTag: item.dealTag || "",
      dealCategory: item.dealCategory || "",
      dealCode: item.dealCode || "",
      redirectLink: item.redirectLink || "",
      expirationDate: item.expirationDate?.slice(0, 10) || "",
      dealSection: item.dealSection || "None",
    });
  };

  const closePendingEditor = () => {
    setSelectedPending(null);
    setPendingForm(pendingInitialForm);
    setPendingActionLoading(false);
  };

  const handlePendingFieldChange = (event) => {
    const { name, value } = event.target;
    setPendingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePendingEdits = async () => {
    if (!selectedPending?._id) return;
    setPendingActionLoading(true);
    await updatePendingCoupon(selectedPending._id, pendingForm);
    await loadPendingCoupons();
    setPendingActionLoading(false);
  };

  const handleApprove = async (id, payload = null) => {
    await approveCouponWithEdits(id, payload || {});
    await loadPendingCoupons();
    dispatch(fetchDeals());
    if (selectedPending?._id === id) {
      closePendingEditor();
    }
  };

  const handleReject = async (id) => {
    await rejectCoupon(id);
    await loadPendingCoupons();
    if (selectedPending?._id === id) {
      closePendingEditor();
    }
  };

  if (status === "loading") return <p className="text-center">Loading deals...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Deals</h2>
      <BulkDealUpload />

      <div className="overflow-x-auto shadow-md rounded-lg bg-white mb-10">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Pending Coupon Approvals</h3>
        </div>
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-orange-50 to-orange-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Store</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Submitted By</th>
              <th className="border p-3 text-left">Created</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingPending ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  Loading pending coupons...
                </td>
              </tr>
            ) : pendingCoupons.length > 0 ? (
              pendingCoupons.map((item, i) => (
                <tr
                  key={item._id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-orange-50 transition`}
                >
                  <td className="border p-3 font-medium">{item.dealTitle}</td>
                  <td className="border p-3">{item.dealStore}</td>
                  <td className="border p-3">{item.dealCategory || "-"}</td>
                  <td className="border p-3">{item.submittedBy?.email || "-"}</td>
                  <td className="border p-3">{item.createdAt?.slice(0, 10)}</td>
                  <td className="border p-3 text-center space-x-3">
                    <button
                      onClick={() => openPendingEditor(item)}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition"
                    >
                      View/Edit
                    </button>
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="text-green-600 hover:text-green-800 font-semibold transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item._id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No pending coupon submissions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedPending ? (
        <div
          className="fixed inset-0 z-[11000] bg-black/45 flex items-center justify-center p-4"
          onClick={closePendingEditor}
        >
          <div
            className="w-full max-w-3xl rounded-xl bg-white shadow-2xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Review Pending Coupon</h3>
              <button type="button" onClick={closePendingEditor} className="text-gray-500 hover:text-black">
                x
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="dealTitle" value={pendingForm.dealTitle} onChange={handlePendingFieldChange} placeholder="Deal Title" className="border p-2 rounded" />
              <input name="dealStore" value={pendingForm.dealStore} onChange={handlePendingFieldChange} placeholder="Store" className="border p-2 rounded" />
              <input name="dealCategory" value={pendingForm.dealCategory} onChange={handlePendingFieldChange} placeholder="Category" className="border p-2 rounded" />
              <input name="dealTag" value={pendingForm.dealTag} onChange={handlePendingFieldChange} placeholder="Tag" className="border p-2 rounded" />
              <input name="dealCode" value={pendingForm.dealCode} onChange={handlePendingFieldChange} placeholder="Code" className="border p-2 rounded" />
              <input name="redirectLink" value={pendingForm.redirectLink} onChange={handlePendingFieldChange} placeholder="Redirect Link" className="border p-2 rounded" />
              <input name="dealImage" value={pendingForm.dealImage} onChange={handlePendingFieldChange} placeholder="Deal Image URL" className="border p-2 rounded" />
              <input name="dealLogo" value={pendingForm.dealLogo} onChange={handlePendingFieldChange} placeholder="Deal Logo URL" className="border p-2 rounded" />
              <input name="expirationDate" value={pendingForm.expirationDate} onChange={handlePendingFieldChange} type="date" className="border p-2 rounded" />
              <select name="dealSection" value={pendingForm.dealSection} onChange={handlePendingFieldChange} className="border p-2 rounded">
                <option value="1st Section">1st Section</option>
                <option value="2nd Section">2nd Section</option>
                <option value="3rd Section">3rd Section</option>
                <option value="4th Section">4th Section</option>
                <option value="None">None</option>
              </select>
              <textarea
                name="dealDescription"
                value={pendingForm.dealDescription}
                onChange={handlePendingFieldChange}
                placeholder="Description"
                className="border p-2 rounded md:col-span-2 min-h-[90px]"
              />
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Submitted by: {selectedPending.submittedBy?.fullName || "-"} ({selectedPending.submittedBy?.email || "-"})
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => handleReject(selectedPending._id)}
                className="px-4 py-2 rounded border border-red-500 text-red-600 hover:bg-red-50"
                disabled={pendingActionLoading}
              >
                Reject
              </button>
              <button
                onClick={handleSavePendingEdits}
                className="px-4 py-2 rounded border border-blue-500 text-blue-600 hover:bg-blue-50"
                disabled={pendingActionLoading}
              >
                Save Edits
              </button>
              <button
                onClick={() => handleApprove(selectedPending._id, pendingForm)}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={pendingActionLoading}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      ) : null}

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
