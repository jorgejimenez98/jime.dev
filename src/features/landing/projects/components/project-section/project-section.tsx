import { WebsiteListItem } from "@/components/content"
import type { Website } from "@/lib/contentful"
import { LockIcon } from "lucide-react"

interface ProjectSectionProps {
  id: string
  title: string
  websites: Website[]
  newTabLabel: string
  // A closing line under the list, e.g. the projects covered by NDAs
  note?: string
}

export function ProjectSection({
  id,
  title,
  websites,
  newTabLabel,
  note
}: ProjectSectionProps) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="font-medium">
        {title}
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {websites.map(website => (
          <WebsiteListItem
            key={website.sys.id}
            website={website}
            newTabLabel={newTabLabel}
          />
        ))}
      </ul>
      {note && (
        <p className="mt-4 flex items-start gap-3 rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground">
          <LockIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          />
          {note}
        </p>
      )}
    </section>
  )
}
