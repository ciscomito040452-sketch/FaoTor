import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/lib/app-context";
import { ReportsProvider } from "@/lib/reports-store";
import { SettingsSheet } from "@/components/SettingsSheet";
import { Toast } from "@/components/shared/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "เฝ้าท่อ (FaoTor)",
  description: "ระบบรายงานและวิเคราะห์ความเสี่ยงท่อระบายน้ำด้วย AI",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;600;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppProvider>
          <ReportsProvider>
            {children}
            <SettingsSheet />
            <Toast />
          </ReportsProvider>
        </AppProvider>
      </body>
    </html>
  );
}
