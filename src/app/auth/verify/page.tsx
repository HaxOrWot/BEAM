"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const [touching, setTouching] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleTouch = () => {
    setTouching(true);
    setTimeout(() => {
      setTouching(false);
      setVerified(true);
    }, 1400);
  };

  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <div className="max-w-md mx-auto w-full bg-surface-container-lowest border border-outline-variant p-space-xl shadow-xl flex flex-col gap-space-md text-center">
        <div className="w-16 h-16 mx-auto bg-surface-container border border-outline-variant flex items-center justify-center text-primary">
          <span className={`material-symbols-outlined text-[32px] ${touching ? "animate-pulse" : ""}`}>
            fingerprint
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
            FIDO2 // CTAP2 AUTHENTICATOR
          </span>
          <h2 className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-semibold">
            TOUCH SECURITY KEY TO PROCEED
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            User presence verification required to bind new socket ratchets to hardware TPM.
          </p>
        </div>

        {verified ? (
          <div className="p-space-sm bg-surface-container-high border border-primary text-primary font-mono text-xs flex items-center justify-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Hardware Token Approved. Node Session Granted.</span>
          </div>
        ) : (
          <button
            onClick={handleTouch}
            disabled={touching}
            className="w-full py-3 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
              color: "#131313",
              border: "1px solid rgb(243, 229, 171)",
            }}
          >
            <span className="material-symbols-outlined text-[18px]">touch_app</span>
            <span>{touching ? "AWAITING HARDWARE TOUCH..." : "TOUCH PHYSICAL KEY"}</span>
          </button>
        )}

        <div className="pt-space-xs border-t border-outline-variant">
          <Link
            href="/auth"
            className="font-label-caps text-label-caps uppercase text-outline hover:text-primary transition-colors"
          >
            &larr; Return to Key Selection
          </Link>
        </div>
      </div>
    </div>
  );
}
