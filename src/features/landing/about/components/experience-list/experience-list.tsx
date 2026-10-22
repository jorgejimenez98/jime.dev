import type { AppLocale } from "@/i18n"
import type { Experience } from "@/lib/contentful"
import { getCurrentMonth } from "@/lib/helpers"
import { ExperienceItem } from "./experience-item"
import { getTranslations } from "next-intl/server"

interface ExperienceListProps {
  locale: AppLocale
  experiences: Experience[]
  className?: string
}

// Every role, newest first, on one timeline
export async function ExperienceList({
  locale,
  experiences,
  className
}: ExperienceListProps) {
  const [t, tExperience, currentMonth] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "experience" }),
    getCurrentMonth()
  ])
  const labels = {
    present: tExperience("present"),
    newTab: tExperience("new-tab"),
    stack: tExperience("stack")
  }

  return (
    <section aria-labelledby="experience-title" className={className}>
      <h2 id="experience-title" className="font-medium">
        {t("experience-title")}
      </h2>
      <ol className="mt-8">
        {experiences.map(experience => (
          <ExperienceItem
            key={experience.sys.id}
            experience={experience}
            locale={locale}
            currentMonth={currentMonth}
            labels={labels}
          />
        ))}
      </ol>
    </section>
  )
}
