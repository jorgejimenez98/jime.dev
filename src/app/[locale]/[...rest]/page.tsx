import { notFound } from "next/navigation"

// This page always throws, so there is no UI for Cache Components to validate
export const instant = false

// Unknown paths render the localized `[locale]/not-found.tsx` instead of
// Next.js' default 404, which has no access to the locale layout.
export default function CatchAllPage() {
  notFound()
}
