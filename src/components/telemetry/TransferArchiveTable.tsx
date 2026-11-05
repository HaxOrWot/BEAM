import React from "react";

export const TransferArchiveTable: React.FC = () => {
  const records = [
    {
      epoch: "1747582109",
      sock: "fd=7",
      peer: "192.168.1.45:9042",
      digest: "0x8F9C_BLAKE3",
      payload: "model_weights_llama3_70b.safetensors",
      bytes: "109.8 GB",
      rate: "840.4 MB/s",
      status: "STREAMING",
    },
    {
      epoch: "1747581900",
      sock: "fd=9",
      peer: "192.88.99.1:9042",
      digest: "0xC112_BLAKE3",
      payload: "genomics_sequencing_chr22.bam",
      bytes: "18.9 GB",
      rate: "410.2 MB/s",
      status: "STREAMING",
    },
    {
      epoch: "1747579420",
      sock: "fd=12",
      peer: "10.0.4.12:9042",
      digest: "0xFA40_BLAKE3",
      payload: "kernel_core_dump_raw_mem.dmp",
      bytes: "8.4 GB",
      rate: "120.0 MB/s",
      status: "COMPLETED",
    },
    {
      epoch: "1747571102",
      sock: "fd=4",
      peer: "203.0.113.88:9042",
      digest: "0x981A_BLAKE3",
      payload: "synthetic_benchmark_100g.bin",
      bytes: "100.0 GB",
      rate: "1.14 GB/s",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest border border-outline-variant/30 p-space-lg">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <span className="font-headline-sm text-headline-sm text-primary uppercase font-semibold">
          TRANSFER ARCHIVE &amp; AUDIT LOGS
        </span>
        <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">
          IMMUTABLE CRYPTOGRAPHIC LOG
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-outline-variant/30 text-outline uppercase font-label-caps text-label-caps">
              <th className="py-2 px-3">Epoch Time</th>
              <th className="py-2 px-3">Descriptor</th>
              <th className="py-2 px-3">Peer Address</th>
              <th className="py-2 px-3">Payload</th>
              <th className="py-2 px-3">Bytes</th>
              <th className="py-2 px-3">Rate</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {records.map((r, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors">
                <td className="py-2 px-3 text-outline">{r.epoch}</td>
                <td className="py-2 px-3 text-primary">{r.sock}</td>
                <td className="py-2 px-3 text-on-surface">{r.peer}</td>
                <td className="py-2 px-3 text-primary truncate max-w-[200px]" title={r.payload}>
                  {r.payload}
                </td>
                <td className="py-2 px-3 text-on-surface">{r.bytes}</td>
                <td className="py-2 px-3 text-primary">{r.rate}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-semibold ${
                      r.status === "STREAMING"
                        ? "bg-primary text-on-primary font-semibold"
                        : "border border-outline-variant text-outline"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
