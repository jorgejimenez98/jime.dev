import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants"
import { getCurrentYear, localizedPath } from "@/lib/helpers"
import { getTranslations } from "next-intl/server"
import { LandingContainer } from "../container/landing-container"

const PROFILE_LINKS = [
  { label: "GitHub", href: UI.LINKS.GITHUB },
  { label: "LinkedIn", href: UI.LINKS.LINKEDIN }
]

const LINK_CLASS_NAME =
  "transition-colors duration-(--t-hover) hover:text-foreground"

interface LandingFooterProps {
  locale: AppLocale
}

// One quiet line: the name, where else to find George, the feed and the CV
export async function LandingFooter({ locale }: LandingFooterProps) {
  const [t, year] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getCurrentYear()
  ])

  return (
    <footer className="mt-24 border-t border-border/40">
      <LandingContainer className="flex flex-col gap-3 py-6 text-meta text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        {/* A string, so next-intl doesn't format the year as "2,026" */}
        <p>{t("rights", { year: String(year) })}</p>

        <nav
          aria-label={t("nav-label")}
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          {PROFILE_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS_NAME}
            >
              {link.label}
            </a>
          ))}
          <a
            href={localizedPath(UI.ROUTES.FEED, locale)}
            className={LINK_CLASS_NAME}
          >
            RSS
          </a>
          <a href={UI.ROUTES.CV} download className={LINK_CLASS_NAME}>
            {t("cv")}
          </a>
        </nav>
      </LandingContainer>
    </footer>
  )
}
