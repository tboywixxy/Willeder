"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

/**
 * Shows a full-screen overlay spinner:
 * - for ~300ms on first mount (page reload)
 * - for ~400ms whenever the route (pathname) changes
 * This gives a smooth transition without flashing.
 */
export default function GlobalPageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true); // show on first load
  const first = useRef(true);

  // First load
  useEffect(() => {
    if (first.current) {
      first.current = false;
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, []);

  // On route change
  useEffect(() => {
    if (!first.current) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-white/80 backdrop-blur-sm">
      <Spinner />
    </div>
  );
}
