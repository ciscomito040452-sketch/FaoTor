"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";

export function SettingsSheet() {
  const {
    settingsOpen,
    closeSettings,
    locale,
    setLocale,
    theme,
    setTheme,
    t,
    showToast,
  } = useApp();
  const { resetReports } = useReports();

  if (!settingsOpen) return null;

  function handleReset() {
    resetReports();
    showToast(t("toast.reset"));
    closeSettings();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label={t("common.close")}
        onClick={closeSettings}
      />
      <div className="relative z-10 w-full max-w-lg rounded-t-[16px] bg-white p-6 dark:bg-[var(--color-surface)] sm:rounded-[16px]">
        <h2 className="mb-6 text-[22px] font-semibold text-slate-900">
          {t("settings.title")}
        </h2>

        <div className="space-y-4">
          <div className="rounded-[16px] border border-slate-100 p-4 dark:border-slate-100">
            <p className="mb-3 text-[13px] text-slate-600">{t("settings.language")}</p>
            <div className="flex rounded-[12px] bg-slate-100 p-1">
              {(["th", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={`min-h-[44px] flex-1 rounded-[10px] text-[15px] font-semibold ${
                    locale === lang
                      ? "bg-white text-brand-blue shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      : "text-slate-600"
                  }`}
                >
                  {lang === "th" ? "ไทย" : "English"}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-100 p-4 dark:border-slate-100">
            <p className="mb-3 text-[13px] text-slate-600">{t("settings.theme")}</p>
            <div className="flex rounded-[12px] bg-slate-100 p-1">
              {(["light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTheme(mode)}
                  className={`min-h-[44px] flex-1 rounded-[10px] text-[15px] font-semibold ${
                    theme === mode
                      ? "bg-white text-brand-blue shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      : "text-slate-600"
                  }`}
                >
                  {mode === "light"
                    ? t("settings.themeLight")
                    : t("settings.themeDark")}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-100 p-4 dark:border-slate-100">
            <p className="mb-1 text-[15px] font-semibold text-slate-900">
              {t("settings.reset")}
            </p>
            <p className="mb-3 text-[13px] text-slate-600">{t("settings.resetHint")}</p>
            <button
              type="button"
              onClick={handleReset}
              className="h-[44px] w-full rounded-[12px] border border-slate-100 text-[15px] font-semibold text-slate-900 hover:bg-slate-50"
            >
              {t("settings.reset")}
            </button>
          </div>

          <Link
            href="/line"
            onClick={closeSettings}
            className="flex h-[50px] items-center justify-center rounded-[12px] bg-brand-blue-soft text-[15px] font-semibold text-brand-blue dark:bg-blue-900/20"
          >
            {t("settings.lineLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
