import { PostListItem } from "@/components/content"
import type { AppLocale } from "@/i18n"
import type { BlogPostSummary } from "@/lib/contentful"

interface PostListProps {
  posts: BlogPostSummary[]
  locale: AppLocale
  labelledBy: string
}

export function PostList({ posts, locale, labelledBy }: PostListProps) {
  return (
    <ul aria-labelledby={labelledBy} className="mt-8">
      {posts.map(post => (
        <PostListItem key={post.sys.id} post={post} locale={locale} />
      ))}
    </ul>
  )
}
