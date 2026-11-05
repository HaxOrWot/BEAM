import React from "react";
import { MetricBox } from "../ui/MetricBox";

export const VaultStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <MetricBox label="PROVISIONED KEY PAIRS" value="3" unit="KEYS" delta="Ed25519 / FIDO2" />
      <MetricBox label="E2EE CIPHER STANDARD" value="AES-256" unit="GCM" delta="SHA-384 Integrity" />
      <MetricBox label="ROTATION LIFETIME" value="72" unit="HOURS" delta="Auto-renew enabled" />
    </div>
  );
};
