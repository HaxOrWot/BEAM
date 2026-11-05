"use client";

import React, { useState } from "react";

export const OperatorForm: React.FC = () => {
  const [email, setEmail] = useState("sec-lead@nexus.internal");
  const [passphrase, setPassphrase] = useState("Enclave-Master-99x2!");
  const [confirmPass, setConfirmPass] = useState("Enclave-Master-99x2!");
  const [hardwareBind, setHardwareBind] = useState(true);

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Social Authentication Suite */}
      <div className="bg-surface-container-low p-space-lg shadow-sm border border-outline-variant">
        <div className="flex items-center justify-between mb-space-md pb-space-xs border-b border-outline-variant">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 bg-primary" />
            <h2 className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest font-semibold">
              01.01 // Fast Enclave Provisioning
            </h2>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            OAUTH2 + WEBAUTHN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <button
            type="button"
            className="p-space-md bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between border border-outline-variant"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">fingerprint</span>
              <div className="flex flex-col text-left">
                <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold">
                  WebAuthn Passkey
                </span>
                <span className="font-telemetry-sm text-telemetry-sm text-outline">
                  FIDO2 / YubiKey Hardware
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">arrow_forward</span>
          </button>

          <button
            type="button"
            className="p-space-md bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between border border-outline-variant"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
              <div className="flex flex-col text-left">
                <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold">
                  GitHub Enterprise
                </span>
                <span className="font-telemetry-sm text-telemetry-sm text-outline">
                  SSO Organization Ingress
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Form Panel: Direct Operator Registration */}
      <div className="bg-surface-container-low p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant">
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 bg-primary" />
            <h2 className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest font-semibold">
              01.02 // Operator Credentials
            </h2>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            ARGON2ID KEY STRETCHING
          </span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center justify-between" htmlFor="operatorEmail">
            <span>EMAIL ADDRESS / WORK EMAIL</span>
            <span className="text-outline">MANDATORY</span>
          </label>
          <div className="flex bg-surface-container-lowest items-stretch border border-outline-variant">
            <span className="bg-surface-container px-space-sm py-2 font-telemetry-sm text-telemetry-sm text-outline flex items-center select-none">
              <span className="material-symbols-outlined text-[16px]">mail</span>
            </span>
            <input
              id="operatorEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent px-space-sm py-2 font-telemetry-md text-telemetry-md text-on-surface focus:outline-none"
              placeholder="operator@node.proto"
            />
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center justify-between" htmlFor="enclavePassphrase">
              <span>ENCLAVE PASSPHRASE</span>
              <span className="text-primary font-mono text-[10px]">MIN 16 CHARS</span>
            </label>
            <div className="flex bg-surface-container-lowest items-stretch border border-outline-variant">
              <span className="bg-surface-container px-space-sm py-2 font-telemetry-sm text-telemetry-sm text-outline flex items-center select-none">
                <span className="material-symbols-outlined text-[16px]">key</span>
              </span>
              <input
                id="enclavePassphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full bg-transparent px-space-sm py-2 font-telemetry-md text-telemetry-md text-on-surface focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center justify-between" htmlFor="confirmPassphrase">
              <span>CONFIRM PASSPHRASE</span>
              <span className="text-outline">MATCH REQUIRED</span>
            </label>
            <div className="flex bg-surface-container-lowest items-stretch border border-outline-variant">
              <span className="bg-surface-container px-space-sm py-2 font-telemetry-sm text-telemetry-sm text-outline flex items-center select-none">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </span>
              <input
                id="confirmPassphrase"
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-transparent px-space-sm py-2 font-telemetry-md text-telemetry-md text-on-surface focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hardware Enclave Identity Provisioning Toggle */}
        <div className="p-space-md bg-surface-container flex items-center justify-between border border-outline-variant">
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-primary text-[24px]">memory</span>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface tracking-wider font-semibold uppercase">
                GENERATE HARDWARE / ED25519 ENCLAVE IDENTITY
              </span>
              <span className="font-body-sm text-body-sm text-outline">
                Cryptographically bind this registration to local TPM/TEE silicon roots.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setHardwareBind(!hardwareBind)}
            className={`w-11 h-6 transition-colors flex items-center px-0.5 border ${
              hardwareBind ? "bg-primary border-primary" : "bg-surface-container-highest border-outline-variant"
            }`}
          >
            <div
              className={`w-5 h-5 bg-surface-container-lowest transition-transform duration-200 ${
                hardwareBind ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
