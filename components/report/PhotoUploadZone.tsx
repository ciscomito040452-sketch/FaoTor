"use client";

import { motion } from "framer-motion";
import { DEMO_STRICT_SAMPLES, MOCK_MODE } from "@/lib/mock-data";
import { useReducedMotion } from "@/lib/motion";

type PreviewSource = "none" | "file" | "sample";

interface PhotoUploadZoneProps {
  preview: string | null;
  previewSource?: PreviewSource;
  hint: string;
  tipItems?: readonly string[];
  sampleLabels?: [string, string, string];
  samples?: readonly [string, string, string];
  takePhotoLabel: string;
  choosePhotoLabel: string;
  changeLabel: string;
  clearLabel: string;
  sampleSectionLabel: string;
  sampleBadgeLabel: string;
  mockAiHint?: string;
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
  onClear: () => void;
  onSampleSelect: (url: string) => void;
}

function PhotoTipChips({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Photo tips">
      {items.map((tip) => (
        <span
          key={tip}
          role="listitem"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-[12px] font-medium text-slate-600 ring-1 ring-slate-200/70"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0 text-slate-400"
            aria-hidden
          >
            <path
              d="M2.5 6.2 4.8 8.5 9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {tip}
        </span>
      ))}
    </div>
  );
}

export function PhotoUploadZone({
  preview,
  previewSource = "none",
  hint,
  tipItems,
  sampleLabels,
  samples,
  takePhotoLabel,
  choosePhotoLabel,
  changeLabel,
  clearLabel,
  sampleSectionLabel,
  sampleBadgeLabel,
  mockAiHint,
  onTakePhoto,
  onChooseFromLibrary,
  onClear,
  onSampleSelect,
}: PhotoUploadZoneProps) {
  const reduced = useReducedMotion();
  const strictSamplesOnly = DEMO_STRICT_SAMPLES;
  const canUseCamera = !strictSamplesOnly;

  function handlePreviewTap() {
    if (!preview || !canUseCamera) return;
    onTakePhoto();
  }

  return (
    <div className="space-y-3">
      {tipItems && tipItems.length > 0 && <PhotoTipChips items={tipItems} />}

      <motion.button
        type="button"
        onClick={handlePreviewTap}
        whileHover={canUseCamera && !preview && !reduced ? { scale: 1.005 } : undefined}
        whileTap={canUseCamera && !reduced ? { scale: 0.995 } : undefined}
        className={`relative flex h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed border-slate-100 bg-white dark:bg-[var(--color-surface)] ${
          preview && canUseCamera ? "cursor-pointer" : preview ? "cursor-default" : canUseCamera ? "cursor-pointer" : "cursor-default"
        }`}
        aria-label={preview && canUseCamera ? changeLabel : undefined}
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
            {canUseCamera && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3 text-left text-white">
                <p className="inline-flex items-center gap-2 text-[13px] font-semibold">
                  <span aria-hidden>↻</span>
                  {changeLabel}
                </p>
              </div>
            )}
            {previewSource === "sample" && (
              <span className="absolute left-3 top-3 rounded-md bg-slate-900/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
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
              {strictSamplesOnly ? sampleSectionLabel : hint}
            </span>
          </>
        )}
      </motion.button>

      {preview && (
        <div className="flex gap-2">
          {canUseCamera && (
            <button
              type="button"
              onClick={onTakePhoto}
              className="pressable min-h-[48px] flex-1 rounded-[12px] border border-brand-blue/30 bg-brand-blue-soft px-3 py-2.5 text-[14px] font-semibold text-brand-blue hover:bg-brand-blue-soft/70"
            >
              {changeLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onClear}
            className="pressable min-h-[48px] flex-1 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            {clearLabel}
          </button>
        </div>
      )}

      {previewSource === "file" && MOCK_MODE && mockAiHint && (
        <p className="rounded-[10px] border border-brand-orange/20 bg-brand-orange-soft/60 px-3 py-2 text-[12px] text-brand-orange-dark">
          {mockAiHint}
        </p>
      )}

      {canUseCamera && !preview && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onTakePhoto}
            className="pressable min-h-[48px] w-full rounded-[12px] bg-brand-blue px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-brand-blue-dark"
          >
            {takePhotoLabel}
          </button>
          <button
            type="button"
            onClick={onChooseFromLibrary}
            className="pressable min-h-[48px] w-full rounded-[12px] border border-brand-blue/30 bg-brand-blue-soft px-4 py-2.5 text-[14px] font-semibold text-brand-blue hover:bg-brand-blue-soft/70"
          >
            {choosePhotoLabel}
          </button>
        </div>
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
                className={`min-h-[44px] rounded-[10px] border px-3 py-2 text-[13px] font-semibold transition ${
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
