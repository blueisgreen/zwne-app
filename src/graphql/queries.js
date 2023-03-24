/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLesson = /* GraphQL */ `
  query GetLesson($id: ID!) {
    getLesson(id: $id) {
      id
      title
      subtitle
      version
      categories
      content
      archivedAt
      publishedAt
      courses {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLessons = /* GraphQL */ `
  query ListLessons(
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        version
        categories
        content
        archivedAt
        publishedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      description
      objectives
      level
      lessonPath
      status
      statusChangedAt
      tags
      lessons {
        nextToken
      }
      notes
      createdAt
      updatedAt
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        objectives
        level
        lessonPath
        status
        statusChangedAt
        tags
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLessonCourse = /* GraphQL */ `
  query GetLessonCourse($id: ID!) {
    getLessonCourse(id: $id) {
      id
      lessonId
      courseId
      lesson {
        id
        title
        subtitle
        version
        categories
        content
        archivedAt
        publishedAt
        createdAt
        updatedAt
      }
      course {
        id
        name
        description
        objectives
        level
        lessonPath
        status
        statusChangedAt
        tags
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLessonCourses = /* GraphQL */ `
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
`;
export const lessonCoursesByLessonId = /* GraphQL */ `
  query LessonCoursesByLessonId(
    $lessonId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLessonCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonCoursesByLessonId(
      lessonId: $lessonId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const lessonCoursesByCourseId = /* GraphQL */ `
  query LessonCoursesByCourseId(
    $courseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLessonCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonCoursesByCourseId(
      courseId: $courseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
