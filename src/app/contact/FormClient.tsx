// app/contact/FormClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Status = "idle" | "sending" | "ok" | "error";

export default function FormClient({ children }: { children: React.ReactNode }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isSending = status === "sending";

  useEffect(() => setMounted(true), []);

  // Show/hide logic + auto-dismiss for ok/error
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;

    if (status === "sending") {
      setToastVisible(true);
    } else if (status === "ok" || status === "error") {
      setToastVisible(true);
      hideTimer = setTimeout(() => {
        setToastVisible(false);
        cleanupTimer = setTimeout(() => {
          setMsg("");
          setStatus("idle");
        }, 300); // match transition
      }, 2000);
    } else if (status === "idle" && !msg) {
      setToastVisible(false);
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (cleanupTimer) clearTimeout(cleanupTimer);
    };
  }, [status, msg]);

  const toastNode =
    mounted &&
    createPortal(
      <div
        className="
          fixed inset-x-0 top-0 z-[2147483647]
          flex justify-center pointer-events-none
        "
        aria-live={status === "sending" ? "polite" : "assertive"}
        aria-atomic="true"
      >
        <div
          className={[
            // compact pill that hugs content
            "mt-4 inline-flex items-center justify-center gap-2",
            "px-4 py-2 rounded-md text-white shadow-lg",
            "w-auto max-w-[90vw] text-center break-words whitespace-pre-line",
            "pointer-events-auto",
            // colors
            status === "ok"
              ? "bg-green-600"
              : status === "error"
              ? "bg-red-600"
              : "bg-gray-800",
            // animation
            "transform transition-all duration-300 ease-out",
            toastVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          ].join(" ")}
          role={status === "error" ? "alert" : "status"}
        >
          {msg}
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {toastNode}

      <form
        ref={formRef}
        action="/api/contact"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          const formEl = e.currentTarget;

          if (!formEl.checkValidity()) {
            setStatus("error");
            setMsg("Please complete all required fields.");
            return;
          }

          setStatus("sending");
          setMsg("Sending…");

          const body = new FormData(formEl);

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              body,
              cache: "no-store",
              headers: { Accept: "application/json" },
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok && (data as any)?.ok) {
              setStatus("ok");
              setMsg("Thanks! Your message has been sent.");
              formEl.reset();
            } else {
              setStatus("error");
              setMsg((data as any)?.error || "Something went wrong.");
            }
          } catch {
            setStatus("error");
            setMsg("Network error. Please try again.");
          }
        }}
        className="mx-auto w-full flex flex-col items-center gap-12 md:gap-14 lg:gap-16 py-6 md:py-8"
        noValidate
        aria-live="polite"
        aria-busy={isSending}
      >
        <fieldset disabled={isSending} className="w-full contents">
          {children}
        </fieldset>
      </form>
    </>
  );
}
