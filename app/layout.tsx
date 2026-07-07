import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/lib/app-context";
import { fontClassName } from "@/lib/fonts";
import { ReportsProvider } from "@/lib/reports-store";
import { SettingsSheet } from "@/components/SettingsSheet";
import { Toast } from "@/components/shared/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "เฝ้าท่อ (FaoTor)",
  description: "ระบบรายงานและวิเคราะห์ความเสี่ยงท่อระบายน้ำด้วย AI",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
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
      <body className={`${fontClassName} antialiased`}>
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
