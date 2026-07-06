"use client";

interface PhotoUploadZoneProps {
  preview: string | null;
  hint: string;
  tips?: string;
  sampleLabels?: [string, string, string];
  samples?: readonly [string, string, string];
  onSelect: () => void;
  onSampleSelect: (url: string) => void;
}

export function PhotoUploadZone({
  preview,
  hint,
  tips,
  sampleLabels,
  samples,
  onSelect,
  onSampleSelect,
}: PhotoUploadZoneProps) {
  return (
    <div className="space-y-3">
      {tips && (
        <div className="rounded-[12px] border border-brand-blue/20 bg-brand-blue-soft/50 px-4 py-3 text-[13px] text-slate-600 dark:border-blue-900/30 dark:bg-blue-900/10">
          {tips}
        </div>
      )}
      <button
        type="button"
        onClick={onSelect}
        className="flex h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed border-slate-100 bg-white dark:bg-[var(--color-surface)]"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <rect x="3" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 8l2-4h6l2 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="max-w-[240px] text-center text-[15px] text-slate-600">
              {hint}
            </span>
          </>
        )}
      </button>
      {samples && sampleLabels && (
        <div className="flex flex-wrap gap-2">
          {samples.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => onSampleSelect(url)}
              className="rounded-[10px] border border-slate-100 px-3 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
            >
              {sampleLabels[i]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
