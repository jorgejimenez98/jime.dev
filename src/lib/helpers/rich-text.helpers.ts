import type { Document } from "@contentful/rich-text-types"

const WORDS_PER_MINUTE = 220

interface RichTextNode {
  value?: string
  content?: RichTextNode[]
}

function collectText(node: RichTextNode): string {
  if (typeof node.value === "string") return node.value
  return (node.content ?? []).map(collectText).join(" ")
}

// Minutes to read a Rich Text document, never less than one
export function getReadingTime(document: Document) {
  const words = collectText(document).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
