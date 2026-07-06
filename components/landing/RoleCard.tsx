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
      className={`bento-card flex min-h-[100px] items-start gap-4 p-5 transition hover:shadow-md ${
        isPrimary
          ? "border-brand-blue/20 bg-brand-blue-soft"
          : "border-brand-orange/30 bg-brand-orange-soft"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${
          isPrimary ? "bg-brand-blue text-white" : "border-2 border-brand-orange bg-white text-brand-orange"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-[15px] text-slate-600">{description}</p>
      </div>
      <svg
        className={`mt-1 shrink-0 ${isPrimary ? "text-brand-blue" : "text-brand-orange"}`}
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
