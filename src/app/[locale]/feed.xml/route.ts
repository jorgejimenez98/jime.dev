import { routing } from "@/i18n/routing"
import { getPosts } from "@/lib/contentful"
import { renderRssFeed } from "@/lib/helpers"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

// /es/feed.xml directly; /feed.xml (English) is rewritten here by the proxy
export async function GET(
  _request: Request,
  { params }: RouteContext<"/[locale]/feed.xml">
) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getPosts(locale)
  ])
  const feed = renderRssFeed({
    locale,
    title: t("title"),
    description: t("description"),
    posts
  })

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  })
}
