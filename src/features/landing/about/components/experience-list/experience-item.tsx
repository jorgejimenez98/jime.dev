import type { AppLocale } from "@/i18n"
import type { Experience } from "@/lib/contentful"
import { formatMonthYear } from "@/lib/helpers"

interface ExperienceItemProps {
  experience: Experience
  locale: AppLocale
  presentLabel: string
}

export function ExperienceItem({
  experience,
  locale,
  presentLabel
}: ExperienceItemProps) {
  return (
    <li className="py-3">
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
        <p className="shrink-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums">
          <time dateTime={experience.startDate}>
            {formatMonthYear(experience.startDate, locale)}
          </time>{" "}
          —{" "}
          {experience.endDate ? (
            <time dateTime={experience.endDate}>
              {formatMonthYear(experience.endDate, locale)}
            </time>
          ) : (
            presentLabel
          )}
        </p>
      </div>
      {experience.summary && (
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          {experience.summary}
        </p>
      )}
      {experience.stack && experience.stack.length > 0 && (
        <p className="mt-1.5 text-meta text-muted-foreground">
          {experience.stack.join(" · ")}
        </p>
      )}
    </li>
  )
}
