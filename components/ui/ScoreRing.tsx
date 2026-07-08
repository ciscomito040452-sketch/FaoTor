interface ScoreRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeColor?: string;
  label?: string;
  sublabel?: string;
  compact?: boolean;
  showPercent?: boolean;
  labelClassName?: string;
}

export function ScoreRing({
  value,
  max = 100,
  size = 80,
  strokeColor = "#3B82F6",
  label,
  sublabel,
  compact = false,
  showPercent = false,
  labelClassName = "text-slate-600",
}: ScoreRingProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const stroke = compact ? 5 : 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} aria-hidden className="block">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth={stroke}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold leading-none text-slate-900"
            style={{ fontSize: size * (showPercent ? 0.24 : 0.28) }}
          >
            {value}
            {showPercent && (
              <span
                className="font-semibold text-slate-500"
                style={{ fontSize: size * 0.14 }}
              >
                %
              </span>
            )}
          </span>
        </div>
      </div>
      {label && (
        <p
          className={`font-medium ${labelClassName} ${
            compact ? "mt-0.5 text-[9px] leading-snug" : "mt-2 text-[12px]"
          }`}
        >
          {label}
        </p>
      )}
      {sublabel && (
        <p className="mt-0.5 text-[11px] text-slate-400">{sublabel}</p>
      )}
    </div>
  );
}
