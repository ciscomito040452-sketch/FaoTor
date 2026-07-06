interface MiniDonutProps {
  percent: number;
  size?: number;
}

export function MiniDonut({ percent, size = 56 }: MiniDonutProps) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width={size} height={size} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={6}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#3B82F6"
        strokeWidth={6}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#F97316"
        strokeWidth={6}
        strokeDasharray={c}
        strokeDashoffset={c - (percent / 100) * c * 0.35}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        opacity={0.5}
      />
    </svg>
  );
}
