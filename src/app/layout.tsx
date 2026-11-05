import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { StatusHUD } from "@/components/layout/StatusHUD";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PROTO/TCP — Kernel Synchronous Stream Engine",
  description: "Monochrome high-throughput point-to-point data transport and TCP protocol management console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
        <Navbar />
        <StatusHUD />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
