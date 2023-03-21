export const getCourseWithLessonPlans = /* GraphQL */ `
  query GetCourseWithLessonPlans($id: ID!) {
    getCourse(id: $id) {
      id
      name
      description
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

export const listCoursesLimited = /* GraphQL */ `
  query ListCoursesLimited() {
    listCourses() {
      items {
        _deleted
        id
        name
        description
        status
      }
      nextToken
      startedAt
    }
  }
`
