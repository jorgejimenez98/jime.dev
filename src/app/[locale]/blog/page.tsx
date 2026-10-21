import type { Metadata } from "next"
import { BlogPageContent } from "@/features/landing/blog/all/blog.page"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { getPostSlugs } from "@/lib/contentful"
import { alternatesFor } from "@/lib/helpers"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = rawLocale as AppLocale
  const [t, slugs] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getPostSlugs()
  ])

  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(UI.ROUTES.BLOG, locale),
    // An empty blog is a thin page: keep it out of the index until the first post
    ...(slugs.length === 0 && { robots: { index: false, follow: true } })
  }
}

export default async function BlogPage({
  params
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params

  return <BlogPageContent locale={locale as AppLocale} />
}
