"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_REPORTS } from "./mock-data";
import type { Report, ReportStatus } from "./types";

const STORAGE_KEY = "faotor-mock-reports";

interface ReportsContextValue {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "createdAt" | "status">) => Report;
  updateStatus: (id: string, status: ReportStatus) => void;
  isReady: boolean;
}

const ReportsContext = createContext<ReportsContextValue | null>(null);

function loadReports(): Report[] {
  if (typeof window === "undefined") return SEED_REPORTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_REPORTS;
    const parsed = JSON.parse(raw) as Report[];
    return parsed.length > 0 ? parsed : SEED_REPORTS;
  } catch {
    return SEED_REPORTS;
  }
}

function saveReports(reports: Report[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(SEED_REPORTS);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setReports(loadReports());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) saveReports(reports);
  }, [reports, isReady]);

  const addReport = useCallback(
    (data: Omit<Report, "id" | "createdAt" | "status">) => {
      const newReport: Report = {
        ...data,
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

  const value = useMemo(
    () => ({ reports, addReport, updateStatus, isReady }),
    [reports, addReport, updateStatus, isReady]
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

export function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "เมื่อสักครู่";
  if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ชม.ที่แล้ว`;
  const days = Math.floor(hours / 24);
  return `${days} วันที่แล้ว`;
}
