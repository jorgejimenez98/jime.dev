"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { LOCALE_FLAGS } from "@/components/icons"
import { type AppLocale, usePathname, useRouter } from "@/i18n"
import { UI } from "@/lib/constants"
import { useLocale, useTranslations } from "next-intl"

export function LanguageSelector() {
  const t = useTranslations("language-selector")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click or Escape while the menu is open
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleLanguageChange = (nextLocale: AppLocale) => {
    setIsOpen(false)
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  const languages = UI.LOCALES.SELECTOR
  const currentLanguage =
    languages.find(language => language.code === locale) ?? languages[0]
  const CurrentFlag = LOCALE_FLAGS[currentLanguage.code]

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("label", { language: currentLanguage.name })}
        disabled={isPending}
        onClick={() => setIsOpen(open => !open)}
        className="flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-foreground/15 px-2.5 text-xs font-medium transition-colors hover:bg-foreground/5 disabled:cursor-wait disabled:opacity-60"
      >
        <CurrentFlag className="h-3 w-4 shrink-0" />
        {currentLanguage.name}
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className={`size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-36 rounded-lg border border-foreground/10 bg-background p-1 shadow-lg"
        >
          {languages.map(language => {
            const Flag = LOCALE_FLAGS[language.code]
            const isActive = language.code === locale

            return (
              <button
                key={language.code}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-foreground/5 ${isActive ? "bg-foreground/10 font-medium" : ""}`}
              >
                <Flag className="h-3 w-4 shrink-0" />
                {language.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
