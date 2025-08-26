"use client";
import Script from "next/script";

export default function HeroLottieWC() {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        strategy="afterInteractive"
      />
      <dotlottie-player
        src="https://lottie.host/784bd02b-0fad-4e72-be4c-64a6b467d7da/33j2vM9iBl.lottie"
        autoplay
        loop
        style={{ width: "100%", height: "100%", background: "transparent", display: "block" }}
        aria-label="Hero animation"
      />
    </>
  );
}
