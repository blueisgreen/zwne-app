/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLesson = /* GraphQL */ `
  mutation CreateLesson(
    $input: CreateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    createLesson(input: $input, condition: $condition) {
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
export const updateLesson = /* GraphQL */ `
  mutation UpdateLesson(
    $input: UpdateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    updateLesson(input: $input, condition: $condition) {
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
export const deleteLesson = /* GraphQL */ `
  mutation DeleteLesson(
    $input: DeleteLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    deleteLesson(input: $input, condition: $condition) {
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
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
