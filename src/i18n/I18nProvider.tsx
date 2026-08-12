"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Locale,
  defaultLocale,
  normalizeLocale,
  setLocale as persistLocale,
  translate,
} from ".";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>, fallback?: string) => any;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(normalizeLocale(initialLocale) || defaultLocale);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        const normalized = normalizeLocale(nextLocale) || defaultLocale;
        persistLocale(normalized);
        setLocaleState(normalized);
        try {
          document.documentElement.lang = normalized;
        } catch (e) {
          // ignore
        }
        router.refresh();
      },
      t: (key, params, fallback) => translate(locale, key, params, fallback),
    }),
    [locale, router]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return value;
}
