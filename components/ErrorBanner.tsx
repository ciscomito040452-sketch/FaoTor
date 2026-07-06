"use client";

import { useEffect } from "react";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="alert"
      className="rounded-[12px] bg-risk-red-bg px-4 py-3 text-[15px] text-risk-red-text"
    >
      {message}
    </div>
  );
}
