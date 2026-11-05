"use client";

import React, { useState } from "react";

export const VaultDetailView: React.FC = () => {
  const [sasOpen, setSasOpen] = useState(false);
  const [sasTarget, setSasTarget] = useState("alpha-relay-nyc.lan");
  const [logs, setLogs] = useState([
    { time: "02:01:10.491", tag: "X3DH_PREKEY", msg: "Pool replenished with 100 fresh signed Curve25519 one-time keys" },
    { time: "02:00:44.112", tag: "TPM_SEALED", msg: "Root master key bound to PCR register 7 (Secure Boot Enforced)" },
    { time: "01:58:22.902", tag: "SAS_VERIFIED", msg: "Operator verified safety numbers for peer alpha-relay-nyc" },
  ]);

  const copyBundle = () => {
    navigator.clipboard?.writeText(
      `-----BEGIN PROTO/TCP PUBLIC KEY BUNDLE-----\nVersion: 4.19-SEC\nIdentity-Key: ed25519_pk198f4a82b1c0049acfe99824050183eec192837465920a\nEphemeral-X25519: curve25519_pub_9a87d00f1284a7619283bb902183acbe102934812\nPrekey-Count: 128\nTPM-Attest-Signature: 89ab3f1092a4f009e81b9c771\n-----END PROTO/TCP PUBLIC KEY BUNDLE-----`
    );
    alert("Public Key Bundle copied to clipboard.");
  };

  const zeroizeKeys = () => {
    if (confirm("CRITICAL: Zeroize all active ephemeral session ratchets and discard active keys?")) {
      const now = new Date().toISOString().substring(11, 23);
      setLogs((prev) => [{ time: now, tag: "ZEROIZE_EVENT", msg: "All ephemeral session keys purged from RAM" }, ...prev]);
      alert("All session ratchets zeroized. Root identity remains sealed in TPM.");
    }
  };

  return (
    <div className="flex flex-col gap-space-xl">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg shadow-xl">
        <div className="relative z-10 flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">
              CRYPTOGRAPHIC KEY VAULT // PROTO/TCP v4.19-SEC
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
            KEY RING &amp; E2EE VAULT
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Hardware-backed asymmetric identity ratchets. Curve25519 Ephemeral Diffie-Hellman keys with ChaCha20-Poly1305 symmetric authenticated ciphers.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-space-xs">
          <button
            onClick={copyBundle}
            className="px-space-md py-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Export Public Bundle (.pub)</span>
          </button>

          <button
            onClick={zeroizeKeys}
            className="px-space-md py-2 bg-error-container/30 border border-error/50 hover:bg-error-container/50 text-error font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">delete_forever</span>
            <span>Zeroize Ratchets</span>
          </button>
        </div>
      </div>

      {/* Main Keys Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        {/* Node Identity Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
          <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
            <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
              ROOT NODE IDENTITY KEY (SEALED)
            </span>
            <span className="font-label-caps text-label-caps uppercase text-outline">ED25519 // TPM 2.0</span>
          </div>

          <div className="p-space-sm bg-surface-container-low border border-outline-variant font-mono text-xs text-on-surface break-all select-all">
            ed25519_pk198f4a82b1c0049acfe99824050183eec192837465920a3901bcae81273948b
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
            <div className="p-space-sm bg-surface-container-low border border-outline-variant">
              <span className="font-label-caps text-label-caps uppercase text-outline block">Prekey Count</span>
              <span className="font-telemetry-md text-telemetry-md text-primary font-medium">128 Ready</span>
            </div>
            <div className="p-space-sm bg-surface-container-low border border-outline-variant">
              <span className="font-label-caps text-label-caps uppercase text-outline block">KDF Ratchet</span>
              <span className="font-telemetry-md text-telemetry-md text-primary font-medium">BLAKE3 HMAC</span>
            </div>
            <div className="p-space-sm bg-surface-container-low border border-outline-variant">
              <span className="font-label-caps text-label-caps uppercase text-outline block">Forward Secrecy</span>
              <span className="font-telemetry-md text-telemetry-md text-primary font-medium">Per-Chunk X25519</span>
            </div>
          </div>
        </div>

        {/* Safety Number SAS Card */}
        <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between gap-space-md">
          <div>
            <div className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium mb-1">
              SAFETY NUMBERS (SAS)
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Verify out-of-band numeric fingerprints with remote peer operators to detect active man-in-the-middle attacks.
            </p>
          </div>

          <button
            onClick={() => {
              setSasTarget("alpha-relay-nyc.lan");
              setSasOpen(true);
            }}
            className="w-full py-2.5 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
              color: "#131313",
              border: "1px solid rgb(243, 229, 171)",
            }}
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Verify Peer Safety String</span>
          </button>
        </div>
      </div>

      {/* SAS Modal */}
      {sasOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="w-full max-w-lg p-space-xl border flex flex-col gap-space-md bg-surface-container-lowest"
            style={{
              borderColor: "rgba(212, 175, 55, 0.4)",
              boxShadow: "rgba(212, 175, 55, 0.15) 0px 0px 30px",
            }}
          >
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
              <span className="font-headline-sm text-primary uppercase">
                Peer Safety Verification ({sasTarget})
              </span>
              <button onClick={() => setSasOpen(false)} className="text-outline hover:text-primary">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div>
              <span className="font-label-caps text-label-caps uppercase text-outline block mb-1">
                60-Digit Numeric Safety String
              </span>
              <div
                className="p-space-md border bg-surface-container-low font-mono text-sm tracking-widest text-center leading-loose select-all"
                style={{ color: "#DFBD69", borderColor: "rgba(212, 175, 55, 0.4)" }}
              >
                89104 22910 40192 11940<br />
                77201 39182 44109 00192<br />
                48102 33910 88201 55910
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant">
              <div>
                <span className="font-label-caps text-label-caps uppercase text-outline block">Visual Hash (SAS)</span>
                <div className="text-2xl mt-1 tracking-widest">🛡️ 💎 ⚓ ⚡</div>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-label-caps uppercase text-outline block">Digest</span>
                <span className="font-telemetry-sm text-telemetry-sm text-primary">BLAKE3-256 HMAC</span>
              </div>
            </div>

            <div className="flex justify-end gap-space-sm pt-space-xs">
              <button
                onClick={() => setSasOpen(false)}
                className="px-space-md py-2 border border-outline-variant text-on-surface font-headline-sm text-headline-sm uppercase"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setSasOpen(false);
                  alert(`Safety numbers verified for ${sasTarget}`);
                }}
                className="px-space-md py-2 font-headline-sm text-headline-sm uppercase font-semibold text-black"
                style={{ backgroundColor: "#DFBD69" }}
              >
                Mark as Verified
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Stream */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-sm">
        <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
          Cryptographic Event Audit Log
        </span>
        <div className="space-y-1 font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-space-xs py-1 border-b border-surface-container-high/40">
              <span className="text-outline">[{log.time}]</span>
              <span className="text-primary font-medium">[{log.tag}]</span>
              <span className="text-on-surface-variant">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
