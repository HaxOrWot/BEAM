"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Shield, Eye, EyeOff, KeyRound, Terminal, Key } from "lucide-react";

export const AuthCard: React.FC = () => {
  const [method, setMethod] = useState<"ed25519" | "daemon">("ed25519");
  const [credential, setCredential] = useState("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
  const [showCred, setShowCred] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("Cryptographic identity verified. Kernel node session unlocked.");
  };

  return (
    <div className="max-w-md mx-auto bg-surface-low border border-surface-high p-6 my-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 bg-primary" />
        <span className="font-mono text-sm font-semibold text-primary uppercase tracking-widest">
          PROTO/TCP NODE AUTH
        </span>
      </div>
      <p className="text-center font-mono text-[11px] text-outline mb-6">
        Authenticate local management console via cryptographic key
      </p>

      {/* Method Tabs */}
      <div className="grid grid-cols-2 gap-1 bg-surface-lowest p-1 border border-surface-high mb-4">
        <button
          type="button"
          onClick={() => {
            setMethod("ed25519");
            setCredential("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
          }}
          className={`py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            method === "ed25519"
              ? "bg-primary text-black font-semibold"
              : "text-outline hover:text-primary"
          }`}
        >
          Ed25519 Key
        </button>
        <button
          type="button"
          onClick={() => {
            setMethod("daemon");
            setCredential("/var/run/prototcp/daemon.sock");
          }}
          className={`py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            method === "daemon"
              ? "bg-primary text-black font-semibold"
              : "text-outline hover:text-primary"
          }`}
        >
          Daemon Socket
        </button>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-mono text-[10px] text-outline uppercase">
              {method === "ed25519" ? "SIGNING PRIVATE KEY (BASE64)" : "IPC SOCKET PATH"}
            </label>
            <span className="font-mono text-[9px] text-on-surface-variant">
              {method === "ed25519" ? "CURVE25519" : "UNIX_DOMAIN"}
            </span>
          </div>

          <div className="relative">
            <input
              type={showCred ? "text" : "password"}
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              className="w-full bg-surface-lowest border border-surface-high px-3 py-2 pr-9 font-mono text-xs text-primary focus:border-primary outline-none"
            />
            <button
              type="button"
              onClick={() => setShowCred(!showCred)}
              className="absolute right-2.5 top-2.5 text-outline hover:text-primary"
            >
              {showCred ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full">
          <KeyRound size={12} />
          Authenticate Node Session
        </Button>
      </form>

      {statusMsg && (
        <div className="mt-4 p-2.5 bg-surface-highest border border-primary text-primary font-mono text-xs text-center">
          {statusMsg}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-surface-high/60 text-center space-y-2">
        <Link
          href="/auth/verify"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary hover:text-primary hover:underline"
        >
          <Key size={12} /> Or authenticate with FIDO2 / YubiKey &rarr;
        </Link>
        <div className="font-mono text-[10px] text-outline">
          Mutual TLS 1.3 &bull; Zero Plaintext Transmission
        </div>
      </div>
    </div>
  );
};
