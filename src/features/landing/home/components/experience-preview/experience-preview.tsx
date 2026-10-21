import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { Experience } from "@/lib/contentful"
import { getYear } from "@/lib/helpers"
import { getTranslations } from "next-intl/server"
import { SectionHeader } from "../section-header/section-header"

const PREVIEW_LIMIT = 5

interface ExperiencePreviewProps {
  locale: AppLocale
  experiences: Experience[]
}

// Role · company with the years on the right; the detail lives on About
export async function ExperiencePreview({
  locale,
  experiences
}: ExperiencePreviewProps) {
  const [t, tExperience] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "experience" })
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
          <li
            key={experience.sys.id}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <span className="min-w-0">
              <span className="font-medium">{experience.role}</span>{" "}
              <span className="text-muted-foreground">
                · {experience.company}
              </span>
            </span>
            <span className="shrink-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums">
              {getYear(experience.startDate)} —{" "}
              {experience.endDate
                ? getYear(experience.endDate)
                : tExperience("present")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
