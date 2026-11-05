"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { KeyRound, Shield, Check } from "lucide-react";

export const EnrollmentForm: React.FC = () => {
  const [alias, setAlias] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-3">
        Enroll New P2P Node
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] text-outline uppercase mb-1">
              Node Alias / Hostname
            </label>
            <input
              type="text"
              required
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="e.g. mesh-ap-southeast-core"
              className="w-full bg-surface-lowest border border-surface-high px-3 py-2 font-mono text-xs text-primary focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] text-outline uppercase mb-1">
              Endpoint Socket (IP:Port)
            </label>
            <input
              type="text"
              required
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="e.g. 198.51.100.99:9293"
              className="w-full bg-surface-lowest border border-surface-high px-3 py-2 font-mono text-xs text-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] text-outline uppercase mb-1">
            Ed25519 Public Identity Key (Base64)
          </label>
          <textarea
            required
            rows={3}
            value={pubKey}
            onChange={(e) => setPubKey(e.target.value)}
            placeholder="MCowBQYDK2VwAyEA..."
            className="w-full bg-surface-lowest border border-surface-high p-3 font-mono text-xs text-primary focus:border-primary outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-mono text-[11px] text-outline flex items-center gap-1.5">
            <Shield size={13} className="text-secondary" />
            Signature will be validated by local master key
          </span>

          <Button type="submit" variant="primary" size="md">
            <KeyRound size={12} />
            Provision Peer Node
          </Button>
        </div>
      </form>

      {submitted && (
        <div className="mt-4 p-3 bg-surface-highest border border-primary text-primary font-mono text-xs flex items-center gap-2">
          <Check size={14} /> Node enrollment request signed and dispatched to mesh gossip channels.
        </div>
      )}
    </div>
  );
};
