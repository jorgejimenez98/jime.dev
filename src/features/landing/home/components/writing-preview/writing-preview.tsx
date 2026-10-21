import { PostListItem } from "@/components/content"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { BlogPostSummary } from "@/lib/contentful"
import { getTranslations } from "next-intl/server"
import { SectionHeader } from "../section-header/section-header"

interface WritingPreviewProps {
  locale: AppLocale
  posts: BlogPostSummary[]
}

export async function WritingPreview({ locale, posts }: WritingPreviewProps) {
  const t = await getTranslations({ locale, namespace: "home" })

  return (
    <section aria-labelledby="writing-title" className="mt-14">
      <SectionHeader
        id="writing-title"
        title={t("writing-title")}
        locale={locale}
        link={{ href: UI.ROUTES.BLOG, label: t("writing-link") }}
      />
      <ul className="mt-2">
        {posts.map(post => (
          <PostListItem key={post.sys.id} post={post} locale={locale} />
        ))}
      </ul>
    </section>
  )
}
