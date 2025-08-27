// src/components/Reveal.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  x?: number;           // ⬅️ NEW
  y?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export default function Reveal({
  children,
  delay = 0,
  x = 0,               // ⬅️ NEW default
  y = 16,
  duration = 500,
  className = "",
  as,
  once = true,
  threshold = 0.1,
  rootMargin = "0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(false);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setShow(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show
          ? "translate3d(0,0,0)"
          : `translate3d(${x}px, ${y}px, 0)`,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: show ? undefined : ("opacity, transform" as any),
      }}
    >
      {children}
    </Tag>
  );
}
