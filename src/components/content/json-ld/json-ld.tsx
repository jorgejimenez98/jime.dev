interface JsonLdProps {
  data: Record<string, unknown>
}

// Structured data for search engines; `<` is escaped so content can't close the tag
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON with `<` escaped, never HTML
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  )
}
