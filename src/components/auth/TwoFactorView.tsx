"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const TwoFactorView: React.FC = () => {
  const router = useRouter();
  const [method, setMethod] = useState<"fido" | "totp" | "companion">("fido");
  const [totpCode, setTotpCode] = useState("");
  const [touching, setTouching] = useState(false);
  const [handshakeSuccess, setHandshakeSuccess] = useState(false);

  const handleTouchKey = () => {
    setTouching(true);
    setTimeout(() => {
      setTouching(false);
      setHandshakeSuccess(true);
      setTimeout(() => {
        router.push("/auth/success");
      }, 800);
    }, 1200);
  };

  const handleTotpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/success");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl flex flex-col gap-space-lg">
      {/* Top Status Bar */}
      <div className="w-full bg-surface-container-low px-margin py-space-sm flex flex-wrap items-center justify-between gap-y-2 border border-outline-variant">
        <div className="flex items-center gap-space-sm">
          <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            SIGN IN / PROTO_INGRESS // STEP 02: TWO-FACTOR &amp; HARDWARE ENCLAVE VERIFICATION
          </span>
        </div>
        <div className="flex items-center gap-space-lg font-telemetry-sm text-telemetry-sm text-outline">
          <div>
            <span>SESSION TIMEOUT: </span>
            <span className="text-primary font-mono font-medium">04:58</span>
          </div>
          <div className="hidden md:block">
            <span>ORIGIN: </span>
            <span className="text-on-surface font-mono">192.168.1.45:9042 // TLS 1.3 DIRECT</span>
          </div>
        </div>
      </div>

      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-4">
        <div>
          <div className="inline-flex items-center gap-space-xs px-2 py-0.5 bg-surface-container text-primary font-label-caps text-label-caps uppercase mb-space-sm border border-outline-variant">
            <span className="material-symbols-outlined text-[12px] text-primary">lock_open</span>
            <span>HIGH-SECURITY INGRESS PIPELINE</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight uppercase font-medium">
            Authenticate Secondary Factor
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs max-w-2xl leading-relaxed">
            Verify your identity using a hardware security key (FIDO2 / WebAuthn CTAP2) or an encrypted time-based one-time authorization token.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end font-telemetry-sm text-telemetry-sm text-outline">
          <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary">ASSURANCE TIER</span>
          <span className="text-primary font-medium mt-0.5 font-mono">EAL6+ HARDWARE ATTESTATION</span>
          <span>ZERO-RELAY POLICY // STRICT E2EE</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 flex flex-col bg-surface-container-low border border-outline-variant">
          {/* Segmented Tabs */}
          <div className="flex flex-wrap items-center bg-surface-container-lowest p-1 gap-1 border-b border-outline-variant">
            <button
              type="button"
              onClick={() => setMethod("fido")}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-space-xs py-space-sm px-space-md font-telemetry-sm text-telemetry-sm uppercase tracking-wider transition-all ${
                method === "fido"
                  ? "bg-surface-container text-primary font-semibold border-b-2 border-primary"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-primary" />
              <span>1. HARDWARE KEY (FIDO2)</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("totp")}
              className={`flex-1 min-w-[180px] flex items-center justify-center gap-space-xs py-space-sm px-space-md font-telemetry-sm text-telemetry-sm uppercase tracking-wider transition-all ${
                method === "totp"
                  ? "bg-surface-container text-primary font-semibold border-b-2 border-primary"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-surface-container-highest" />
              <span>2. AUTHENTICATOR (TOTP)</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("companion")}
              className={`flex-1 min-w-[180px] flex items-center justify-center gap-space-xs py-space-sm px-space-md font-telemetry-sm text-telemetry-sm uppercase tracking-wider transition-all ${
                method === "companion"
                  ? "bg-surface-container text-primary font-semibold border-b-2 border-primary"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-surface-container-highest" />
              <span>3. AIR-GAPPED COMPANION</span>
            </button>
          </div>

          {/* FIDO2 Method View */}
          {method === "fido" && (
            <div className="p-space-xl flex flex-col">
              <div className="flex flex-col md:flex-row items-center gap-space-xl justify-between">
                {/* Sonar Sensor Area */}
                <div className="relative flex items-center justify-center w-52 h-52 shrink-0 bg-surface-container-lowest border border-outline-variant">
                  <div className="absolute inset-4 rounded-full bg-primary/5 animate-ping opacity-40" />
                  <div className="absolute inset-8 rounded-full bg-primary/10" />
                  <div className="absolute inset-12 rounded-full bg-primary/15" />

                  <div className="relative z-10 w-24 h-32 bg-surface-container border border-outline-variant flex flex-col items-center justify-between p-3 shadow-xl">
                    <div className="w-6 h-4 bg-surface-container-lowest border border-outline-variant" />
                    <button
                      type="button"
                      onClick={handleTouchKey}
                      className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container-high transition-colors"
                    >
                      <span className={`material-symbols-outlined text-primary text-[28px] ${touching ? "animate-pulse" : ""}`}>
                        fingerprint
                      </span>
                    </button>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary" />
                      <span className="w-1.5 h-1.5 bg-primary/30" />
                      <span className="w-1.5 h-1.5 bg-primary/30" />
                    </div>
                  </div>
                </div>

                {/* Handshake Context */}
                <div className="flex-1 flex flex-col items-start w-full">
                  <div className="inline-flex items-center gap-space-xs px-2 py-1 bg-surface-container font-label-caps text-label-caps text-primary border border-outline-variant mb-space-sm uppercase">
                    <span>WAITING FOR PHYSICAL CONTACT</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold uppercase mb-space-xs">
                    Touch Your Security Key
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                    Insert your YubiKey or FIDO2 hardware token and touch the gold sensor button. Browser WebAuthn CTAP2 handshake is listening on the active socket.
                  </p>

                  <div className="w-full p-space-sm bg-surface-container-lowest border border-outline-variant flex items-center justify-between font-mono text-[11px] mb-space-md">
                    <span className="text-outline">DEVICE STATUS:</span>
                    <span className="text-primary">{touching ? "PROBING ENCLAVE..." : handshakeSuccess ? "ASSERTION_VERIFIED" : "USB_HID_DETECTED"}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTouchKey}
                    className="w-full py-3 bg-primary text-on-primary font-label-caps text-label-caps font-semibold uppercase tracking-wider hover:bg-gold-warm transition-all flex items-center justify-center gap-space-xs shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                  >
                    <span className="material-symbols-outlined text-[18px]">touch_app</span>
                    <span>{touching ? "VERIFYING ASSERTION..." : handshakeSuccess ? "HANDSHAKE APPROVED &rarr;" : "SIMULATE HARDWARE TOUCH"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TOTP Method View */}
          {method === "totp" && (
            <form onSubmit={handleTotpSubmit} className="p-space-xl flex flex-col gap-space-md">
              <h2 className="font-headline-sm text-headline-sm uppercase text-primary font-semibold">
                Authenticator App 6-Digit Code
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Enter the time-sensitive HMAC-SHA1 verification code generated by your mobile authenticator.
              </p>
              <input
                type="text"
                maxLength={6}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                placeholder="000 000"
                className="w-full bg-surface-container-lowest border border-outline-variant px-space-md py-3 font-mono text-center text-2xl tracking-[0.4em] text-primary focus:outline-none"
              />
              <button
                type="submit"
                className="py-3 bg-primary text-on-primary font-label-caps text-label-caps font-semibold uppercase tracking-wider hover:bg-gold-warm transition-all shadow-[0_0_12px_rgba(212,175,55,0.25)]"
              >
                CONFIRM 2FA CODE &amp; ENTER
              </button>
            </form>
          )}

          {/* Companion Method View */}
          {method === "companion" && (
            <div className="p-space-xl flex flex-col gap-space-md text-center">
              <h2 className="font-headline-sm text-headline-sm uppercase text-primary font-semibold">
                Air-Gapped QR Attestation
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto">
                Scan the ephemeral challenge QR on your disconnected hardware terminal to sign the ingress token.
              </p>
              <div className="w-48 h-48 mx-auto bg-surface-container-lowest border border-outline-variant flex items-center justify-center p-3">
                <div className="w-full h-full bg-surface-container flex items-center justify-center font-mono text-xs text-primary">
                  [ QR_CHALLENGE_256 ]
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push("/auth/success")}
                className="py-3 bg-primary text-on-primary font-label-caps text-label-caps font-semibold uppercase tracking-wider hover:bg-gold-warm transition-all shadow-[0_0_12px_rgba(212,175,55,0.25)]"
              >
                PROCEED TO VAULT SESSION
              </button>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Enclave Card + Telemetry */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-low p-space-lg flex flex-col border border-outline-variant">
            <div className="flex items-center justify-between mb-space-md pb-space-xs border-b border-outline-variant">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase font-semibold">
                  ENCLAVE ATTESTATION
                </span>
              </div>
              <span className="font-label-caps text-label-caps bg-surface-container px-2 py-0.5 text-primary border border-outline-variant">
                SECURE_BOOT
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline mb-space-md leading-relaxed">
              WebAuthn assertion signed with clientDataHash &amp; Curve25519 direct hardware co-processor. Zero private credentials exit the local physical silicon.
            </p>
            <div className="space-y-space-sm font-telemetry-sm text-telemetry-sm">
              <div className="flex justify-between py-1 bg-surface-container-lowest px-space-sm border border-outline-variant">
                <span className="text-outline">CO-PROCESSOR</span>
                <span className="text-on-surface font-mono">APPLE T2 / SE ENCLAVE</span>
              </div>
              <div className="flex justify-between py-1 bg-surface-container-lowest px-space-sm border border-outline-variant">
                <span className="text-outline">CIPHERSUITE</span>
                <span className="text-primary font-mono">ED25519-SHA512</span>
              </div>
              <div className="flex justify-between py-1 bg-surface-container-lowest px-space-sm border border-outline-variant">
                <span className="text-outline">COUNTER SIGNING</span>
                <span className="text-on-surface font-mono">SEQ_0009412</span>
              </div>
              <div className="flex justify-between py-1 bg-surface-container-lowest px-space-sm border border-outline-variant">
                <span className="text-outline">TLS CHANNEL BOUND</span>
                <span className="text-primary font-mono">VALID (0x81E)</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-lg flex flex-col border border-outline-variant">
            <div className="flex items-center justify-between mb-space-sm border-b border-outline-variant pb-1">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                INGRESS_DIAGNOSTICS
              </span>
              <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
            </div>
            <div className="font-mono text-[11px] text-outline flex flex-col gap-1">
              <div>[0.012s] CTAP2_GET_ASSERTION dispatched</div>
              <div>[0.045s] RP ID: &quot;prototcp.internal&quot;</div>
              <div>[0.089s] User verification: REQUIRED</div>
              <div className="text-primary">[0.110s] Authenticator status: WAITING_TOUCH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
