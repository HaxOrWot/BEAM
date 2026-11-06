"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Zap,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Fingerprint,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";

export const SignInCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { loginWithCredentials, loginWithPasskey } = useBeamStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; notFound?: boolean; targetHandle?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = identifier.replace(/^@/, "").trim();
    if (!clean) {
      setError({ message: "Please enter your Beam handle or email." });
      return;
    }

    setLoading(true);
    const result = await loginWithCredentials(clean, password);
    setLoading(false);

    if (result.success) {
      router.push(redirectTarget);
    } else {
      setError({
        message: result.error || "Authentication failed.",
        notFound: result.notFound,
        targetHandle: clean,
      });
    }
  };

  const handlePasskeyAuth = async () => {
    setLoading(true);
    setError(null);

    const result = await loginWithPasskey();
    setLoading(false);

    if (result.success) {
      router.push(redirectTarget);
    } else {
      setError({
        message: result.error || "No local passkey found. Claim your handle to register.",
      });
    }
  };

  return (
    <div className="relative w-full max-w-md bg-surface-container/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col items-center">
      {/* Ambient glow */}
      <div className="absolute -top-24 w-72 h-72 rounded-full bg-primary-container/10 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 w-64 h-64 rounded-full bg-secondary/10 blur-[80px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 w-full">
        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-3 shadow-inner text-primary">
          <Zap className="w-6 h-6 fill-primary" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/60 rounded-full mb-2 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="font-mono text-xs text-secondary-fixed-dim uppercase tracking-wider font-semibold">
            Protocol v4.2 Active
          </span>
        </div>
        <h1 className="font-heading text-2xl font-bold text-on-surface">
          Sign in to your Beam account
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          Frictionless peer transit and cryptographic storage
        </p>
      </div>

      {error && (
        <div className="w-full mb-4 p-3 rounded-2xl bg-surface-container-highest border border-error/30 flex flex-col gap-2">
          <div className="flex items-start gap-2 text-error text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error.message}</span>
          </div>
          {error.notFound && error.targetHandle && (
            <Link
              href={`/signup?handle=${encodeURIComponent(error.targetHandle)}`}
              className="inline-flex items-center justify-center gap-1.5 bg-primary-container text-on-primary-container font-heading text-xs font-semibold py-2 px-3 rounded-full hover:bg-primary transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Claim @{error.targetHandle} Now →</span>
            </Link>
          )}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* Handle or Email */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider pl-1">
            Handle or Email
          </label>
          <div className="flex items-center bg-surface-container-lowest rounded-full px-3.5 py-1 border border-white/5 focus-within:border-primary transition-colors">
            <span className="font-mono text-sm text-outline pr-1 select-none">@</span>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="username or email@domain.com"
              className="w-full bg-transparent py-2 text-sm text-on-surface placeholder:text-outline font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
              Keyphrase / Password
            </label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center bg-surface-container-lowest rounded-full px-3.5 py-1 border border-white/5 focus-within:border-primary transition-colors">
            <Lock className="w-4 h-4 text-outline mr-2 shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-transparent py-2 text-sm text-on-surface placeholder:text-outline font-sans focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-outline hover:text-on-surface p-1 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Toggle */}
        <div className="flex items-center justify-between py-1 px-1 select-none">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span className="text-xs text-on-surface-variant">Remember device for 30 days</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={rememberDevice}
            onClick={() => setRememberDevice(!rememberDevice)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
              rememberDevice ? "bg-primary-container" : "bg-surface-container-highest"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 block ${
                rememberDevice
                  ? "bg-on-primary-container translate-x-4"
                  : "bg-outline translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary rounded-full font-heading text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <span>{loading ? "Authenticating..." : "Sign In with Beam ID"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative w-full my-6 flex items-center justify-center">
        <div className="w-full h-px bg-white/10" />
        <span className="absolute px-3 bg-surface-container font-mono text-[10px] text-outline uppercase tracking-wider">
          or passwordless
        </span>
      </div>

      {/* Passwordless Passkey */}
      <div className="w-full flex flex-col gap-2">
        <button
          type="button"
          onClick={handlePasskeyAuth}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-highest text-on-surface rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-white/5"
        >
          <Fingerprint className="w-4 h-4 text-secondary" />
          <span>Authenticate with Device Passkey</span>
        </button>
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center text-xs">
        <Link
          href="/signup"
          className="text-on-surface-variant hover:text-on-surface transition-colors inline-flex items-center gap-1 group"
        >
          <span>Don&apos;t have an @username yet?</span>
          <span className="text-primary font-medium group-hover:underline">Claim handle →</span>
        </Link>
      </div>
    </div>
  );
};
