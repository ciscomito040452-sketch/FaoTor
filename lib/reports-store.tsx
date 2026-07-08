"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useApp } from "./app-context";
import { SEED_REPORTS } from "./mock-data";
import { coordsFromLegacyMapXY, randomBangkokCoords } from "./map-utils";
import type { Report, ReportStatus } from "./types";

export const STORAGE_KEY = "faotor-mock-reports-v7";

interface ReportsContextValue {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "createdAt" | "status">) => Report;
  updateStatus: (id: string, status: ReportStatus) => void;
  resetReports: () => void;
  isReady: boolean;
}

const ReportsContext = createContext<ReportsContextValue | null>(null);

function normalizeReport(report: Report): Report {
  if (report.lat != null && report.lng != null) return report;
  if (report.mapX != null && report.mapY != null) {
    const { lat, lng } = coordsFromLegacyMapXY(report.mapX, report.mapY);
    return { ...report, lat, lng };
  }
  const { lat, lng } = randomBangkokCoords();
  return { ...report, lat, lng };
}

function loadReports(): Report[] {
  if (typeof window === "undefined") return SEED_REPORTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_REPORTS;
    const parsed = JSON.parse(raw) as Report[];
    const list = parsed.length > 0 ? parsed : SEED_REPORTS;
    return list.map(normalizeReport);
  } catch {
    return SEED_REPORTS;
  }
}

function saveReports(reports: Report[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return true;
  } catch {
    return false;
  }
}

export function ReportsProvider({ children }: { children: ReactNode }) {
  const { showToast, t } = useApp();
  const [reports, setReports] = useState<Report[]>(SEED_REPORTS);
  const [isReady, setIsReady] = useState(false);
  const storageErrorShown = useRef(false);

  useEffect(() => {
    setReports(loadReports());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const ok = saveReports(reports);
    if (!ok && !storageErrorShown.current) {
      storageErrorShown.current = true;
      showToast(t("toast.storageFull"));
    }
    if (ok) storageErrorShown.current = false;
  }, [reports, isReady, showToast, t]);

  const addReport = useCallback(
    (data: Omit<Report, "id" | "createdAt" | "status">) => {
      const coords =
        data.lat != null && data.lng != null
          ? { lat: data.lat, lng: data.lng }
          : randomBangkokCoords();
      const newReport: Report = {
        ...data,
        ...coords,
        id: `report-${Date.now()}`,
        status: "รอดำเนินการ",
        createdAt: new Date().toISOString(),
      };
      setReports((prev) =>
        [newReport, ...prev].sort((a, b) => b.riskScore - a.riskScore)
      );
      return newReport;
    },
    []
  );

  const updateStatus = useCallback((id: string, status: ReportStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }, []);

  const resetReports = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setReports(SEED_REPORTS);
  }, []);

  const value = useMemo(
    () => ({ reports, addReport, updateStatus, resetReports, isReady }),
    [reports, addReport, updateStatus, resetReports, isReady]
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within ReportsProvider");
  return ctx;
}

export function formatTimeAgo(iso: string, locale: "th" | "en" = "th"): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return locale === "th" ? "เมื่อสักครู่" : "Just now";
  if (minutes < 60) {
    return locale === "th"
      ? `${minutes} นาทีที่แล้ว`
      : `${minutes} min ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return locale === "th" ? `${hours} ชม.ที่แล้ว` : `${hours} hr ago`;
  }
  const days = Math.floor(hours / 24);
  return locale === "th" ? `${days} วันที่แล้ว` : `${days} days ago`;
}
