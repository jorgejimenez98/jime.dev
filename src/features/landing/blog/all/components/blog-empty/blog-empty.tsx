import { CvButton } from "@/components/content"

interface BlogEmptyProps {
  title: string
  text: string
  cvLabel: string
}

// Until the first post: say what's coming and offer the CV instead
export function BlogEmpty({ title, text, cvLabel }: BlogEmptyProps) {
  return (
    <div className="mt-10 rounded-xl bg-muted/60 p-6">
      <h2 className="font-medium">{title}</h2>
      <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
      <div className="mt-5">
        <CvButton label={cvLabel} />
      </div>
    </div>
  )
}
