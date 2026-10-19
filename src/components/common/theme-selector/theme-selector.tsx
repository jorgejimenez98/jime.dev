"use client"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

const THEMES = [
  { value: "light", icon: SunIcon },
  { value: "dark", icon: MoonIcon },
  { value: "system", icon: MonitorIcon }
] as const

export function ThemeSelector() {
  const t = useTranslations("theme-selector")
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label={t("label")} />}
      >
        {/* The resolved theme is only known after hydration, so CSS picks the icon */}
        <SunIcon className="dark:hidden" />
        <MoonIcon className="hidden dark:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-36">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={theme ?? "system"}
            onValueChange={value => setTheme(value)}
          >
            {THEMES.map(({ value, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon />
                {t(value)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
