import React from "react";

export const AggregateSpeedHud: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
      {/* Big Gold Metric */}
      <div className="md:col-span-2 bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between">
        <span className="font-label-caps text-label-caps uppercase text-outline">
          AGGREGATE HARDWARE WIRE THROUGHPUT
        </span>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span
            className="font-metric-xl text-metric-xl font-medium tracking-tight"
            style={{
              color: "rgb(223, 189, 105)",
              textShadow: "rgba(223, 189, 105, 0.35) 0px 0px 16px",
            }}
          >
            1,318.5
          </span>
          <span className="font-headline-sm text-headline-sm text-primary uppercase">
            MB/s
          </span>
        </div>
        <div className="flex items-center gap-space-md font-telemetry-sm text-telemetry-sm text-outline">
          <span>PEAK: 1,410.2 MB/s</span>
          <span>&bull;</span>
          <span className="text-primary">10.55 Gbps (99.1% WIRE UTIL)</span>
        </div>
      </div>

      {/* Outbound */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between">
        <span className="font-label-caps text-label-caps uppercase text-outline">
          OUTBOUND TX STREAM
        </span>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span
            className="font-headline-lg text-headline-lg font-medium"
            style={{ color: "rgb(223, 189, 105)" }}
          >
            428.4
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">
          1 ACTIVE PEER &bull; ETH0 TX
        </span>
      </div>

      {/* Inbound */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between">
        <span className="font-label-caps text-label-caps uppercase text-outline">
          INBOUND RX STREAM
        </span>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-headline-lg text-headline-lg font-medium text-primary">
            890.1
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">
          1 ACTIVE PEER &bull; ETH0 RX
        </span>
      </div>
    </div>
  );
};
