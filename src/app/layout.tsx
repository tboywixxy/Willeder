// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalPageLoader from "../../components/ui/GlobalPageLoader";

export const metadata: Metadata = {
  // set this env in Vercel: NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-app.vercel.app"),
  title: "Willeder Blog",
  description: "Frontend test — static skeleton",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <GlobalPageLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
