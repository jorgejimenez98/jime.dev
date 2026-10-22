import { ExperienceDates, ExperienceHighlights } from "@/components/content"
import type { AppLocale } from "@/i18n"
import type { Experience } from "@/lib/contentful"
import { cn } from "@/lib/utils"
import { ArrowUpRightIcon } from "lucide-react"

interface ExperienceItemProps {
  experience: Experience
  locale: AppLocale
  currentMonth: string
  labels: { present: string; newTab: string; stack: string }
}

/**
 * A role on the timeline: a square marker (cyan while it's current) and the
 * rail down to the next role, then the role, its company and dates, what it
 * was, its figures, what it involved and the stack.
 */
export function ExperienceItem({
  experience,
  locale,
  currentMonth,
  labels
}: ExperienceItemProps) {
  return (
    <li className="group relative pb-12 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-2 left-0 size-2.25",
          experience.endDate ? "bg-muted-foreground/40" : "bg-primary"
        )}
      />
      <span
        aria-hidden="true"
        className="absolute top-6 bottom-0 left-1 w-px bg-border group-last:hidden"
      />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="flex flex-col">
          <span className="font-medium">{experience.role}</span>
          <span className="text-sm text-muted-foreground">
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/company inline-flex items-baseline gap-0.5 underline decoration-border underline-offset-4 transition-colors duration-(--t-hover) hover:text-foreground hover:decoration-foreground"
              >
                {experience.company}
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-3 self-center opacity-60 group-hover/company:opacity-100"
                />
                <span className="sr-only">({labels.newTab})</span>
              </a>
            ) : (
              experience.company
            )}
          </span>
        </h3>
        <ExperienceDates
          startDate={experience.startDate}
          endDate={experience.endDate}
          currentMonth={currentMonth}
          variant="detail"
          locale={locale}
          presentLabel={labels.present}
        />
      </div>

      {experience.summary && (
        <p className="mt-4 text-sm leading-relaxed">{experience.summary}</p>
      )}
      {experience.highlights && experience.highlights.length > 0 && (
        <ExperienceHighlights
          highlights={experience.highlights}
          className="mt-4"
        />
      )}
      {experience.details && experience.details.length > 0 && (
        <ul className="mt-4 flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-muted-foreground/50">
          {experience.details.map(detail => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      {experience.stack && experience.stack.length > 0 && (
        <p className="mt-4 text-meta leading-relaxed text-muted-foreground">
          <span className="mr-2 font-medium text-foreground">
            {labels.stack}
          </span>
          {experience.stack.join(" · ")}
        </p>
      )}
    </li>
  )
}
