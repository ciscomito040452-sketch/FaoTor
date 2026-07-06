"use client";

type PreviewSource = "none" | "file" | "sample";

interface PhotoUploadZoneProps {
  preview: string | null;
  previewSource?: PreviewSource;
  hint: string;
  tips?: string;
  sampleLabels?: [string, string, string];
  samples?: readonly [string, string, string];
  uploadLabel: string;
  changeLabel: string;
  sampleSectionLabel: string;
  sampleBadgeLabel: string;
  onSelect: () => void;
  onSampleSelect: (url: string) => void;
}

export function PhotoUploadZone({
  preview,
  previewSource = "none",
  hint,
  tips,
  sampleLabels,
  samples,
  uploadLabel,
  changeLabel,
  sampleSectionLabel,
  sampleBadgeLabel,
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
        className="relative flex h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed border-slate-100 bg-white dark:bg-[var(--color-surface)]"
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3 text-left text-white">
              <p className="inline-flex items-center gap-2 text-[13px] font-semibold">
                <span aria-hidden>+</span>
                {changeLabel}
              </p>
            </div>
            {previewSource === "sample" && (
              <span className="absolute left-3 top-3 rounded-full bg-brand-orange-soft px-2.5 py-1 text-[11px] font-semibold text-brand-orange-dark">
                {sampleBadgeLabel}
              </span>
            )}
          </>
        ) : (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <rect x="3" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 8l2-4h6l2 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="max-w-[260px] text-center text-[15px] text-slate-600">
              {hint}
            </span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onSelect}
        className="w-full rounded-[12px] border border-brand-blue/30 bg-brand-blue-soft px-4 py-2.5 text-[14px] font-semibold text-brand-blue hover:bg-brand-blue-soft/70"
      >
        {uploadLabel}
      </button>

      {samples && sampleLabels && (
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-slate-500">{sampleSectionLabel}</p>
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
        </div>
      )}
    </div>
  );
}

