import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beam — Frictionless P2P File Transit to Any @Username",
  description:
    "Direct peer-to-peer file sharing to cryptographic username handles. End-to-end encrypted, zero links, sub-second routing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-surface text-on-surface antialiased flex flex-col justify-between">
        <Navbar />
        <main className="w-full flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
