import { JsonLd, RichText } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { type BlogPost, getExperiences, getProfile } from "@/lib/contentful"
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  getReadingTime,
  jsonLdGraph,
  localizedUrl,
  personJsonLd,
  SITE_NAME
} from "@/lib/helpers"
import { AuthorCard, PostHeader } from "./components"
import { getTranslations } from "next-intl/server"

interface BlogPostPageContentProps {
  locale: AppLocale
  post: BlogPost
}

export async function BlogPostPageContent({
  locale,
  post
}: BlogPostPageContentProps) {
  const [t, profile, experiences] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getProfile(locale),
    getExperiences(locale)
  ])
  const breadcrumb = breadcrumbJsonLd([
    { name: SITE_NAME, url: localizedUrl(UI.ROUTES.HOME, locale) },
    { name: t("title"), url: localizedUrl(UI.ROUTES.BLOG, locale) },
    {
      name: post.title,
      url: localizedUrl(`${UI.ROUTES.BLOG}/${post.slug}`, locale)
    }
  ])

  return (
    <LandingContainer className="pt-10 sm:pt-14">
      <JsonLd
        data={jsonLdGraph(
          blogPostingJsonLd(post, locale),
          personJsonLd(profile, experiences),
          breadcrumb
        )}
      />
      <article aria-labelledby="post-title">
        <PostHeader
          locale={locale}
          post={post}
          backLabel={t("back")}
          readingTimeLabel={t("reading-time", {
            minutes: getReadingTime(post.body.json)
          })}
        />
        <div className="mt-8">
          <RichText
            document={post.body.json}
            assets={post.body.links.assets.block}
          />
        </div>
        <AuthorCard profile={profile} label={t("author-title")} />
      </article>
    </LandingContainer>
  )
}
