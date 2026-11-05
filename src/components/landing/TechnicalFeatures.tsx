import React from "react";

export const TechnicalFeatures: React.FC = () => {
  const features = [
    {
      title: "RFC 9293 Compliant",
      desc: "Zero vendor-specific encapsulation. Fully interoperable with standard commodity POSIX TCP sockets.",
      tag: "STANDARD",
    },
    {
      title: "AEAD_CHACHA20_POLY1305",
      desc: "Hardware-accelerated quantum resistant forward secrecy for every transmitted socket frame.",
      tag: "CIPHER",
    },
    {
      title: "NUMA-Aware Ring Buffers",
      desc: "Allocated directly on CPU socket node memory to prevent Inter-Socket Bus saturation.",
      tag: "HARDWARE",
    },
    {
      title: "Deterministic Merkle Root",
      desc: "Cryptographic manifest proofs verifiable offline without access to protocol server daemon.",
      tag: "VERIFICATION",
    },
  ];

  return (
    <section className="w-full px-margin py-space-xl border-t border-surface-container-high bg-surface-container-lowest">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-space-lg bg-surface-container-low border border-surface-container-high flex flex-col justify-between gap-space-sm"
          >
            <div>
              <span className="font-label-caps text-label-caps uppercase text-outline block mb-1">
                {f.tag}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-medium mb-1">
                {f.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
