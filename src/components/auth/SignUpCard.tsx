"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AtSign,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Shield,
  ArrowRight,
  Check,
  Zap,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";

export const SignUpCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkHandleAvailability, checkHandleAvailabilityAsync, registerAccount } = useBeamStore();

  const [handle, setHandle] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro">("pro");
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<{ available: boolean; message: string }>({
    available: true,
    message: "Ready",
  });

  useEffect(() => {
    const queryHandle = searchParams.get("handle");
    if (queryHandle) {
      const clean = queryHandle.toLowerCase().replace(/[^a-z0-9._-]/g, "");
      setHandle(clean);
    }
  }, [searchParams]);

  useEffect(() => {
    const clean = handle.trim().toLowerCase();
    if (!clean) {
      setStatus({ available: false, message: "Enter a handle" });
      return;
    }

    const local = checkHandleAvailability(clean);
    if (!local.available) {
      setStatus({ available: false, message: local.reason || "Handle unavailable" });
      return;
    }

    setStatus({ available: true, message: `Checking @${clean}...` });

    const timer = setTimeout(async () => {
      const res = await checkHandleAvailabilityAsync(clean);
      if (res.available) {
        setStatus({ available: true, message: `@${clean} is available!` });
      } else {
        setStatus({ available: false, message: res.reason || "Handle unavailable" });
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [handle, checkHandleAvailability, checkHandleAvailabilityAsync]);

  // Calculate passphrase strength
  const getStrength = (pass: string) => {
    if (!pass) return { label: "Empty", percent: 0, color: "bg-outline" };
    if (pass.length < 6) return { label: "Weak", percent: 25, color: "bg-error" };
    if (pass.length < 12) return { label: "Medium", percent: 55, color: "bg-secondary-container" };
    return { label: "Strong (Entropy: 84 bits)", percent: 90, color: "bg-primary" };
  };

  const strength = getStrength(passphrase);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!status.available) {
      setFormError(status.message);
      return;
    }
    if (!acceptTerms) {
      setFormError("Please accept the Decentralized Service Terms to proceed.");
      return;
    }

    setLoading(true);
    const result = await registerAccount({
      handle,
      fullName,
      email,
      passphrase,
      plan: selectedPlan,
    });
    setLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setFormError(result.error || "Failed to register account.");
    }
  };

  return (
    <div className="relative w-full max-w-4xl bg-surface-container-low/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl overflow-hidden">
      {/* Sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-mono text-xs uppercase tracking-wider mb-3 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          Cryptographic Beam Identity
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-on-surface tracking-tight mb-2">
          Claim your unique{" "}
          <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
            @username
          </span>
        </h1>
        <p className="text-sm text-on-surface-variant max-w-lg">
          Your personal portal to receive and send massive files seamlessly with zero friction.
        </p>
      </div>

      {formError && (
        <div className="w-full mb-6 p-3 rounded-2xl bg-error/15 border border-error/30 text-error text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Handle & Credentials */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Personal Handle Card */}
          <div className="bg-surface-container/60 rounded-2xl p-6 flex flex-col gap-4 border border-white/5">
            <div className="flex items-center justify-between">
              <label htmlFor="handleInput" className="font-heading text-sm font-semibold text-on-surface flex items-center gap-1.5">
                <AtSign className="w-4 h-4 text-primary" />
                Personal Handle
              </label>
              <div
                className={`flex items-center gap-1 px-3 py-0.5 rounded-full font-mono text-xs ${
                  status.available
                    ? "bg-secondary/10 text-secondary border border-secondary/20"
                    : "bg-error/10 text-error border border-error/20"
                }`}
              >
                {status.available ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <AlertCircle className="w-3 h-3" />
                )}
                <span>{status.message}</span>
              </div>
            </div>

            <div className="relative flex items-center rounded-xl bg-surface-container-lowest px-4 py-2.5 border border-white/5 focus-within:border-primary transition-colors">
              <span className="font-mono text-xs text-on-surface-variant select-none mr-1">
                beam.sh/@
              </span>
              <input
                id="handleInput"
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))}
                placeholder="yourhandle"
                maxLength={24}
                className="w-full bg-transparent font-mono text-sm text-primary font-medium focus:outline-none"
              />
              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono">
                P2P ID
              </span>
            </div>

            <div>
              <span className="text-xs text-on-surface-variant block mb-2">Recommended alternatives:</span>
              <div className="flex flex-wrap gap-2">
                {[`${handle || "alex"}.vault`, `hyper_${handle || "alex"}`, `${handle || "alex"}_p2p`, `${handle || "alex"}_beam`].map((alt) => (
                  <button
                    key={alt}
                    type="button"
                    onClick={() => setHandle(alt)}
                    className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-mono text-xs transition-colors flex items-center gap-1 border border-white/5"
                  >
                    <span>@{alt}</span>
                    <Plus className="w-3 h-3 text-primary" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Credentials Card */}
          <div className="bg-surface-container/60 rounded-2xl p-6 flex flex-col gap-4 border border-white/5">
            <span className="font-heading text-sm font-semibold text-on-surface flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              Account Credentials
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-surface-container-lowest rounded-xl px-3.5 py-2.5 text-xs text-on-surface placeholder:text-outline focus:outline-none border border-white/5 focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant">Work or Personal Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@nexuslabs.studio"
                  className="w-full bg-surface-container-lowest rounded-xl px-3.5 py-2.5 text-xs text-on-surface placeholder:text-outline focus:outline-none border border-white/5 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Passphrase */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-on-surface-variant">Cryptographic Passphrase</label>
                <span className="font-mono text-xs text-primary font-medium">{strength.label}</span>
              </div>
              <div className="relative flex items-center bg-surface-container-lowest rounded-xl px-3.5 py-2 border border-white/5 focus-within:border-primary transition-colors">
                <input
                  type={showPassphrase ? "text" : "password"}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="orbit-vortex-lumina-99"
                  className="w-full bg-transparent font-mono text-xs text-on-surface focus:outline-none pr-8 tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase(!showPassphrase)}
                  className="absolute right-3 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassphrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength bar */}
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-outline font-mono mt-0.5">
                <span>ChaCha20-Poly1305 end-to-end encrypted key</span>
                <span>16+ characters recommended</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pipeline Selection & Dispatch */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-surface-container/60 rounded-2xl p-6 flex flex-col gap-4 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-semibold text-on-surface">Select Pipeline</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                Flexible
              </span>
            </div>

            {/* Plans */}
            <div className="flex flex-col gap-3">
              {/* Community Free */}
              <div
                onClick={() => setSelectedPlan("free")}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedPlan === "free"
                    ? "bg-surface-container-high border-primary/50 shadow-md"
                    : "bg-surface-container-lowest border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedPlan === "free" ? "border-primary bg-primary" : "border-outline"
                      }`}
                    >
                      {selectedPlan === "free" && <Check className="w-3 h-3 text-on-primary" />}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-on-surface">Community Free</h3>
                      <p className="text-xs text-on-surface-variant">Instant zero-cost direct relay</p>
                    </div>
                  </div>
                  <span className="font-heading text-sm font-bold text-on-surface">$0</span>
                </div>
                <ul className="mt-3 pl-7 flex flex-col gap-1 text-xs text-on-surface-variant">
                  <li>• 25GB transfer payload size</li>
                  <li>• Uncapped peer-to-peer line speed</li>
                  <li>• 24-hour peer discovery link validity</li>
                </ul>
              </div>

              {/* Beam Pro */}
              <div
                onClick={() => setSelectedPlan("pro")}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  selectedPlan === "pro"
                    ? "bg-surface-container-high border-primary/60 shadow-lg"
                    : "bg-surface-container-lowest border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedPlan === "pro" ? "border-primary bg-primary" : "border-outline"
                      }`}
                    >
                      {selectedPlan === "pro" && <Check className="w-3 h-3 text-on-primary" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading text-sm font-semibold text-on-surface">Beam Pro</h3>
                        <span className="px-1.5 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-mono text-[9px] uppercase">
                          Popular
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">High-volume teams & creators</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-sm font-bold text-on-surface">$14</span>
                    <span className="text-xs text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="mt-3 pl-7 flex flex-col gap-1 text-xs text-on-surface">
                  <li>• 250GB active pipeline payload</li>
                  <li>• Custom brand styling & verified badge</li>
                  <li>• Permanent handle lock & custom domain</li>
                </ul>
              </div>
            </div>

            {/* Zero-knowledge callout */}
            <div className="p-3 rounded-xl bg-surface-container-lowest flex items-center gap-3 border border-white/5">
              <Zap className="w-5 h-5 text-secondary shrink-0" />
              <div className="text-xs">
                <span className="font-medium text-on-surface block">Zero-Knowledge Relay</span>
                <span className="text-on-surface-variant font-mono text-[10px]">
                  Beam never inspects, retains, or logs byte streams.
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div className="flex flex-col gap-4">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-on-surface-variant leading-relaxed select-none">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 rounded border-white/20 text-primary accent-primary"
              />
              <span>
                I accept the <span className="text-on-surface underline">Decentralized Service Terms</span> and confirm agreement with the zero-log <span className="text-on-surface underline">Privacy Protocol</span>.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !status.available}
              className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-heading text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{loading ? "Securing Handshake..." : "Create Account & Claim Handle"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Footer Gateway Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-8 border-t border-white/5 text-xs text-on-surface-variant gap-3">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span>Gateway Node: Frankfurt-01 (18ms ping)</span>
        </div>
        <div>
          Already registered?{" "}
          <Link href="/login" className="text-primary hover:text-secondary font-medium ml-1 transition-colors">
            Sign in to Beam →
          </Link>
        </div>
      </div>
    </div>
  );
};
