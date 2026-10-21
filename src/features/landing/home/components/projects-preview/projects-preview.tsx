import { WebsiteListItem } from "@/components/content"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { Website } from "@/lib/contentful"
import { getTranslations } from "next-intl/server"
import { SectionHeader } from "../section-header/section-header"

interface ProjectsPreviewProps {
  locale: AppLocale
  websites: Website[]
}

export async function ProjectsPreview({
  locale,
  websites
}: ProjectsPreviewProps) {
  const [t, tProjects] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "projects" })
  ])

  return (
    <section aria-labelledby="projects-preview-title" className="mt-14">
      <SectionHeader
        id="projects-preview-title"
        title={t("projects-title")}
        locale={locale}
        link={{ href: UI.ROUTES.PROJECTS, label: t("projects-link") }}
      />
      <ul className="mt-2">
        {websites.map(website => (
          <WebsiteListItem
            key={website.sys.id}
            website={website}
            size="compact"
            newTabLabel={tProjects("new-tab")}
          />
        ))}
      </ul>
    </section>
  )
}
