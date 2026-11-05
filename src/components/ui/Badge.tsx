import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "active" | "sync" | "idle" | "error";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "active",
  size = "md",
}) => {
  const styles = {
    active: "bg-surface-high text-primary border-surface-highest",
    sync: "bg-surface-container text-secondary border-outline/30",
    idle: "bg-surface-lowest text-outline border-surface-high",
    error: "bg-error-container/20 text-error border-error/30",
  };

  const dotColors = {
    active: "bg-primary",
    sync: "bg-secondary animate-pulse",
    idle: "bg-outline",
    error: "bg-error",
  };

  const sizes = {
    sm: "text-[9px] px-1.5 py-0.5 gap-1",
    md: "text-[10px] px-2 py-1 gap-1.5",
  };

  return (
    <span className={`inline-flex items-center font-mono uppercase tracking-wider border ${styles[variant]} ${sizes[size]}`}>
      <span className={`w-1.5 h-1.5 inline-block ${dotColors[variant]}`} />
      {children}
    </span>
  );
};
