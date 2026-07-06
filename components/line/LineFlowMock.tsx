"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";

type Bubble = { role: "user" | "bot"; text: string };

const STEPS: (keyof typeof import("@/lib/locales/th.json"))[] = [
  "line.userHi",
  "line.botAskPhoto",
  "line.userPhoto",
  "line.botResult",
  "line.botDashboard",
];

export function LineFlowMock() {
  const { t } = useApp();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing || step >= STEPS.length) {
      if (step >= STEPS.length) setPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      const key = STEPS[step];
      const role = key.startsWith("line.user") ? "user" : "bot";
      setBubbles((prev) => [...prev, { role, text: t(key) }]);
      setStep((s) => s + 1);
    }, step === 0 ? 400 : 1200);
    return () => clearTimeout(timer);
  }, [playing, step, t]);

  function playDemo() {
    setBubbles([]);
    setStep(0);
    setPlaying(true);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-[16px] border border-slate-100 bg-[#8CABD9] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="bg-[#06C755] px-4 py-3">
          <p className="text-[15px] font-semibold text-white">FaoTor LINE</p>
          <p className="text-[13px] text-white/80">Demo</p>
        </div>
        <div className="min-h-[320px] space-y-3 bg-[#8CABD9] p-4">
          {bubbles.map((b, i) => (
            <div
              key={`${b.role}-${i}`}
              className={`flex ${b.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[16px] px-4 py-2.5 text-[15px] leading-[1.4] ${
                  b.role === "user"
                    ? "bg-[#06C755] text-white"
                    : "bg-white text-slate-900"
                }`}
              >
                {b.text}
              </div>
            </div>
          ))}
          {playing && step < STEPS.length && (
            <div className="flex justify-start">
              <div className="rounded-[16px] bg-white px-4 py-3">
                <span className="inline-flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-pulse rounded-full bg-slate-400"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={playDemo}
        disabled={playing}
        className="mt-6 h-[50px] w-full rounded-[12px] bg-blue-500 text-[17px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {t("line.playDemo")}
      </button>

      {bubbles.length >= STEPS.length && (
        <Link
          href="/dashboard"
          className="mt-4 flex h-[50px] items-center justify-center rounded-[12px] border border-slate-100 bg-white text-[17px] font-semibold text-slate-900 dark:bg-[var(--color-surface)]"
        >
          {t("line.openDashboard")}
        </Link>
      )}
    </div>
  );
}
