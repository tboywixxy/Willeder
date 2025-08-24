import { Noto_Sans_JP, Jost } from "next/font/google";

export const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["500", "400", "700"],
  display: "swap",
});

