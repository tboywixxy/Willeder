// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Willeder",
    template: "%s | Willeder",
  },
  description: "Willeder — Design, Engineering, and thoughtful product delivery.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "Willeder",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  // Helps Lighthouse (and Android address bar color)
  other: { "theme-color": "#ffffff" },
  // Be explicit; Next sets one automatically but this keeps LH happy in some runs
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* LCP improvement for remote images */}
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
