"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { ArrowUpIcon } from "lucide-react"
import { useTranslations } from "next-intl"

/**
 * A corner button back to the top, once the first screen has scrolled away.
 * A one-screen-tall marker at the top of the page tells when that happens, so
 * nothing runs on scroll. Hidden, it's inert: no tab stop, no screen reader.
 */
export function ScrollToTop() {
  const t = useTranslations("scroll-to-top")
  const markerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const marker = markerRef.current
    if (!marker) return

    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting)
    )
    observer.observe(marker)
    return () => observer.disconnect()
  }, [])

  function scrollToTop() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
    // The button goes inert at the top, so the keyboard picks up from the
    // header's first link instead of the end of the page
    document
      .querySelector<HTMLElement>("header a")
      ?.focus({ preventScroll: true })
  }

  return (
    <>
      <div
        ref={markerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-screen"
      />
      <Button
        variant="outline"
        size="icon"
        aria-label={t("label")}
        inert={!visible}
        onClick={scrollToTop}
        className={cn(
          "fixed right-4 bottom-4 z-30 bg-background/90 backdrop-blur-xl transition-[opacity,translate,background-color] duration-(--t-hover) motion-reduce:transition-none sm:right-6 sm:bottom-6 dark:bg-background/90 dark:hover:bg-accent",
          visible ? "opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <ArrowUpIcon aria-hidden="true" />
      </Button>
    </>
  )
}
