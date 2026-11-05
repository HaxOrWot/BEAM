import React from "react";
import { StreamIngressList } from "@/components/streams/StreamIngressList";
import { IngressInspect } from "@/components/streams/IngressInspect";

export default function StreamsPage() {
  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <div className="bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col gap-space-xs shadow-xl">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
          INGRESS CHANNELS // HARDWARE OFFLOAD
        </span>
        <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
          INCOMING STREAMS CONSOLE
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Concurrent inbound socket decoders with real-time frame checksum validation and kernel BPF filtering.
        </p>
      </div>

      <StreamIngressList />
      <IngressInspect />
    </div>
  );
}
