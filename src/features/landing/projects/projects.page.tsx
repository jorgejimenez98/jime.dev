import { PageHeader } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import { getWebsites } from "@/lib/contentful"
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

  return (
    <LandingContainer className="pt-14 sm:pt-20">
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
