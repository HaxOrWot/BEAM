import React from "react";
import { StreamIngressList } from "@/components/streams/StreamIngressList";
import { IngressInspect } from "@/components/streams/IngressInspect";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricBox } from "@/components/ui/MetricBox";

export default function StreamsPage() {
  return (
    <div>
      <SectionHeader
        title="Incoming Streams Console"
        tag="INGRESS BUS"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricBox label="INGRESS THROUGHPUT" value="4.82" unit="Gbps" delta="Peak: 5.10 Gbps" />
        <MetricBox label="CONCURRENT STREAMS" value="4" unit="SOCKETS" delta="Limit: 1024" />
        <MetricBox label="ZERO-COPY DMA HIT" value="99.98" unit="%" delta="Direct Kernel Ring" />
      </div>

      <StreamIngressList />
      <IngressInspect />
    </div>
  );
}
