"use client"

import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("home")

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-xl text-base text-foreground/70 sm:text-lg">
        {t("description")}
      </p>
    </section>
  )
}
