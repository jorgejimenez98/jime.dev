import { type AppLocale, Link } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { BlogPostSummary } from "@/lib/contentful"
import { formatMonthYear } from "@/lib/helpers"

interface PostListItemProps {
  post: BlogPostSummary
  locale: AppLocale
}

// One post as a row: title and excerpt on the left, month and year on the right
export function PostListItem({ post, locale }: PostListItemProps) {
  return (
    <li>
      <Link
        href={`${UI.ROUTES.BLOG}/${post.slug}`}
        locale={locale}
        prefetch
        className="group flex items-baseline justify-between gap-4 py-3"
      >
        <span className="min-w-0">
          <span className="font-medium decoration-muted-foreground underline-offset-4 group-hover:underline">
            {post.title}
          </span>
          <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
            {post.excerpt}
          </span>
        </span>
        <time
          dateTime={post.publishDate}
          className="shrink-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums"
        >
          {formatMonthYear(post.publishDate, locale)}
        </time>
      </Link>
    </li>
  )
}
