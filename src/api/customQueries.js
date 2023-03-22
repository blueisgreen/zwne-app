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

export const listLessonPathSteps = /* GraphQL */ `
  query ListLessonPathStepsForCourse($courseId: ID!) {
    listLessonPathSteps(filter: { courseId: { eq: $courseId } }) {
      items {
        id
        courseId
        fromLesson
        toLesson
        _version
        _deleted
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
      _version
      _deleted
      _lastChangedAt
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
        _version: $version
        courseId: "$courseId"
        fromLesson: "$fromLessonId"
        toLesson: "$toLessonId"
      }
    ) {
      _version
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
