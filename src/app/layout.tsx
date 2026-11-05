import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "PROTO/TCP — Direct TCP Socket Sharing",
  description: "High-performance zero-relay raw TCP/IP chunk streaming over encrypted TLS 1.3 socket pairs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined') {
                  const origError = console.error;
                  console.error = function(...args) {
                    const str = args.map(a => typeof a === 'string' ? a : (a && a.message) || '').join(' ');
                    if (str.includes('bis_skin_checked')) return;
                    origError.apply(console, args);
                  };

                  const origWarn = console.warn;
                  console.warn = function(...args) {
                    const str = args.map(a => typeof a === 'string' ? a : (a && a.message) || '').join(' ');
                    if (str.includes('bis_skin_checked')) return;
                    origWarn.apply(console, args);
                  };

                  const origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, value) {
                    if (name === 'bis_skin_checked') return;
                    return origSetAttr.apply(this, arguments);
                  };

                  const removeBis = (el) => {
                    if (el && el.hasAttribute && el.hasAttribute('bis_skin_checked')) {
                      el.removeAttribute('bis_skin_checked');
                    }
                    if (el && el.children) {
                      for (let i = 0; i < el.children.length; i++) removeBis(el.children[i]);
                    }
                  };
                  removeBis(document.documentElement);
                  const obs = new MutationObserver((mutations) => {
                    for (const m of mutations) {
                      if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked' && m.target) {
                        m.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                  obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-surface text-on-surface antialiased" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
