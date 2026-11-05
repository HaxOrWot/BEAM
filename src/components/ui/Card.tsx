import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "low" | "high";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const backgrounds = {
    default: "bg-surface-container border-surface-high",
    low: "bg-surface-low border-surface-low",
    high: "bg-surface-high border-surface-high",
  };

  return (
    <div className={`border p-4 ${backgrounds[variant]} ${className}`}>
      {children}
    </div>
  );
};
