import type { AppLocale } from "@/i18n"
import type { Experience } from "@/lib/contentful"
import { getCurrentMonth } from "@/lib/helpers"
import { ExperienceItem } from "./experience-item"
import { getTranslations } from "next-intl/server"

interface ExperienceListProps {
  locale: AppLocale
  experiences: Experience[]
}

export async function ExperienceList({
  locale,
  experiences
}: ExperienceListProps) {
  const [t, tExperience, currentMonth] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "experience" }),
    getCurrentMonth()
  ])

  return (
    <section aria-labelledby="experience-title" className="mt-14">
      <h2 id="experience-title" className="font-medium">
        {t("experience-title")}
      </h2>
      <ul className="mt-2">
        {experiences.map(experience => (
          <ExperienceItem
            key={experience.sys.id}
            experience={experience}
            locale={locale}
            presentLabel={tExperience("present")}
            currentMonth={currentMonth}
          />
        ))}
      </ul>
    </section>
  )
}
