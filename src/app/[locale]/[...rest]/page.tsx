import { notFound } from "next/navigation"

// This page always throws, so there is no UI for Cache Components to validate
export const instant = false

// An unknown path waits for the complete 404 page instead of getting a
// fallback shell that only renders the not-found UI once JavaScript runs
export const ensureStatic = "navigation"

// Placeholder: `ensureStatic = "navigation"` needs at least one prerendered path
export function generateStaticParams() {
  return [{ rest: ["_"] }]
}

// Unknown paths render the localized `[locale]/not-found.tsx` instead of
// Next.js' default 404, which has no access to the locale layout.
export default function CatchAllPage() {
  notFound()
}
