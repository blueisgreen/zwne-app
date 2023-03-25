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

/*
  createdAt: AWSDateTime!
  id: ID!
  name: String
  description: String
  objectives: String
  level: CourseLevel
  tags: [String]
  notes: String
  status: CourseStatusOptions
  statusChangedAt: AWSDateTime
  updatedAt: AWSDateTime!
  lessonPath: [ID]
  lessons(filter: ModelLessonCourseFilterInput, limit: Int, nextToken: String, sortDirection: ModelSortDirection): ModelLessonCourseConnection
*/

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
            version
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
      lessons {
        nextToken
      }
    }
  }
`

export const createLessonCourseJoin = /* GraphQL */ `
  mutation CreateLessonCourse(
    $input: CreateLessonCourseInput!
    $condition: ModelLessonCourseConditionInput
  ) {
    createLessonCourse(input: $input, condition: $condition) {
      id
      lessonId
      courseId
    }
  }
`

export const listLessonCourseJoins = /* GraphQL */ `
  query ListLessonCourses(
    $filter: ModelLessonCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lessonId
        courseId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`

export const deleteLessonCourseJoin = /* GraphQL */ `
  mutation DeleteLessonCourse(
    $input: DeleteLessonCourseInput!
    $condition: ModelLessonCourseConditionInput
  ) {
    deleteLessonCourse(input: $input, condition: $condition) {
      id
      lessonId
      courseId
    }
  }
`
