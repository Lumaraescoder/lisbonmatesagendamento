import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";
import it from "@/locales/it.json";

export type Locale = 'en' | 'pt' | 'de' | 'fr' | 'es' | 'it';

export const LOCALE_STORAGE_KEY = "locale";
export const defaultLocale: Locale = "pt";
export const fallbackLocale: Locale = "en";
export const SUPPORTED: Locale[] = ["pt", "it", "de", "fr", "es", "en"];

export const LOCALES: Record<Locale, any> = {
  en,
  pt,
  de,
  fr,
  es,
  it,
};

export function normalizeLocale(locale?: string | null): Locale | undefined {
  if (!locale) return undefined;
  const base = locale.toLowerCase().trim().split(";")[0].split(",")[0].split("-")[0];
  return SUPPORTED.includes(base as Locale) ? (base as Locale) : undefined;
}

export function pickLocaleFromAcceptLanguage(acceptLanguage?: string | null): Locale | undefined {
  if (!acceptLanguage) return undefined;
  return acceptLanguage
    .split(",")
    .map((part, index) => {
      const [language, ...parameters] = part.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const parsedQuality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1;

      return {
        index,
        locale: normalizeLocale(language),
        quality: Number.isFinite(parsedQuality) ? parsedQuality : 0,
      };
    })
    .filter((preference) => preference.locale && preference.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)[0]?.locale;
}

function getNestedValue(locale: Locale, key: string) {
  const parts = key.split(".");
  let cur: any = LOCALES[locale];
  for (const part of parts) {
    if (cur === undefined || cur === null) return undefined;
    cur = cur[part];
  }
  return cur;
}

export function formatTranslation(value: unknown, params?: Record<string, string | number>) {
  if (typeof value !== "string" || !params) return value;
  return value.replace(/\{(\w+)\}/g, (match, name) => {
    const replacement = params[name];
    return replacement === undefined || replacement === null ? match : String(replacement);
  });
}

export function translate(
  locale: Locale | string | undefined,
  key: string,
  params?: Record<string, string | number>,
  fallback?: string
) {
  const normalized = normalizeLocale(locale) || defaultLocale;
  const value = getNestedValue(normalized, key);
  const fallbackValue = normalized === fallbackLocale ? undefined : getNestedValue(fallbackLocale, key);
  return formatTranslation(value ?? fallbackValue ?? fallback ?? key, params);
}

export function detectLocale(): Locale {
  try {
    if (typeof window !== "undefined") {
      const stored = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
      if (stored) return stored;
      const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
      for (const language of languages) {
        const normalized = normalizeLocale(language);
        if (normalized) return normalized;
      }
    }
  } catch (e) {
    // ignore
  }
  return defaultLocale;
}

export function setLocale(code: Locale) {
  if (typeof window !== "undefined") {
    const normalized = normalizeLocale(code) || defaultLocale;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, normalized);
    } catch (e) {
      // Local storage can be disabled while cookies remain available.
    }
    try {
      document.cookie = `${LOCALE_STORAGE_KEY}=${normalized}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch (e) {
      // Ignore cookie failures; the current client session can still update.
    }
  }
}

export function t(
  localeOrKey: Locale | string | undefined,
  keyPath?: string | Record<string, string | number>,
  fallback?: string | Record<string, string | number>
) {
  // signature: t(locale, key) or t(key) where locale omitted => autodetect
  let locale: string | undefined;
  let key: string;
  let params: Record<string, string | number> | undefined;
  let fallbackText: string | undefined;

  if (keyPath === undefined || typeof keyPath === "object") {
    // called as t(key)
    locale = detectLocale();
    key = localeOrKey as string;
    params = keyPath as Record<string, string | number> | undefined;
    fallbackText = typeof fallback === "string" ? fallback : undefined;
  } else {
    locale = (localeOrKey as string) || detectLocale();
    key = keyPath;
    params = typeof fallback === "object" ? fallback : undefined;
    fallbackText = typeof fallback === "string" ? fallback : undefined;
  }

  return translate(locale, key, params, fallbackText);
}

export default LOCALES;
