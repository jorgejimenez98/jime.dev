import type { Document } from "@contentful/rich-text-types"

export interface ContentfulImage {
  url: string
  width: number
  height: number
  title: string | null
  description: string | null
}

export interface ContentfulFile {
  url: string
  fileName: string
  contentType: string
}

export interface RichTextAsset extends ContentfulImage {
  sys: { id: string }
  contentType: string
}

export interface Profile {
  sys: { publishedAt: string }
  name: string
  alternateName: string | null
  headline: string
  shortBio: string
  bio: { json: Document } | null
  avatar: ContentfulImage
  resume: ContentfulFile | null
  location: string | null
  email: string | null
  // Personal account first, then the work ones
  githubUrls: string[] | null
  linkedinUrl: string | null
  xUrl: string | null
  // One group per item: "Group: skill, skill, skill"
  skills: string[] | null
  education: string | null
  languages: string | null
}

export interface Experience {
  sys: { id: string }
  role: string
  company: string
  companyUrl: string | null
  startDate: string
  // Empty while it's the current role
  endDate: string | null
  summary: string | null
  // What the role involved, one point per item
  details: string[] | null
  stack: string[] | null
  // Short facts; the ones that start with a figure read as stats
  highlights: string[] | null
}

export interface Website {
  sys: { id: string; publishedAt: string }
  // A product or web app, or a marketing site built for a client
  kind: "app" | "marketing"
  name: string
  url: string
  description: string
  year: number
  client: string | null
  featured: boolean | null
  // Picked for the home preview ("Show on home" in Contentful)
  homepage: boolean | null
  screenshot: ContentfulImage | null
}

export interface BlogPostSummary {
  sys: { id: string; publishedAt: string }
  title: string
  slug: string
  excerpt: string
  publishDate: string
  coverImage: ContentfulImage | null
}

export interface BlogPost extends BlogPostSummary {
  body: {
    json: Document
    links: { assets: { block: (RichTextAsset | null)[] } }
  }
}

export interface BlogPostSlug {
  slug: string
  sys: { publishedAt: string }
}
