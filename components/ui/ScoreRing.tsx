interface ScoreRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeColor?: string;
  label?: string;
  sublabel?: string;
}

export function ScoreRing({
  value,
  max = 100,
  size = 80,
  strokeColor = "#3B82F6",
  label,
  sublabel,
}: ScoreRingProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const stroke = 6;
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
            style={{ fontSize: size * 0.28 }}
          >
            {value}
          </span>
        </div>
      </div>
      {label && (
        <p className="mt-2 text-[12px] font-medium text-slate-600">{label}</p>
      )}
      {sublabel && (
        <p className="mt-0.5 text-[11px] text-slate-400">{sublabel}</p>
      )}
    </div>
  );
}
