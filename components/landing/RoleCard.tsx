import Link from "next/link";

interface RoleCardProps {
  href: string;
  title: string;
  description: string;
  variant: "primary" | "secondary";
  icon: React.ReactNode;
}

export function RoleCard({
  href,
  title,
  description,
  variant,
  icon,
}: RoleCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`flex min-h-[88px] items-start gap-4 rounded-[16px] border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:shadow-md ${
        isPrimary
          ? "border-blue-100 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/20"
          : "border-slate-100 bg-white dark:bg-[var(--color-surface)]"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${
          isPrimary ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-[15px] text-slate-600">{description}</p>
      </div>
      <svg
        className="mt-1 shrink-0 text-slate-400"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M7.5 5L12.5 10L7.5 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
