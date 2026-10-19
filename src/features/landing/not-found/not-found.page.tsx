"use client"

import { Link } from "@/i18n"
import { useTranslations } from "next-intl"

export function NotFoundPageContent() {
  const t = useTranslations("not-found")

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="mb-4 text-8xl font-bold tracking-tight">{t("title")}</h1>
      <h2 className="mb-3 text-2xl font-semibold">{t("subtitle")}</h2>
      <p className="mb-8 text-foreground/70">{t("text")}</p>
      <Link
        href="/"
        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {t("back")}
      </Link>
    </section>
  )
}
