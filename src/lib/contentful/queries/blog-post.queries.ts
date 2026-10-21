import { gql } from "graphql-request"
import type {
  BlogPost,
  BlogPostSlug,
  BlogPostSummary
} from "../contentful.types"

// Lists never ask for `body`: its `links` cost up to 1000 complexity per item
export const BLOG_POSTS_QUERY = gql`
  query BlogPosts($locale: String!, $preview: Boolean!, $limit: Int!) {
    blogPostCollection(
      limit: $limit
      order: [publishDate_DESC]
      locale: $locale
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
        }
        title
        slug
        excerpt
        publishDate
        coverImage {
          url
          width
          height
          title
          description
        }
      }
    }
  }
`

export const BLOG_POST_QUERY = gql`
  query BlogPost($locale: String!, $preview: Boolean!, $slug: String!) {
    blogPostCollection(
      where: { slug: $slug }
      limit: 1
      locale: $locale
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
        }
        title
        slug
        excerpt
        publishDate
        coverImage {
          url
          width
          height
          title
          description
        }
        body {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                width
                height
                title
                description
                contentType
              }
            }
          }
        }
      }
    }
  }
`

// The slug isn't localized, so the default locale is enough
export const BLOG_POST_SLUGS_QUERY = gql`
  query BlogPostSlugs($preview: Boolean!) {
    blogPostCollection(
      limit: 1000
      order: [publishDate_DESC]
      preview: $preview
    ) {
      items {
        slug
        sys {
          publishedAt
        }
      }
    }
  }
`

export interface BlogPostsQueryResult {
  blogPostCollection: { items: (BlogPostSummary | null)[] } | null
}

export interface BlogPostQueryResult {
  blogPostCollection: { items: (BlogPost | null)[] } | null
}

export interface BlogPostSlugsQueryResult {
  blogPostCollection: { items: (BlogPostSlug | null)[] } | null
}
