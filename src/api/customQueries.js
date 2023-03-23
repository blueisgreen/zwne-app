export const listCoursesWithLimitedInfo = /* GraphQL */ `
  query ListCoursesWithLimitedInfo {
    listCourses {
      items {
        id
        name
        description
        status
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
      id
      name
      description
      status
    }
  }
`

export const listLessonPathSteps = /* GraphQL */ `
  query ListLessonPathStepsForCourse($courseId: ID!) {
    listLessonPathSteps(filter: { courseId: { eq: $courseId } }) {
      items {
        id
        courseId
        fromLesson
        toLesson
      }
    }
  }
`

export const createLessonCourse = /* GraphQL */ `
  mutation CreateLessonCourse(
    $input: CreateLessonCourseInput!
    $condition: ModelLessonCourseConditionInput
  ) {
    createLessonCourse(input: $input, condition: $condition) {
      id
      lessonId
      courseId
      createdAt
      updatedAt
    }
  }
`
export const addCourseLessonPathStep = /* GraphQL */ `
  mutation AddCourseLessonPathStep(
    $courseId: ID!
    $fromLessonId: ID!
    $toLessonId: ID!
  ) {
    createLessonPathStep(
      input: {
        courseId: "$courseId"
        fromLesson: "$fromLessonId"
        toLesson: "$toLessonId"
      }
      condition: {
        not: {
          and: {
            courseId: { eq: "$courseId" }
            fromLesson: { eq: "$fromLessonId" }
            toLesson: { eq: "$toLessonId" }
          }
        }
      }
    )
  }
`

export const changeLessonPathStep = /* GraphQL */ `
  mutation ChangeLessonPathStep(
    $stepId: ID!
    $version: int
    $courseId: ID!
    $fromLessonId: ID!
    $toLessonId: ID!
  ) {
    updateLessonPathStep(
      input: {
        id: "$stepId"
        courseId: "$courseId"
        fromLesson: "$fromLessonId"
        toLesson: "$toLessonId"
      }
    ) {
      id
      fromLesson
      toLesson
    }
  }
`

export const deleteLessonPathStep = /* GraphQL */ `
  mutation DeleteLessonPathStep($stepID: ID!) {
    deleteLessonPathStep(input: { id: $stepID })
  }
`
