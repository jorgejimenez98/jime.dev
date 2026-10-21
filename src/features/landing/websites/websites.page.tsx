import { PageHeader } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import { getWebsites } from "@/lib/contentful"
import { WebsiteList } from "./components"
import { getTranslations } from "next-intl/server"

interface WebsitesPageContentProps {
  locale: AppLocale
}

export async function WebsitesPageContent({
  locale
}: WebsitesPageContentProps) {
  const [t, websites] = await Promise.all([
    getTranslations({ locale, namespace: "websites" }),
    getWebsites(locale)
  ])

  return (
    <LandingContainer className="pt-14 sm:pt-20">
      <PageHeader
        id="websites-title"
        title={t("title")}
        description={t("description")}
      />
      <WebsiteList
        websites={websites}
        labelledBy="websites-title"
        newTabLabel={t("new-tab")}
      />
    </LandingContainer>
  )
}
