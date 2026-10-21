import { env } from "@/lib/constants/env.constants"
import type { RichTextAsset } from "@/lib/contentful"
import {
  documentToReactComponents,
  type Options
} from "@contentful/rich-text-react-renderer"
import {
  BLOCKS,
  type Block,
  type Document,
  INLINES,
  type Inline,
  MARKS,
  type Text
} from "@contentful/rich-text-types"
import Image from "next/image"
import "./rich-text.css"

interface RichTextProps {
  document: Document
  // Assets embedded in the document (`body.links.assets.block`)
  assets?: (RichTextAsset | null)[]
}

function isText(node: Block | Inline | Text): node is Text {
  return node.nodeType === "text"
}

// A paragraph whose every text node carries the code mark is a code block
function isCodeParagraph(node: Block | Inline) {
  return (
    node.content.length > 0 &&
    node.content.every(
      child =>
        isText(child) && child.marks.some(mark => mark.type === MARKS.CODE)
    )
  )
}

function isExternal(href: string) {
  return (
    /^https?:\/\//.test(href) && !href.startsWith(env.NEXT_PUBLIC_FRONTEND_URL)
  )
}

// Contentful Rich Text with the Crealix blog prose (see rich-text.css)
export function RichText({ document, assets = [] }: RichTextProps) {
  const assetsById = new Map(
    assets
      .filter((asset): asset is RichTextAsset => asset !== null)
      .map(asset => [asset.sys.id, asset])
  )

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) =>
        isCodeParagraph(node) ? (
          <pre>
            <code>
              {node.content
                .map(child => (isText(child) ? child.value : ""))
                .join("")}
            </code>
          </pre>
        ) : (
          <p>{children}</p>
        ),
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const asset = assetsById.get(node.data.target.sys.id)
        if (!asset?.contentType.startsWith("image/")) return null

        return (
          <figure>
            <Image
              src={asset.url}
              alt={asset.description ?? ""}
              width={asset.width}
              height={asset.height}
              sizes="(min-width: 672px) 624px, 100vw"
            />
          </figure>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const href: string = node.data.uri

        return isExternal(href) ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        )
      }
    }
  }

  return (
    <div className="rich-text">
      {documentToReactComponents(document, options)}
    </div>
  )
}
