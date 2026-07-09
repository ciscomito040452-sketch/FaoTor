"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { useReducedMotion } from "@/lib/motion";

const TABS = [
  { href: "/", key: "nav.home" as const },
  { href: "/report", key: "nav.report" as const },
  { href: "/dashboard", key: "nav.dashboard" as const },
  { href: "/line", key: "nav.line" as const },
  { href: "/about", key: "nav.about" as const },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useApp();
  const reduced = useReducedMotion();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-100 bg-white/95 pb-safe backdrop-blur lg:hidden">
      <div className="flex">
        {TABS.map(({ href, key }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${
                active ? "text-brand-blue" : "text-slate-400"
              }`}
            >
              <motion.span
                animate={
                  reduced
                    ? undefined
                    : { scale: active ? 1.08 : 1 }
                }
                transition={{ duration: 0.2 }}
                whileTap={reduced ? undefined : { scale: 0.92 }}
                className="relative flex flex-col items-center"
              >
                <NavIcon name={key} active={active} />
                {active && !reduced && (
                  <motion.span
                    layoutId="mobile-nav-dot"
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-brand-blue"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {active && reduced && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-brand-blue" />
                )}
              </motion.span>
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? 2 : 1.5;
  if (name === "nav.home") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M3 9.5L11 3l8 6.5V18a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1V9.5z"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "nav.report") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect
          x="2"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth={stroke}
        />
        <circle cx="11" cy="12.5" r="3" stroke="currentColor" strokeWidth={stroke} />
      </svg>
    );
  }
  if (name === "nav.line") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M4 6h14v10H4V6z"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
        <path d="M7 9h8M7 12h5" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "nav.about") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth={stroke} />
        <path d="M11 10v5M11 7h.01" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
      <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
      <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
      <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
    </svg>
  );
}
