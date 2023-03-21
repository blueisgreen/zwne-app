export const getCourseWithLessonPlans = /* GraphQL */ `
  query GetCourseWithLessonPlans($id: ID!) {
    getCourse(id: $id) {
      description
      id
      name
      level
      objectives
      tags
      trailhead
      notes
      status
      _version
      _lastChangedAt
      lessons {
        items {
          lesson {
            id
            title
            subtitle
            version
            categories
          }
        }
      }
    }
  }
`
