import { routing } from "./routing"
import { notFound } from "next/navigation"
import * as rootParams from "next/root-params"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  // An explicit `locale` (e.g. `getTranslations({ locale, namespace })`) wins.
  // Otherwise read the `[locale]` root param (Next.js 16.3+), which keeps every
  // route statically renderable without `setRequestLocale`.
  const resolvedLocale: string = locale ?? (await rootParams.locale())
  // A path like /wp-login.php arrives as the "locale": answer 404, don't try
  // to import messages/wp-login.php.json (a 500)
  if (!hasLocale(routing.locales, resolvedLocale)) notFound()

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default
  }
})
