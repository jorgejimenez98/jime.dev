import type { AppLocale } from "@/i18n/routing"

// App locale → Contentful locale code. The space's default locale is renamed
// from en-US to en, so they match 1:1; change it here if the rename can't happen.
export const CONTENTFUL_LOCALES = {
  en: "en",
  es: "es"
} as const satisfies Record<AppLocale, string>
