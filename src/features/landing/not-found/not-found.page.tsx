"use client"

// Direct import: the layouts barrel also exports the server-only footer
import { LandingContainer } from "@/components/layouts/landing/container/landing-container"
import { Button } from "@/components/ui"
import { Link } from "@/i18n"
import { UI } from "@/lib/constants"
import { useTranslations } from "next-intl"

export function NotFoundPageContent() {
  const t = useTranslations("not-found")

  return (
    <LandingContainer className="flex flex-1 flex-col justify-center gap-5 py-24">
      <p
        aria-hidden="true"
        className="text-display font-semibold text-muted-foreground"
      >
        {t("title")}
      </p>
      <h1 className="text-title font-semibold">{t("subtitle")}</h1>
      <p className="max-w-[46ch] text-muted-foreground">{t("text")}</p>
      <Button
        render={<Link href={UI.ROUTES.HOME} />}
        nativeButton={false}
        className="mt-2 self-start"
      >
        {t("back")}
      </Button>
    </LandingContainer>
  )
}
