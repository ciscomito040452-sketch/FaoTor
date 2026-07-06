"use client";

import { useApp } from "@/lib/app-context";

export function Toast() {
  const { toast, dismissToast } = useApp();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-[60] w-[calc(100%-3rem)] max-w-md -translate-x-1/2 lg:bottom-8">
      <button
        type="button"
        onClick={dismissToast}
        className="w-full rounded-[12px] bg-slate-900 px-4 py-3 text-center text-[15px] font-semibold text-white shadow-lg dark:bg-white dark:text-slate-900"
      >
        {toast.message}
      </button>
    </div>
  );
}
