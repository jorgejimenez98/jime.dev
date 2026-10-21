import { type AppLocale, Link } from "@/i18n"
import { ArrowRightIcon } from "lucide-react"

interface SectionHeaderProps {
  id: string
  title: string
  locale: AppLocale
  link: { href: string; label: string }
}

// A home section title with the "see all" link on the right
export function SectionHeader({ id, title, locale, link }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-medium">
        {title}
      </h2>

      <Link
        href={link.href}
        locale={locale}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-(--t-hover) hover:text-foreground"
      >
        {link.label}
        <ArrowRightIcon aria-hidden="true" className="size-3.5" />
      </Link>
    </div>
  )
}
