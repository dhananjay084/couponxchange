"use client";

import { useEffect, useState } from "react";
import { loginUser, signupUser } from "@/api/authApi";
import AnimatedCharacters from "@/components/AnimatedCharacters";
import { setSession } from "@/utils/session";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setMessage("");
      setLoading(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        password: "",
      });
      setIsSignup(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      let response;
      if (isSignup) {
        response = await signupUser({
          ...payload,
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
        });
      } else {
        response = await loginUser(payload);
      }

      const user = response?.data;
      const token = response?.token;
      if (user && token) {
        setSession({ user, token });
        window.dispatchEvent(new Event("auth-state-changed"));
      }
      setMessage(response?.message || (isSignup ? "Signup successful" : "Login successful"));
      setTimeout(() => onClose(), 700);
    } catch (apiError) {
      setError(
        apiError?.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[11000] bg-black/45 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[220px] md:min-h-[520px] bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-12 h-24 w-24 rounded-full bg-orange-300/40" />
              <div className="absolute bottom-16 right-10 h-28 w-28 rounded-full bg-amber-300/40" />
              <div className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/30" />
            </div>

            <div className="relative z-10 flex w-full flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-orange-700 leading-tight">
                Save more with every coupon.
              </h3>
              <p className="mt-3 text-sm text-orange-900/80">
                Login or create your account to unlock personalized deals.
              </p>
              <div className="mt-4 md:mt-auto">
                <AnimatedCharacters />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{isSignup ? "Create account" : "Login"}</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-lg"
                aria-label="Close modal"
              >
                x
              </button>
            </div>

            <form className="space-y-3" onSubmit={onSubmit}>
              {isSignup && (
                <>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={onChange}
                    type="text"
                    placeholder="Full name"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    type="tel"
                    placeholder="Phone (optional)"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </>
              )}

              <input
                name="email"
                value={formData.email}
                onChange={onChange}
                type="email"
                placeholder="Email"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="password"
                value={formData.password}
                onChange={onChange}
                type="password"
                placeholder="Password"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {message ? <p className="text-sm text-green-700">{message}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white rounded-lg py-2.5 font-medium hover:bg-orange-700 disabled:opacity-70"
              >
                {loading ? "Please wait..." : isSignup ? "Sign up" : "Login"}
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignup((prev) => !prev);
                  setError("");
                  setMessage("");
                }}
                className="text-orange-600 hover:underline"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
