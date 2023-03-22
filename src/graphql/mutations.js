/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLessonPathStep = /* GraphQL */ `
  mutation CreateLessonPathStep(
    $input: CreateLessonPathStepInput!
    $condition: ModelLessonPathStepConditionInput
  ) {
    createLessonPathStep(input: $input, condition: $condition) {
      id
      courseId
      fromLesson
      toLesson
      createdAt
      updatedAt
    }
  }
`;
export const updateLessonPathStep = /* GraphQL */ `
  mutation UpdateLessonPathStep(
    $input: UpdateLessonPathStepInput!
    $condition: ModelLessonPathStepConditionInput
  ) {
    updateLessonPathStep(input: $input, condition: $condition) {
      id
      courseId
      fromLesson
      toLesson
      createdAt
      updatedAt
    }
  }
`;
export const deleteLessonPathStep = /* GraphQL */ `
  mutation DeleteLessonPathStep(
    $input: DeleteLessonPathStepInput!
    $condition: ModelLessonPathStepConditionInput
  ) {
    deleteLessonPathStep(input: $input, condition: $condition) {
      id
      courseId
      fromLesson
      toLesson
      createdAt
      updatedAt
    }
  }
`;
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
      courses {
        nextToken
      }
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
      courses {
        nextToken
      }
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
      courses {
        nextToken
      }
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
      status
      level
      tags
      notes
      trailhead
      archivedAt
      lessons {
        nextToken
      }
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
      status
      level
      tags
      notes
      trailhead
      archivedAt
      lessons {
        nextToken
      }
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
      status
      level
      tags
      notes
      trailhead
      archivedAt
      lessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createLessonCourse = /* GraphQL */ `
  mutation CreateLessonCourse(
    $input: CreateLessonCourseInput!
    $condition: ModelLessonCourseConditionInput
  ) {
    createLessonCourse(input: $input, condition: $condition) {
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
        status
        level
        tags
        notes
        trailhead
        archivedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLessonCourse = /* GraphQL */ `
  mutation UpdateLessonCourse(
    $input: UpdateLessonCourseInput!
    $condition: ModelLessonCourseConditionInput
  ) {
    updateLessonCourse(input: $input, condition: $condition) {
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
        status
        level
        tags
        notes
        trailhead
        archivedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLessonCourse = /* GraphQL */ `
  mutation DeleteLessonCourse(
    $input: DeleteLessonCourseInput!
    $condition: ModelLessonCourseConditionInput
  ) {
    deleteLessonCourse(input: $input, condition: $condition) {
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
        status
        level
        tags
        notes
        trailhead
        archivedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
