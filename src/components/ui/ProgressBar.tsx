import React from "react";

interface ProgressBarProps {
  progress: number;
  segments?: number;
  label?: string;
  speed?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  segments = 24,
  label,
  speed,
}) => {
  const filledCount = Math.round((progress / 100) * segments);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {(label || speed) && (
        <div className="flex items-center justify-between font-mono text-[11px] text-outline">
          <span>{label}</span>
          <span className="text-primary">{speed || `${progress}%`}</span>
        </div>
      )}
      <div className="flex items-center gap-[2px] bg-surface-lowest p-1 border border-surface-high">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 transition-colors ${
              i < filledCount
                ? "bg-primary"
                : i === filledCount
                ? "bg-secondary animate-pulse"
                : "bg-surface-high/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
