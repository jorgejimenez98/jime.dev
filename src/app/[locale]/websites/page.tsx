import type { Metadata } from "next"
import { WebsitesPageContent } from "@/features/landing/websites/websites.page"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { alternatesFor } from "@/lib/helpers"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params
}: PageProps<"/[locale]/websites">): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = rawLocale as AppLocale
  const t = await getTranslations({ locale, namespace: "websites" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(UI.ROUTES.WEBSITES, locale)
  }
}

export default async function WebsitesPage({
  params
}: PageProps<"/[locale]/websites">) {
  const { locale } = await params

  return <WebsitesPageContent locale={locale as AppLocale} />
}
