"use client"

import type { ImageLoaderProps } from "next/image"

const CONTENTFUL_IMAGE_HOSTS = new Set([
  "images.ctfassets.net",
  "images.eu.ctfassets.net"
])

// Contentful's Images API rejects widths above 4000px with a 400
const MAX_WIDTH = 4000

/**
 * next/image loader (images.loaderFile) for every image on the site.
 * Contentful's Images API resizes and re-encodes at its CDN, so Vercel's
 * optimizer is never involved. It answers 400 to unknown query params, so
 * only w, q and fm are set. Anything that isn't a Contentful raster image is
 * returned untouched: render those with `unoptimized`.
 */
export default function contentfulImageLoader({
  src,
  width,
  quality
}: ImageLoaderProps) {
  const url = new URL(
    src.startsWith("//") ? `https:${src}` : src,
    "https://jime.dev"
  )
  if (
    !CONTENTFUL_IMAGE_HOSTS.has(url.hostname) ||
    url.pathname.endsWith(".svg")
  ) {
    return src
  }

  url.searchParams.set("w", String(Math.min(width, MAX_WIDTH)))
  url.searchParams.set("q", String(quality ?? 75))
  url.searchParams.set("fm", "webp")

  return url.toString()
}
