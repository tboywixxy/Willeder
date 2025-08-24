import type { Metadata } from "next";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalPageLoader from "../../components/ui/GlobalPageLoader";

export const metadata: Metadata = {
  title: "Willeder Blog",
  description: "Frontend test — static skeleton",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Force light UI so iOS/macOS don’t auto-darken */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Global overlay spinner */}
        <GlobalPageLoader />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
