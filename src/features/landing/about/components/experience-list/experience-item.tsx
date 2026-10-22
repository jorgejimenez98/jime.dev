import { ExperienceDates, ExperienceHighlights } from "@/components/content"
import type { AppLocale } from "@/i18n"
import type { Experience } from "@/lib/contentful"

interface ExperienceItemProps {
  experience: Experience
  locale: AppLocale
  presentLabel: string
  currentMonth: string
}

// A role in full: what it was, its figures, what it involved and the stack
export function ExperienceItem({
  experience,
  locale,
  presentLabel,
  currentMonth
}: ExperienceItemProps) {
  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">
          {experience.role} ·{" "}
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-muted-foreground/40 underline-offset-4 transition-[text-decoration-color] duration-(--t-hover) hover:decoration-foreground"
            >
              {experience.company}
            </a>
          ) : (
            experience.company
          )}
        </h3>
        <ExperienceDates
          startDate={experience.startDate}
          endDate={experience.endDate}
          currentMonth={currentMonth}
          precision="month"
          locale={locale}
          presentLabel={presentLabel}
        />
      </div>
      {experience.summary && (
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed">
          {experience.summary}
        </p>
      )}
      {experience.highlights && experience.highlights.length > 0 && (
        <ExperienceHighlights
          highlights={experience.highlights}
          className="mt-3"
        />
      )}
      {experience.details && experience.details.length > 0 && (
        <ul className="mt-3 flex max-w-[62ch] list-disc flex-col gap-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-border">
          {experience.details.map(detail => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      {experience.stack && experience.stack.length > 0 && (
        <p className="mt-3 text-meta text-muted-foreground">
          {experience.stack.join(" · ")}
        </p>
      )}
    </li>
  )
}
