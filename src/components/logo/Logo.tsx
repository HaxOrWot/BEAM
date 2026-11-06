import React from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 32,
  showText = true,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Minimalistic rounded beam mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_0_12px_rgba(99,102,241,0.35)]"
      >
        <defs>
          <linearGradient id="beamGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C0C1FF" />
            <stop offset="45%" stopColor="#8083FF" />
            <stop offset="100%" stopColor="#4CD7F6" />
          </linearGradient>
          <linearGradient id="nucleusGrad" x1="16" y1="16" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#4CD7F6" />
          </linearGradient>
        </defs>

        {/* Outer rounded pill orbit */}
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="12"
          fill="#161922"
          stroke="url(#beamGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        {/* Fast transit beam curve */}
        <path
          d="M10 28C10 20 16 12 28 12"
          stroke="url(#beamGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M14 28C14 22 18 16 28 16"
          stroke="#4CD7F6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Dynamic rounded nucleus particle */}
        <circle cx="28" cy="12" r="3.5" fill="url(#nucleusGrad)" />
        <circle cx="10" cy="28" r="2.5" fill="#8083FF" />
      </svg>

      {showText && (
        <span className="font-heading text-lg font-semibold tracking-tight text-on-surface">
          Beam
        </span>
      )}
    </div>
  );
};
