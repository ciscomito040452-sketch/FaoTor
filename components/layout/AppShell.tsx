"use client";

import { AppLayout } from "@/components/shell/AppLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  /** @deprecated top nav replaces back */
  showBack?: boolean;
  largeTitle?: boolean;
  /** @deprecated */
  variant?: string;
}

export function AppShell({
  children,
  title,
  subtitle,
  actions,
  largeTitle,
}: AppShellProps) {
  return (
    <AppLayout>
      {title && largeTitle && (
        <SectionHeader title={title} subtitle={subtitle} actions={actions} />
      )}
      {title && !largeTitle && (
        <h1 className="mb-6 text-[22px] font-semibold text-slate-900">{title}</h1>
      )}
      {children}
    </AppLayout>
  );
}

export { SettingsButton } from "./NavActions";
