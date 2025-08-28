import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; // 👈 create this component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CouponXchange",
  description: "Coupons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {/* 👇 add pt for header height + extra margin for gap */}
        <main className="pt-20">  
          <div className="mt-2 max-w-[90%] mx-auto"> {/* ensures 10px gap below header */}
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

