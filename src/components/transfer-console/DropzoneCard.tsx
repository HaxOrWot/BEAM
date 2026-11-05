"use client";

import React, { useState } from "react";

export const DropzoneCard: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        alert("Payload dropped. Commencing chunk segmentation...");
      }}
      className={`bg-surface-container-lowest p-space-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-space-md ${
        isDragOver
          ? "border-primary bg-surface-container-high/40 scale-[1.005]"
          : "border-outline-variant hover:border-outline"
      }`}
    >
      <div className="w-16 h-16 bg-surface-container border border-outline-variant flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-[36px]">folder_zip</span>
      </div>

      <div className="flex flex-col gap-space-xs max-w-lg">
        <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-semibold">
          DRAG ARCHIVES, BINARIES, OR FOLDERS HERE (RAW STREAMING)
        </span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Payload stream commences synchronously across verified socket pair without filesystem intermediate caching.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
        <label className="cursor-pointer px-space-md py-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors">
          <span className="material-symbols-outlined text-[18px]">hard_drive</span>
          <span>BROWSE LOCAL FILES</span>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(e) => {
              if (e.target.files?.length) {
                alert(`Selected ${e.target.files.length} payload(s). Buffering...`);
              }
            }}
          />
        </label>

        <button
          onClick={() => alert("NVMe Direct Volume Selector opened")}
          className="px-space-md py-2 bg-surface-container-low border border-outline-variant hover:bg-surface-container text-on-surface font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">memory</span>
          <span>SELECT DIRECT BLOCK DEVICE</span>
        </button>
      </div>
    </div>
  );
};
