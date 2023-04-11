export const getLessonPlan = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
    getLessonPlan(id: $id) {
      id
      title
      subtitle
      synopsis
      objective
      status
      cover
      publishedAt
      archivedAt
      createdAt
      updatedAt
    }
  }
`
export const getLessonFull = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
    getLessonPlan(id: $id) {
      id
      title
      subtitle
      synopsis
      objective
      status
      cover
      content
      publishedAt
      archivedAt
      createdAt
      updatedAt
    }
  }
`
export const getLessonContent = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
    getLessonPlan(id: $id) {
      id
      content
      updatedAt
    }
  }
`
export const updateLessonContent = /* GraphQL */ `
  mutation UpdateLessonPlan(
    $input: UpdateLessonPlanInput!
    $condition: ModelLessonPlanConditionInput
  ) {
    updateLessonPlan(input: $input, condition: $condition) {
      id
      content
      updatedAt
    }
  }
`
export const listLessonPlans = /* GraphQL */ `
  query ListLessonPlans(
    $filter: ModelLessonPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        synopsis
        objective
        status
        cover
        publishedAt
        archivedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const listPublishedLessons = /* GraphQL */ `
  query ListLessonPlans(
    $filter: ModelLessonPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        synopsis
        status
        cover
        publishedAt
      }
      nextToken
    }
  }
`
