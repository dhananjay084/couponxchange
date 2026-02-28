"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrillToTop";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/utils/session";
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [canRender, setCanRender] = useState(true);

  // Keep header/footer visible across app; auth now uses modal
  const hideHeaderRoutes = [];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  useEffect(() => {
    const validateAccess = () => {
      if (!pathname.startsWith("/admin")) {
        setCanRender(true);
        return;
      }

      const user = getStoredUser();
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        setCanRender(false);
        router.replace("/");
        return;
      }

      setCanRender(true);
    };

    validateAccess();
    window.addEventListener("auth-state-changed", validateAccess);
    return () => window.removeEventListener("auth-state-changed", validateAccess);
  }, [pathname, router]);

  if (!canRender) return null;

  return (
    <Provider store={store}>
      <>
        {!shouldHideHeader && <Header />}
        <main className={`${!shouldHideHeader ? "pt-20 sm:pt-30" : ""}`}>
          <div className="mt-2 max-w-[95%] mx-auto">
          {children}
          <ScrollToTop />
          </div>
        </main>
        {!shouldHideHeader && <Footer />}
      </>
    </Provider>
  );
}
