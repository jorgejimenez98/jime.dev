import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants"
import { cacheLife } from "next/cache"
import { getTranslations } from "next-intl/server"

const FOOTER_LINKS = [
  { label: "GitHub", href: UI.LINKS.GITHUB },
  { label: "LinkedIn", href: UI.LINKS.LINKEDIN },
  { label: "Crealix", href: UI.LINKS.CREALIX }
]

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

// One quiet line: what this is, where else to find George, the year
export async function LandingFooter({ locale }: LandingFooterProps) {
  const [t, year] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getCurrentYear()
  ])

  return (
    <footer className="px-5 pt-16 pb-6 lg:px-8 lg:pt-24 lg:pb-7.5">
      <div className="flex flex-col gap-2 text-small text-muted-foreground lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-baseline lg:gap-6">
        <p>{t("about")}</p>

        <nav
          aria-label={t("nav-label")}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {FOOTER_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-(--t-hover) hover:decoration-current"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="lg:text-right">{t("rights", { year })}</p>
      </div>
    </footer>
  )
}
