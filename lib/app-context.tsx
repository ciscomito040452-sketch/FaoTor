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
import en from "./locales/en.json";
import th from "./locales/th.json";

export type Locale = "th" | "en";
type Theme = "light" | "dark";

const MESSAGES = { th, en } as const;

interface ToastState {
  message: string;
  visible: boolean;
  variant: "default" | "success" | "error";
}

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: keyof typeof th) => string;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  showToast: (message: string, variant?: "default" | "success" | "error") => void;
  toast: ToastState;
  dismissToast: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th");
  const [theme, setThemeState] = useState<Theme>("light");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
    variant: "default",
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem("faotor-locale") as Locale | null;
    const savedTheme = localStorage.getItem("faotor-theme") as Theme | null;
    if (savedLocale === "th" || savedLocale === "en") setLocaleState(savedLocale);
    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("faotor-locale", locale);
  }, [locale, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("faotor-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, ready]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
    return () => clearTimeout(timer);
  }, [toast.visible, toast.message]);

  const setLocale = useCallback((value: Locale) => setLocaleState(value), []);
  const setTheme = useCallback((value: Theme) => setThemeState(value), []);
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const showToast = useCallback(
    (message: string, variant: "default" | "success" | "error" = "default") =>
      setToast({ message, visible: true, variant }),
    []
  );
  const dismissToast = useCallback(
    () => setToast((t) => ({ ...t, visible: false })),
    []
  );

  const t = useCallback(
    (key: keyof typeof th) => MESSAGES[locale][key] ?? key,
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      setTheme,
      t,
      settingsOpen,
      openSettings,
      closeSettings,
      showToast,
      toast,
      dismissToast,
    }),
    [
      locale,
      setLocale,
      theme,
      setTheme,
      t,
      settingsOpen,
      openSettings,
      closeSettings,
      showToast,
      toast,
      dismissToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
