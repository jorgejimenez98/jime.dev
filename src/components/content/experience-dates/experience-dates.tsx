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
  // "preview": years, stacked on phones (home); "detail": months (About)
  variant: "preview" | "detail"
  locale: AppLocale
  presentLabel: string
  className?: string
}

// "Nov 2024 — Now · 2 years", on one line wherever it fits
export function ExperienceDates({
  startDate,
  endDate,
  currentMonth,
  variant,
  locale,
  presentLabel,
  className
}: ExperienceDatesProps) {
  const isPreview = variant === "preview"
  const format = (isoDate: string) =>
    isPreview ? getYear(isoDate) : formatMonthYear(isoDate, locale)
  const months = Math.max(1, countMonths(startDate, endDate ?? currentMonth))

  return (
    <p
      className={cn(
        "flex text-sm whitespace-nowrap text-muted-foreground tabular-nums",
        isPreview
          ? "shrink-0 flex-col items-end sm:flex-row sm:gap-1.5"
          : "flex-wrap gap-x-1.5",
        className
      )}
    >
      <span>
        <time dateTime={startDate}>{format(startDate)}</time> —{" "}
        {endDate ? (
          <time dateTime={endDate}>{format(endDate)}</time>
        ) : (
          presentLabel
        )}
      </span>{" "}
      <span aria-hidden="true" className={cn(isPreview && "max-sm:hidden")}>
        ·
      </span>{" "}
      <span className={cn(isPreview && "max-sm:text-meta")}>
        {formatDuration(months, locale)}
      </span>
    </p>
  )
}
