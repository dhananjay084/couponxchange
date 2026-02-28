"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { getMyProfile, updateMyProfile } from "@/api/authApi";
import { getMyCoupons } from "@/api/couponSubmissionApi";
import { getStoredUser, setSession, getStoredToken } from "@/utils/session";

const statusBadgeClass = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [couponsLoading, setCouponsLoading] = useState(true);
  const [myCoupons, setMyCoupons] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const localUser = getStoredUser();
    if (!localUser) {
      router.replace("/");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setCouponsLoading(true);
        const [profileRes, couponsRes] = await Promise.all([getMyProfile(), getMyCoupons()]);
        const user = profileRes?.data || localUser;
        setFormData((prev) => ({
          ...prev,
          fullName: user?.fullName || "",
          phone: user?.phone || "",
          email: user?.email || "",
        }));
        setMyCoupons(couponsRes?.data || []);
        setSession({ user, token: getStoredToken() });
        window.dispatchEvent(new Event("auth-state-changed"));
      } catch {
        toast.error("Unable to load profile details");
      } finally {
        setLoading(false);
        setCouponsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
      };
      if (formData.password.trim()) {
        payload.password = formData.password.trim();
      }

      const response = await updateMyProfile(payload);
      const user = response?.data;
      if (user) {
        setSession({ user, token: getStoredToken() });
        window.dispatchEvent(new Event("auth-state-changed"));
      }
      setFormData((prev) => ({ ...prev, password: "" }));
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50 py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6 h-fit border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email (cannot be changed)</label>
                <input
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">New Password (optional)</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Leave empty to keep current password"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-orange-600 text-white rounded-lg py-2.5 font-medium hover:bg-orange-700 disabled:opacity-70"
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Submitted Coupons</h2>
            {couponsLoading ? (
              <p className="text-gray-500">Loading submitted coupons...</p>
            ) : myCoupons.length === 0 ? (
              <p className="text-gray-500">No coupons submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {myCoupons.map((coupon) => (
                  <div key={coupon._id} className="border rounded-xl p-4 hover:shadow-sm transition">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-800">{coupon.dealTitle || "Untitled Deal"}</p>
                        <p className="text-sm text-gray-500">
                          {coupon.dealStore || "Unknown Store"} • {coupon.dealCategory || "No Category"}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          statusBadgeClass[coupon.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Submitted: {coupon.createdAt ? coupon.createdAt.slice(0, 10) : "-"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
