import type { ReactNode } from "react";

interface MetricTileProps {
  label: string;
  value: number | string;
  tone?: "neutral" | "risk" | "urgency";
  children?: ReactNode;
  className?: string;
}

const toneClass = {
  neutral: "bg-slate-50 border-slate-100",
  risk: "bg-brand-orange-soft/60 border-brand-orange/20",
  urgency: "bg-brand-orange-soft border-brand-orange/30",
};

export function MetricTile({
  label,
  value,
  tone = "neutral",
  children,
  className = "",
}: MetricTileProps) {
  return (
    <div
      className={`min-w-0 flex-1 rounded-xl border px-3 py-2.5 ${toneClass[tone]} ${className}`}
    >
      <p className="text-[22px] font-bold leading-none tabular-nums text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-semibold text-slate-600">{label}</p>
      {children && <div className="mt-1.5">{children}</div>}
    </div>
  );
}
