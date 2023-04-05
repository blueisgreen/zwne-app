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
query ListLessonMarkers($courseId: ID!) {
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

export const listLessonMarkersWithoutCourse = `
query MyQuery {
  listLessons(filter: {courseID: {attributeExists: false}}) {
    items {
      id
      title
      subtitle
      publishedAt
      archivedAt
      updatedAt
      version
      categories
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

export const getLessonForUpdate = /* GraphQL */ `
  query GetLessonForUpdate($id: ID!) {
    getLesson(id: $id) {
      archivedAt
      categories
      content
      courseID
      id
      publishedAt
      subtitle
      title
      version
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
