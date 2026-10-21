import { type AppLocale, Link } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { BlogPost } from "@/lib/contentful"
import { formatLongDate } from "@/lib/helpers"
import { ArrowLeftIcon } from "lucide-react"
import Image from "next/image"

interface PostHeaderProps {
  locale: AppLocale
  post: BlogPost
  backLabel: string
  readingTimeLabel: string
}

export function PostHeader({
  locale,
  post,
  backLabel,
  readingTimeLabel
}: PostHeaderProps) {
  return (
    <header>
      <Link
        href={UI.ROUTES.BLOG}
        locale={locale}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-(--t-hover) hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
        {backLabel}
      </Link>
      <h1
        id="post-title"
        className="mt-5 max-w-[22ch] text-title font-semibold text-balance"
      >
        {post.title}
      </h1>
      <p className="mt-3.5 text-sm text-muted-foreground">
        <time dateTime={post.publishDate}>
          {formatLongDate(post.publishDate, locale)}
        </time>
        <span aria-hidden="true"> · </span>
        {readingTimeLabel}
      </p>
      {post.coverImage && (
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.description ?? ""}
          width={post.coverImage.width}
          height={post.coverImage.height}
          sizes="(min-width: 672px) 624px, 100vw"
          loading="eager"
          className="mt-8 aspect-video w-full border border-border/60 bg-muted object-cover"
        />
      )}
    </header>
  )
}
