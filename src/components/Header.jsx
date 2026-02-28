"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoAddCircleOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import AuthModal from "./AuthModal";
import SubmitCouponModal from "./SubmitCouponModal";
import { clearSession, getStoredToken, getStoredUser } from "@/utils/session";
import { logoutUser } from "@/api/authApi";
import { fetchStores } from "@/api/storeApi";

import Logo from "../../public/Logo.gif";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stores = [], status: storesStatus } = useSelector((state) => state.stores || {});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [storeQuery, setStoreQuery] = useState("");
  const [showStoreResults, setShowStoreResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const syncAuthState = () => {
      setCurrentUser(getStoredUser());
    };
    syncAuthState();
    window.addEventListener("auth-state-changed", syncAuthState);
    return () => window.removeEventListener("auth-state-changed", syncAuthState);
  }, [authModalOpen, submitModalOpen]);

  useEffect(() => {
    if (storesStatus === "idle" || (storesStatus !== "loading" && stores.length === 0)) {
      dispatch(fetchStores());
    }
  }, [dispatch, storesStatus, stores.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowStoreResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStores = useMemo(() => {
    const query = storeQuery.trim().toLowerCase();
    if (!query) return [];
    return stores
      .filter((store) => String(store.storeName || "").toLowerCase().includes(query))
      .slice(0, 8);
  }, [stores, storeQuery]);

  const handleStoreSelect = (storeId) => {
    setStoreQuery("");
    setShowStoreResults(false);
    router.push(`/store/${storeId}`);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && filteredStores.length > 0) {
      event.preventDefault();
      handleStoreSelect(filteredStores[0]._id);
    }
  };

  const isLoggedIn = Boolean(currentUser?.id);
  const isAdmin = currentUser?.role === "admin";

  const handleLogout = async () => {
    try {
      const token = getStoredToken();
      if (token) {
        await logoutUser(token);
      }
    } catch {
      // ignore API errors for client logout
    } finally {
      clearSession();
      setCurrentUser(null);
      setMobileOpen(false);
      setAdminOpen(false);
      window.dispatchEvent(new Event("auth-state-changed"));
    }
  };

  const navLinks = [
    { name: "Stores", href: "/stores", icon: HiOutlineBuildingStorefront },
    { name: "Categories", href: "/category", icon: BiCategoryAlt },
    { name: "Blog", href: "/blogs", icon: FaRegNewspaper },
  ];

  const adminLinks = [
    { name: "Homepage Info", href: "/admin/homepage" },
    { name: "Add Deals", href: "/admin/deals" },
    { name: "Add Store", href: "/admin/store" },
    { name: "Add Category", href: "/admin/category" },
    { name: "Add Blogs", href: "/admin/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-[var(--brand-primary)] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ================= TOP ROW ================= */}
        <div className="flex items-center justify-between py-4 gap-3">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src={Logo} alt="Logo" width={130} height={40} />
          </Link>

          {/* Search (VISIBLE ON ALL SCREENS) */}
          <div ref={searchRef} className="flex flex-1 max-w-xl relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Store"
              value={storeQuery}
              onChange={(e) => {
                setStoreQuery(e.target.value);
                setShowStoreResults(true);
              }}
              onFocus={() => setShowStoreResults(true)}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-white/95 text-gray-700 pl-10 pr-4 py-2.5 rounded-full text-sm
              focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]"
            />
            {showStoreResults && storeQuery.trim() ? (
              <div className="absolute left-0 right-0 top-[110%] bg-white border border-gray-200 rounded-xl shadow-lg z-[11000] max-h-72 overflow-y-auto">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <button
                      key={store._id}
                      type="button"
                      onClick={() => handleStoreSelect(store._id)}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-100 text-sm"
                    >
                      {store.storeName}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-500">No store found</p>
                )}
              </div>
            ) : null}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Admin dropdown */}
            {isAdmin ? (
              <div className="relative">
                <button
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="flex items-center gap-1 font-medium text-white/90 hover:text-[var(--brand-secondary)]"
                >
                  <MdAdminPanelSettings className="text-lg" />
                  Admin
                  <IoChevronDownOutline />
                </button>

                {adminOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg overflow-hidden z-[10000]">
                    {adminLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setAdminOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {/* Login */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="text-sm font-medium text-white/90 hover:text-[var(--brand-secondary)]"
                >
                  {currentUser?.fullName}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="font-medium text-white/85 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 text-white font-medium hover:text-[var(--brand-secondary)]"
              >
                <FiUser />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl shrink-0 text-white"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* ================= BOTTOM ROW (DESKTOP ONLY) ================= */}
        <div className="hidden md:flex items-center justify-between py-3">
          {/* Nav */}
          <div className="flex gap-10 font-medium text-white/90">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 hover:text-[var(--brand-secondary)] transition"
              >
                <Icon />
                <span className="hover:underline">{name}</span>
              </Link>
            ))}
          </div>

          {/* Submit */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setSubmitModalOpen(true)}
              className="flex items-center gap-2 text-white bg-[var(--brand-secondary)]
              px-5 py-2 rounded-full font-medium
              hover:bg-[#0e9674] hover:scale-105 transition"
            >
              <IoAddCircleOutline />
              Submit a Coupon
            </button>
          ) : null}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-xl px-6 py-4 space-y-4 z-[9999]">
          {/* Nav Links */}
          {navLinks.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block font-medium text-[var(--brand-primary)]"
            >
              {name}
            </Link>
          ))}

          {/* Admin */}
          {isAdmin ? (
            <div>
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="flex justify-between w-full font-medium text-[var(--brand-primary)]"
              >
                Admin
                <IoChevronDownOutline
                  className={`transition ${adminOpen ? "rotate-180" : ""}`}
                />
              </button>

              {adminOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {adminLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-[var(--brand-primary)]/85"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/profile");
                }}
                className="block font-medium text-[var(--brand-primary)]"
              >
                My Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="block font-medium text-[var(--brand-primary)]"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setAuthModalOpen(true);
              }}
              className="block font-medium text-[var(--brand-primary)]"
            >
              Login
            </button>
          )}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSubmitModalOpen(true);
              }}
              className="flex justify-center items-center gap-2 bg-[var(--brand-secondary)] text-white py-2 rounded-full"
            >
              <IoAddCircleOutline />
              Submit a Coupon
            </button>
          ) : null}
        </div>
      )}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <SubmitCouponModal isOpen={submitModalOpen} onClose={() => setSubmitModalOpen(false)} />
    </header>
  );
}
