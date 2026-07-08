"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import type th from "@/lib/locales/th.json";

type LocaleKey = keyof typeof th;

type ChatMessage =
  | { id: string; type: "text"; role: "user" | "bot"; text: string }
  | { id: string; type: "image"; role: "user"; src: string; alt: string }
  | {
      id: string;
      type: "location";
      role: "user";
      title: string;
      address: string;
    };

type DemoStep =
  | { kind: "text"; role: "user" | "bot"; key: LocaleKey; delay?: number }
  | {
      kind: "image";
      role: "user";
      src: string;
      altKey: LocaleKey;
      delay?: number;
    }
  | {
      kind: "location";
      role: "user";
      titleKey: LocaleKey;
      addressKey: LocaleKey;
      delay?: number;
    };

const DEMO_STEPS: DemoStep[] = [
  { kind: "text", role: "user", key: "line.userHi", delay: 400 },
  { kind: "text", role: "bot", key: "line.botAskPhoto" },
  {
    kind: "image",
    role: "user",
    src: "/samples/drain-severe.svg",
    altKey: "line.userPhotoCaption",
    delay: 2000,
  },
  {
    kind: "location",
    role: "user",
    titleKey: "line.demoLocationTitle",
    addressKey: "line.demoLocationAddress",
    delay: 1600,
  },
  { kind: "text", role: "bot", key: "line.botAnalyzing", delay: 2200 },
  { kind: "text", role: "bot", key: "line.botResult" },
  { kind: "text", role: "bot", key: "line.botDashboard" },
];

function stepDelay(step: DemoStep, index: number): number {
  if (step.delay != null) return step.delay;
  return index === 0 ? 400 : 1200;
}

function stepToMessage(
  step: DemoStep,
  t: (key: LocaleKey) => string,
  id: string,
): ChatMessage {
  if (step.kind === "text") {
    return { id, type: "text", role: step.role, text: t(step.key) };
  }
  if (step.kind === "image") {
    return {
      id,
      type: "image",
      role: "user",
      src: step.src,
      alt: t(step.altKey),
    };
  }
  return {
    id,
    type: "location",
    role: "user",
    title: t(step.titleKey),
    address: t(step.addressKey),
  };
}

function LocationBubble({ title, address }: { title: string; address: string }) {
  return (
    <div className="w-[220px] overflow-hidden rounded-[14px] bg-white shadow-sm">
      <div className="relative h-[110px] bg-[#E8EDF2]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(#c5d0db 1px, transparent 1px),
              linear-gradient(90deg, #c5d0db 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#B8D4E8]/40 to-[#8CB4D4]/30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E53935] shadow-md">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
          </div>
          <div className="mx-auto h-2 w-4 rounded-full bg-black/20 blur-[2px]" />
        </div>
      </div>
      <div className="border-t border-slate-100 px-3 py-2.5">
        <p className="text-[14px] font-semibold leading-snug text-slate-900">{title}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{address}</p>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (message.type === "image") {
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div className="max-w-[78%] overflow-hidden rounded-[14px] bg-white shadow-sm">
          <Image
            src={message.src}
            alt={message.alt}
            width={240}
            height={180}
            className="h-auto w-[220px] object-cover"
          />
        </div>
      </div>
    );
  }

  if (message.type === "location") {
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <LocationBubble title={message.title} address={message.address} />
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[16px] px-4 py-2.5 text-[15px] leading-[1.4] ${
          isUser ? "bg-[#06C755] text-white" : "bg-white text-slate-900 shadow-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export function LineFlowMock() {
  const { t } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, playing, step]);

  useEffect(() => {
    if (!playing || step >= DEMO_STEPS.length) {
      if (step >= DEMO_STEPS.length) setPlaying(false);
      return;
    }

    const current = DEMO_STEPS[step];
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        stepToMessage(current, t, `msg-${step}`),
      ]);
      setStep((s) => s + 1);
    }, stepDelay(current, step));

    return () => clearTimeout(timer);
  }, [playing, step, t]);

  function playDemo() {
    setMessages([]);
    setStep(0);
    setPlaying(true);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-[20px] shadow-lg">
        <div className="bg-[#06C755] px-4 py-3">
          <p className="text-[15px] font-semibold text-white">FaoTor LINE</p>
          <p className="text-[13px] text-white/80">Demo</p>
        </div>
        <div className="max-h-[420px] min-h-[360px] space-y-3 overflow-y-auto bg-[#8CABD9] p-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {playing && step < DEMO_STEPS.length && (
            <div className="flex justify-start">
              <div className="rounded-[16px] bg-white px-4 py-3 shadow-sm">
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
          <div ref={chatEndRef} />
        </div>
      </div>

      <button
        type="button"
        onClick={playDemo}
        disabled={playing}
        className="mt-6 h-[50px] w-full rounded-[12px] bg-brand-blue text-[17px] font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
      >
        {t("line.playDemo")}
      </button>

      {messages.length >= DEMO_STEPS.length && (
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
