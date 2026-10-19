"use client"

import { Button } from "@/components/ui"
import { Link } from "@/i18n"
import { useTranslations } from "next-intl"

export function NotFoundPageContent() {
  const t = useTranslations("not-found")

  return (
    <section className="flex flex-1 flex-col justify-center gap-6 px-5 py-24 lg:px-8 lg:pt-40">
      <p
        aria-hidden="true"
        className="text-display leading-none lg:text-display-wide"
      >
        {t("title")}
      </p>
      <h1 className="text-head font-medium tracking-tight">{t("subtitle")}</h1>
      <p className="max-w-[46ch]">{t("text")}</p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        className="self-start"
      >
        {t("back")}
      </Button>
    </section>
  )
}
