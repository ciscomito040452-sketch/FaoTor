import { MiniBarChart } from "./MiniBarChart";
import { MiniDonut } from "./MiniDonut";
import { MiniSparkline } from "./MiniSparkline";
import { TrendBadge } from "./TrendBadge";
import { Card } from "./Card";

type ChartType = "bar" | "donut" | "sparkline" | "none";

interface KpiCardProps {
  label: string;
  value: string | number;
  caption?: string;
  trend?: number | null;
  chartType?: ChartType;
  chartData?: number[];
  donutPercent?: number;
  barVariant?: "default" | "severe";
  active?: boolean;
  onClick?: () => void;
}

export function KpiCard({
  label,
  value,
  caption,
  trend,
  chartType = "bar",
  chartData = [],
  donutPercent = 0,
  barVariant = "default",
  active,
  onClick,
}: KpiCardProps) {
  const content = (
  <>
      <p className="text-[13px] text-slate-600">{label}</p>
      {caption && (
        <p className="mt-0.5 text-[11px] text-slate-400">{caption}</p>
      )}
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-[28px] font-bold leading-none text-slate-900">
            {value}
          </p>
          {trend != null && (
            <div className="mt-2">
              <TrendBadge value={trend} />
            </div>
          )}
        </div>
        {chartType === "bar" && chartData.length > 0 && (
          <MiniBarChart values={chartData} variant={barVariant} />
        )}
        {chartType === "donut" && <MiniDonut percent={donutPercent} />}
        {chartType === "sparkline" && chartData.length > 0 && (
          <MiniSparkline values={chartData} />
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`bento-card w-full p-5 text-left transition hover:shadow-md ${
          active
            ? "border-brand-blue shadow-[0_0_0_2px_#3b82f6]"
            : ""
        }`}
      >
        {content}
      </button>
    );
  }

  return <Card padding="md">{content}</Card>;
}
