import "server-only"
import { env } from "@/lib/constants/env.constants"
import { GraphQLClient, type Variables } from "graphql-request"

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`

/**
 * Next's fetch cache lives in .next/cache and outlives builds (Vercel restores
 * it on every deploy), so a deploy would keep serving old content. The readers'
 * `use cache` already caches each response for the life of a build.
 */
export const uncachedFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" })

// "all": Contentful answers 200 with partial errors, and we decide below which
// of them are acceptable instead of letting graphql-request throw on any.
const deliveryClient = new GraphQLClient(endpoint, {
  headers: { Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}` },
  errorPolicy: "all",
  fetch: uncachedFetch
})

const previewClient = env.CONTENTFUL_PREVIEW_API_TOKEN
  ? new GraphQLClient(endpoint, {
      headers: { Authorization: `Bearer ${env.CONTENTFUL_PREVIEW_API_TOKEN}` },
      errorPolicy: "all",
      fetch: uncachedFetch
    })
  : null

// A linked entry that is unpublished is expected; anything else is a bug.
const TOLERATED_ERROR_CODES = new Set(["UNRESOLVABLE_LINK"])

interface ContentfulErrorExtensions {
  contentful?: { code?: string }
}

/**
 * Runs a GraphQL query against Contentful. Throws on any error other than an
 * unresolvable link, so a broken response fails the build (or keeps the last
 * good page on revalidation) instead of being cached as an empty page.
 */
export async function contentfulRequest<T, V extends Variables = Variables>(
  query: string,
  variables: V,
  { preview = false }: { preview?: boolean } = {}
): Promise<T> {
  const client = preview && previewClient ? previewClient : deliveryClient
  const { data, errors } = await client.rawRequest<T, V>(query, variables)

  const fatal = errors?.filter(error => {
    const code = (error.extensions as ContentfulErrorExtensions | undefined)
      ?.contentful?.code
    return !code || !TOLERATED_ERROR_CODES.has(code)
  })
  if (fatal?.length) {
    throw new Error(
      `Contentful: ${fatal.map(error => error.message).join("; ")}`
    )
  }
  if (!data) throw new Error("Contentful: empty response")

  return data
}
