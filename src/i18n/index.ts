import en from '@/locales/en.json';
import pt from '@/locales/pt.json';
import de from '@/locales/de.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';

export type Locale = 'en' | 'pt' | 'de' | 'fr' | 'es' | 'it';

const LOCALES: Record<string, any> = {
  en,
  pt,
  de,
  fr,
  es,
  // italian fallback will reuse en if not provided
};

export const SUPPORTED: Locale[] = ['pt', 'it', 'de', 'fr', 'es', 'en'];

export function detectLocale(): Locale {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('locale');
      if (stored && SUPPORTED.includes(stored as Locale)) return stored as Locale;
      const nav = (navigator.language || navigator.languages?.[0] || 'pt').toLowerCase();
      if (nav.startsWith('pt')) return 'pt';
      if (nav.startsWith('it')) return 'it';
      if (nav.startsWith('de')) return 'de';
      if (nav.startsWith('fr')) return 'fr';
      if (nav.startsWith('es')) return 'es';
      return 'en';
    }
  } catch (e) {
    // ignore
  }
  return 'pt';
}

export function setLocale(code: Locale) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', code);
      // also set cookie so server can read the selection on next request
      try {
        document.cookie = `locale=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch (e) {
        // ignore
      }
      // reload to re-render server components/strings
      window.location.reload();
    }
  } catch (e) {
    // ignore
  }
}

export const defaultLocale: Locale = 'pt';

export function t(localeOrKey: Locale | string | undefined, keyPath?: string, fallback?: string) {
  // signature: t(locale, key) or t(key) where locale omitted => autodetect
  let locale: string | undefined;
  let key: string;
  if (keyPath === undefined) {
    // called as t(key)
    locale = detectLocale();
    key = localeOrKey as string;
  } else {
    locale = localeOrKey as string || detectLocale();
    key = keyPath;
  }

  const parts = key.split('.');
  let cur: any = LOCALES[locale] || LOCALES[defaultLocale];
  for (const p of parts) {
    if (!cur) break;
    cur = cur[p];
  }
  if ((cur === undefined || cur === null) && locale === 'it') {
    // Italian translations not added: fallback to English if missing
    cur = LOCALES['en'];
    for (const p of parts) {
      if (!cur) break;
      cur = cur[p];
    }
  }
  if (cur === undefined || cur === null) return fallback || key;
  return cur;
}

export default LOCALES;
