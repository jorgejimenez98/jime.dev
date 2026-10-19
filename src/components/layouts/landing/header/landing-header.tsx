"use client"

import { LanguageSelector, ThemeSelector } from "@/components/common"
import { Button } from "@/components/ui"
import { UI } from "@/lib/constants"
import { ArrowUpRightIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const PROFILE_LINKS = [
  { label: "GitHub", href: UI.LINKS.GITHUB },
  { label: "LinkedIn", href: UI.LINKS.LINKEDIN }
]

export function LandingHeader() {
  const t = useTranslations("header")

  return (
    // Desktop: floats over the hero's reading half (the portrait owns the left)
    <header className="relative z-30 flex items-center justify-end gap-1 px-3 py-3 lg:absolute lg:inset-x-0 lg:top-0 lg:gap-2 lg:px-8 lg:py-7">
      <nav aria-label={t("nav-label")} className="hidden items-center lg:flex">
        {PROFILE_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center px-2.5 text-small underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-(--t-hover) hover:decoration-current"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <LanguageSelector />
      <ThemeSelector />

      <Button
        render={
          <a
            href={UI.LINKS.CREALIX}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
        nativeButton={false}
        className="ml-1 lg:ml-2"
      >
        {t("action")}
        <ArrowUpRightIcon data-icon="inline-end" />
      </Button>
    </header>
  )
}
