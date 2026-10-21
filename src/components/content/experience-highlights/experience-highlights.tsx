import { cn } from "@/lib/utils"

interface ExperienceHighlightsProps {
  // "1,800+ users" reads as a figure; anything else ("Launched in May 2026…") as a note
  highlights: string[]
  className?: string
}

// A leading figure (1,800+ / 99.4% / 60+) followed by what it counts
const FIGURE = /^([\d.,]+[+%]?)\s+(.+)$/

/**
 * The size of a role at a glance: notes as a quiet line, figures as big
 * numbers in a grid, the way a recruiter scans them.
 */
export function ExperienceHighlights({
  highlights,
  className
}: ExperienceHighlightsProps) {
  const notes: string[] = []
  const figures: { value: string; label: string }[] = []
  for (const highlight of highlights) {
    const match = highlight.match(FIGURE)
    if (match) figures.push({ value: match[1], label: match[2] })
    else notes.push(highlight)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {notes.map(note => (
        <p key={note} className="text-sm text-muted-foreground">
          {note}
        </p>
      ))}
      {figures.length > 0 && (
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {figures.map(figure => (
            <div key={figure.label} className="bg-secondary px-3 py-2.5">
              <dt className="sr-only">{figure.label}</dt>
              <dd className="text-xl font-semibold tracking-tight text-foreground tabular-nums">
                {figure.value}
              </dd>
              <dd className="mt-0.5 text-meta leading-snug text-muted-foreground">
                {figure.label}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
