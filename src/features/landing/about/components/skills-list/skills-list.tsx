import type { AppLocale } from "@/i18n"
import { getTranslations } from "next-intl/server"

interface SkillsListProps {
  locale: AppLocale
  // One group per item: "Group: skill, skill, skill"
  skills: string[]
}

function toGroup(item: string) {
  const separator = item.indexOf(":")
  if (separator === -1) return { label: null, skills: item.trim() }

  return {
    label: item.slice(0, separator).trim(),
    skills: item.slice(separator + 1).trim()
  }
}

export async function SkillsList({ locale, skills }: SkillsListProps) {
  const t = await getTranslations({ locale, namespace: "about" })
  const groups = skills.map(toGroup)

  return (
    <section aria-labelledby="skills-title" className="mt-12">
      <h2 id="skills-title" className="font-medium">
        {t("skills-title")}
      </h2>
      <dl className="mt-3 grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm leading-relaxed">
        {groups.map(group =>
          group.label ? (
            <div key={group.label} className="contents">
              <dt className="text-muted-foreground">{group.label}</dt>
              <dd>{group.skills}</dd>
            </div>
          ) : (
            <dd key={group.skills} className="col-span-2">
              {group.skills}
            </dd>
          )
        )}
      </dl>
    </section>
  )
}
