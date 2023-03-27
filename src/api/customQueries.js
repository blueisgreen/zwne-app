export const listCourseMarkers = /* GraphQL */ `
  query ListCourseMarkers {
    listCourses {
      items {
        id
        name
        description
        level
        status
      }
    }
  }
`

export const listLessonMarkers = `
query ListLessonMarkers {
  listLessons {
    items {
      id
      title
      subtitle
      courseID
    }
  }
}
`

export const listLessonMarkersForCourse = `
query ListLessonMarkers($courseId) {
  listLessons(filter: {courseID: {eq: $courseId}}) {
    items {
      id
      title
      subtitle
      courseID
    }
  }
}
`

export const createCourseWithName = /* GraphQL */ `
  mutation CreateCourse($name: String!) {
    createCourse(input: { name: $name, status: DRAFT }) {
      id
      name
      description
      level
      status
    }
  }
`

export const createLessonWithTitle = /* GraphQL */ `
  mutation CreateCourse($title: String!) {
    createLesson(input: { title: $title }) {
      id
      title
    }
  }
`

export const getCourseWithLessonMarkers = /* GraphQL */ `
  query GetCourseWithLessonMarkers($id: ID!) {
    getCourse(id: $id) {
      id
      name
      description
      objectives
      level
      tags
      notes
      status
      statusChangedAt
      lessonPath
      lessons {
        items {
          lesson {
            id
            title
            subtitle
            courseID
          }
        }
      }
    }
  }
`

export const getCourseForUpdate = /* GraphQL */ `
  query GetCourseForUpdate($id: ID!) {
    getCourse(id: $id) {
      id
      name
      description
      objectives
      level
      tags
      notes
      status
      statusChangedAt
      lessonPath
    }
  }
`

export const deleteCourseAbridged = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
    }
  }
`
