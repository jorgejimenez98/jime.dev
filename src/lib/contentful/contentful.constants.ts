import type { AppLocale } from "@/i18n/routing"

// App locale → Contentful locale code. The space's default locale is renamed
// from en-US to en, so they match 1:1; change it here if the rename can't happen.
export const CONTENTFUL_LOCALES = {
  en: "en",
  es: "es"
} as const satisfies Record<AppLocale, string>

/**
 * The Contentful code for a locale. A path like /wp-login.php reaches the
 * [locale] layout as a "locale" before notFound() answers it, and anything
 * rendered on the way must not turn that 404 into a failed query (a 500).
 */
export function toContentfulLocale(locale: string) {
  return locale in CONTENTFUL_LOCALES
    ? CONTENTFUL_LOCALES[locale as AppLocale]
    : CONTENTFUL_LOCALES.en
}
