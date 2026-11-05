import React from "react";

interface MetricBoxProps {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  positive?: boolean;
}

export const MetricBox: React.FC<MetricBoxProps> = ({
  label,
  value,
  unit,
  delta,
  positive = true,
}) => {
  return (
    <div className="bg-surface-low border border-surface-high p-4 flex flex-col justify-between">
      <div className="font-mono text-[10px] text-outline uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl md:text-3xl font-medium text-primary">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-xs text-on-surface-variant uppercase">
            {unit}
          </span>
        )}
      </div>
      {delta && (
        <div className={`font-mono text-[11px] mt-2 ${positive ? "text-primary/80" : "text-error"}`}>
          {delta}
        </div>
      )}
    </div>
  );
};
