"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import { UI } from "@/lib/constants"
import { getImageProps } from "next/image"
import { useTranslations } from "next-intl"

const AVATAR_SIZE = 96

export function HeroSection() {
  const t = useTranslations("home")
  const name = t("name")
  const words = name.split(" ")
  const initials = words.map(word => word[0]).join("")

  // next/image's optimized src/srcSet, rendered by the Avatar primitive
  const { props: avatarImage } = getImageProps({
    src: UI.PROFILE.PHOTO,
    alt: t("photo-alt"),
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    loading: "eager"
  })

  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-center gap-8 px-5 py-12 lg:min-h-svh lg:px-8 lg:py-32"
    >
      <Avatar className="size-20 lg:size-24">
        {/* keepMounted: the <img> ships in the server HTML instead of after hydration */}
        <AvatarImage {...avatarImage} keepMounted />
        {/* Only shows if the photo fails; the delay keeps it out of the first paint */}
        <AvatarFallback delay={600}>{initials}</AvatarFallback>
      </Avatar>

      <h1
        id="hero-title"
        data-wordmark
        className="font-normal lowercase text-display md:text-display-wide md:whitespace-nowrap"
      >
        {words.map((word, index) => (
          <span key={word}>
            {/* One word per line on phones, one line from tablet up */}
            <span className="block md:inline">{word}</span>
            {index < words.length - 1 && " "}
          </span>
        ))}
      </h1>

      <p className="max-w-[30ch] text-lead">{t("description")}</p>
    </section>
  )
}
