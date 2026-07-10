"use client";

interface AiReasonCardProps {
  title: string;
  body: string;
  compact?: boolean;
}

export function AiReasonCard({ title, body, compact = false }: AiReasonCardProps) {
  const titleClass = compact ? "text-[13px]" : "text-[14px]";
  const bodyClass = compact
    ? "text-[13px] leading-snug"
    : "text-[15px] leading-[1.5]";

  return (
    <div className="rounded-[12px] border border-slate-200/80 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
      <div className="flex items-center justify-between gap-2">
        <p className={`font-semibold tracking-tight text-slate-900 ${titleClass}`}>
          {title}
        </p>
        <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
          AI
        </span>
      </div>
      <p className={`mt-1.5 text-slate-600 ${bodyClass}`}>{body}</p>
    </div>
  );
}
