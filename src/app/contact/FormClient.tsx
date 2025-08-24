"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function FormClient({ children }: { children: React.ReactNode }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const isSending = status === "sending";

  return (
    <>
      {/* Inline status banner */}
      {msg ? (
        <div
          className={[
            "mx-auto mb-4 max-w-[720px] px-4 py-3 rounded-md text-white",
            status === "ok" ? "bg-green-600" : status === "error" ? "bg-red-600" : "bg-gray-800",
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          {msg}
        </div>
      ) : null}

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
            const data = await res.json();

            if (res.ok && data?.ok) {
              setStatus("ok");
              setMsg("Thanks! Your message has been sent.");
              formEl.reset();
            } else {
              setStatus("error");
              setMsg(data?.error || "Something went wrong.");
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
