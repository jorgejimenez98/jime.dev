import { LanguageSelector } from "@/components/common"
import { type AppLocale, Link } from "@/i18n"

interface LandingHeaderProps {
  locale: AppLocale
}

export function LandingHeader({ locale }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          locale={locale}
          className="text-lg font-semibold tracking-tight"
        >
          jime.dev
        </Link>

        <LanguageSelector />
      </div>
    </header>
  )
}
