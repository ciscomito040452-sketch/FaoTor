"use client";

import { motion } from "framer-motion";
import { MOCK_MODE } from "@/lib/mock-data";
import { useReducedMotion } from "@/lib/motion";

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
  mockAiHint?: string;
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
  mockAiHint,
  onSelect,
  onSampleSelect,
}: PhotoUploadZoneProps) {
  const reduced = useReducedMotion();
  const demoOnly = MOCK_MODE;

  return (
    <div className="space-y-3">
      {tips && (
        <div className="rounded-[12px] border border-brand-blue/20 bg-brand-blue-soft/50 px-4 py-3 text-[13px] text-slate-600 dark:border-blue-900/30 dark:bg-blue-900/10">
          {tips}
        </div>
      )}

      {demoOnly && mockAiHint && (
        <p className="rounded-[10px] border border-brand-orange/20 bg-brand-orange-soft/60 px-3 py-2 text-[12px] text-brand-orange-dark">
          {mockAiHint}
        </p>
      )}

      <motion.button
        type="button"
        onClick={demoOnly ? undefined : onSelect}
        whileHover={demoOnly || reduced ? undefined : { scale: 1.005 }}
        whileTap={demoOnly || reduced ? undefined : { scale: 0.995 }}
        className={`relative flex h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed border-slate-100 bg-white dark:bg-[var(--color-surface)] ${
          demoOnly ? "cursor-default" : ""
        }`}
      >
        {preview ? (
          <>
            <motion.img
              key={preview}
              src={preview}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full w-full object-cover ${
                previewSource === "file" ? "ring-2 ring-brand-blue/40" : ""
              }`}
            />
            {!demoOnly && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3 text-left text-white">
                <p className="inline-flex items-center gap-2 text-[13px] font-semibold">
                  <span aria-hidden>+</span>
                  {changeLabel}
                </p>
              </div>
            )}
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
              {demoOnly ? sampleSectionLabel : hint}
            </span>
          </>
        )}
      </motion.button>

      {!demoOnly && (
        <>
          {previewSource === "file" && mockAiHint && (
            <p className="rounded-[10px] border border-brand-orange/20 bg-brand-orange-soft/60 px-3 py-2 text-[12px] text-brand-orange-dark">
              {mockAiHint}
            </p>
          )}

          <button
            type="button"
            onClick={onSelect}
            className="pressable w-full rounded-[12px] border border-brand-blue/30 bg-brand-blue-soft px-4 py-2.5 text-[14px] font-semibold text-brand-blue hover:bg-brand-blue-soft/70"
          >
            {uploadLabel}
          </button>
        </>
      )}

      {samples && sampleLabels && (
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-slate-500">{sampleSectionLabel}</p>
          <div className="flex flex-wrap gap-2">
            {samples.map((url, i) => (
              <motion.button
                key={url}
                type="button"
                onClick={() => onSampleSelect(url)}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className={`rounded-[10px] border px-3 py-2 text-[13px] font-semibold transition ${
                  preview === url
                    ? "border-brand-blue bg-brand-blue-soft text-brand-blue"
                    : "border-slate-100 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {sampleLabels[i]}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
