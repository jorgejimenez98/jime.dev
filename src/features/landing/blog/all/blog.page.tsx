import { PageHeader } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import { getPosts } from "@/lib/contentful"
import { BlogEmpty, PostList } from "./components"
import { getTranslations } from "next-intl/server"

interface BlogPageContentProps {
  locale: AppLocale
}

export async function BlogPageContent({ locale }: BlogPageContentProps) {
  const [t, tAbout, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "about" }),
    getPosts(locale)
  ])

  return (
    <LandingContainer className="pt-14 sm:pt-20">
      <PageHeader
        id="blog-title"
        title={t("title")}
        description={t("description")}
      />
      {posts.length > 0 ? (
        <PostList posts={posts} locale={locale} labelledBy="blog-title" />
      ) : (
        <BlogEmpty
          title={t("empty-title")}
          text={t("empty-text")}
          cvLabel={tAbout("cv")}
        />
      )}
    </LandingContainer>
  )
}
