import { WebsiteListItem } from "@/components/content"
import { type AppLocale, Link } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { Website } from "@/lib/contentful"
import { ArrowRightIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { SectionHeader } from "../section-header/section-header"

interface ProjectsPreviewProps {
  locale: AppLocale
  // Every site; the ones marked "Show on home" are listed
  websites: Website[]
}

// One app and one marketing site, each under its own label, with a link to
// the rest of the marketing sites on the projects page
export async function ProjectsPreview({
  locale,
  websites
}: ProjectsPreviewProps) {
  const [t, tProjects] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "projects" })
  ])
  const marketingCount = websites.filter(
    website => website.kind === "marketing"
  ).length
  const groups = [
    {
      id: "projects-preview-apps",
      title: tProjects("apps-title"),
      kind: "app"
    },
    {
      id: "projects-preview-marketing",
      title: tProjects("marketing-title"),
      kind: "marketing"
    }
  ]
    .map(group => ({
      ...group,
      websites: websites.filter(
        website => website.homepage && website.kind === group.kind
      )
    }))
    .filter(group => group.websites.length > 0)

  return (
    <section aria-labelledby="projects-preview-title" className="mt-14">
      <SectionHeader
        id="projects-preview-title"
        title={t("projects-title")}
        locale={locale}
        link={{ href: UI.ROUTES.PROJECTS, label: t("projects-link") }}
      />
      {groups.map(group => (
        <div key={group.id} className="mt-4">
          <h3 id={group.id} className="text-meta text-muted-foreground">
            {group.title}
          </h3>
          <ul aria-labelledby={group.id}>
            {group.websites.map(website => (
              <WebsiteListItem
                key={website.sys.id}
                website={website}
                size="compact"
                newTabLabel={tProjects("new-tab")}
              />
            ))}
          </ul>
          {group.kind === "marketing" && marketingCount > 1 && (
            <Link
              href={`${UI.ROUTES.PROJECTS}#marketing-title`}
              locale={locale}
              className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-(--t-hover) hover:text-foreground hover:decoration-foreground"
            >
              {t("projects-marketing-link", { count: marketingCount })}
              <ArrowRightIcon aria-hidden="true" className="size-3.5" />
            </Link>
          )}
        </div>
      ))}
    </section>
  )
}
