import React from "react";
import { Check, X, Zap, Link, UploadCloud, Shield, Lock, Activity, Clock } from "lucide-react";

export const ComparisonSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-secondary/5 rounded-bl-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <div>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest">
              // ARCHITECTURAL SHIFT
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-bold text-on-surface mt-2">
              The Death of Link Sharing
            </h3>
            <p className="text-sm sm:text-lg text-on-surface-variant max-w-xl mt-2">
              Compare the friction of traditional cloud intermediaries with direct Beam username transmission.
            </p>
          </div>
          <div className="font-mono text-xs bg-surface-container-highest px-4 py-2 rounded-full text-outline border border-white/5">
            Benchmarked across 50 GB payloads
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Legacy Platforms */}
          <div className="bg-surface-container rounded-2xl p-8 border border-white/5 opacity-80 hover:opacity-100 transition-all">
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                  <Link className="w-5 h-5" />
                </div>
                <span className="font-heading text-base font-semibold text-outline">
                  Legacy Link Platforms
                </span>
              </div>
              <span className="font-mono text-xs text-error">Intermediary Bottleneck</span>
            </div>
            <ul className="space-y-4 text-xs text-on-surface-variant leading-relaxed">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Uploads must fully complete to third-party servers before the recipient can even begin downloading.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Links leaked in shared chat channels become accessible to anyone without strict authorization.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Spam filters frequently isolate download notifications with tracking tokens.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span>Third-party providers hold decrypted keys and can audit your private project files.</span>
              </li>
            </ul>
          </div>

          {/* Beam Protocol */}
          <div className="bg-gradient-to-b from-surface-container-high to-surface-container rounded-2xl p-8 border border-primary/20 relative shadow-2xl shadow-primary/10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-heading text-base font-semibold text-primary">
                  Beam Username Protocol
                </span>
              </div>
              <span className="font-mono text-xs text-secondary font-medium">Direct Peer Handshake</span>
            </div>
            <ul className="space-y-4 text-xs text-on-surface leading-relaxed">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Streaming P2P: Recipient begins receiving data within 300ms while your upload is still ongoing.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Payloads are mathematically bound to the recipient's public key; interception is impossible.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Push notifications pop right onto recipient desktops, phones, or command-line daemons.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Zero intermediaries. Files vanish from the pipe the instant the final block is digested.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-16">
          <h4 className="font-heading text-xl font-semibold text-on-surface text-center mb-8">
            Feature Comparison Matrix
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs text-outline font-mono uppercase tracking-wider">
                  <th className="py-4 px-6">Feature</th>
                  <th className="py-4 px-6 text-error">Legacy Platforms</th>
                  <th className="py-4 px-6 text-secondary">Beam</th>
                </tr>
              </thead>
              <tbody className="text-sm text-on-surface">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium">Delivery Method</td>
                  <td className="py-4 px-6 text-outline">Download link via email/Slack</td>
                  <td className="py-4 px-6 text-secondary flex items-center gap-2">
                    <Check className="w-4 h-4" /> Direct @username to @username
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium">Encryption</td>
                  <td className="py-4 px-6 text-outline">TLS only (in transit)</td>
                  <td className="py-4 px-6 text-secondary flex items-center gap-2">
                    <Lock className="w-4 h-4" /> AES-256-GCM E2EE
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium">Storage</td>
                  <td className="py-4 px-6 text-outline">Cloud storage (days/weeks)</td>
                  <td className="py-4 px-6 text-secondary flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Zero storage • immediate delivery
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium">Transfer Speed</td>
                  <td className="py-4 px-6 text-outline">受限于云带宽</td>
                  <td className="py-4 px-6 text-secondary flex items-center gap-2">
                    <Activity className="w-4 h-4" /> P2P mesh • up to 1.2 GB/s
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium">Expiry</td>
                  <td className="py-4 px-6 text-outline">Fixed duration (often expires)</td>
                  <td className="py-4 px-6 text-secondary flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Configurable TTL (1h-72h)
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium">Access Control</td>
                  <td className="py-4 px-6 text-outline">Link-only • easily shared</td>
                  <td className="py-4 px-6 text-secondary flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Passkey-protected • recipient-only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
