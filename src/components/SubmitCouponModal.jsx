"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { fetchStores } from "@/api/storeApi";
import { fetchCategories } from "@/api/categoryApi";
import { submitCoupon } from "@/api/couponSubmissionApi";
import Logo from "../../public/Logo.gif";

const initialForm = {
  dealTitle: "",
  dealImage: "",
  dealLogo: "",
  dealTag: "",
  dealStore: "",
  dealDescription: "",
  dealCategory: "",
  dealCode: "",
  redirectLink: "",
  expirationDate: "",
};

export default function SubmitCouponModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const loadData = async () => {
      try {
        const [storeRes, catRes] = await Promise.all([
          dispatch(fetchStores()).unwrap(),
          dispatch(fetchCategories()).unwrap(),
        ]);
        setStores(storeRes || []);
        setCategories(catRes || []);
      } catch {
        toast.error("Failed to load stores/categories");
      }
    };
    loadData();
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setSubmitting(false);
      setStoreSearch("");
      setCategorySearch("");
    }
  }, [isOpen]);

  const filteredStores = useMemo(() => {
    const query = storeSearch.trim().toLowerCase();
    if (!query) return stores;
    return stores.filter((store) =>
      String(store.storeName || store.name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [stores, storeSearch]);

  const filteredCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((cat) =>
      String(cat.categoryName || cat.name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [categories, categorySearch]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await submitCoupon(formData);
      toast.success("Coupon submitted for admin approval");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to submit coupon");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[11000] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 bg-gradient-to-br from-[var(--brand-tertiary)] via-[var(--brand-tertiary)] to-[var(--brand-tertiary)] p-6 border-r border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <Image src={Logo} alt="CouponXchange" width={110} height={36} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--brand-primary)] leading-tight">
              Submit your best coupon deal
            </h3>
            <p className="mt-3 text-sm text-slate-700/85">
              Share verified coupon details. Our admin team reviews and publishes approved submissions.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <p>1. Fill deal and store details</p>
              <p>2. Add code/link and expiry</p>
              <p>3. Submit for approval</p>
            </div>
          </div>

          <div className="lg:col-span-3 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-gray-800">Submit a Coupon</h4>
              <button type="button" onClick={onClose} className="text-gray-500 hover:text-black">
                x
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="dealTitle"
                  value={formData.dealTitle}
                  onChange={handleChange}
                  placeholder="Deal Title *"
                  className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                  required
                />
                <input
                  name="dealTag"
                  value={formData.dealTag}
                  onChange={handleChange}
                  placeholder="Deal Tag"
                  className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                />
              </div>

              <textarea
                name="dealDescription"
                value={formData.dealDescription}
                onChange={handleChange}
                placeholder="Deal Description"
                className="w-full border p-2.5 rounded-lg min-h-[90px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <input
                    value={storeSearch}
                    onChange={(e) => setStoreSearch(e.target.value)}
                    placeholder="Search Store"
                    className="w-full border p-2.5 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                  />
                  <select
                    name="dealStore"
                    value={formData.dealStore}
                    onChange={handleChange}
                    className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                    required
                  >
                    <option value="">Select Store *</option>
                    {filteredStores.map((store) => (
                      <option key={store._id} value={store.storeName || store.name}>
                        {store.storeName || store.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search Category"
                    className="w-full border p-2.5 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                  />
                  <select
                    name="dealCategory"
                    value={formData.dealCategory}
                    onChange={handleChange}
                    className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                  >
                    <option value="">Select Category</option>
                    {filteredCategories.map((cat) => (
                      <option key={cat._id} value={cat.categoryName || cat.name}>
                        {cat.categoryName || cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="dealCode"
                  value={formData.dealCode}
                  onChange={handleChange}
                  placeholder="Deal Code"
                  className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                />
                <input
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  type="date"
                  className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="redirectLink"
                  value={formData.redirectLink}
                  onChange={handleChange}
                  placeholder="Redirect Link"
                  className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                />
                <input
                  name="dealImage"
                  value={formData.dealImage}
                  onChange={handleChange}
                  placeholder="Deal Image URL"
                  className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
                />
              </div>

              <input
                name="dealLogo"
                value={formData.dealLogo}
                onChange={handleChange}
                placeholder="Deal Logo URL"
                className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[var(--brand-secondary)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0e9674] disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
