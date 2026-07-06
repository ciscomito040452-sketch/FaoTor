import type { RainForecast } from "@/lib/types";

export function UrgencyIcon({ className = "text-brand-orange" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RiskMetricIcon({ className = "text-slate-500" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 1.5C8 1.5 3 4.5 3 8.5C3 11.5 5.2 13.5 8 13.5C10.8 13.5 13 11.5 13 8.5C13 4.5 8 1.5 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.5C8 5.5 6.5 6.8 6.5 8.5C6.5 9.6 7.2 10.5 8 10.5C8.8 10.5 9.5 9.6 9.5 8.5C9.5 6.8 8 5.5 8 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function RainMetricIcon({
  level,
  className,
}: {
  level: RainForecast;
  className?: string;
}) {
  const iconClass =
    className ??
    (level === "สูง"
      ? "text-sky-600"
      : level === "ปานกลาง"
        ? "text-slate-500"
        : "text-slate-400");
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClass}
      aria-hidden
    >
      <path
        d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.8A3.5 3.5 0 0 0 7 18z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {level === "สูง" && (
        <>
          <path d="M10 20v2M14 20v2M12 21v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
