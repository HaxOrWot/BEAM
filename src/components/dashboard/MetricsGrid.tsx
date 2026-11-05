import React from "react";
import { MetricBox } from "../ui/MetricBox";
import { DASHBOARD_METRICS } from "@/lib/mock-data";

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {DASHBOARD_METRICS.map((metric, i) => (
        <MetricBox
          key={i}
          label={metric.label}
          value={metric.value}
          unit={metric.unit}
          delta={metric.delta}
          positive={metric.positive}
        />
      ))}
    </div>
  );
};
