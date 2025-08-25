import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        autoplay?: boolean | "";
        loop?: boolean | "";
        background?: string;
        speed?: number | string;
        controls?: boolean | "";
        mode?: "normal" | "bounce" | "reverse";
        // allow any extra attributes
        [key: string]: unknown;
      };
    }
  }
}

export {};
