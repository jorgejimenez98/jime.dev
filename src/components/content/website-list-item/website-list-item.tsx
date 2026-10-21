import type { Website } from "@/lib/contentful"
import { cn } from "@/lib/utils"
import { ArrowUpRightIcon } from "lucide-react"
import Image from "next/image"

interface WebsiteListItemProps {
  website: Website
  // "compact" for the home preview, "default" for the websites page
  size?: "compact" | "default"
  newTabLabel: string
}

function getDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "")
}

// A site as a row: its real screenshot, what it is, and where it lives
export function WebsiteListItem({
  website,
  size = "default",
  newTabLabel
}: WebsiteListItemProps) {
  const domain = getDomain(website.url)
  const isCompact = size === "compact"

  return (
    <li>
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex gap-4 py-3",
          isCompact
            ? "items-center"
            : "flex-col sm:flex-row sm:items-center sm:gap-5"
        )}
      >
        <div
          className={cn(
            "relative aspect-16/10 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted",
            isCompact ? "w-24" : "w-full sm:w-42"
          )}
        >
          {website.screenshot ? (
            <Image
              src={website.screenshot.url}
              alt=""
              fill
              sizes={isCompact ? "96px" : "(min-width: 640px) 168px, 100vw"}
              className="object-cover object-top"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-meta text-muted-foreground">
              {domain}
            </span>
          )}
        </div>

        <span className="min-w-0 flex-1">
          <span className="font-medium decoration-muted-foreground underline-offset-4 group-hover:underline">
            {website.name}
          </span>
          <span
            className={cn(
              "mt-1 block text-sm text-muted-foreground",
              isCompact && "line-clamp-1"
            )}
          >
            {website.description}
          </span>
          <span className="mt-1.5 flex items-center gap-1 text-meta text-muted-foreground">
            {domain}
            <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
            <span aria-hidden="true">·</span>
            {website.year}
            <span className="sr-only">({newTabLabel})</span>
          </span>
        </span>
      </a>
    </li>
  )
}
