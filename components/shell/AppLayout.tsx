"use client";

import { TopNav } from "./TopNav";
import { MobileBottomNav } from "./MobileBottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className = "" }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <TopNav />
      <main className={`mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 pb-safe-nav sm:px-6 lg:pb-8 xl:px-8 ${className}`}>
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
