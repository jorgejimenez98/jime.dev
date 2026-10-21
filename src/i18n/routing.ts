// Direct import keeps env validation out of the proxy and client bundles
import { UI } from "@/lib/constants/ui.constants"
import { defineRouting } from "next-intl/routing"

export type AppLocale = (typeof UI.LOCALES.ALL)[number]

export const routing = defineRouting({
  locales: UI.LOCALES.ALL,
  defaultLocale: UI.LOCALES.DEFAULT,
  // Default locale (`en`) keeps clean URLs (`/`); Spanish gets a prefix (`/es`).
  localePrefix: "as-needed",
  // English is always the default: neither the browser's Accept-Language nor
  // a stored cookie redirects `/` to `/es`. The language selector is the only
  // way to switch, and without detection the locale cookie has no reader.
  localeDetection: false,
  localeCookie: false,
  // hreflang comes from one place (src/lib/helpers/seo.helpers.ts) for both the
  // HTML and the sitemap, so the proxy doesn't add a parallel `Link` header.
  alternateLinks: false
})
