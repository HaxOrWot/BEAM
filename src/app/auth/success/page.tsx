"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SessionUnlockedPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(75);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/transfers");
    }
  }, [countdown, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1.25;
      });
    }, 100);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  return (
    <div className="px-margin py-space-xl flex flex-col gap-space-xl max-w-5xl mx-auto">
      {/* Session Unlocked Hero Banner */}
      <div
        className="relative overflow-hidden bg-surface-container-lowest p-space-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg shadow-xl"
        style={{
          borderColor: "rgba(212, 175, 55, 0.4)",
          boxShadow: "rgba(212, 175, 55, 0.08) 0px 0px 24px inset",
        }}
      >
        <div className="flex items-center gap-space-md">
          <div
            className="w-14 h-14 flex items-center justify-center border text-primary"
            style={{
              borderColor: "#DFBD69",
              backgroundColor: "rgba(223, 189, 105, 0.1)",
              color: "#DFBD69",
            }}
          >
            <span className="material-symbols-outlined text-[32px]">lock_open</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#DFBD69" }} />
              <span
                className="font-label-caps text-label-caps uppercase tracking-widest font-semibold"
                style={{ color: "#DFBD69" }}
              >
                INGRESS AUTHORIZED // ATTESTATION_0x99F1
              </span>
            </div>
            <h1 className="font-display-lg text-headline-lg md:text-display-lg uppercase tracking-tight text-primary font-semibold">
              SESSION UNLOCKED &amp; INGRESS GRANTED
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cryptographic handshake approved. Direct point-to-point DMA streaming channel active.
            </p>
          </div>
        </div>

        {/* Redirect Timer & CTA */}
        <div className="flex flex-col items-end gap-space-xs w-full md:w-auto">
          <Link
            href="/transfers"
            className="px-space-md py-2.5 font-headline-sm text-headline-sm uppercase tracking-wider font-semibold text-black transition-opacity hover:opacity-95 flex items-center gap-space-xs shadow-md w-full md:w-auto justify-center"
            style={{
              background: "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
              border: "1px solid rgb(243, 229, 171)",
            }}
          >
            <span>Proceed to Console Immediately</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            AUTO-REDIRECTING IN {countdown}S ({Math.floor(progress)}%)
          </span>
        </div>
      </div>

      {/* 3 Assurance Cards from Stitch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Card 1 */}
        <div className="bg-surface-container-low border border-outline-variant p-space-lg flex flex-col justify-between gap-space-md">
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-caps text-label-caps text-outline uppercase">ASSURANCE_01</span>
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-primary font-medium mb-space-xs">
              Cryptographic Attestation
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Deterministic mutual ratification across ephemeral sessions. Curve25519 ratchet securely zeroized from volatile memory.
            </p>
          </div>
          <div className="pt-space-xs border-t border-outline-variant flex flex-col gap-1 font-telemetry-sm text-telemetry-sm text-outline">
            <div className="flex justify-between">
              <span>Entropy Source</span>
              <span className="text-on-surface">Hardware TRNG (512-bit)</span>
            </div>
            <div className="flex justify-between">
              <span>Forward Secrecy</span>
              <span style={{ color: "#DFBD69" }}>Post-Quantum Bound</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-low border border-outline-variant p-space-lg flex flex-col justify-between gap-space-md">
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-caps text-label-caps text-outline uppercase">ASSURANCE_02</span>
              <span className="material-symbols-outlined text-primary text-[20px]">lan</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-primary font-medium mb-space-xs">
              Ephemeral Ingress Pipe
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Kernel-bypassed direct socket allocation bound to internal port 9042 with memory pages locked via active <code className="font-mono text-primary">mlock()</code>.
            </p>
          </div>
          <div className="pt-space-xs border-t border-outline-variant flex flex-col gap-1 font-telemetry-sm text-telemetry-sm text-outline">
            <div className="flex justify-between">
              <span>Listener Routine</span>
              <span className="text-on-surface">epoll / edge-triggered</span>
            </div>
            <div className="flex justify-between">
              <span>Zero-Copy Buffer</span>
              <span style={{ color: "#DFBD69" }}>Ring 0 Direct DMA</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-low border border-outline-variant p-space-lg flex flex-col justify-between gap-space-md">
          <div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-caps text-label-caps text-outline uppercase">ASSURANCE_03</span>
              <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-primary font-medium mb-space-xs">
              Cluster Peer Discovery
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              8 verified cryptographic peers located via mutual broadcast. Ready for immediate zero-knowledge stream peering.
            </p>
          </div>
          <div className="pt-space-xs border-t border-outline-variant flex flex-col gap-1 font-telemetry-sm text-telemetry-sm text-outline">
            <div className="flex justify-between">
              <span>Discovery Beacon</span>
              <span className="text-on-surface">mDNS // Local Segment</span>
            </div>
            <div className="flex justify-between">
              <span>Mutual Peering</span>
              <span style={{ color: "#DFBD69" }}>8/8 Nodes Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attestation Fingerprint Strip */}
      <div className="bg-surface-container-lowest p-space-sm border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-space-xs font-telemetry-sm text-telemetry-sm text-outline">
        <div className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-mono">ATTESTATION_FINGERPRINT: SHA256:7B89E819B2650AC865FA36EB3A335FCF72C5770C</span>
        </div>
        <span className="text-primary font-mono uppercase">SECURITY LEVEL: MAXIMUM</span>
      </div>
    </div>
  );
}
