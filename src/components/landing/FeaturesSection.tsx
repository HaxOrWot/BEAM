import React from "react";
import {
  AtSign,
  ShieldCheck,
  FastForward,
  RotateCcw,
  CheckCircle,
  Network,
  Clock,
  Layers,
  Cpu,
  Radio,
  AudioWaveform,
  Zap,
  Download,
  FileKey,
  Users,
} from "lucide-react";

export const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 space-y-20">
      {/* Proof Metrics Belt */}
      <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-white/5 text-center relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-50" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/5 relative z-10">
          <div className="flex flex-col items-center group">
            <div className="font-heading text-5xl sm:text-6xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
              42M+
            </div>
            <div className="text-sm text-on-surface-variant mt-1">
              Files delivered directly to identities
            </div>
            <div className="font-mono text-xs text-primary mt-2 bg-primary/10 px-3 py-1 rounded-full">
              // zero spam bounces
            </div>
          </div>

          <div className="flex flex-col items-center group">
            <div className="font-heading text-5xl sm:text-6xl font-bold text-on-surface tracking-tight group-hover:text-secondary transition-colors">
              1.8M
            </div>
            <div className="text-sm text-on-surface-variant mt-1">
              Engineers, studios & digital teams
            </div>
            <div className="font-mono text-xs text-secondary mt-2 bg-secondary/10 px-3 py-1 rounded-full">
              // 180+ countries active
            </div>
          </div>

          <div className="flex flex-col items-center group">
            <div className="font-heading text-5xl sm:text-6xl font-bold text-on-surface tracking-tight group-hover:text-tertiary transition-colors">
              0 Byte
            </div>
            <div className="text-sm text-on-surface-variant mt-1">
              Central payload data retained
            </div>
            <div className="font-mono text-xs text-tertiary mt-2 bg-tertiary/10 px-3 py-1 rounded-full">
              // mathematical privacy guarantee
            </div>
          </div>
        </div>

        {/* Creator Belt */}
        <div className="pt-10 flex flex-col items-center gap-6 relative z-10">
          <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full">
            Trusted by creators across bleeding-edge stacks
          </span>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 text-on-surface-variant/60 font-heading text-sm font-semibold tracking-wider">
            {["SYNTHESIS", "KINETIC LABS", "MONOLITH 3D", "VECTOR MOTION", "NEBULA AUDIO"].map((brand) => (
              <div key={brand} className="flex items-center gap-2 hover:text-on-surface transition-colors cursor-default">
                <div className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid Architecture */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full mb-4">
            Architecture Highlights
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-on-surface mt-4">
            Architected for frictionless velocity.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
            Old file sharing makes links that get lost in Slack threads or email filters. Beam targets the person directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento 1: Direct Username */}
          <div className="md:col-span-2 bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden hover:border-primary/30 transition-all group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:bg-primary/10" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container/30 to-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <AtSign className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-on-surface mb-4">
                Direct Username Delivery
              </h3>
              <p className="text-sm text-on-surface-variant max-w-lg mb-8 leading-relaxed">
                No expired download links, no messy URL shorteners trapped in spam quarantine. Recipients receive immediate desktop pings and approve payloads with one keystroke.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 border border-white/5 space-y-4 relative z-10">
              <div className="flex items-center justify-between p-3 bg-surface-container-high rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-mono text-xs font-bold">
                    @e
                  </div>
                  <div>
                    <div className="text-xs font-medium text-on-surface">@elena Desktop Terminal</div>
                    <div className="font-mono text-[10px] text-outline">Push Notification • Just now</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] bg-secondary-container/30 text-secondary px-3 py-1 rounded-full">
                  Incoming
                </span>
              </div>
              <div className="bg-surface-container-lowest p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="font-mono text-on-surface truncate pr-2">
                  @alex_creative sent: reel_final_render.mov (4.8 GB)
                </span>
                <span className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-medium shrink-0">
                  Accept
                </span>
              </div>
            </div>
          </div>

          {/* Bento 2: Zero-Knowledge */}
          <div className="md:col-span-2 bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden hover:border-secondary/30 transition-all group">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 transition-transform group-hover:bg-secondary/10" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-container/30 to-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-on-surface mb-4">
                Zero-Knowledge Vaulting
              </h3>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                Encrypted end-to-end with ephemeral AES-256 keys derived locally via recipient public identity keys. Even Beam nodes cannot inspect packet payloads.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 font-mono text-xs border border-white/5 relative z-10">
              <div className="text-outline text-[10px] mb-3">// EPHEMERAL HANDSHAKE</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="text-secondary truncate">KEY: 0x9f4a...88c2:ed25519</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-on-surface-variant truncate">SIG: f47b6a4190c12e8b0...</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="font-mono text-xs">Biometric Key Ring</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3 h-3 text-secondary" /> Valid
                </span>
              </div>
            </div>
          </div>

          {/* Bento 3: Mesh Network */}
          <div className="md:col-span-2 bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-tertiary/30 transition-all group">
            <div className="absolute top-0 left-0 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 transition-transform group-hover:bg-tertiary/10" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tertiary-container/30 to-tertiary/20 flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform">
                <FastForward className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-on-surface mb-4">
                Direct Peer-to-Peer Mesh
              </h3>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                When both peers are active, data travels over local subnet or direct multi-threaded UDP pipes. Files never queue in slow storage buckets.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 flex items-center justify-between border border-white/5 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-medium text-on-surface">Automatic Subnet Tunnel</div>
                  <div className="font-mono text-xs text-outline">NAT Hole Punching • 0ms Proxy Latency</div>
                </div>
              </div>
              <div className="bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-full font-medium">
                ACTIVE
              </div>
            </div>
          </div>

          {/* Bento 4: Auto Resume */}
          <div className="md:col-span-2 bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-primary/30 transition-all group">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 transition-transform group-hover:bg-primary/10" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container/30 to-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-on-surface mb-4">
                Instant Session Auto-Resume
              </h3>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                Laptop closed midway through a 90 GB ProRes drop? Beam caches chunk bitmaps locally and resumes seamlessly when your connection restores.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 flex items-center justify-between border border-white/5 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-medium text-on-surface">Chunk Bitmap Verification</div>
                  <div className="font-mono text-xs text-outline">4,096 / 4,096 Chunks Verified</div>
                </div>
              </div>
              <div className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full font-medium">
                100% INTEGRITY
              </div>
            </div>
          </div>

          {/* Bento 5: Batch Uploads */}
          <div className="bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-secondary/30 transition-all group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2 transition-transform group-hover:bg-secondary/10" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-container/30 to-secondary/20 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
                Batch Uploads
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Send multiple files in a single beam. Organize with folders and maintain relationships.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-xs text-on-surface">Bulk transfers</span>
              <Download className="w-5 h-5 text-secondary" />
            </div>
          </div>

          {/* Bento 6: Secure Transfer */}
          <div className="bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-tertiary/30 transition-all group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/2 transition-transform group-hover:bg-tertiary/10" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tertiary-container/30 to-tertiary/20 flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
                <FileKey className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
                Secure Transfer
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Passkey-protected beams with encryption key derivation. Only intended recipients can decrypt.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-xs text-on-surface">Passkey protected</span>
              <FileKey className="w-5 h-5 text-tertiary" />
            </div>
          </div>

          {/* Bento 7: Team Features */}
          <div className="bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-primary/30 transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:bg-primary/10" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-container/30 to-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
                Team Features
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Collaborate with teams. Track transfer history and manage access permissions.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-xs text-on-surface">Team management</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Bento 8: Analytics */}
          <div className="bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-secondary/30 transition-all group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 transition-transform group-hover:bg-secondary/10" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-container/30 to-secondary/20 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
                Real-time Analytics
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Monitor transfer speed, success rates, and peer connectivity in real-time.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-xs text-on-surface">Live telemetry</span>
              <Zap className="w-5 h-5 text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
