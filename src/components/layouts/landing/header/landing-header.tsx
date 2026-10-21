"use client"

import { LanguageSelector, ThemeToggle } from "@/components/common"
import { Link, usePathname } from "@/i18n"
import { UI } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { BrandLogo } from "./brand-logo"
import { useTranslations } from "next-intl"
import { LandingContainer } from "../container/landing-container"

interface LandingHeaderProps {
  // Hidden while the blog has no published posts
  showBlog?: boolean
}

export function LandingHeader({ showBlog = true }: LandingHeaderProps) {
  const t = useTranslations("header")
  const pathname = usePathname()
  const items = UI.NAV.filter(item => showBlog || item.href !== UI.ROUTES.BLOG)

  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <LandingContainer className="flex h-16 items-center justify-between gap-3">
        <Link
          href={UI.ROUTES.HOME}
          aria-label={t("home-label")}
          className="group flex items-center"
        >
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label={t("nav-label")} className="flex items-center">
            {items.map(item => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-16 items-center px-2 text-sm transition-colors duration-(--t-hover) after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:duration-(--t-hover) sm:px-2.5",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0 hover:text-foreground"
                  )}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </nav>

          <LanguageSelector />
          <ThemeToggle />
        </div>
      </LandingContainer>
    </header>
  )
}
