import type { Metadata } from "next"
import { ProjectsPageContent } from "@/features/landing/projects/projects.page"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { alternatesFor } from "@/lib/helpers"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = rawLocale as AppLocale
  const t = await getTranslations({ locale, namespace: "projects" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(UI.ROUTES.PROJECTS, locale)
  }
}

export default async function ProjectsPage({
  params
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params

  return <ProjectsPageContent locale={locale as AppLocale} />
}
