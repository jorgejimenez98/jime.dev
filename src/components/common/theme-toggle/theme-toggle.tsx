"use client"

import { Button } from "@/components/ui"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

// One click flips between light and dark; until then the page follows the system
export function ThemeToggle() {
  const t = useTranslations("theme-toggle")
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={t("label")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* The resolved theme is only known after hydration, so CSS picks the icon */}
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </Button>
  )
}
