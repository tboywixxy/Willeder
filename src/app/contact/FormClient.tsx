// src/app/contact/FormClient.tsx
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
  const [canSubmit, setCanSubmit] = useState(false);
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

  // Track validity of the form
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const updateValidity = () => setCanSubmit(form.checkValidity());

    updateValidity();
    form.addEventListener("input", updateValidity);
    form.addEventListener("change", updateValidity);

    return () => {
      form.removeEventListener("input", updateValidity);
      form.removeEventListener("change", updateValidity);
    };
  }, []);

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
            bannerOpen
              ? "translate-y-2 opacity-100"
              : "-translate-y-[150%] opacity-0",
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
              setCanSubmit(formEl.checkValidity());
            } else {
              setStatus("error");
              showBanner("error", data?.error || "Something went wrong.");
            }
          } catch {
            setStatus("error");
            showBanner("error", "Network error. Please try again.");
          }
        }}
        className="mx-auto w-full flex flex-col items-center gap-6"
        noValidate
        aria-live="polite"
      >
        {children}

        {/* Submit button goes here */}
        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className={`px-6 py-2 rounded-md text-white font-medium transition 
            ${!canSubmit || status === "sending"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
}
