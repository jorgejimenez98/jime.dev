import { Suspense } from "react"
import type { Metadata } from "next"
import { BlogPostPageContent } from "@/features/landing/blog/details/blog.details.page"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { getPost, getPostSlugs } from "@/lib/contentful"
import {
  alternatesFor,
  baseOpenGraph,
  localizedUrl,
  siteOpenGraphImageUrl
} from "@/lib/helpers"
import { notFound } from "next/navigation"

// Every listed post is fully static; an unknown slug waits for the complete
// page instead of streaming a shell, so notFound() still answers a real 404.
export const ensureStatic = "navigation"

// Placeholder for an empty blog: Next 16 fails the build when this returns []
const NO_POSTS_SLUG = "_"

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.length > 0
    ? slugs.map(({ slug }) => ({ slug }))
    : [{ slug: NO_POSTS_SLUG }]
}

export async function generateMetadata({
  params
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as AppLocale
  const post = await getPost(locale, slug)
  if (!post) notFound()

  const path = `${UI.ROUTES.BLOG}/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(path, locale),
    openGraph: {
      ...baseOpenGraph(locale),
      type: "article",
      url: localizedUrl(path, locale),
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishDate,
      modifiedTime: post.sys.publishedAt,
      authors: [localizedUrl(UI.ROUTES.ABOUT, locale)],
      images: [
        post.coverImage
          ? {
              url: `${post.coverImage.url}?w=1200&h=630&fit=fill&fm=jpg&q=80`,
              width: 1200,
              height: 630,
              alt: post.coverImage.description ?? post.title
            }
          : { url: siteOpenGraphImageUrl(locale), width: 1200, height: 630 }
      ]
    }
  }
}

async function BlogPostRoute({
  params
}: Pick<PageProps<"/[locale]/blog/[slug]">, "params">) {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as AppLocale
  const post = await getPost(locale, slug)
  if (!post) notFound()

  return <BlogPostPageContent locale={locale} post={post} />
}

export default function BlogPostPage({
  params
}: PageProps<"/[locale]/blog/[slug]">) {
  // Params are read inside Suspense so the shared App Shell isn't tied to one URL
  return (
    <Suspense fallback={null}>
      <BlogPostRoute params={params} />
    </Suspense>
  )
}
