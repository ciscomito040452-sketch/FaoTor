"use client";

interface AiReasonCardProps {
  title: string;
  body: string;
  compact?: boolean;
}

export function AiReasonCard({ title, body, compact = false }: AiReasonCardProps) {
  const titleClass = compact ? "text-[14px]" : "text-[15px]";
  const bodyClass = compact ? "text-[14px] leading-relaxed" : "text-[15px] leading-relaxed";

  return (
    <div className="rounded-[12px] border border-brand-blue/15 border-l-4 border-l-brand-blue bg-gradient-to-br from-brand-blue-soft/80 to-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <SparkleIcon />
          <p className={`font-bold tracking-tight text-slate-900 ${titleClass}`}>
            {title}
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-brand-blue/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-blue">
          AI
        </span>
      </div>
      <p className={`mt-2 text-slate-700 ${bodyClass}`}>{body}</p>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-brand-blue"
      aria-hidden
    >
      <path
        d="M12 2l1.2 4.2L17.4 7.4 13.2 8.6 12 12.8 10.8 8.6 6.6 7.4l4.2-1.2L12 2zM5 14l.8 2.8L8.6 17.6 5.8 18.4 5 21.2 4.2 18.4 1.4 17.6l2.8-.8L5 14zM19 14l.8 2.8 2.8.8-2.8.8-.8 2.8-.8-2.8-2.8-.8 2.8-.8.8-2.8z"
        fill="currentColor"
      />
    </svg>
  );
}
