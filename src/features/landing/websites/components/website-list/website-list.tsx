import { WebsiteListItem } from "@/components/content"
import type { Website } from "@/lib/contentful"

interface WebsiteListProps {
  websites: Website[]
  labelledBy: string
  newTabLabel: string
}

export function WebsiteList({
  websites,
  labelledBy,
  newTabLabel
}: WebsiteListProps) {
  return (
    <ul aria-labelledby={labelledBy} className="mt-8 flex flex-col gap-2">
      {websites.map(website => (
        <WebsiteListItem
          key={website.sys.id}
          website={website}
          newTabLabel={newTabLabel}
        />
      ))}
    </ul>
  )
}
