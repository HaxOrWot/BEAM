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
  title: "BEAM — Frictionless P2P File Transit to Any @Username",
  description:
    "Direct peer-to-peer file sharing to cryptographic username handles. End-to-end encrypted, zero links, sub-second routing.",
  keywords: [
    "p2p file sharing",
    "direct file transfer",
    "encrypted file sharing",
    "username-based sharing",
    "webRTC file transfer",
    "beam protocol",
    "secure file transit",
  ],
  authors: [{ name: "Beam Protocol" }],
  metadataBase: new URL("https://beam.sh"),
  openGraph: {
    title: "BEAM — Frictionless P2P File Transit",
    description:
      "Share files directly to any @username with end-to-end encryption and zero intermediaries.",
    type: "website",
    images: [
      {
        url: "https://beam.sh/og-image.png",
        width: 1200,
        height: 630,
        alt: "BEAM - Peer-to-Peer File Transit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEAM — Frictionless P2P File Transit",
    description:
      "Direct peer-to-peer file sharing to cryptographic username handles.",
    images: ["https://beam.sh/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://beam.sh",
  },
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0a0b10" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BEAM" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
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
