"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import ScrollToTop from "./ScrillToTop";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide header on these routes
  const hideHeaderRoutes = ["/login", "/signup"];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main className={`${!shouldHideHeader ? "pt-20" : ""}`}>
        <div className="mt-2 max-w-[90%] mx-auto">
          {children}
          <ScrollToTop />
        </div>
      </main>
    </>
  );
}
