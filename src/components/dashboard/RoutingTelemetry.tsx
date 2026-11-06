import React from "react";
import { Activity } from "lucide-react";

export const RoutingTelemetry: React.FC = () => {
  return (
    <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-secondary" />
          Global Peer Routing Latency
        </span>
        <span className="font-mono text-xs text-secondary">Mesh • TYO-02</span>
      </div>

      <div className="w-full bg-surface-container p-4 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-2 font-mono text-xs text-outline">
          <span>
            Socket Jitter: <strong className="text-on-surface font-semibold">0.4ms</strong>
          </span>
          <span>
            Avg Throughput: <strong className="text-secondary font-semibold">418 Mbps</strong>
          </span>
        </div>

        {/* Minimalist Sparkline SVG */}
        <svg
          className="w-full h-14 overflow-visible"
          fill="none"
          viewBox="0 0 300 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4CD7F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4CD7F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 Q20,38 40,42 T80,25 T120,35 T160,18 T200,22 T240,12 T280,18 T300,10 L300,60 L0,60 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M0,45 Q20,38 40,42 T80,25 T120,35 T160,18 T200,22 T240,12 T280,18 T300,10"
            fill="none"
            stroke="#4CD7F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="300" cy="10" r="4" fill="#4CD7F6" className="animate-ping" />
          <circle cx="300" cy="10" r="3" fill="#111319" stroke="#4CD7F6" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};
