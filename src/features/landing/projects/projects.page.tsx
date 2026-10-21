import { JsonLd, PageHeader } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { getWebsites } from "@/lib/contentful"
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  localizedUrl,
  projectsPageJsonLd,
  SITE_NAMES
} from "@/lib/helpers"
import { ProjectSection } from "./components"
import { getTranslations } from "next-intl/server"

interface ProjectsPageContentProps {
  locale: AppLocale
}

// Apps first (Crealix leads), then the marketing sites built for clients
export async function ProjectsPageContent({
  locale
}: ProjectsPageContentProps) {
  const [t, websites] = await Promise.all([
    getTranslations({ locale, namespace: "projects" }),
    getWebsites(locale)
  ])
  const apps = websites.filter(website => website.kind === "app")
  const marketing = websites.filter(website => website.kind !== "app")
  const breadcrumb = breadcrumbJsonLd([
    { name: SITE_NAMES[locale], url: localizedUrl(UI.ROUTES.HOME, locale) },
    { name: t("title"), url: localizedUrl(UI.ROUTES.PROJECTS, locale) }
  ])

  return (
    <LandingContainer className="pt-14 sm:pt-20">
      <JsonLd
        data={jsonLdGraph(
          projectsPageJsonLd([...apps, ...marketing], locale),
          breadcrumb
        )}
      />
      <PageHeader
        id="projects-title"
        title={t("title")}
        description={t("description")}
      />
      {apps.length > 0 && (
        <ProjectSection
          id="apps-title"
          title={t("apps-title")}
          websites={apps}
          newTabLabel={t("new-tab")}
          note={t("nda")}
        />
      )}
      {marketing.length > 0 && (
        <ProjectSection
          id="marketing-title"
          title={t("marketing-title")}
          websites={marketing}
          newTabLabel={t("new-tab")}
        />
      )}
    </LandingContainer>
  )
}
