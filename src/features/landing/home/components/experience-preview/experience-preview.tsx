import { ExperienceDates, ExperienceHighlights } from "@/components/content"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { Experience } from "@/lib/contentful"
import { getCurrentMonth } from "@/lib/helpers"
import { ArrowUpRightIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { SectionHeader } from "../section-header/section-header"

const PREVIEW_LIMIT = 5

interface ExperiencePreviewProps {
  locale: AppLocale
  experiences: Experience[]
}

// Role · company with the years and how long on the right. A role with
// highlights (Crealix) shows them underneath; the rest lives on About.
export async function ExperiencePreview({
  locale,
  experiences
}: ExperiencePreviewProps) {
  const [t, tExperience, currentMonth] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "experience" }),
    getCurrentMonth()
  ])

  return (
    <section aria-labelledby="experience-title" className="mt-16">
      <SectionHeader
        id="experience-title"
        title={t("experience-title")}
        locale={locale}
        link={{ href: UI.ROUTES.ABOUT, label: t("experience-link") }}
      />
      <ul className="mt-2">
        {experiences.slice(0, PREVIEW_LIMIT).map(experience => (
          <li key={experience.sys.id} className="py-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="min-w-0">
                <span className="font-medium">{experience.role}</span>{" "}
                <span className="text-muted-foreground">
                  ·{" "}
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/company inline-flex items-baseline gap-0.5 underline decoration-border underline-offset-4 transition-colors duration-(--t-hover) hover:text-foreground hover:decoration-foreground"
                    >
                      {experience.company}
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        className="size-3 self-center opacity-60 group-hover/company:opacity-100"
                      />
                      <span className="sr-only">
                        ({tExperience("new-tab")})
                      </span>
                    </a>
                  ) : (
                    experience.company
                  )}
                </span>
              </span>
              <ExperienceDates
                startDate={experience.startDate}
                endDate={experience.endDate}
                currentMonth={currentMonth}
                precision="year"
                locale={locale}
                presentLabel={tExperience("present")}
              />
            </div>
            {experience.highlights && experience.highlights.length > 0 && (
              <ExperienceHighlights
                highlights={experience.highlights}
                className="mt-3 mb-2"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
