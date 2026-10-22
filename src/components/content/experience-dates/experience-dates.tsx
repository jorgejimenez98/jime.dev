import type { AppLocale } from "@/i18n"
import {
  countMonths,
  formatDuration,
  formatMonthYear,
  getYear
} from "@/lib/helpers"
import { cn } from "@/lib/utils"

interface ExperienceDatesProps {
  startDate: string
  // Empty while it's the current role
  endDate: string | null
  // The first of this month, which a current role counts up to
  currentMonth: string
  // "year" for the home preview, "month" for About
  precision: "year" | "month"
  locale: AppLocale
  presentLabel: string
  className?: string
}

// "Nov 2024 — Now" and, under it, how long that was: "2 years"
export function ExperienceDates({
  startDate,
  endDate,
  currentMonth,
  precision,
  locale,
  presentLabel,
  className
}: ExperienceDatesProps) {
  const format = (isoDate: string) =>
    precision === "year" ? getYear(isoDate) : formatMonthYear(isoDate, locale)
  const months = Math.max(1, countMonths(startDate, endDate ?? currentMonth))

  return (
    <p
      className={cn(
        "flex shrink-0 flex-col items-end text-right whitespace-nowrap text-muted-foreground tabular-nums",
        className
      )}
    >
      <span className="text-sm">
        <time dateTime={startDate}>{format(startDate)}</time> —{" "}
        {endDate ? (
          <time dateTime={endDate}>{format(endDate)}</time>
        ) : (
          presentLabel
        )}
      </span>{" "}
      <span className="text-meta">{formatDuration(months, locale)}</span>
    </p>
  )
}
