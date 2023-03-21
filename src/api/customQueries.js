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

export const listCoursesWithLimitedInfo = /* GraphQL */ `
  query ListCoursesWithLimitedInfo {
    listCourses {
      items {
        id
        name
        description
        status
        _deleted
      }
    }
  }
`
