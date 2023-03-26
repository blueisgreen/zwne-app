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
      courseID
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
        courseID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const lessonsByCourseID = /* GraphQL */ `
  query LessonsByCourseID(
    $courseID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonsByCourseID(
      courseID: $courseID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        subtitle
        version
        categories
        content
        archivedAt
        publishedAt
        courseID
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
