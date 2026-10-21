import type { Metadata } from "next"
import { AboutPageContent } from "@/features/landing/about/about.page"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { alternatesFor, pageOpenGraph } from "@/lib/helpers"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = rawLocale as AppLocale
  const t = await getTranslations({ locale, namespace: "about" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(UI.ROUTES.ABOUT, locale),
    openGraph: pageOpenGraph(UI.ROUTES.ABOUT, locale)
  }
}

export default async function AboutPage({
  params
}: PageProps<"/[locale]/about">) {
  const { locale } = await params

  return <AboutPageContent locale={locale as AppLocale} />
}
