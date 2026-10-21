import { gql } from "graphql-request"
import type { Experience } from "../contentful.types"

export const EXPERIENCES_QUERY = gql`
  query Experiences($locale: String!, $preview: Boolean!) {
    experienceCollection(
      limit: 20
      order: [startDate_DESC]
      locale: $locale
      preview: $preview
    ) {
      items {
        sys {
          id
        }
        role
        company
        companyUrl
        startDate
        endDate
        summary
        stack
        highlights
      }
    }
  }
`

export interface ExperiencesQueryResult {
  experienceCollection: { items: (Experience | null)[] } | null
}
