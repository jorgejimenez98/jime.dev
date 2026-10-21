import "server-only"
import type { AppLocale } from "@/i18n/routing"
import { contentfulRequest, uncachedFetch } from "./client"
import { toContentfulLocale } from "./contentful.constants"
import type {
  BlogPost,
  BlogPostSlug,
  BlogPostSummary,
  Experience,
  Profile,
  Website
} from "./contentful.types"
import {
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
  type BlogPostQueryResult,
  type BlogPostSlugsQueryResult,
  type BlogPostsQueryResult
} from "./queries/blog-post.queries"
import {
  EXPERIENCES_QUERY,
  type ExperiencesQueryResult
} from "./queries/experience.queries"
import {
  PROFILE_QUERY,
  type ProfileQueryResult
} from "./queries/profile.queries"
import {
  WEBSITES_QUERY,
  type WebsitesQueryResult
} from "./queries/website.queries"
import { cacheLife } from "next/cache"
import { draftMode } from "next/headers"

/*
 * Every reader is cached for as long as Next allows ("max"). There's no
 * webhook: a new deploy rebuilds every page with what's published then.
 * Draft mode is readable inside a cache scope and bypasses the cache itself.
 */

async function isPreview() {
  return (await draftMode()).isEnabled
}

function present<T>(items: (T | null)[] | undefined): T[] {
  return (items ?? []).filter((item): item is T => item !== null)
}

export async function getProfile(locale: AppLocale): Promise<Profile> {
  "use cache"
  cacheLife("max")

  const preview = await isPreview()
  const data = await contentfulRequest<ProfileQueryResult>(
    PROFILE_QUERY,
    { locale: toContentfulLocale(locale), preview },
    { preview }
  )
  const profile = data.profileCollection?.items[0]
  if (!profile) throw new Error("Contentful: the profile entry is missing")

  return profile
}

export async function getExperiences(locale: AppLocale): Promise<Experience[]> {
  "use cache"
  cacheLife("max")

  const preview = await isPreview()
  const data = await contentfulRequest<ExperiencesQueryResult>(
    EXPERIENCES_QUERY,
    { locale: toContentfulLocale(locale), preview },
    { preview }
  )

  return present(data.experienceCollection?.items)
}

// Apps first ("app" sorts before "marketing"), then featured, then newest
export async function getWebsites(
  locale: AppLocale,
  { featured = false, limit = 100 }: { featured?: boolean; limit?: number } = {}
): Promise<Website[]> {
  "use cache"
  cacheLife("max")

  const preview = await isPreview()
  const data = await contentfulRequest<WebsitesQueryResult>(
    WEBSITES_QUERY,
    {
      locale: toContentfulLocale(locale),
      preview,
      limit,
      where: featured ? { featured: true } : {}
    },
    { preview }
  )

  return present(data.websiteCollection?.items)
}

export async function getPosts(
  locale: AppLocale,
  { limit = 100 }: { limit?: number } = {}
): Promise<BlogPostSummary[]> {
  "use cache"
  cacheLife("max")

  const preview = await isPreview()
  const data = await contentfulRequest<BlogPostsQueryResult>(
    BLOG_POSTS_QUERY,
    { locale: toContentfulLocale(locale), preview, limit },
    { preview }
  )

  return present(data.blogPostCollection?.items)
}

export async function getPost(
  locale: AppLocale,
  slug: string
): Promise<BlogPost | null> {
  "use cache"
  cacheLife("max")

  const preview = await isPreview()
  const data = await contentfulRequest<BlogPostQueryResult>(
    BLOG_POST_QUERY,
    { locale: toContentfulLocale(locale), preview, slug },
    { preview }
  )

  return data.blogPostCollection?.items[0] ?? null
}

export async function getPostSlugs(): Promise<BlogPostSlug[]> {
  "use cache"
  cacheLife("max")

  const preview = await isPreview()
  const data = await contentfulRequest<BlogPostSlugsQueryResult>(
    BLOG_POST_SLUGS_QUERY,
    { preview },
    { preview }
  )

  return present(data.blogPostCollection?.items)
}

// The raw bytes of a Contentful asset: the CV download and the social card's avatar
export async function getAssetBytes(
  url: string
): Promise<Uint8Array<ArrayBuffer>> {
  "use cache"
  cacheLife("max")

  const response = await uncachedFetch(url)
  if (!response.ok) {
    throw new Error(`Contentful: ${response.status} fetching ${url}`)
  }

  return new Uint8Array(await response.arrayBuffer())
}
