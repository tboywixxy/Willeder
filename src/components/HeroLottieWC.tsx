// src/components/HeroLottie.tsx
"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HeroLottie() {
  return (
    <DotLottieReact
      src="https://lottie.host/784bd02b-0fad-4e72-be4c-64a6b467d7da/33j2vM9iBl.lottie"
      autoplay
      loop
      // 100% of the parent box; alpha 00 keeps canvas transparent
      style={{ width: "100%", height: "100%" }}
      backgroundColor="#00000000"
      speed={1}
    />
  );
}
