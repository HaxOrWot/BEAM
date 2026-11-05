import React from "react";

interface SectionHeaderProps {
  title: string;
  tag?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  tag,
  action,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-high gap-2 mb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-base md:text-lg font-medium text-primary tracking-tight">
          {title}
        </h2>
        {tag && (
          <span className="font-mono text-[10px] text-outline uppercase tracking-widest px-2 py-0.5 bg-surface-lowest border border-surface-high">
            {tag}
          </span>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
