"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Fingerprint,
  ArrowRight,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";

export const SignInCard: React.FC = () => {
  const router = useRouter();
  const { updateAccount } = useBeamStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your Beam handle or email");
      return;
    }

    setLoading(true);

    const handle = identifier.replace(/^@/, "").trim();
    // Real login update in store
    updateAccount({
      handle: handle.includes("@") ? handle.split("@")[0] : handle,
      email: handle.includes("@") ? handle : `${handle}@beam.network`,
      isLoggedIn: true,
    });

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  const handleOAuthSignIn = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      updateAccount({
        handle: `${provider.toLowerCase()}_user`,
        email: `user@${provider.toLowerCase()}.com`,
        isLoggedIn: true,
      });
      setLoading(false);
      router.push("/dashboard");
    }, 500);
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
            Protocol v2.4 Active
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
        <div className="w-full mb-4 px-3 py-2 rounded-xl bg-error/15 border border-error/30 text-error text-xs font-mono">
          {error}
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
              className="w-full bg-transparent py-2 text-sm text-on-surface placeholder:text-outline font-sans focus:outline-none"
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
          or authenticate via
        </span>
      </div>

      {/* Alternative Social Logins */}
      <div className="w-full flex flex-col gap-2">
        <button
          type="button"
          onClick={() => handleOAuthSignIn("Passkey")}
          className="w-full py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-highest text-on-surface rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-white/5"
        >
          <Fingerprint className="w-4 h-4 text-secondary" />
          <span>Continue with Passkey / Face ID</span>
        </button>

        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            type="button"
            onClick={() => handleOAuthSignIn("Google")}
            className="py-2.5 px-3 bg-surface-container-low hover:bg-surface-container-highest text-on-surface rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-white/5"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuthSignIn("GitHub")}
            className="py-2.5 px-3 bg-surface-container-low hover:bg-surface-container-highest text-on-surface rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-white/5"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <span>GitHub</span>
          </button>
        </div>
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
