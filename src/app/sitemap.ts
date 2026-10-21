import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { UI } from "@/lib/constants/ui.constants"
import { getPostSlugs, getProfile, getWebsites } from "@/lib/contentful"
import { languagesFor, localizedUrl } from "@/lib/helpers"

// The newest of several ISO dates (they sort as strings)
function latest(...dates: (string | undefined)[]) {
  return dates.filter(Boolean).sort().at(-1)
}

// Every page in every locale, each listing its translations (and x-default)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [profile, websites, posts] = await Promise.all([
    getProfile(routing.defaultLocale),
    getWebsites(routing.defaultLocale),
    getPostSlugs()
  ])
  const websitesUpdatedAt = latest(
    ...websites.map(site => site.sys.publishedAt)
  )
  const postsUpdatedAt = posts[0]?.sys.publishedAt

  const pages = [
    {
      path: UI.ROUTES.HOME,
      lastModified: latest(
        profile.sys.publishedAt,
        websitesUpdatedAt,
        postsUpdatedAt
      )
    },
    { path: UI.ROUTES.ABOUT, lastModified: profile.sys.publishedAt },
    { path: UI.ROUTES.PROJECTS, lastModified: websitesUpdatedAt },
    // The blog is noindex while it's empty, so it only joins with its first post
    ...(posts.length > 0
      ? [{ path: UI.ROUTES.BLOG, lastModified: postsUpdatedAt }]
      : []),
    ...posts.map(post => ({
      path: `${UI.ROUTES.BLOG}/${post.slug}`,
      lastModified: post.sys.publishedAt
    }))
  ]

  return pages.flatMap(({ path, lastModified }) =>
    routing.locales.map(locale => ({
      url: localizedUrl(path, locale),
      lastModified,
      alternates: { languages: languagesFor(path) }
    }))
  )
}
