import React from "react";
import Link from "next/link";
import { Logo } from "@/components/logo/Logo";
import { ShieldCheck, Activity, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Logo size={32} />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Frictionless, end-to-end encrypted direct file transmission to cryptographic identity handles.
              <br />
              <span className="text-primary">Privacy-first. Zero intermediaries. Sub-second routing.</span>
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:hello@beam.sh" className="text-on-surface-variant hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-on-surface mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-on-surface mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-xs text-on-surface-variant hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-on-surface mb-4">Network Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                </span>
                <span className="text-xs text-on-surface">All Systems Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-secondary" />
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-secondary">58ms avg latency</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-primary">AES-256 Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-on-surface-variant font-mono">
            <div className="flex items-center gap-1.5 text-secondary">
              <Activity className="w-3.5 h-3.5" />
              <span>Protocol v5.0 Mesh Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Storage Intermediary</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-outline">
            <span>© 2026 Beam Protocol</span>
            <span>•</span>
            <span className="font-mono">v1.0.92</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
