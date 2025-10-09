"use client";
import { useState } from "react";
import AnimatedCharacters from "@/components/AnimatedCharacters";

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup((prev) => !prev);

  return (
    <div style={styles.container}>
      {/* Left Side - Animated Characters */}
      <div style={styles.left}>
        <AnimatedCharacters />
      </div>

      {/* Right Side - Login / Signup Form */}
      <div style={styles.right}>
        <form style={styles.form}>
          <h2 style={styles.title}>
            {isSignup ? "Create Account ✨" : "Welcome Back 👋"}
          </h2>
          <p style={styles.subtitle}>
            {isSignup
              ? "Please fill in your details to sign up."
              : "Please enter your credentials to login."}
          </p>

          {isSignup && (
            <>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="Anna Smith"
                style={styles.input}
              />

              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                style={styles.input}
              />
            </>
          )}

          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="anna@gmail.com"
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            style={styles.input}
          />

          {!isSignup && (
            <div style={styles.options}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={styles.link}>
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" style={styles.primaryButton}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <button style={styles.secondaryButton}>
            <span role="img" aria-label="google">
              🔒
            </span>{" "}
            {isSignup ? "Sign up with Google" : "Log in with Google"}
          </button>

          <p style={styles.signup}>
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  style={styles.toggleButton}
                >
                  Log In
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  style={styles.toggleButton}
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#fafafa",
    transition: "all 0.3s ease-in-out",
  },
  left: {
    flex: 1.2,
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "40px",
  },
  right: {
    flex: 1,
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "-5px 0 20px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease-in-out",
  },
  form: {
    width: "100%",
    maxWidth: "360px",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
  },
  title: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "600",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#6b7280",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    marginTop: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    marginBottom: "10px",
    fontSize: "14px",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "13px",
  },
  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#111827",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "10px",
    transition: "0.2s",
  },
  secondaryButton: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    fontSize: "15px",
  },
  signup: {
    marginTop: "16px",
    fontSize: "14px",
    textAlign: "center",
    color: "#6b7280",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#6366f1",
    cursor: "pointer",
    fontWeight: "500",
    textDecoration: "underline",
    fontSize: "14px",
  },
};
