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
} from "lucide-react";

export const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Proof Metrics Belt */}
      <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-white/5 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
          <div className="flex flex-col items-center">
            <div className="font-heading text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">
              42M+
            </div>
            <div className="text-sm text-on-surface-variant mt-1">
              Files delivered directly to identities
            </div>
            <div className="font-mono text-xs text-primary mt-1">// zero spam bounces</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-heading text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">
              1.8M
            </div>
            <div className="text-sm text-on-surface-variant mt-1">
              Engineers, studios & digital teams
            </div>
            <div className="font-mono text-xs text-secondary mt-1">// 180+ countries active</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-heading text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">
              0 Byte
            </div>
            <div className="text-sm text-on-surface-variant mt-1">
              Central payload data retained
            </div>
            <div className="font-mono text-xs text-tertiary mt-1">// mathematical privacy guarantee</div>
          </div>
        </div>

        {/* Creator Belt */}
        <div className="pt-8 flex flex-col items-center gap-4">
          <span className="font-mono text-xs text-outline uppercase tracking-widest">
            Trusted by creators across bleeding-edge stacks
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 text-on-surface-variant/60 font-heading text-sm font-semibold tracking-wider">
            <div className="flex items-center gap-1.5 hover:text-on-surface transition-colors cursor-default">
              <Layers className="w-4 h-4" />
              <span>SYNTHESIS</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-on-surface transition-colors cursor-default">
              <Cpu className="w-4 h-4" />
              <span>KINETIC LABS</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-on-surface transition-colors cursor-default">
              <Radio className="w-4 h-4" />
              <span>MONOLITH 3D</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-on-surface transition-colors cursor-default">
              <Network className="w-4 h-4" />
              <span>VECTOR MOTION</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-on-surface transition-colors cursor-default">
              <AudioWaveform className="w-4 h-4" />
              <span>NEBULA AUDIO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Architecture */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Architecture Highlights
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-on-surface mt-3">
            Architected for frictionless velocity.
          </h2>
          <p className="text-sm text-on-surface-variant mt-2">
            Old file sharing makes links that get lost in Slack threads or email filters. Beam targets the person directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento 1: Direct Username */}
          <div className="md:col-span-7 bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary mb-4">
                <AtSign className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-on-surface mb-2">
                Direct Username Delivery
              </h3>
              <p className="text-sm text-on-surface-variant max-w-lg mb-6 leading-relaxed">
                No expired download links, no messy URL shorteners trapped in spam quarantine. Recipients receive immediate desktop pings and approve payloads with one keystroke.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-mono text-xs font-bold">
                    @e
                  </div>
                  <div>
                    <div className="text-xs font-medium text-on-surface">@elena Desktop Terminal</div>
                    <div className="font-mono text-[10px] text-outline">Push Notification • Just now</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] bg-secondary-container/30 text-secondary px-2.5 py-0.5 rounded-full">
                  Incoming Stream
                </span>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="font-mono text-on-surface truncate pr-2">
                  @alex_creative sent: reel_final_render.mov (4.8 GB)
                </span>
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-medium shrink-0">
                  Accept Beam
                </span>
              </div>
            </div>
          </div>

          {/* Bento 2: Zero-Knowledge */}
          <div className="md:col-span-5 bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-on-surface mb-2">
                Zero-Knowledge Vaulting
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Encrypted end-to-end with ephemeral AES-256 keys derived locally via recipient public identity keys. Even Beam nodes cannot inspect packet payloads.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-4 font-mono text-xs border border-white/5">
              <div className="text-outline text-[10px] mb-1">// EPHEMERAL RATIO HANDSHAKE</div>
              <div className="text-secondary truncate">KEY: 0x9f4a...88c2:ed25519</div>
              <div className="text-on-surface-variant truncate">SIG: f47b6a4190c12e8b0...e81</div>
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-outline text-[10px]">
                <span>Biometric Key Ring</span>
                <span className="text-secondary flex items-center gap-1 font-medium">
                  <CheckCircle className="w-3 h-3" /> Valid
                </span>
              </div>
            </div>
          </div>

          {/* Bento 3: Mesh Network */}
          <div className="md:col-span-6 bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/5">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-tertiary/20 flex items-center justify-center text-tertiary mb-4">
                <FastForward className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-on-surface mb-2">
                Direct Peer-to-Peer Mesh
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                When both peers are active, data travels over local subnet or direct multi-threaded UDP pipes. Files never queue in slow storage buckets.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <Network className="w-8 h-8 text-tertiary" />
                <div>
                  <div className="text-sm font-medium text-on-surface">Automatic Subnet Tunnel</div>
                  <div className="font-mono text-xs text-outline">NAT Hole Punching • 0ms Proxy Latency</div>
                </div>
              </div>
              <span className="font-mono text-xs text-tertiary bg-tertiary/10 px-2.5 py-1 rounded-full">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Bento 4: Auto Resume */}
          <div className="md:col-span-6 bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/5">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-on-surface mb-2">
                Instant Session Auto-Resume
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Laptop closed midway through a 90 GB ProRes drop? Beam caches chunk bitmaps locally and resumes seamlessly when your connection restores.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm font-medium text-on-surface">Chunk Bitmap Verification</div>
                  <div className="font-mono text-xs text-outline">4,096 / 4,096 Chunks Verified</div>
                </div>
              </div>
              <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                100% INTEGRITY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
