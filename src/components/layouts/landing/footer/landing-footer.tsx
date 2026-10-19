import type { AppLocale } from "@/i18n"
import { cacheLife } from "next/cache"
import { getTranslations } from "next-intl/server"

// `new Date()` can't run in the prerendered shell under Cache Components, so
// the year is cached and refreshed daily instead of read on every render.
async function getCurrentYear() {
  "use cache"
  cacheLife("days")
  return new Date().getFullYear().toString()
}

interface LandingFooterProps {
  locale: AppLocale
}

export async function LandingFooter({ locale }: LandingFooterProps) {
  const [t, year] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getCurrentYear()
  ])

  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-foreground/60 sm:flex-row sm:px-6">
        <p>{t("rights", { year })}</p>
        <p>{t("built-with")}</p>
      </div>
    </footer>
  )
}
