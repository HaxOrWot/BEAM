import React from "react";

export const StepPipeline: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-space-xl border border-outline-variant bg-surface-container-low">
      {/* Step 1 */}
      <div className="p-space-md bg-surface-container-lowest flex items-center justify-between border-b md:border-b-0 md:border-r border-outline-variant">
        <div className="flex items-center gap-space-sm">
          <div className="w-6 h-6 bg-primary flex items-center justify-center font-label-caps text-label-caps text-black font-bold">
            01
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">
              OPERATOR REGISTRATION
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              STATUS: IN_PROGRESS
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-primary text-[18px]">person_add</span>
      </div>

      {/* Step 2 */}
      <div className="p-space-md bg-surface-container-low flex items-center justify-between opacity-60 border-b md:border-b-0 md:border-r border-outline-variant">
        <div className="flex items-center gap-space-sm">
          <div className="w-6 h-6 bg-surface-container flex items-center justify-center font-label-caps text-label-caps text-outline">
            02
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-outline tracking-wider uppercase">
              HARDWARE ENCLAVE ATTEST
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              AWAITING_CREDENTIALS
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-outline text-[18px]">shield</span>
      </div>

      {/* Step 3 */}
      <div className="p-space-md bg-surface-container-low flex items-center justify-between opacity-40">
        <div className="flex items-center gap-space-sm">
          <div className="w-6 h-6 bg-surface-container flex items-center justify-center font-label-caps text-label-caps text-outline">
            03
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-outline tracking-wider uppercase">
              CLUSTER JOIN &amp; SYNC
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              STANDBY
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-outline text-[18px]">hub</span>
      </div>
    </div>
  );
};
