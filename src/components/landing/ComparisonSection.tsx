import React from "react";
import { Check, X } from "lucide-react";

export const ComparisonSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-white/5">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest">
              // ARCHITECTURAL SHIFT
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-on-surface mt-1">
              The Death of Link Sharing
            </h3>
            <p className="text-sm text-on-surface-variant max-w-xl mt-1">
              Compare the friction of traditional cloud intermediaries with direct Beam username transmission.
            </p>
          </div>
          <div className="font-mono text-xs bg-surface-container-highest px-3 py-1 rounded-full text-outline border border-white/5">
            Benchmarked across 50 GB payloads
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy Platforms */}
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5 opacity-75">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <span className="font-heading text-base font-semibold text-outline">
                Legacy Link Platforms
              </span>
              <span className="font-mono text-xs text-error">Intermediary Bottleneck</span>
            </div>
            <ul className="space-y-4 text-xs text-on-surface-variant leading-relaxed">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                <span>Uploads must fully complete to third-party servers before the recipient can even begin downloading.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                <span>Links leaked in shared chat channels become accessible to anyone without strict authorization.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                <span>Spam filters frequently isolate download notifications with tracking tokens.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                <span>Third-party providers hold decrypted keys and can audit your private project files.</span>
              </li>
            </ul>
          </div>

          {/* Beam Protocol */}
          <div className="bg-surface-container-high rounded-2xl p-6 border border-primary/20 relative shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="font-heading text-base font-semibold text-primary">
                Beam Username Protocol
              </span>
              <span className="font-mono text-xs text-secondary font-medium">Direct Peer Handshake</span>
            </div>
            <ul className="space-y-4 text-xs text-on-surface leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Streaming P2P: Recipient begins receiving data within 300ms while your upload is still ongoing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Payloads are mathematically bound to the recipient's public key; interception is impossible.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Push notifications pop right onto recipient desktops, phones, or command-line daemons.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>Zero intermediaries. Files vanish from the pipe the instant the final block is digested.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
