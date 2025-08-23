"use client";

import { useEffect, useRef, useState } from "react";
import Spinner from "../../../components/ui/Spinner"; // adjust path if needed

type Status = "idle" | "sending" | "ok" | "error";
type Kind = "info" | "success" | "error";

export default function FormClient({ children }: { children: React.ReactNode }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerKind, setBannerKind] = useState<Kind>("info");
  const timer = useRef<number | null>(null);

  const showBanner = (kind: Kind, text: string, autoHideMs = 2000) => {
    setBannerKind(kind);
    setMsg(text);
    setBannerOpen(true);

    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    timer.current = window.setTimeout(() => {
      setBannerOpen(false);
      timer.current = null;
    }, autoHideMs);
  };

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="fixed inset-x-0 top-0 z-[999] flex justify-center pointer-events-none">
        <div
          className={[
            "px-4 py-3 rounded-md shadow-md pointer-events-auto",
            "transform transition-transform duration-300 transition-opacity",
            bannerOpen ? "translate-y-2 opacity-100" : "-translate-y-[150%] opacity-0",
            bannerKind === "success"
              ? "bg-green-600 text-white"
              : bannerKind === "error"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-white",
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          {msg}
        </div>
      </div>

      {status === "sending" && (
        <div className="fixed inset-0 z-[1001] grid place-items-center bg-white/60">
          <Spinner label="Sending message…" />
        </div>
      )}

      <form
        ref={formRef}
        action="/api/contact"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          const formEl = e.currentTarget;

          // Let the red button trigger validation; show banner if invalid
          if (!formEl.checkValidity()) {
            setStatus("error");
            showBanner("error", "Please complete all required fields.");
            return;
          }

          setStatus("sending");
          showBanner("info", "Sending…");

          const body = new FormData(formEl);

          try {
            const res = await fetch("/api/contact", { method: "POST", body });
            const data = await res.json();

            if (res.ok && data?.ok) {
              setStatus("ok");
              showBanner("success", "Thanks! Your message has been sent.");
              formEl.reset();
            } else {
              setStatus("error");
              showBanner("error", data?.error || "Something went wrong.");
            }
          } catch {
            setStatus("error");
            showBanner("error", "Network error. Please try again.");
          }
        }}
        /* Key spacing for filling the #F1F2F4 box evenly */
        className="
          mx-auto w-full flex flex-col items-center
          gap-12 md:gap-14 lg:gap-16           /* even vertical rhythm between groups */
          py-6 md:py-8                          /* top/bottom breathing space */
        "
        noValidate
        aria-live="polite"
      >
        {children}
        {/* The red submit button is rendered as part of children in page.tsx */}
      </form>
    </>
  );
}
