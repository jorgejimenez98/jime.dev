import { cn } from "@/lib/utils"

interface ExperienceHighlightsProps {
  // "1,800+ users" reads as a figure; anything else ("Launched in May 2026…") as a note
  highlights: string[]
  className?: string
}

// A leading figure (1,800+ / 99.4% / 60+) followed by what it counts
const FIGURE = /^([\d.,]+[+%]?)\s+(.+)$/

/**
 * The size of a role at a glance, in one quiet panel: the notes, then the
 * figures, two by two on a phone and in one row, each only as wide as its own
 * text, from sm up.
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
    <div className={cn("bg-secondary/60 px-4 py-3.5", className)}>
      {notes.map(note => (
        <p key={note} className="text-sm text-muted-foreground">
          {note}
        </p>
      ))}
      {figures.length > 0 && (
        <dl
          className={cn(
            "grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8",
            notes.length > 0 && "mt-3"
          )}
        >
          {figures.map(figure => (
            // dt first for screen readers; the figure still sits on top
            <div key={figure.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-meta text-muted-foreground">
                {figure.label}
              </dt>
              <dd className="text-lg leading-none font-semibold tracking-tight text-foreground tabular-nums">
                {figure.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
