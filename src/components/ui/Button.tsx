"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-2 py-1 gap-1",
    md: "px-3 py-1.5 gap-2",
    lg: "px-4 py-2 gap-2 text-xs",
  };

  const variantClasses = {
    primary: "bg-primary text-black hover:bg-neutral-200 font-semibold",
    secondary: "bg-surface-low border border-surface-high text-primary hover:bg-surface-container",
    danger: "border border-error/50 text-error hover:bg-error/10",
    ghost: "text-on-surface-variant hover:text-primary hover:bg-surface-high/30",
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
