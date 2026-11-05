"use client";

import React, { useState } from "react";
import Link from "next/link";

export const AuthCard: React.FC = () => {
  const [method, setMethod] = useState<"ed25519" | "daemon">("ed25519");
  const [credential, setCredential] = useState("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
  const [showCred, setShowCred] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("Cryptographic identity verified. Kernel node session granted.");
  };

  return (
    <div className="max-w-md mx-auto bg-surface-container-lowest border border-outline-variant p-space-xl my-space-lg shadow-xl flex flex-col gap-space-md">
      <div className="flex flex-col items-center text-center gap-space-xs">
        <div className="w-10 h-10 bg-surface-container border border-outline-variant flex items-center justify-center text-primary mb-1">
          <span className="material-symbols-outlined text-[24px]">key</span>
        </div>
        <h2 className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
          PROTO/TCP NODE AUTHENTICATION
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Mutual cryptographic handshake verification for local kernel control.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 bg-surface-container-low p-1 border border-outline-variant">
        <button
          type="button"
          onClick={() => {
            setMethod("ed25519");
            setCredential("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
          }}
          className={`py-1.5 font-label-caps text-label-caps uppercase tracking-wider transition-colors ${
            method === "ed25519"
              ? "bg-primary text-black font-semibold"
              : "text-outline hover:text-primary"
          }`}
        >
          Ed25519 Private Key
        </button>
        <button
          type="button"
          onClick={() => {
            setMethod("daemon");
            setCredential("/var/run/prototcp/daemon.sock");
          }}
          className={`py-1.5 font-label-caps text-label-caps uppercase tracking-wider transition-colors ${
            method === "daemon"
              ? "bg-primary text-black font-semibold"
              : "text-outline hover:text-primary"
          }`}
        >
          Daemon IPC Socket
        </button>
      </div>

      <form onSubmit={handleAuth} className="flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex justify-between items-center">
            <label className="font-label-caps text-label-caps uppercase text-outline">
              {method === "ed25519" ? "SIGNING PRIVATE KEY (BASE64)" : "DAEMON IPC SOCKET PATH"}
            </label>
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
              {method === "ed25519" ? "CURVE25519" : "UNIX_DOMAIN"}
            </span>
          </div>

          <div className="relative flex items-center bg-surface-container-low border border-outline-variant">
            <input
              type={showCred ? "text" : "password"}
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              className="bg-transparent font-telemetry-md text-telemetry-md text-primary w-full px-space-sm py-2.5 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCred(!showCred)}
              className="absolute right-3 text-outline hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showCred ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Gold button */}
        <button
          type="submit"
          className="w-full py-2.5 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs font-semibold"
          style={{
            background: "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
            color: "#131313",
            border: "1px solid rgb(243, 229, 171)",
            boxShadow: "rgba(212, 175, 55, 0.25) 0px 0px 16px",
          }}
        >
          <span className="material-symbols-outlined text-[18px]">lock_open</span>
          <span>Unlock Kernel Node Session</span>
        </button>
      </form>

      {statusMsg && (
        <div className="p-space-sm bg-surface-container-high border border-primary text-primary font-mono text-xs text-center">
          {statusMsg}
        </div>
      )}

      <div className="pt-space-xs border-t border-outline-variant flex flex-col items-center gap-space-xs text-center">
        <Link
          href="/auth/verify"
          className="font-headline-sm text-headline-sm uppercase text-primary hover:underline flex items-center gap-space-xs"
          style={{ color: "#DFBD69" }}
        >
          <span className="material-symbols-outlined text-[16px]">touch_app</span>
          <span>Authenticate with FIDO2 / YubiKey &rarr;</span>
        </Link>
        <span className="font-label-caps text-label-caps text-outline uppercase">
          Zero-Knowledge &bull; No Plaintext Socket Storage
        </span>
      </div>
    </div>
  );
};
