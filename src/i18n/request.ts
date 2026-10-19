import { routing } from "./routing"
import { notFound } from "next/navigation"
import * as rootParams from "next/root-params"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  // An explicit `locale` (e.g. `getTranslations({ locale, namespace })`) wins.
  // Otherwise read the `[locale]` root param (Next.js 16.3+), which keeps every
  // route statically renderable without `setRequestLocale`.
  let resolvedLocale = locale

  if (!resolvedLocale) {
    const paramValue = await rootParams.locale()
    if (!hasLocale(routing.locales, paramValue)) notFound()
    resolvedLocale = paramValue
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default
  }
})
