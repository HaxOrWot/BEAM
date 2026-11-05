import React from "react";
import { VaultStats } from "@/components/vault/VaultStats";
import { KeyList } from "@/components/vault/KeyList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowUpRight, Lock, KeyRound } from "lucide-react";

export default function VaultPage() {
  return (
    <div>
      <SectionHeader
        title="Key Ring & E2EE Vault"
        tag="SECURITY DISPATCH"
      />

      <VaultStats />
      <KeyList />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="low">
          <div className="flex items-center gap-2 mb-2">
            <Lock size={14} className="text-primary" />
            <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              Hardware Security Token (FIDO2 / WebAuthn)
            </span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
            Physical security keys can sign TCP socket sessions directly through browser WebAuthn CTAP2 protocol without disclosing private credentials to user space.
          </p>
          <Link href="/auth/verify" className="font-mono text-xs text-primary hover:underline flex items-center gap-1">
            Test Hardware Key Handshake <ArrowUpRight size={13} />
          </Link>
        </Card>

        <Card variant="low">
          <div className="flex items-center gap-2 mb-2">
            <KeyRound size={14} className="text-primary" />
            <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              Daemon IPC Key Socket
            </span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
            Local daemon running at <code className="text-primary">/var/run/prototcp/daemon.sock</code> manages ephemeral key rotation and cryptographic signature verification.
          </p>
          <Link href="/auth" className="font-mono text-xs text-primary hover:underline flex items-center gap-1">
            Manage Daemon Credentials <ArrowUpRight size={13} />
          </Link>
        </Card>
      </div>
    </div>
  );
}
