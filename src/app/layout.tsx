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

const extensionAttributeCleaner = `
(() => {
  try {
    const clean = (el) => {
      if (el && el.removeAttribute) {
        el.removeAttribute('bis_skin_checked');
      }
    };
    const cleanAll = () => {
      if (typeof document !== 'undefined') {
        const els = document.querySelectorAll('[bis_skin_checked]');
        for (let i = 0; i < els.length; i++) clean(els[i]);
      }
    };
    cleanAll();
    window.addEventListener('DOMContentLoaded', cleanAll);
    const observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
          clean(m.target);
        } else if (m.addedNodes) {
          for (let j = 0; j < m.addedNodes.length; j++) {
            const n = m.addedNodes[j];
            if (n.nodeType === 1) {
              clean(n);
              if (n.querySelectorAll) {
                const nested = n.querySelectorAll('[bis_skin_checked]');
                for (let k = 0; k < nested.length; k++) clean(nested[k]);
              }
            }
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['bis_skin_checked'],
      childList: true,
      subtree: true,
    });
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jakarta.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: extensionAttributeCleaner }}
        />
      </head>
      <body
        className="min-h-screen bg-surface text-on-surface antialiased flex flex-col justify-between"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="w-full flex-1 pt-20" suppressHydrationWarning>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
