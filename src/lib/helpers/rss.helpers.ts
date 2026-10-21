import type { AppLocale } from "@/i18n/routing"
import { UI } from "@/lib/constants/ui.constants"
import type { BlogPostSummary } from "@/lib/contentful/contentful.types"
import { localizedUrl, SITE_NAME } from "./seo.helpers"

const XML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, char => XML_ESCAPES[char])
}

// RFC 822, as RSS 2.0 expects ("Wed, 21 Oct 2026 00:00:00 GMT")
function rssDate(isoDate: string) {
  return new Date(isoDate).toUTCString()
}

interface RssFeedOptions {
  locale: AppLocale
  title: string
  description: string
  posts: BlogPostSummary[]
}

// One locale's posts as RSS 2.0, newest first
export function renderRssFeed({
  locale,
  title,
  description,
  posts
}: RssFeedOptions) {
  const items = posts.map(post => {
    const url = localizedUrl(`${UI.ROUTES.BLOG}/${post.slug}`, locale)

    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${rssDate(post.publishDate)}</pubDate>
    </item>`
  })
  const updatedAt = posts
    .map(post => post.sys.publishedAt)
    .sort()
    .at(-1)

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${title} · ${SITE_NAME}`)}</title>
    <link>${localizedUrl(UI.ROUTES.BLOG, locale)}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale}</language>${updatedAt ? `\n    <lastBuildDate>${rssDate(updatedAt)}</lastBuildDate>` : ""}
    <atom:link href="${localizedUrl(UI.ROUTES.FEED, locale)}" rel="self" type="application/rss+xml"/>${items.join("")}
  </channel>
</rss>
`
}
