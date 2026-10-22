import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

/**
 * Explicit runtime environment mapping.
 * Required by Next.js (App Router / bundler).
 */
// biome-ignore format: keep runtimeEnv readable
const runtimeEnv = {
  NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,

  // Contentful
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_API_TOKEN: process.env.CONTENTFUL_PREVIEW_API_TOKEN,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT
} as const

// biome-ignore format: keep runtimeEnv readable
export const env = createEnv({
  /**
   * Server-only variables
   */
  server: {
    // Content Delivery API token (published content)
    CONTENTFUL_ACCESS_TOKEN: z.string().min(1),
    // Content Preview API token. Reserved for draft mode (phase 2).
    CONTENTFUL_PREVIEW_API_TOKEN: z.string().min(1).optional(),
    CONTENTFUL_ENVIRONMENT: z.string().min(1).default("master")
  },

  /**
   * Client-exposed variables (NEXT_PUBLIC_*)
   */
  client: {
    NEXT_PUBLIC_FRONTEND_URL: z.url(),
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: z.string().min(1),
    // Google Analytics 4. Unset (local, previews) means no tag and no data
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().regex(/^G-[A-Z0-9]+$/).optional()
  },

  runtimeEnv,

  // `KEY=` lines in .env count as unset
  emptyStringAsUndefined: true,

  /**
   * Skip validation on CI if needed
   */
  skipValidation: !!process.env.CI
})
