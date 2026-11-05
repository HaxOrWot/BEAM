"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ed25519" | "tpm" | "passkey">("ed25519");
  const [operatorId, setOperatorId] = useState("sec-lead@nexus.internal");
  const [keyInput, setKeyInput] = useState("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
  const [daemonBind, setDaemonBind] = useState("0.0.0.0:9042");
  const [requireZkp, setRequireZkp] = useState(true);
  const [strictPfs, setStrictPfs] = useState(true);
  const [tpmAttested, setTpmAttested] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/verify");
  };

  return (
    <div className="flex flex-col bg-surface-container-low border border-outline-variant">
      {/* Enterprise SSO */}
      <div className="p-space-md md:p-space-lg border-b border-outline-variant flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            ENTERPRISE / DEVELOPER SSO
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-primary" />
            <span>OAUTH 2.0 // DIRECT INGRESS</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <button
            type="button"
            onClick={() => router.push("/auth/verify")}
            className="flex items-center justify-center gap-space-sm px-space-md py-3 bg-surface-container border border-outline-variant hover:border-primary text-on-surface hover:text-primary transition-all active:scale-[0.99]"
          >
            <span className="font-headline-sm text-headline-sm">Continue with Google</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/auth/verify")}
            className="flex items-center justify-center gap-space-sm px-space-md py-3 bg-surface-container border border-outline-variant hover:border-primary text-on-surface hover:text-primary transition-all active:scale-[0.99]"
          >
            <span className="font-headline-sm text-headline-sm">Continue with GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-space-xs">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant" />
          </div>
          <div className="relative bg-surface-container-low px-space-md font-label-caps text-label-caps text-outline tracking-widest uppercase">
            [ OR AUTHENTICATE VIA CRYPTOGRAPHIC KEY / ENCLAVE ]
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container px-space-md py-space-xs overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("ed25519")}
            className={`font-label-caps text-label-caps px-space-md py-2.5 transition-colors border-b-2 uppercase ${
              activeTab === "ed25519"
                ? "bg-surface-container-low text-primary border-primary font-semibold"
                : "text-outline hover:text-on-surface border-transparent"
            }`}
          >
            ED25519 PRIVATE KEY
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tpm")}
            className={`font-label-caps text-label-caps px-space-md py-2.5 transition-colors border-b-2 uppercase ${
              activeTab === "tpm"
                ? "bg-surface-container-low text-primary border-primary font-semibold"
                : "text-outline hover:text-on-surface border-transparent"
            }`}
          >
            TPM HARDWARE ENCLAVE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("passkey")}
            className={`font-label-caps text-label-caps px-space-md py-2.5 transition-colors border-b-2 uppercase ${
              activeTab === "passkey"
                ? "bg-surface-container-low text-primary border-primary font-semibold"
                : "text-outline hover:text-on-surface border-transparent"
            }`}
          >
            AUTH TOKEN / PASSKEY
          </button>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline hidden sm:inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
          <span>FIPS 140-3 LEVEL 3</span>
        </span>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-space-md md:p-space-lg flex flex-col gap-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pb-space-sm border-b border-outline-variant">
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="loginIdent">
              Operator Identifier / Alias
            </label>
            <div className="flex items-stretch border border-outline-variant focus-within:border-primary bg-surface-container-lowest">
              <span className="px-3 bg-surface-container font-telemetry-sm text-telemetry-sm text-outline flex items-center border-r border-outline-variant">
                ID
              </span>
              <input
                id="loginIdent"
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="w-full bg-transparent px-3 py-2 font-telemetry-md text-telemetry-md text-on-surface focus:outline-none"
              />
            </div>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">Cluster mesh unique node identifier</span>
          </div>

          <div className="flex flex-col gap-space-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="daemonBind">
              Daemon Socket Binding
            </label>
            <div className="flex items-stretch border border-outline-variant focus-within:border-primary bg-surface-container-lowest">
              <span className="px-3 bg-surface-container font-telemetry-sm text-telemetry-sm text-outline flex items-center border-r border-outline-variant">
                BIND
              </span>
              <input
                id="daemonBind"
                type="text"
                value={daemonBind}
                onChange={(e) => setDaemonBind(e.target.value)}
                className="w-full bg-transparent px-3 py-2 font-telemetry-md text-telemetry-md text-on-surface focus:outline-none"
              />
            </div>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">Binds all dual-stack interfaces (v4/v6)</span>
          </div>
        </div>

        {/* Private Key Input */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {activeTab === "ed25519" ? "RAW ED25519 PRIVATE KEY (BASE64 / PKCS#8)" : "ENCLAVE AUTH TOKEN"}
            </label>
            <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">CURVE25519</span>
          </div>
          <textarea
            rows={3}
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant p-space-sm font-telemetry-sm text-telemetry-sm text-primary focus:outline-none font-mono focus:border-primary"
          />
        </div>

        {/* Checkbox Guarantees */}
        <div className="border-t border-outline-variant pt-space-md flex flex-col gap-space-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Cryptographic Enforcements &amp; Attestation
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            <label className="flex items-start gap-space-sm p-space-sm border border-outline-variant bg-surface-container cursor-pointer select-none">
              <input
                type="checkbox"
                checked={requireZkp}
                onChange={(e) => setRequireZkp(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">REQUIRE ZKP</span>
                <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
                  Zero-Knowledge Snark proof of key custody
                </span>
              </div>
            </label>

            <label className="flex items-start gap-space-sm p-space-sm border border-outline-variant bg-surface-container cursor-pointer select-none">
              <input
                type="checkbox"
                checked={strictPfs}
                onChange={(e) => setStrictPfs(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">STRICT PFS</span>
                <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
                  X25519 ephemeral session key rotation (30s)
                </span>
              </div>
            </label>

            <label className="flex items-start gap-space-sm p-space-sm border border-outline-variant bg-surface-container cursor-pointer select-none">
              <input
                type="checkbox"
                checked={tpmAttested}
                onChange={(e) => setTpmAttested(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">TPM 2.0 ATTESTED</span>
                <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
                  Validate PCR registers against root enclave
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
          <button
            type="submit"
            className="w-full sm:w-auto px-space-xl py-3 bg-primary text-black font-label-caps text-label-caps font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-space-xs shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span>SIGN IN TO PROTO/TCP</span>
          </button>

          <div className="flex items-center gap-space-md font-telemetry-sm text-telemetry-sm">
            <Link href="/auth/verify" className="text-outline hover:text-primary transition-colors underline-offset-4 hover:underline">
              Authenticate via Hardware Key
            </Link>
            <span className="text-outline-variant">&bull;</span>
            <Link href="/enrollment" className="text-outline hover:text-primary transition-colors underline-offset-4 hover:underline">
              Create New Identity
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
