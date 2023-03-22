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

export const getCourseForUpdate = /* GraphQL */ `
  query GetCourseForUpdate($id: ID!) {
    getCourse(id: $id) {
      _version
      id
      name
      description
      objectives
      level
      trailhead
      status
      tags
      notes
      archivedAt
    }
  }
`

export const createCourseWithName = /* GraphQL */ `
  mutation CreateCourse($name: String!) {
    createCourse(input: { name: $name, status: CLOSED }) {
      _version
      id
      name
      description
      status
    }
  }
`
