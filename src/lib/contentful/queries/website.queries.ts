import { gql } from "graphql-request"
import type { Website } from "../contentful.types"

export const WEBSITES_QUERY = gql`
  query Websites(
    $locale: String!
    $preview: Boolean!
    $where: WebsiteFilter
    $limit: Int!
  ) {
    websiteCollection(
      limit: $limit
      where: $where
      order: [featured_DESC, year_DESC]
      locale: $locale
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
        }
        name
        url
        description
        year
        client
        featured
        screenshot {
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

export interface WebsitesQueryResult {
  websiteCollection: { items: (Website | null)[] } | null
}
