import React from "react";

export const SynPacketTrace: React.FC = () => {
  const traces = [
    { time: "[0.0000s]", event: "TCP_SYN_RCV", src: "203.0.113.88:49152", dst: "0.0.0.0:9042", status: "ACK_QUEUED" },
    { time: "[0.0014s]", event: "TLS_CLIENT_HELLO", src: "203.0.113.88:49152", dst: "0.0.0.0:9042", status: "CURVE25519_KEY_OK" },
    { time: "[0.0028s]", event: "PSK_IDENTITY_VALIDATE", src: "203.0.113.88:49152", dst: "0.0.0.0:9042", status: "ATTESTATION_PENDING" },
    { time: "[0.0039s]", event: "RING_BUFFER_PREALLOC", src: "LOCAL_KERNEL", dst: "DMA_RING_0", status: "64MB_MAPPED" },
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 p-space-lg flex flex-col gap-space-sm">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
          LIVE INBOUND SYN PACKET TRACE
        </span>
        <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
      </div>

      <div className="font-mono text-[11px] flex flex-col gap-1.5 select-text">
        {traces.map((t, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-space-sm text-outline">
            <span className="text-outline shrink-0">{t.time}</span>
            <span className="text-primary font-medium">{t.event}</span>
            <span>{t.src} &rarr; {t.dst}</span>
            <span className="text-on-surface font-semibold ml-auto">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
