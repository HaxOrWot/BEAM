import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-margin py-space-xl flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="w-16 h-16 bg-surface-container border border-outline-variant flex items-center justify-center text-primary mb-4">
        <span className="material-symbols-outlined text-[36px]">error</span>
      </div>

      <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest mb-1">
        ERROR_SOCKET_NOT_CONNECTED // 404
      </span>
      <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold mb-3">
        PEER ENDPOINT NOT FOUND
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-6 leading-relaxed">
        SYN packet dispatched to an unmapped socket descriptor or remote mesh node has disconnected from the mesh topology.
      </p>

      <div className="flex items-center gap-space-sm">
        <Link
          href="/"
          className="px-space-md py-2.5 bg-primary text-black font-headline-sm text-headline-sm uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
        >
          Return to Console
        </Link>
        <Link
          href="/peers"
          className="px-space-md py-2.5 bg-surface-container border border-outline-variant text-primary font-headline-sm text-headline-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors"
        >
          Inspect Mesh Topology
        </Link>
      </div>
    </div>
  );
}
