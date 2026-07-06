import { MiniBarChart } from "./MiniBarChart";
import { MiniDonut } from "./MiniDonut";
import { MiniSparkline } from "./MiniSparkline";
import { TrendBadge } from "./TrendBadge";
import { Card } from "./Card";

type ChartType = "bar" | "donut" | "sparkline" | "none";

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: number;
  chartType?: ChartType;
  chartData?: number[];
  donutPercent?: number;
  active?: boolean;
  onClick?: () => void;
}

export function KpiCard({
  label,
  value,
  trend,
  chartType = "bar",
  chartData = [],
  donutPercent = 0,
  active,
  onClick,
}: KpiCardProps) {
  const content = (
  <>
      <p className="text-[13px] text-slate-600">{label}</p>
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
          <MiniBarChart values={chartData} />
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
          active ? "ring-2 ring-brand-blue ring-offset-1" : ""
        }`}
      >
        {content}
      </button>
    );
  }

  return <Card padding="md">{content}</Card>;
}
