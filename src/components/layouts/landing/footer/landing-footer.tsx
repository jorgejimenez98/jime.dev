import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants"
import { getProfile } from "@/lib/contentful"
import { getCurrentYear, localizedPath } from "@/lib/helpers"
import { MailIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { LandingContainer } from "../container/landing-container"

const LINK_CLASS_NAME =
  "transition-colors duration-(--t-hover) hover:text-foreground"

interface LandingFooterProps {
  locale: AppLocale
}

// One quiet line: the name, where else to find George, the feed and the CV
export async function LandingFooter({ locale }: LandingFooterProps) {
  const [t, year, profile] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getCurrentYear(),
    getProfile(locale)
  ])
  const iconLinks = [
    { label: "GitHub", href: profile.githubUrls?.[0], icon: GithubIcon },
    { label: "LinkedIn", href: profile.linkedinUrl, icon: LinkedinIcon },
    { label: "X", href: profile.xUrl, icon: XIcon }
  ].filter((link): link is typeof link & { href: string } => !!link.href)

  return (
    <footer className="mt-24 border-t border-border/40">
      <LandingContainer className="flex flex-col gap-3 py-6 text-meta text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        {/* A string, so next-intl doesn't format the year as "2,026" */}
        <p>{t("rights", { year: String(year) })}</p>

        <nav
          aria-label={t("nav-label")}
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {iconLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={LINK_CLASS_NAME}
            >
              <Icon className="size-4" />
            </a>
          ))}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              aria-label={t("email")}
              className={LINK_CLASS_NAME}
            >
              <MailIcon aria-hidden="true" className="size-4" />
            </a>
          )}
          <a
            href={localizedPath(UI.ROUTES.FEED, locale)}
            className={LINK_CLASS_NAME}
          >
            RSS
          </a>
          <a href={UI.ROUTES.CV} className={LINK_CLASS_NAME}>
            {t("cv")}
          </a>
        </nav>
      </LandingContainer>
    </footer>
  )
}
