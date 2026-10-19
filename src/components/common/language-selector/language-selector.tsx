"use client"

import { useTransition } from "react"
import { LOCALE_FLAGS } from "@/components/icons"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui"
import { type AppLocale, usePathname, useRouter } from "@/i18n"
import { UI } from "@/lib/constants"
import { useLocale, useTranslations } from "next-intl"

export function LanguageSelector() {
  const t = useTranslations("language-selector")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const languages = UI.LOCALES.SELECTOR
  const currentLanguage =
    languages.find(language => language.code === locale) ?? languages[0]
  const CurrentFlag = LOCALE_FLAGS[currentLanguage.code]

  const handleLanguageChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            disabled={isPending}
            aria-label={t("label", { language: currentLanguage.name })}
          />
        }
      >
        <CurrentFlag className="h-3 w-4" />
        {currentLanguage.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-36">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={value => handleLanguageChange(value as AppLocale)}
          >
            {languages.map(language => {
              const Flag = LOCALE_FLAGS[language.code]

              return (
                <DropdownMenuRadioItem
                  key={language.code}
                  value={language.code}
                >
                  <Flag className="h-3 w-4" />
                  {language.name}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
